"use client";

import { motion } from "framer-motion";
import React from "react";

interface AuroraTextProps {
    children: React.ReactNode;
    className?: string;
    colors?: string[]; // Array of hex colors for the plasma
    speed?: number; // Animation duration in seconds (lower is faster)
}

export function AuroraText({
    children,
    className = "",
    colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
    speed = 8,
}: AuroraTextProps) {
    // We'll create a shifting background gradient mask
    // The idea is to have a very large background moving slowly behind the text text-clip.

    const gradientString = colors.join(", ");

    return (
        <span
            className={`relative inline-block font-bold overflow-hidden ${className}`}
        >
            {/* Background that moves */}
            <motion.span
                className="absolute inset-0 z-0 mix-blend-overlay pointer-events-none"
                style={{
                    background: `linear-gradient(110deg, ${colors[0]} 30%, ${colors[1]} 50%, ${colors[2]} 70%)`,
                    backgroundSize: "200% 100%",
                    filter: "blur(4px) contrast(150%)", // Plasma effect
                }}
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
                aria-hidden="true"
            />

            {/* The actual text using masking */}
            {/* Strategy 2: Background clip text approach with 2 layers */}

            {/* Layer 1: Base text (white/gray) */}
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/50">
                {children}
            </span>

            {/* Layer 2: The Aurora Glow Overlay */}
            <motion.span
                className="absolute inset-0 z-20 text-transparent bg-clip-text pointer-events-none select-none"
                style={{
                    backgroundImage: `linear-gradient(135deg, ${gradientString})`,
                    backgroundSize: "300% 300%"
                }}
                animate={{
                    backgroundPosition: ["0% 0%", "50% 100%", "100% 0%"]
                }}
                transition={{
                    duration: speed,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror"
                }}
            >
                {children}
            </motion.span>
        </span>
    );
}
