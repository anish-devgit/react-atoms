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
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left: Headline */}
                    <div className="relative z-20">
                        <motion.h1
                            className="text-[48px] sm:text-[60px] lg:text-[72px] font-bold text-white mb-6 leading-[1.1] tracking-[-0.02em]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AnimatedText text="The next generation" delay={0.1} />
                            <br />
                            <AnimatedText text="of React components" delay={0.3} />
                        </motion.h1>

                        <motion.p
                            className="text-[16px] sm:text-[18px] text-gray-400 mb-8 leading-relaxed max-w-lg"
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
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors will-change-transform"
                                >
                                    Explore components
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </MagneticButton>
                            <CodeSnippet>npm install @reactatoms/components</CodeSnippet>
                        </motion.div>
                    </div>

                    {/* Right: Visual */}
                    <motion.div
                        className="hidden lg:flex justify-center items-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                    >
                        <MillionDollarVisual />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export const Hero = memo(HeroComponent);
