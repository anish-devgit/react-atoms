"use client";

import { motion } from "framer-motion";

export default function ProgressBarDemo() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-32 h-2.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "70%" }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        ease: "easeOut",
                    }}
                />
            </div>
        </div>
    );
}
