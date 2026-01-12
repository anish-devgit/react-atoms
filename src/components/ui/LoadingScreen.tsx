"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
    const [hasEntered, setHasEntered] = useState(false);

    useEffect(() => {
        // Automatic entry after brief hold
        const timer = setTimeout(() => {
            setHasEntered(true);
        }, 800); // 300ms hold + 500ms expansion

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {!hasEntered && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    style={{ backgroundColor: "#000000" }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Subtle film grain */}
                    <div
                        className="absolute inset-0 opacity-[0.008] pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Portal circle - no text */}
                    <motion.div
                        className="w-64 h-64 rounded-full border-2 border-white"
                        initial={{
                            scale: 1,
                            borderWidth: "2px"
                        }}
                        animate={{
                            scale: [1, 1, 1.02, 50],
                            borderWidth: ["2px", "2px", "3px", "3px"],
                            opacity: [1, 1, 1, 0]
                        }}
                        transition={{
                            duration: 0.8,
                            times: [0, 0.375, 0.4, 1], // Hold 300ms, then expand
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
