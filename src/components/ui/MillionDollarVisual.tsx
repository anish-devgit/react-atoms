"use client";

import React, { memo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { motion } from "framer-motion";

// Simple animated background with subtle particles
function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
            <ambientLight intensity={0.3} />

            <EffectComposer>
                {/* Soft blue vignette glow like animate-ui.com */}
                <Vignette offset={0.5} darkness={0.7} />
            </EffectComposer>
        </>
    );
}

// Component preview cards overlay
function ComponentCardsOverlay() {
    const cards = [
        {
            title: "Text Animations",
            icon: "💬",
            color: "from-blue-500/20 to-purple-500/20",
            items: ["Blur Text", "Gradient Text", "Split Text", "True Focus"]
        },
        {
            title: "Backgrounds",
            icon: "🎨",
            color: "from-purple-500/20 to-pink-500/20",
            items: ["Aurora", "Grid Vortex", "Noise Texture", "Orbital Fluids"]
        },
        {
            title: "Animations",
            icon: "✨",
            color: "from-cyan-500/20 to-blue-500/20",
            items: ["Magnet", "Splash Cursor", "Floating", "Morphing"]
        },
        {
            title: "Effects",
            icon: "🌈",
            color: "from-pink-500/20 to-orange-500/20",
            items: ["Shimmer", "Glass", "Parallax", "Reveal"]
        }
    ];

    return (
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 pointer-events-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.1 + index * 0.1,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className={`
                            bg-white/5 backdrop-blur-sm border border-white/10
                            rounded-2xl p-6 pointer-events-auto
                            hover:bg-white/8 hover:border-white/20
                            transition-all duration-300
                            group cursor-pointer
                        `}
                    >
                        {/* Icon */}
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                            {card.icon}
                        </div>

                        {/* Title */}
                        <h3 className="text-white font-semibold text-lg mb-3">
                            {card.title}
                        </h3>

                        {/* Preview items */}
                        <div className="space-y-2">
                            {card.items.map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                                    className={`
                                        h-1.5 rounded-full bg-gradient-to-r ${card.color}
                                        opacity-60 group-hover:opacity-100
                                        transition-opacity duration-300
                                    `}
                                    style={{ width: `${100 - i * 15}%` }}
                                />
                            ))}
                        </div>

                        {/* Hover arrow */}
                        <div className="mt-4 text-white/40 group-hover:text-white/80 transition-colors flex items-center gap-1 text-sm">
                            <span>View →</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function AnimateUIStyleVisual() {
    return (
        <div className="w-full h-[550px] relative overflow-hidden">
            {/* Blue vignette glow border effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-blue-900/30 pointer-events-none" />
            <div className="absolute inset-0 border-8 border-blue-500/10 rounded-3xl pointer-events-none" />

            {/* 3D Canvas for vignette effect */}
            <Canvas
                style={{ background: "#0a0a0f" }}
                gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
                dpr={[1, 1.5]}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}

export const MillionDollarVisual = memo(AnimateUIStyleVisual);
