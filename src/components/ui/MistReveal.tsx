"use client";

import { motion } from "framer-motion";

interface MistRevealProps {
    children: string;
    className?: string;
    direction?: "left" | "right" | "up" | "down";
    duration?: number;
    stagger?: number;
}

export function MistReveal({
    children,
    className = "",
    direction = "right",
    duration = 1.2,
    stagger = 0.1,
}: MistRevealProps) {
    const words = children.split(" ");

    // Motion vectors based on direction
    const variants = {
        hidden: (i: number) => ({
            opacity: 0,
            filter: "blur(12px)",
            x: direction === "right" ? -50 : direction === "left" ? 50 : 0,
            y: direction === "down" ? -30 : direction === "up" ? 30 : 0,
        }),
        visible: (i: number) => ({
            opacity: 1,
            filter: "blur(0px)",
            x: 0,
            y: 0,
            transition: {
                duration,
                delay: i * stagger,
                ease: [0.2, 0.65, 0.3, 0.9], // Windy ease
            } as any, // Cast to any to bypass strict tuple check limitation in this context
        }),
    };

    return (
        <div className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-10%" }} // Re-animates when scrolled roughly
                    variants={variants}
                    className="inline-block relative"
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
}
