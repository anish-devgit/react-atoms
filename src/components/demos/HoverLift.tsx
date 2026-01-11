"use client";

import { motion } from "framer-motion";

export function HoverLift() {
    return (
        <motion.div
            animate={{
                y: [0, -8, 0]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-lg"
        >
            Hover Lift
        </motion.div>
    );
}
