"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/\\";

interface FluxTextProps {
    children: string;
    className?: string;
    hoverDuration?: number; // How long to remain unstable after hover
}

export function FluxText({ children, className = "", hoverDuration = 300 }: FluxTextProps) {
    const [displayText, setDisplayText] = useState(children);
    const [isScrambling, setIsScrambling] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = () => {
        let iteration = 0;
        const maxIterations = 15; // Speed of decoding

        clearInterval(intervalRef.current as NodeJS.Timeout);

        intervalRef.current = setInterval(() => {
            setDisplayText((currentText) =>
                children
                    .split("")
                    .map((char, index) => {
                        if (char === " ") return " ";

                        // If we've passed the iteration threshold for this character index, show real char
                        // This creates a left-to-right solve effect
                        if (index < iteration) {
                            return children[index];
                        }

                        // Otherwise show random glyph
                        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                    })
                    .join("")
            );

            // Slower increment for longer "thinking" time
            if (iteration >= children.length) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
                setIsScrambling(false);
            }

            iteration += 1 / 3; // 3 ticks per character solve
        }, 30);
    };

    const triggerFlux = () => {
        if (isScrambling) return;
        setIsScrambling(true);
        scramble();
    };

    return (
        <span
            className={`relative inline-block font-mono cursor-pointer group ${className}`}
            onMouseEnter={triggerFlux}
        >
            <span className="relative z-10 group-hover:text-cyan-400 transition-colors duration-300">
                {displayText}
            </span>

            {/* Decorative blur layer for "Flux" feel */}
            <span className="absolute inset-0 text-cyan-500 opacity-0 group-hover:opacity-50 blur-md pointer-events-none transition-opacity duration-300 select-none">
                {displayText}
            </span>
        </span>
    );
}
