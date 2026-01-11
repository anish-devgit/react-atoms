"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Zap, Layers, Clock } from "lucide-react";

const comparison = [
    { task: "Button component", without: "2-4 hrs", with: "2 min" },
    { task: "Loading states", without: "1-2 hrs", with: "Built-in" },
    { task: "Accessibility", without: "3-5 hrs", with: "Done" },
    { task: "Size variants", without: "1-2 hrs", with: "Ready" },
    { task: "Mobile support", without: "2-3 hrs", with: "Included" },
];

const benefits = [
    {
        icon: Zap,
        title: "Real-World Ready",
        description: "Solves actual problems, not just demos.",
    },
    {
        icon: Layers,
        title: "Smart Variants",
        description: "Size, theme, motion. All built-in.",
    },
    {
        icon: Clock,
        title: "Zero Config",
        description: "Copy. Paste. It works.",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function ValuePropositionComponent() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Ship faster. <span className="gradient-text">Simple as that.</span>
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-xl mx-auto">
                        Stop building components from scratch. Start shipping products.
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-16"
                >
                    <div className="overflow-hidden rounded-2xl border border-border bg-white/[0.02]">
                        <div className="grid grid-cols-3 gap-4 p-4 border-b border-border bg-white/[0.02]">
                            <div className="text-sm font-medium text-foreground">Task</div>
                            <div className="text-sm font-medium text-red-400 text-center">
                                <X className="w-4 h-4 inline mr-1" />
                                DIY
                            </div>
                            <div className="text-sm font-medium text-green-400 text-center">
                                <Check className="w-4 h-4 inline mr-1" />
                                ReactAtoms
                            </div>
                        </div>

                        {comparison.map((row, i) => (
                            <div
                                key={row.task}
                                className={`grid grid-cols-3 gap-4 p-4 ${i < comparison.length - 1 ? "border-b border-border" : ""}`}
                            >
                                <div className="text-sm text-foreground">{row.task}</div>
                                <div className="text-sm text-red-400/70 text-center">{row.without}</div>
                                <div className="text-sm text-green-400 font-medium text-center">{row.with}</div>
                            </div>
                        ))}

                        <div className="grid grid-cols-3 gap-4 p-4 bg-white/[0.02] border-t border-border">
                            <div className="text-sm font-semibold text-foreground">Time saved</div>
                            <div className="text-sm text-foreground-muted text-center">9-16 hrs</div>
                            <div className="text-sm text-accent font-bold text-center">Per component</div>
                        </div>
                    </div>
                </motion.div>

                {/* Benefits */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.title}
                            className="p-6 rounded-2xl bg-white/[0.02] border border-border transition-colors duration-200 hover:border-accent/30"
                        >
                            <benefit.icon className="w-8 h-8 text-accent mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-sm text-foreground-muted">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export const ValueProposition = memo(ValuePropositionComponent);
