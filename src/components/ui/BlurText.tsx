"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BlurTextProps {
    text: string;
    className?: string;
    delay?: number;
    direction?: "top" | "bottom" | "left" | "right" | "none";
    animateBy?: "character" | "word";
    once?: boolean;
}

export default function BlurText({
    text,
    className = "",
    delay = 0,
    direction = "none",
    animateBy = "word",
    once = true,
}: BlurTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once });

    const getDirectionVariant = () => {
        switch (direction) {
            case "top":
                return { y: -20 };
            case "bottom":
                return { y: 20 };
            case "left":
                return { x: -20 };
            case "right":
                return { x: 20 };
            default:
                return {};
        }
    };

    const splitByCharacter = () => {
        return text.split("").map((char, i) => (
            <motion.span
                key={i}
                className={className}
                initial={{
                    opacity: 0,
                    filter: "blur(12px)",
                    ...getDirectionVariant()
                }}
                animate={isInView ? {
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                    x: 0
                } : {}}
                transition={{
                    duration: 0.6,
                    delay: delay + i * 0.02,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>
        ));
    };

    const splitByWord = () => {
        return text.split(" ").map((word, i) => (
            <motion.span
                key={i}
                className={className}
                style={{ display: "inline-block", marginRight: "0.25em" }}
                initial={{
                    opacity: 0,
                    filter: "blur(12px)",
                    ...getDirectionVariant()
                }}
                animate={isInView ? {
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                    x: 0
                } : {}}
                transition={{
                    duration: 0.6,
                    delay: delay + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {word}
            </motion.span>
        ));
    };

    return (
        <div ref={ref}>
            {animateBy === "word" ? splitByWord() : splitByCharacter()}
        </div>
    );
}
