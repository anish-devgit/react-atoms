"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function FinalCTAComponent() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section ref={ref} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-accent-secondary/10" />
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-secondary/15 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-4xl mx-auto text-center">
                {/* Heading */}
                <motion.h2
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="text-4xl sm:text-5xl font-bold text-foreground mb-6"
                >
                    Ready to ship?
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xl text-foreground-muted max-w-lg mx-auto mb-10"
                >
                    Browse components. Copy code. Ship your product.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Link
                        href="/components"
                        className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-white font-medium text-lg transition-transform duration-200 hover:scale-[1.02] shadow-lg shadow-accent/20"
                    >
                        Get Started
                        <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                {/* Trust */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="flex justify-center gap-6 mt-12 text-sm text-foreground-muted"
                >
                    <span>Open Source</span>
                    <span>•</span>
                    <span>MIT Licensed</span>
                    <span>•</span>
                    <span>No signup</span>
                </motion.div>
            </div>
        </section>
    );
}

export const FinalCTA = memo(FinalCTAComponent);
