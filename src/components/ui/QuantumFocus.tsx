"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuantumFocusProps {
    children: string; // The text content
    blurAmount?: number;
    repulsion?: number;
    glowColor?: string;
    className?: string;
    manualMode?: boolean; // If true, requires click/focus instead of hover
    isHovered?: boolean; /* for external control */
}

export function QuantumFocus({
    children = "Quantum Focus Effect",
    blurAmount = 4,
    repulsion = 20,
    className = "",
    manualMode = false
}: QuantumFocusProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const words = children.split(" ");

    return (
        <div className={`flex flex-wrap justify-center items-center gap-x-2 ${className}`}>
            {words.map((word, i) => {
                const isHovered = hoveredIndex === i;
                const distFromHovered = hoveredIndex !== null ? Math.abs(hoveredIndex - i) : 0;

                // Calculate repulsion (push away from focused word)
                const x = hoveredIndex !== null
                    ? (i > hoveredIndex ? repulsion / (distFromHovered || 1) : -repulsion / (distFromHovered || 1))
                    : 0;

                // Calculate blur and scale based on distance
                const blur = hoveredIndex !== null && !isHovered ? Math.min(blurAmount + distFromHovered * 2, 8) : 0;
                const scale = isHovered ? 1.2 : hoveredIndex !== null ? 0.9 : 1;
                const opacity = hoveredIndex !== null && !isHovered ? 0.4 : 1;

                return (
                    <motion.span
                        key={i}
                        className="relative cursor-pointer inline-block z-10"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        animate={{
                            x: hoveredIndex !== null && !isHovered ? x : 0,
                            scale,
                            filter: `blur(${blur}px)`,
                            opacity
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                        }}
                    >
                        {/* Chromatic Aberration / RGB Split Effect on Focus */}
                        <AnimatePresence>
                            {isHovered && (
                                <>
                                    <motion.span
                                        initial={{ opacity: 0, x: 0 }}
                                        animate={{ opacity: 0.6, x: -2 }}
                                        exit={{ opacity: 0, x: 0 }}
                                        className="absolute inset-0 text-[#ff00ff] mix-blend-screen pointer-events-none select-none"
                                        aria-hidden="true"
                                    >
                                        {word}
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, x: 0 }}
                                        animate={{ opacity: 0.6, x: 2 }}
                                        exit={{ opacity: 0, x: 0 }}
                                        className="absolute inset-0 text-[#00ffff] mix-blend-screen pointer-events-none select-none"
                                        aria-hidden="true"
                                    >
                                        {word}
                                    </motion.span>
                                </>
                            )}
                        </AnimatePresence>

                        {/* Main Text */}
                        <span className={`relative z-10 font-bold ${isHovered ? "text-white" : "text-white/90"}`}>
                            {word}
                        </span>

                        {/* Spotlight Glow Behind */}
                        {isHovered && (
                            <motion.div
                                layoutId="quantum-spotlight"
                                className="absolute inset-0 -z-10 bg-white/10 blur-xl rounded-full"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1.5 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </motion.span>
                );
            })}
        </div>
    );
}
