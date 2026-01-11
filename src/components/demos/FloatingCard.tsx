"use client";

import { motion } from "framer-motion";

export function FloatingCard() {
    return (
        <motion.div
            animate={{
                y: [0, -10, 0],
                rotate: [0, 1, -1, 0]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="w-20 h-24 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 shadow-xl"
        />
    );
}
