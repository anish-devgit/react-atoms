"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time (you can adjust this)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <motion.div
                        className="flex flex-col items-center gap-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Logo - Atomic symbol */}
                        <motion.svg
                            width="80"
                            height="80"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            {/* Nucleus */}
                            <circle cx="50" cy="50" r="8" className="fill-black dark:fill-white" />

                            {/* Electron orbits */}
                            <ellipse
                                cx="50"
                                cy="50"
                                rx="40"
                                ry="20"
                                className="stroke-black dark:stroke-white"
                                strokeWidth="2"
                                fill="none"
                            />
                            <ellipse
                                cx="50"
                                cy="50"
                                rx="40"
                                ry="20"
                                className="stroke-black dark:stroke-white"
                                strokeWidth="2"
                                fill="none"
                                transform="rotate(60 50 50)"
                            />
                            <ellipse
                                cx="50"
                                cy="50"
                                rx="40"
                                ry="20"
                                className="stroke-black dark:stroke-white"
                                strokeWidth="2"
                                fill="none"
                                transform="rotate(120 50 50)"
                            />

                            {/* Electrons */}
                            <motion.circle
                                cx="90"
                                cy="50"
                                r="4"
                                className="fill-black dark:fill-white"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                style={{ transformOrigin: "50px 50px" }}
                            />
                        </motion.svg>

                        {/* Text with outline effect like Animate UI */}
                        <motion.h1
                            className="text-5xl font-bold tracking-tight"
                            style={{
                                WebkitTextStroke: "1px currentColor",
                                color: "transparent",
                                WebkitTextFillColor: "transparent"
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <span className="text-black dark:text-white">ReactAtoms</span>
                        </motion.h1>

                        {/* Loading progress bar (optional) */}
                        <motion.div
                            className="w-48 h-0.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.div
                                className="h-full bg-black dark:bg-white"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
