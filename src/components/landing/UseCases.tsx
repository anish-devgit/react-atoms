"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Box, BarChart3, Layout, Smartphone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const useCases = [
    {
        title: "Landing Pages",
        description: "Heroes, CTAs, testimonials.",
        image: "/images/landing-mockup.png",
        components: ["Hero", "CTA Button", "Testimonial"],
        accent: "from-purple-500 to-pink-500",
        icon: Layout,
        href: "/components",
    },
    {
        title: "SaaS Dashboards",
        description: "Analytics, progress, notifications.",
        image: "/images/dashboard-mockup.png",
        components: ["Stats Card", "Progress Bar", "Toggle"],
        accent: "from-blue-500 to-cyan-500",
        icon: BarChart3,
        href: "/components",
    },
    {
        title: "Portfolios",
        description: "Showcase your work. Impress clients.",
        image: "/images/portfolio-mockup.png",
        components: ["Project Card", "Glass Card", "Counter"],
        accent: "from-orange-500 to-red-500",
        icon: Box,
        href: "/components",
    },
    {
        title: "Startup MVPs",
        description: "Validate fast. Ship faster.",
        image: "/images/mvp-mockup.png",
        components: ["Pricing", "FAQ", "Gradient Button"],
        accent: "from-green-500 to-emerald-500",
        icon: Smartphone,
        href: "/components",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function UseCasesComponent() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent" />

            {/* Glowing Orbs for Depth */}
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2" />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2" />

            <div className="relative max-w-5xl mx-auto w-full">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <p className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-xs font-medium text-accent mb-4 backdrop-blur-sm">
                        Use Cases
                    </p>
                    <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
                        What are you building?
                    </h2>
                    <p className="text-base text-foreground-muted max-w-md mx-auto">
                        Pick your project type. We've got the atoms to build it.
                    </p>
                </motion.div>

                {/* Use Case Cards - 2x2 Grid */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5"
                >
                    {useCases.map((useCase) => (
                        <Link
                            key={useCase.title}
                            href={useCase.href}
                            className="group relative block h-[320px] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10"
                        >
                            {/* Full-Container Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={useCase.image}
                                    alt={useCase.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Dark Gradient Overlay for Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

                            {/* Subtle Accent Top Border */}
                            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${useCase.accent} opacity-60`} />

                            {/* Glow Border on Hover */}
                            <div className="absolute inset-0 border border-white/[0.06] group-hover:border-white/[0.15] rounded-2xl transition-colors duration-500" />

                            {/* Floating Icon Badge */}
                            <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/60 group-hover:scale-110">
                                <useCase.icon className="w-4 h-4 text-white/90" />
                            </div>

                            {/* Content - Bottom Left */}
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <h3 className="text-xl font-bold text-white mb-1.5 flex items-center gap-2">
                                    {useCase.title}
                                    <ArrowRight className="w-4 h-4 text-white/60 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </h3>
                                <p className="text-white/70 text-sm mb-3 leading-relaxed">
                                    {useCase.description}
                                </p>

                                {/* Component Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {useCase.components.map((comp) => (
                                        <span
                                            key={comp}
                                            className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-white/[0.1] backdrop-blur-sm text-white/90 border border-white/[0.08] group-hover:bg-white/[0.15] group-hover:border-white/[0.15] transition-all duration-300"
                                        >
                                            {comp}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center mt-8"
                >
                    <Link
                        href="/components"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-white/20"
                    >
                        Explore All Components
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export const UseCases = memo(UseCasesComponent);
