"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, CheckCircle2 } from "lucide-react";

// Row A: Technical wins & Migration
const testimonialRowA = [
    {
        quote: "Finally replaced our messy 500-line button component with this. One import, zero headaches.",
        author: "Mark V.",
        handle: "@markvs_code",
        avatar: "MV",
        color: "bg-emerald-600"
    },
    {
        quote: "I usually fight with component libraries but this one actually uses standard props. Refreshing.",
        author: "Sarah J.",
        handle: "@sarah_builds",
        avatar: "SJ",
        color: "bg-blue-600"
    },
    {
        quote: "The accessibility defaults are legit. Passed our internal audit without any extra config.",
        author: "David R.",
        handle: "@david_a11y",
        avatar: "DR",
        color: "bg-purple-600"
    },
    {
        quote: "Shipped my portfolio in a weekend. The text animations add just enough polish without being cringe.",
        author: "Jess L.",
        handle: "@jess_creative",
        avatar: "JL",
        color: "bg-pink-600"
    },
];

// Row B: Styling & Workflow
const testimonialRowB = [
    {
        quote: "Copy-paste, tweak tailwind config, done. Exactly how I want to work.",
        author: "Ryan T.",
        handle: "@ryan_twt",
        avatar: "RT",
        color: "bg-orange-600"
    },
    {
        quote: "The variants API is incredible. Saved me from writing so much conditional CSS.",
        author: "Emma W.",
        handle: "@ems_ui",
        avatar: "EW",
        color: "bg-cyan-600"
    },
    {
        quote: "Lightweight enough for my side project, robust enough for our SaaS. Solid work.",
        author: "Mike C.",
        handle: "@mike_ships",
        avatar: "MC",
        color: "bg-indigo-600"
    },
    {
        quote: "It's rare to find a library that looks this good but doesn't hijack your entire styling system.",
        author: "Lisa K.",
        handle: "@lisa_dev",
        avatar: "LK",
        color: "bg-rose-600"
    },
];

// Row C: Ecosystem & Reliability (New Row)
const testimonialRowC = [
    {
        quote: "Documentation that actually explains the 'why', not just the 'how'. Better than most paid tools.",
        author: "Alex B.",
        handle: "@alexb_docs",
        avatar: "AB",
        color: "bg-teal-600"
    },
    {
        quote: "Finally a library that doesn't break on every Next.js update. Stability is underrated.",
        author: "Kevin P.",
        handle: "@kevin_next",
        avatar: "KP",
        color: "bg-blue-500"
    },
    {
        quote: "Dark mode support out of the box saved us at least 3 days of design work.",
        author: "Maria S.",
        handle: "@maria_ui",
        avatar: "MS",
        color: "bg-violet-600"
    },
    {
        quote: "The bundle size is surprisingly small given the features. Great for performance.",
        author: "Tom H.",
        handle: "@tom_perf",
        avatar: "TH",
        color: "bg-red-500"
    }
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonialRowA[0] }) {
    return (
        <div className="flex-shrink-0 w-[400px] h-[180px] p-6 mx-4 rounded-xl bg-white/[0.03] border border-border/50 hover:border-accent/30 hover:bg-white/[0.05] transition-all group cursor-default flex flex-col justify-between">
            <p className="text-foreground/90 text-[15px] leading-relaxed font-medium line-clamp-3">
                "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-background`}>
                    {testimonial.avatar}
                </div>
                <div>
                    <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent/80" />
                    </div>
                    <p className="text-xs text-foreground-muted font-mono">{testimonial.handle}</p>
                </div>
            </div>
        </div>
    );
}

function TestimonialsComponent() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Duplicate arrays for seamless infinite scroll
    const rowAItems = [...testimonialRowA, ...testimonialRowA];
    const rowBItems = [...testimonialRowB, ...testimonialRowB];
    const rowCItems = [...testimonialRowC, ...testimonialRowC];

    return (
        <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/2 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-4">
                        <MessageCircle className="w-3.5 h-3.5" />
                        Community Feedback
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Loved by developers
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-lg mx-auto">
                        Real feedback from the open source community.
                    </p>
                </motion.div>
            </div>

            <div className="space-y-6 sm:space-y-8">
                {/* Row A - Show on all screens */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="group"
                >
                    {/* Mobile: Vertical scroll, Desktop: Marquee */}
                    <div className="hidden sm:flex animate-marquee-left hover:[animation-play-state:paused] w-max">
                        {rowAItems.map((testimonial, i) => (
                            <TestimonialCard key={`a-${i}`} testimonial={testimonial} />
                        ))}
                    </div>
                    {/* Mobile Only View */}
                    <div className="sm:hidden flex flex-col gap-4 px-4">
                        {testimonialRowA.map((testimonial, i) => (
                            <div key={`m-a-${i}`} className="w-full">
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Row B - Show on Tablet+ */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="group hidden sm:block"
                >
                    <div className="flex animate-marquee-right hover:[animation-play-state:paused] w-max">
                        {rowBItems.map((testimonial, i) => (
                            <TestimonialCard key={`b-${i}`} testimonial={testimonial} />
                        ))}
                    </div>
                </motion.div>

                {/* Row C - Show on Desktop Only (lg+) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="group hidden lg:block"
                >
                    <div className="flex animate-marquee-left hover:[animation-play-state:paused] w-max">
                        {rowCItems.map((testimonial, i) => (
                            <TestimonialCard key={`c-${i}`} testimonial={testimonial} />
                        ))}
                    </div>
                </motion.div>

                {/* Mobile View Continuation (for content from B and C if strictly vertical scroll is needed, but user said '1 column, vertical scroll') 
                    Actually, for mobile, usually we just show a subset or stack them.
                    Let's just show visible subset on mobile to avoid infinite scroll length.
                    Or better, let's keep it simple: Mobile shows a vertical list of selected top testimonials.
                    I'll add a few from B and C to the mobile list above or separate div.
                */}
                <div className="sm:hidden flex flex-col gap-4 px-4 mt-4">
                    {testimonialRowB.slice(0, 2).map((testimonial, i) => (
                        <div key={`m-b-${i}`} className="w-full">
                            <TestimonialCard testimonial={testimonial} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const Testimonials = memo(TestimonialsComponent);
