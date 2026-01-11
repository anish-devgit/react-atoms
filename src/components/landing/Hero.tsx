"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CodeSnippet } from "@/components/ui/CodeSnippet";
import { RotatingVisual } from "@/components/ui/RotatingVisual";

function HeroComponent() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.h1
                            className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            The next generation of React components
                        </motion.h1>
                        <motion.p
                            className="text-xl sm:text-2xl text-gray-400 mb-8 leading-relaxed max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            A collection of high-quality, copy-paste components for building beautiful interfaces using React and TypeScript.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <Link
                                href="/components"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors"
                            >
                                Explore components
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <CodeSnippet>npm install @reactatoms/components</CodeSnippet>
                        </motion.div>
                    </motion.div>

                    {/* Right: Rotating Visual */}
                    <motion.div
                        className="hidden lg:block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <RotatingVisual />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export const Hero = memo(HeroComponent);


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

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-default border border-border text-sm">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="text-foreground-muted">Open Source • MIT Licensed</span>
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-6xl sm:text-7xl lg:text-8xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]"
                >
                    Components that
                    <br />
                    <span className="text-accent">just work.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl sm:text-2xl text-foreground-muted max-w-2xl mx-auto mb-12 leading-relaxed"
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
                        className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-medium text-lg transition-all duration-200 hover:bg-accent-secondary"
                    >
                        Browse Components
                        <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                    <a
                        href="https://github.com/anish-devgit/react-atoms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-medium text-lg transition-all duration-200 hover:bg-surface-hover hover:border-border-strong"
                    >
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        Star on GitHub
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
            </div>
        </section>
    );
}

export const Hero = memo(HeroComponent);
