"use client";

import { motion } from "framer-motion";

export default function StaggerListDemo() {
    const items = ["Item 1", "Item 2", "Item 3"];

    return (
        <div className="flex flex-col gap-2 items-center justify-center h-full">
            {items.map((item, index) => (
                <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                    className="px-4 py-2 bg-white/5 rounded-lg text-sm"
                >
                    {item}
                </motion.div>
            ))}
        </div>
    );
}
