"use client";

import { useRef, useState } from "react";

interface TiltedScrollProps {
    children: React.ReactNode;
    className?: string;
    tiltAngle?: number;
}

export default function TiltedScroll({
    children,
    className = "",
    tiltAngle = -15
}: TiltedScrollProps) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div
                className="flex flex-col gap-4 will-change-transform"
                style={{
                    transform: `rotate(${tiltAngle}deg) translateZ(0)`,
                    transformOrigin: "center center",
                }}
            >
                {children}
            </div>

            {/* Gradient Masks for fading edges */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        </div>
    );
}
