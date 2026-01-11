"use client";

import { memo } from "react";
import { motion } from "framer-motion";

function RotatingVisualComponent() {
    return (
        <div className="relative w-full h-[600px] flex items-center justify-center">
            {/* Rotating 3D-like disc */}
            <motion.div
                className="absolute w-96 h-96"
                animate={{
                    rotateY: [0, 360],
                    rotateX: [-10, -10],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    transformStyle: "preserve-3d",
                    perspective: 1000,
                }}
            >
                {/* Main disc */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/30 backdrop-blur-sm border border-blue-400/30 shadow-2xl shadow-blue-500/20" />

                {/* Inner glow */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-400/10 to-transparent" />

                {/* Decorative lines */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent" />
            </motion.div>

            {/* Secondary rotating element */}
            <motion.div
                className="absolute w-80 h-80"
                animate={{
                    rotateY: [360, 0],
                    rotateZ: [0, 180],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    transformStyle: "preserve-3d",
                }}
            >
                <div className="absolute inset-0 rounded-full border border-blue-500/20" />
            </motion.div>

            {/* Floating particles */}
            <motion.div
                className="absolute w-2 h-2 rounded-full bg-blue-400/60"
                animate={{
                    y: [-20, 20],
                    x: [-10, 10],
                    opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ top: "20%", left: "30%" }}
            />
            <motion.div
                className="absolute w-3 h-3 rounded-full bg-blue-500/40"
                animate={{
                    y: [20, -20],
                    x: [10, -10],
                    opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                style={{ top: "60%", right: "30%" }}
            />
        </div>
    );
}

export const RotatingVisual = memo(RotatingVisualComponent);
