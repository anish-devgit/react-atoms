"use client";

import { memo } from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
}

function AnimatedTextComponent({ text, className = "", delay = 0 }: AnimatedTextProps) {
    const characters = text.split("");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay },
        },
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(4px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.span
            className={className}
            style={{ display: "inline-block", whiteSpace: "pre" }}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    style={{ display: "inline-block" }}
                    variants={child}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
}

export const AnimatedText = memo(AnimatedTextComponent);
