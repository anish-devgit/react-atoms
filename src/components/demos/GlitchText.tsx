"use client";

import { motion } from "framer-motion";

export function GlitchText() {
    return (
        <motion.div
            animate={{
                x: [0, -2, 2, -1, 1, 0],
                textShadow: [
                    "0 0 0 transparent",
                    "2px 0 #ff00ff, -2px 0 #00ffff",
                    "-2px 0 #ff00ff, 2px 0 #00ffff",
                    "0 0 0 transparent"
                ]
            }}
            transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "linear"
            }}
            className="text-xl font-bold text-white"
        >
            GLITCH TEXT
        </motion.div>
    );
}
