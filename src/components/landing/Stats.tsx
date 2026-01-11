"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Blocks, Scale, Code2, Rocket } from "lucide-react";

const stats = [
    {
        value: "80+",
        label: "Atomic Components",
        description: "Small, composable building blocks",
        icon: Blocks,
    },
    {
        value: "100%",
        label: "Open Source",
        description: "MIT licensed, no paywalls",
        icon: Scale,
    },
    {
        value: "Zero",
        label: "Lock-in",
        description: "Copy, paste, own your code",
        icon: Code2,
    },
    {
        value: "Real",
        label: "Production Ready",
        description: "Built for apps, not demos",
        icon: Rocket,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
};

function StatsComponent() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section ref={ref} className="relative py-20 px-4 sm:px-6 lg:px-8">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary/30 to-background" />

            <div className="relative max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <p className="text-sm text-foreground-muted mb-2">
                        The foundation
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                        Designed for developers who ship
                    </h2>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={fadeUp}
                            transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                            className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-0.5"
                        >
                            {/* Icon */}
                            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                                <stat.icon className="w-4 h-4 text-accent" />
                            </div>

                            {/* Value */}
                            <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1 tracking-tight">
                                <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text">
                                    {stat.value}
                                </span>
                            </div>

                            {/* Label */}
                            <div className="text-sm font-medium text-foreground mb-1">
                                {stat.label}
                            </div>

                            {/* Description */}
                            <p className="text-xs text-foreground-muted leading-relaxed">
                                {stat.description}
                            </p>

                            {/* Subtle glow on hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                {/* Subtle tagline */}
                <motion.p
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center text-sm text-foreground-muted/70 mt-10"
                >
                    No vendor lock-in. No subscriptions. Just components that work.
                </motion.p>
            </div>
        </section>
    );
}

export const Stats = memo(StatsComponent);
