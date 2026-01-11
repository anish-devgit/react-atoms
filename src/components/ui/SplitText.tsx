"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    animateBy?: "character" | "word" | "line";
    stagger?: number;
    direction?: "up" | "down";
    once?: boolean;
}

export default function SplitText({
    text,
    className = "",
    delay = 0,
    animateBy = "character",
    stagger = 0.03,
    direction = "up",
    once = true,
}: SplitTextProps) {
    const splitByCharacter = (text: string) => {
        return text.split("").map((char, i) => (
            <motion.span
                key={i}
                className={className}
                initial={{
                    opacity: 0,
                    y: direction === "up" ? 20 : -20,
                    filter: "blur(10px)"
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)"
                }}
                viewport={{ once }}
                transition={{
                    duration: 0.5,
                    delay: delay + i * stagger,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>
        ));
    };

    const splitByWord = (text: string) => {
        return text.split(" ").map((word, i) => (
            <motion.span
                key={i}
                className={className}
                style={{ display: "inline-block", marginRight: "0.25em" }}
                initial={{
                    opacity: 0,
                    y: direction === "up" ? 20 : -20,
                    filter: "blur(8px)"
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)"
                }}
                viewport={{ once }}
                transition={{
                    duration: 0.5,
                    delay: delay + i * stagger,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {word}
            </motion.span>
        ));
    };

    const splitByLine = (text: string) => {
        return text.split("\n").map((line, i) => (
            <motion.div
                key={i}
                className={className}
                initial={{
                    opacity: 0,
                    y: direction === "up" ? 30 : -30,
                    filter: "blur(10px)"
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)"
                }}
                viewport={{ once }}
                transition={{
                    duration: 0.6,
                    delay: delay + i * stagger,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {line}
            </motion.div>
        ));
    };

    const renderSplitText = () => {
        switch (animateBy) {
            case "word":
                return splitByWord(text);
            case "line":
                return splitByLine(text);
            case "character":
            default:
                return splitByCharacter(text);
        }
    };

    return <>{renderSplitText()}</>;
}
