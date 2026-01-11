"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Copy, Layers, Sparkles, Zap } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

const features = [
    {
        icon: Copy,
        title: "Copy. Paste. Ship.",
        description: "No setup. No config.",
    },
    {
        icon: Layers,
        title: "Smart Variants",
        description: "Size, theme, motion built-in.",
    },
    {
        icon: Sparkles,
        title: "Accessible",
        description: "Screen reader ready.",
    },
    {
        icon: Zap,
        title: "Fast",
        description: "Optimized by default.",
    },
];

const proofPoints = [
    { value: "80+", label: "Components" },
    { value: "TS", label: "TypeScript" },
    { value: "A11y", label: "Accessible" },
    { value: "MIT", label: "Licensed" },
];

function HeroComponent() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <AnimatedBackground />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-foreground-muted">Open Source • MIT Licensed</span>
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight"
                >
                    Components that
                    <br />
                    <span className="gradient-text">just work.</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg sm:text-xl text-foreground-muted max-w-lg mx-auto mb-12 leading-relaxed"
                >
                    Copy the code. Customize to fit. Ship your product.
                    <br className="hidden sm:block" />
                    No dependencies. No lock-in.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <Link
                        href="/components"
                        className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-white font-medium text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl shadow-lg shadow-accent/25"
                    >
                        Browse Components
                        <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                    <a
                        href="https://github.com/reactatoms/reactatoms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-medium text-lg transition-all duration-200 hover:bg-white/5 hover:border-white/20"
                    >
                        View on GitHub
                    </a>
                </motion.div>

                {/* Proof Points - Subtle, spaced out */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-10 sm:gap-16 mb-20"
                >
                    {proofPoints.map((point) => (
                        <div key={point.label} className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-foreground">{point.value}</div>
                            <div className="text-sm text-foreground-muted mt-1">{point.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Feature Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="p-5 rounded-xl bg-white/[0.02] border border-border transition-all duration-200 hover:border-accent/30 hover:bg-white/[0.04]"
                        >
                            <feature.icon className="w-5 h-5 text-accent mb-3 mx-auto" />
                            <h3 className="font-medium text-foreground text-sm mb-1">
                                {feature.title}
                            </h3>
                            <p className="text-xs text-foreground-muted">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export const Hero = memo(HeroComponent);
