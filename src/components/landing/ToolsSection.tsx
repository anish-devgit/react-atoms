"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Paintbrush, Shapes, Layers, Wand2, Grid3X3, Sparkles } from "lucide-react";
import Link from "next/link";

const tools = [
    {
        icon: Paintbrush,
        title: "Background Studio",
        description: "Generate stunning animated backgrounds with our visual editor.",
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: Shapes,
        title: "Shape Generator",
        description: "Create unique SVG shapes and blobs for your designs.",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: Layers,
        title: "Texture Lab",
        description: "Generate noise, grain, and texture overlays for depth.",
        color: "from-orange-500 to-red-500",
    },
    {
        icon: Grid3X3,
        title: "Grid Generator",
        description: "Create custom CSS grid layouts with visual controls.",
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: Wand2,
        title: "Animation Builder",
        description: "Design Framer Motion animations with a visual editor.",
        color: "from-violet-500 to-purple-500",
    },
    {
        icon: Sparkles,
        title: "Effect Library",
        description: "Browse pre-made CSS effects like glassmorphism and glow.",
        color: "from-pink-500 to-rose-500",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function ToolsSectionComponent() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Static background orbs - no animation */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 blur-2xl" />
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent-secondary/5 rounded-full -translate-y-1/2 blur-2xl" />

            <div className="relative max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-6">
                        <Wand2 className="w-4 h-4 text-accent" />
                        <span className="text-foreground-muted">Beyond Components</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Powerful <span className="gradient-text">Tools</span> for Designers & Devs
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                        ReactAtoms isn't just a component library. It's a full creative toolkit
                        to help you build stunning interfaces faster.
                    </p>
                </motion.div>

                {/* Tools Grid - single animation for container */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {tools.map((tool) => (
                        <div
                            key={tool.title}
                            className="relative p-6 rounded-2xl bg-white/[0.02] border border-border transition-colors duration-200 hover:border-accent/30"
                        >
                            {/* Icon */}
                            <div
                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}
                            >
                                <tool.icon className="w-6 h-6 text-white" />
                            </div>

                            {/* Status Badge */}
                            <span className="absolute top-4 right-4 px-2 py-1 text-xs rounded-full bg-accent/20 text-accent">
                                Coming Soon
                            </span>

                            {/* Content */}
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {tool.title}
                            </h3>
                            <p className="text-sm text-foreground-muted">
                                {tool.description}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/components"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground transition-colors duration-200 hover:bg-white/5"
                    >
                        Explore Components Instead
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export const ToolsSection = memo(ToolsSectionComponent);
