"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface TrueFocusProps {
    text: string;
    className?: string;
    focusedClassName?: string;
    blurredClassName?: string;
    focusSpeed?: number;
    blurAmount?: number;
}

export default function TrueFocus({
    text,
    className = "",
    focusedClassName = "",
    blurredClassName = "",
    focusSpeed = 1,
    blurAmount = 3,
}: TrueFocusProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const progress = useMotionValue(0);

    useEffect(() => {
        const controls = animate(progress, 1, {
            duration: focusSpeed,
            ease: "easeInOut",
            repeat: 0,
        });

        return controls.stop;
    }, [progress, focusSpeed]);

    const chars = text.split("");
    const totalChars = chars.length;

    return (
        <div ref={containerRef} className={className}>
            {chars.map((char, i) => {
                const charProgress = i / (totalChars - 1);

                const blur = useTransform(
                    progress,
                    [
                        Math.max(0, charProgress - 0.2),
                        charProgress,
                        Math.min(1, charProgress + 0.2),
                    ],
                    [blurAmount, 0, blurAmount]
                );

                const opacity = useTransform(
                    progress,
                    [
                        Math.max(0, charProgress - 0.2),
                        charProgress,
                        Math.min(1, charProgress + 0.2),
                    ],
                    [0.3, 1, 0.3]
                );

                return (
                    <motion.span
                        key={i}
                        style={{
                            filter: useTransform(blur, (b) => `blur(${b}px)`),
                            opacity,
                        }}
                        className={char === " " ? "" : `${focusedClassName} ${blurredClassName}`}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                );
            })}
        </div>
    );
}
