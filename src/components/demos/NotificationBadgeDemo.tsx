"use client";

import { motion } from "framer-motion";

export default function NotificationBadgeDemo() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">
                    🔔
                </div>
                <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    3
                </motion.div>
            </div>
        </div>
    );
}
