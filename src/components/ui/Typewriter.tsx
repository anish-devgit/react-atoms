"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
    text: string;
    speed?: number;
    className?: string;
}

export function Typewriter({ text, speed = 100, className = "" }: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else {
            // Reset after a pause
            const resetTimeout = setTimeout(() => {
                setDisplayedText("");
                setCurrentIndex(0);
            }, 2000);
            return () => clearTimeout(resetTimeout);
        }
    }, [currentIndex, text, speed]);

    return (
        <div className={`font-mono text-lg ${className}`}>
            {displayedText}
            <span className="animate-pulse">|</span>
        </div>
    );
}
