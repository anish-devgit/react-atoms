import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Changelog - ReactAtoms",
    description: "See what's new in ReactAtoms",
};

const changelog = [
    {
        version: "1.0.0",
        date: "January 2026",
        title: "Initial Release",
        changes: [
            "25+ production-ready components",
            "Text Animations: Gradient Text, Glitch Text, Typewriter, Wave Text, Fade Up Text, Blur Reveal",
            "Animations: Fade In, Slide Up, Scale In, Stagger List, Bounce In",
            "Effects: Glow Button, Ripple Button, Shimmer Effect, Hover Lift, Gradient Border",
            "UI Components: Glass Card, Animated Counter, Toggle Switch, Progress Bar, Notification Badge",
            "Backgrounds: Gradient Mesh, Dot Grid, Aurora, Noise Texture",
            "Full TypeScript support",
            "Copy-paste ready code",
            "Live previews for all components",
        ],
    },
];

export default function ChangelogPage() {
    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Changelog</h1>
                    <p className="text-lg text-foreground-muted">
                        Track updates, new components, and improvements to ReactAtoms.
                    </p>
                </div>

                {/* Changelog Entries */}
                <div className="space-y-12">
                    {changelog.map((entry) => (
                        <div key={entry.version} className="relative pl-6 border-l-2 border-accent/30">
                            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-accent" />

                            <div className="mb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2 py-1 text-sm font-mono rounded bg-accent/20 text-accent">
                                        v{entry.version}
                                    </span>
                                    <span className="text-sm text-foreground-muted">{entry.date}</span>
                                </div>
                                <h2 className="text-xl font-semibold text-foreground">{entry.title}</h2>
                            </div>

                            <ul className="space-y-2">
                                {entry.changes.map((change, i) => (
                                    <li key={i} className="text-foreground-muted text-sm flex gap-2">
                                        <span className="text-accent">•</span>
                                        {change}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href="/components"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-white font-medium transition-transform hover:scale-[1.02]"
                    >
                        Explore Components
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
