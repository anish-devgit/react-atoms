"use client";

import { motion } from "framer-motion";

export function GradientText() {
    return (
        <motion.div
            animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
            }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_auto] bg-clip-text text-transparent"
        >
            Gradient Text
        </motion.div>
    );
}
