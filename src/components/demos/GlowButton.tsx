"use client";

import { motion } from "framer-motion";

export function GlowButton() {
    return (
        <motion.button
            animate={{
                boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.3)",
                    "0 0 40px rgba(168, 85, 247, 0.6)",
                    "0 0 20px rgba(168, 85, 247, 0.3)"
                ]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium"
        >
            Glow Button
        </motion.button>
    );
}
