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
