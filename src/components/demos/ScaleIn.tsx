"use client";

import { motion } from "framer-motion";

export function ScaleIn() {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium shadow-lg"
        >
            Scale In
        </motion.div>
    );
}
