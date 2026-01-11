"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Eye, Mouse, Package, Palette } from "lucide-react";

const popularComponents = [
    {
        name: "Gradient Text",
        category: "Text Animations",
        icon: Sparkles,
        href: "/components/text-animations/gradient-text",
        description: "Animated color-shifting text",
    },
    {
        name: "Fade In",
        category: "Animations",
        icon: Eye,
        href: "/components/animations/fade-in",
        description: "Smooth entrance animation",
    },
    {
        name: "Glow Button",
        category: "Effects",
        icon: Mouse,
        href: "/components/effects/glow-button",
        description: "Button with ambient glow",
    },
    {
        name: "Glass Card",
        category: "Components",
        icon: Package,
        href: "/components/components/glass-card",
        description: "Frosted glass container",
    },
    {
        name: "Gradient Mesh",
        category: "Backgrounds",
        icon: Palette,
        href: "/components/backgrounds/gradient-mesh",
        description: "Animated gradient background",
    },
    {
        name: "Blur Reveal",
        category: "Text Animations",
        icon: Sparkles,
        href: "/components/text-animations/blur-reveal",
        description: "Text unblur animation",
    },
];

function PopularComponentsComponent() {
    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
            {/* Subtle ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/2 to-transparent" />

            <div className="relative max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <p className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-xs font-medium text-accent mb-4 backdrop-blur-sm">
                        Start Here
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
                        Popular Components
                    </h2>
                    <p className="text-base text-foreground-muted max-w-md mx-auto">
                        Copy, customize, and ship. Start with these crowd favorites.
                    </p>
                </motion.div>

                {/* Component Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {popularComponents.map((component, index) => (
                        <Link
                            key={component.name}
                            href={component.href}
                            className="group relative p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                                    <component.icon className="w-5 h-5 text-accent" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                                        {component.name}
                                        <ArrowRight className="w-3 h-3 text-foreground-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </h3>
                                    <p className="text-xs text-accent">{component.category}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-foreground-muted leading-relaxed">
                                {component.description}
                            </p>

                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
                        </Link>
                    ))}
                </motion.div>

                {/* Browse All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center mt-10"
                >
                    <Link
                        href="/components"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-medium transition-all duration-200 hover:bg-white/5 hover:border-white/20"
                    >
                        Browse All Components
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export const PopularComponents = memo(PopularComponentsComponent);
