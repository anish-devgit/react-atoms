"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CodeSnippet } from "@/components/ui/CodeSnippet";
import { MillionDollarVisual } from "@/components/ui/MillionDollarVisual";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { MagneticButton } from "@/components/ui/MagneticButton";

function HeroComponent() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Headline */}
                    <div>
                        <motion.h1
                            className="text-[64px] sm:text-[80px] lg:text-[92px] font-bold text-white mb-6 leading-[1.05] tracking-[-0.02em]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AnimatedText text="The next generation" delay={0.1} />
                            <br />
                            <AnimatedText text="of React components" delay={0.3} />
                        </motion.h1>

                        <motion.p
                            className="text-[18px] sm:text-[20px] text-gray-400 mb-10 leading-relaxed max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            A collection of high-quality, copy-paste components for building beautiful interfaces using React and TypeScript.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <MagneticButton>
                                <Link
                                    href="/components"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors will-change-transform"
                                >
                                    Explore components
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </MagneticButton>
                            <CodeSnippet>npm install @reactatoms/components</CodeSnippet>
                        </motion.div>
                    </div>

                    {/* Right: Million Dollar Visual */}
                    <motion.div
                        className="hidden lg:block"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <MillionDollarVisual />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export const Hero = memo(HeroComponent);
