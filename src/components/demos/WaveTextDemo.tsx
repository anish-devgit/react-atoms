"use client";

import { motion } from "framer-motion";

export default function WaveTextDemo() {
    const text = "Wave";
    const letters = text.split("");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
        },
    };

    return (
        <div className="flex items-center justify-center h-full">
            <motion.div
                className="flex overflow-hidden text-2xl font-bold"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {letters.map((letter, index) => (
                    <motion.span
                        key={index}
                        variants={child}
                        className="inline-block bg-gradient-to-r from-accent via-purple-400 to-accent-secondary bg-clip-text text-transparent"
                        style={{
                            animation: `wave 1.5s ease-in-out ${index * 0.1}s infinite`,
                        }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}
