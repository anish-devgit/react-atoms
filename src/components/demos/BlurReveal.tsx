"use client";

import { motion } from "framer-motion";

export function BlurReveal() {
    return (
        <motion.div
            animate={{
                filter: ["blur(8px)", "blur(0px)", "blur(8px)"]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="text-xl font-semibold text-white"
        >
            Blur Reveal
        </motion.div>
    );
}
