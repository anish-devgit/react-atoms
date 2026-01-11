"use client";

import { motion } from "framer-motion";
import { CSSProperties } from "react";

interface GradientTextProps {
    text: string;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    animationDirection?: "horizontal" | "vertical" | "diagonal";
    showBorder?: boolean;
}

export default function GradientText({
    text,
    className = "",
    colors = ["#ff0080", "#7928ca", "#ff0080"],
    animationSpeed = 3,
    animationDirection = "horizontal",
    showBorder = false,
}: GradientTextProps) {
    const gradientColors = colors.join(", ");

    const getGradientAngle = () => {
        switch (animationDirection) {
            case "vertical":
                return "0deg";
            case "diagonal":
                return "45deg";
            case "horizontal":
            default:
                return "90deg";
        }
    };

    const gradientStyle: CSSProperties = {
        background: `linear-gradient(${getGradientAngle()}, ${gradientColors})`,
        backgroundSize: animationDirection === "horizontal" ? "200% auto" : "auto 200%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    };

    const borderStyle: CSSProperties = showBorder
        ? {
            border: `2px solid transparent`,
            backgroundImage: `linear-gradient(${getGradientAngle()}, ${gradientColors})`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
        }
        : {};

    return (
        <motion.span
            className={className}
            style={{ ...gradientStyle, ...borderStyle }}
            animate={{
                backgroundPosition:
                    animationDirection === "horizontal"
                        ? ["0% 0%", "100% 0%"]
                        : animationDirection === "vertical"
                            ? ["0% 0%", "0% 100%"]
                            : ["0% 0%", "100% 100%"],
            }}
            transition={{
                duration: animationSpeed,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
            }}
        >
            {text}
        </motion.span>
    );
}
