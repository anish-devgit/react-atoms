"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const duration = 3000; // 3 seconds total
        const interval = 50; // Update every 50ms
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

    // Generate particle positions
    const particles = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        angle: (i / 40) * Math.PI * 2,
        radius: 150 + Math.random() * 100,
        speed: 0.3 + Math.random() * 0.4,
        size: 2 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.5
    }));

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
                    style={{
                        background: "radial-gradient(ellipse at center, #0a0a1f 0%, #000000 100%)"
                    }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Noise grain texture */}
                    <div
                        className="absolute inset-0 opacity-[0.015]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                            backgroundRepeat: "repeat"
                        }}
                    />

                    {/* Faint stars */}
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-0.5 h-0.5 bg-white rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0.1, 0.4, 0.1],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                        />
                    ))}

                    <svg className="absolute" width="600" height="600" style={{ filter: "url(#glow)" }}>
                        <defs>
                            {/* Glow filter */}
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* Orb gradients */}
                            <radialGradient id="orbGradient" cx="35%" cy="35%">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                                <stop offset="40%" stopColor="#6366f1" stopOpacity="0.5" />
                                <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                            </radialGradient>

                            {/* Highlight gradient */}
                            <radialGradient id="highlight" cx="30%" cy="30%">
                                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                                <stop offset="50%" stopColor="white" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="white" stopOpacity="0" />
                            </radialGradient>

                            {/* Ring gradient */}
                            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#06b6d4" />
                                <stop offset="50%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                        </defs>

                        {/* Breathing halo */}
                        <motion.circle
                            cx="300"
                            cy="300"
                            r="100"
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="1"
                            opacity="0.2"
                            animate={{
                                r: [95, 105, 95],
                                opacity: [0.15, 0.25, 0.15]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Main orb */}
                        <motion.circle
                            cx="300"
                            cy="300"
                            r="80"
                            fill="url(#orbGradient)"
                            style={{ mixBlendMode: "screen" }}
                            animate={{
                                scale: progress % 10 === 0 && progress > 0 ? [1, 1.02, 1] : 1
                            }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Highlight on orb */}
                        <ellipse
                            cx="270"
                            cy="270"
                            rx="30"
                            ry="35"
                            fill="url(#highlight)"
                            opacity="0.6"
                        />

                        {/* Inner energy swirl */}
                        <motion.circle
                            cx="300"
                            cy="300"
                            r="50"
                            fill="none"
                            stroke="#a78bfa"
                            strokeWidth="1"
                            opacity="0.3"
                            strokeDasharray="3,6"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{ transformOrigin: "300px 300px" }}
                        />

                        {/* Rotating energy ring */}
                        <motion.ellipse
                            cx="300"
                            cy="300"
                            rx="130"
                            ry="40"
                            fill="none"
                            stroke="url(#ringGradient)"
                            strokeWidth="3"
                            opacity="0.6"
                            style={{
                                transformOrigin: "300px 300px",
                                filter: "blur(1px)"
                            }}
                            animate={{
                                rotateZ: 360,
                                opacity: progress % 10 === 0 && progress > 0 ? [0.6, 0.8, 0.6] : 0.6
                            }}
                            transition={{
                                rotateZ: { duration: 6, repeat: Infinity, ease: "linear" },
                                opacity: { duration: 0.3 }
                            }}
                        />
                    </svg>

                    {/* Orbiting particles */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {particles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                className="absolute rounded-full"
                                style={{
                                    width: particle.size,
                                    height: particle.size,
                                    background: particle.id % 3 === 0 ? "#06b6d4" : particle.id % 3 === 1 ? "#8b5cf6" : "#fbbf24",
                                    boxShadow: `0 0 ${particle.size * 2}px currentColor`,
                                    opacity: particle.opacity
                                }}
                                animate={{
                                    x: [
                                        Math.cos(particle.angle) * particle.radius,
                                        Math.cos(particle.angle + Math.PI) * particle.radius,
                                        Math.cos(particle.angle) * particle.radius
                                    ],
                                    y: [
                                        Math.sin(particle.angle) * particle.radius * 0.4,
                                        Math.sin(particle.angle + Math.PI) * particle.radius * 0.4,
                                        Math.sin(particle.angle) * particle.radius * 0.4
                                    ],
                                    opacity: progress % 10 === 0 && progress > 0
                                        ? [particle.opacity, particle.opacity * 1.5, particle.opacity]
                                        : particle.opacity
                                }}
                                transition={{
                                    x: { duration: 10 / particle.speed, repeat: Infinity, ease: "linear" },
                                    y: { duration: 10 / particle.speed, repeat: Infinity, ease: "linear" },
                                    opacity: { duration: 0.2 }
                                }}
                            />
                        ))}
                    </div>

                    {/* Progress percentage */}
                    <motion.div
                        className="absolute bottom-1/3 text-white/60 font-light tracking-[0.3em]"
                        style={{ fontFamily: "'Courier New', monospace" }}
                        animate={{
                            opacity: [0.6, 0.9, 0.6]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {Math.floor(progress)}%
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
