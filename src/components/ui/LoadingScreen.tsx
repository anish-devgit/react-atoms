"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading over 4 seconds
        const duration = 4000;
        const interval = 50;
        const increment = (100 / duration) * interval;

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 800);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    // Map progress to letter reveals
    const getVisibleLetters = () => {
        if (progress < 20) return 2; // R, A
        if (progress < 30) return 3; // R, e, A
        if (progress < 40) return 4; // R, e, a, A
        if (progress < 50) return 5; // R, e, a, c, A
        if (progress < 60) return 6; // R, e, a, c, t, A
        if (progress < 70) return 7; // R, e, a, c, t, A, t
        if (progress < 80) return 8; // R, e, a, c, t, A, t, o
        if (progress < 90) return 9; // R, e, a, c, t, A, t, o, m
        return 10; // Full: ReactAtoms
    };

    const visibleCount = getVisibleLetters();
    const letters = ["R", "e", "a", "c", "t", "A", "t", "o", "m", "s"];

    // Breathing motion for R and A
    const breatheDistance = progress < 20 ? 4 : 0;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    style={{ backgroundColor: "#000000" }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Subtle film grain */}
                    <div
                        className="absolute inset-0 opacity-[0.012]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* ReactAtoms wordmark */}
                    <div className="flex items-center justify-center">
                        {letters.map((letter, index) => {
                            const isVisible = index < visibleCount;
                            const isR = index === 0;
                            const isFirstA = index === 5;

                            return (
                                <motion.span
                                    key={index}
                                    className="text-white font-semibold"
                                    style={{
                                        fontSize: "48px",
                                        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
                                        letterSpacing: "-0.02em",
                                        opacity: isVisible ? 1 : 0,
                                    }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: isVisible ? 1 : 0,
                                        y: isVisible ? 0 : 10,
                                        x: isR && progress < 20
                                            ? [0, -breatheDistance, 0]
                                            : isFirstA && progress < 20
                                                ? [0, breatheDistance, 0]
                                                : 0
                                    }}
                                    transition={{
                                        opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                                        y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                                        x: {
                                            duration: 2.5,
                                            repeat: progress < 20 ? Infinity : 0,
                                            ease: "easeInOut"
                                        }
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
