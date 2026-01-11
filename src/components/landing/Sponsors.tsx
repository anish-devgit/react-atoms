"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";

// Core sponsors - large cards with real logos
const coreSponsors = [
    {
        name: "Vercel",
        logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png",
        tagline: "Frontend Cloud",
    },
    {
        name: "Supabase",
        logo: "https://avatars.githubusercontent.com/u/54469796?s=200", // Fallback to GitHub avatar for reliability
        tagline: "Open Source Backend",
    },
];

// Supporting sponsors - medium cards
const supportingSponsors = [
    { name: "Railway", logo: "https://railway.app/brand/logo-light.svg" },
    { name: "Upstash", logo: "https://avatars.githubusercontent.com/u/70086830?s=200" },
    { name: "Resend", logo: "https://avatars.githubusercontent.com/u/114091990?s=200" },
    { name: "Neon", logo: "https://neon.tech/brand/neon-logo-dark-color.svg" },
    { name: "Trigger.dev", logo: "https://avatars.githubusercontent.com/u/95257339?s=200" },
    { name: "Inngest", logo: "https://avatars.githubusercontent.com/u/74624898?s=200" },
];

// Community backers - logo grid (GitHub avatars as reliable source)
const communityBackers = [
    { name: "Cal.com", logo: "https://avatars.githubusercontent.com/u/79145102?s=200" },
    { name: "Unkey", logo: "https://avatars.githubusercontent.com/u/118439366?s=200" },
    { name: "Dub", logo: "https://avatars.githubusercontent.com/u/106369799?s=200" },
    { name: "Documenso", logo: "https://avatars.githubusercontent.com/u/104351833?s=200" },
    { name: "Clerk", logo: "https://avatars.githubusercontent.com/u/49538330?s=200" },
    { name: "PlanetScale", logo: "https://avatars.githubusercontent.com/u/53900019?s=200" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function SponsorsComponent() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent" />

            <div className="relative max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Supported by the community
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-lg mx-auto">
                        Backed by indie makers, startups, and companies building for developers.
                    </p>
                </motion.div>

                {/* Core Sponsors */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-12"
                >
                    <p className="text-xs uppercase tracking-wider text-accent font-medium mb-6 text-center">
                        Core Sponsors
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {coreSponsors.map((sponsor) => (
                            <div
                                key={sponsor.name}
                                className="group p-6 rounded-2xl bg-white/[0.03] border border-border hover:border-accent/30 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center p-3 overflow-hidden">
                                        <img
                                            src={sponsor.logo}
                                            alt={sponsor.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground text-lg">{sponsor.name}</h3>
                                        <p className="text-sm text-foreground-muted">{sponsor.tagline}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Supporting Sponsors */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mb-12"
                >
                    <p className="text-xs uppercase tracking-wider text-foreground-muted font-medium mb-6 text-center">
                        Supporting Sponsors
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {supportingSponsors.map((sponsor) => (
                            <div
                                key={sponsor.name}
                                className="flex items-center justify-center p-6 rounded-xl bg-white/[0.02] border border-border/50 hover:border-accent/20 transition-colors h-24"
                            >
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="max-h-8 max-w-[100px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                                    onError={(e) => {
                                        // If image fails, hide it and show text
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.nextElementSibling!.classList.remove('hidden');
                                    }}
                                />
                                <span className="hidden font-semibold text-foreground text-sm">
                                    {sponsor.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Community Backers */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-16"
                >
                    <p className="text-xs uppercase tracking-wider text-foreground-muted/70 font-medium mb-6 text-center">
                        Community Backers
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        {communityBackers.map((backer) => (
                            <div
                                key={backer.name}
                                className="group flex items-center gap-3 px-4 py-2 rounded-lg bg-white/[0.015] border border-border/30 hover:border-border/50 hover:bg-white/[0.03] transition-all"
                            >
                                <img
                                    src={backer.logo}
                                    alt={backer.name}
                                    className="w-5 h-5 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100"
                                />
                                <span className="text-xs font-medium text-foreground-muted group-hover:text-foreground transition-colors">
                                    {backer.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-center"
                >
                    <div className="inline-flex flex-col items-center p-8 rounded-2xl border border-accent/20 bg-accent/5 backdrop-blur-sm">
                        <Heart className="w-8 h-8 text-accent mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            Become a community sponsor
                        </h3>
                        <p className="text-sm text-foreground-muted mb-6">
                            Help keep ReactAtoms free and evolving.
                        </p>
                        <a
                            href="https://github.com/sponsors/anish-devgit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-white font-medium transition-transform duration-200 hover:scale-[1.02] shadow-lg shadow-accent/20"
                        >
                            Become a sponsor
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export const Sponsors = memo(SponsorsComponent);
