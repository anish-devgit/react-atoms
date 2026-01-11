"use client";

import { motion, Variants } from "framer-motion";

export default function FadeUpTextDemo() {
    const text = "Fade Up";
    const words = text.split(" ");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const child: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="flex items-center justify-center h-full">
            <motion.div
                className="flex gap-2 text-xl font-semibold text-foreground"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {words.map((word, index) => (
                    <motion.span key={index} variants={child}>
                        {word}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}
