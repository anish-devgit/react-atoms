"use client";

import { motion } from "framer-motion";

export default function BounceInDemo() {
    return (
        <div className="flex items-center justify-center h-full">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    repeat: Infinity,
                    repeatDelay: 1,
                }}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/40 to-accent-secondary/40 flex items-center justify-center text-2xl"
            >
                🎉
            </motion.div>
        </div>
    );
}
