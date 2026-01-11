import { Metadata } from "next";
import Link from "next/link";
import {
    Paintbrush,
    Shapes,
    Layers,
    Palette,
    Wand2,
    Sparkles,
    ArrowRight,
    ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Tools - ReactAtoms",
    description:
        "Small but powerful developer utilities to speed up your frontend workflow. Background generators, shape builders, and more.",
};

const tools = [
    {
        icon: Paintbrush,
        title: "Background Studio",
        description: "Generate animated or static backgrounds for modern UIs.",
        color: "from-purple-500 to-pink-500",
        status: "coming-soon",
        href: "#",
    },
    {
        icon: Shapes,
        title: "Shape Magic",
        description: "Create smooth shapes, blobs, and SVG paths.",
        color: "from-blue-500 to-cyan-500",
        status: "coming-soon",
        href: "#",
    },
    {
        icon: Layers,
        title: "Texture Lab",
        description: "Add grain, noise, and subtle texture overlays.",
        color: "from-orange-500 to-red-500",
        status: "coming-soon",
        href: "#",
    },
    {
        icon: Palette,
        title: "Gradient Builder",
        description: "Design and export modern gradients.",
        color: "from-green-500 to-emerald-500",
        status: "coming-soon",
        href: "#",
    },
    {
        icon: Wand2,
        title: "Motion Presets",
        description: "Copy-paste animation presets for UI.",
        color: "from-violet-500 to-purple-500",
        status: "coming-soon",
        href: "#",
    },
    {
        icon: Sparkles,
        title: "Theme Tokens",
        description: "Generate color, spacing, and radius tokens.",
        color: "from-pink-500 to-rose-500",
        status: "coming-soon",
        href: "#",
    },
];

export default function ToolsPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
                        Tools that speed up your workflow.
                    </h1>
                    <p className="text-lg text-foreground-muted max-w-lg mx-auto leading-relaxed">
                        Small utilities built to solve real frontend problems.
                        <br className="hidden sm:block" />
                        No bloat. Just useful tools.
                    </p>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {tools.map((tool) => {
                            const isComingSoon = tool.status === "coming-soon";

                            return (
                                <div
                                    key={tool.title}
                                    className={`group relative p-6 rounded-2xl bg-white/[0.02] border border-border transition-all duration-300 ${isComingSoon
                                            ? "opacity-80"
                                            : "hover:border-accent/30 hover:bg-white/[0.04] hover:scale-[1.02]"
                                        }`}
                                >
                                    {/* Status Badge */}
                                    {isComingSoon && (
                                        <span className="absolute top-4 right-4 px-2 py-1 text-[10px] font-medium rounded-full bg-foreground-muted/20 text-foreground-muted">
                                            Coming soon
                                        </span>
                                    )}

                                    {/* Icon */}
                                    <div
                                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-5`}
                                    >
                                        <tool.icon className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        {tool.title}
                                    </h3>
                                    <p className="text-sm text-foreground-muted mb-5 leading-relaxed">
                                        {tool.description}
                                    </p>

                                    {/* CTA */}
                                    {isComingSoon ? (
                                        <span className="inline-flex items-center gap-1.5 text-sm text-foreground-muted/60 cursor-not-allowed">
                                            Open tool
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    ) : (
                                        <Link
                                            href={tool.href}
                                            className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors"
                                        >
                                            Open tool
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="p-8 rounded-2xl bg-gradient-to-r from-accent/10 to-accent-secondary/10 border border-accent/20">
                        <h2 className="text-xl font-semibold text-foreground mb-3">
                            Want to suggest a tool?
                        </h2>
                        <p className="text-foreground-muted mb-6">
                            We're building tools based on community feedback. Share your ideas.
                        </p>
                        <a
                            href="https://github.com/reactatoms/reactatoms/discussions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-white font-medium transition-transform hover:scale-[1.02]"
                        >
                            Share Feedback
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
