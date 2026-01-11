import { Metadata } from "next";
import { ArrowRight, CheckCircle, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Roadmap - ReactAtoms",
    description: "See what's coming next for ReactAtoms",
};

const roadmap = [
    {
        status: "done",
        title: "v1.0 - Foundation",
        items: [
            "25+ core components",
            "Live preview system",
            "Copy-paste code workflow",
            "TypeScript support",
        ],
    },
    {
        status: "current",
        title: "v1.1 - Smart Variants",
        items: [
            "Size variants (sm/md/lg)",
            "Motion intensity controls",
            "Theme customization",
            "Accessibility mode",
        ],
    },
    {
        status: "planned",
        title: "v1.2 - Developer Experience",
        items: [
            "CLI tool for scaffolding",
            "VS Code extension",
            "Component playground",
            "AI-powered customization",
        ],
    },
    {
        status: "planned",
        title: "v2.0 - Ecosystem",
        items: [
            "Component marketplace",
            "Team collaboration",
            "Design tokens integration",
            "Figma plugin",
        ],
    },
];

const statusConfig = {
    done: { icon: CheckCircle, label: "Completed", color: "text-green-500" },
    current: { icon: Clock, label: "In Progress", color: "text-accent" },
    planned: { icon: Sparkles, label: "Planned", color: "text-foreground-muted" },
};

export default function RoadmapPage() {
    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Roadmap</h1>
                    <p className="text-lg text-foreground-muted">
                        Our vision for ReactAtoms. See what's done, what's in progress, and what's coming.
                    </p>
                </div>

                {/* Roadmap Items */}
                <div className="space-y-8">
                    {roadmap.map((phase) => {
                        const StatusIcon = statusConfig[phase.status as keyof typeof statusConfig].icon;
                        const statusLabel = statusConfig[phase.status as keyof typeof statusConfig].label;
                        const statusColor = statusConfig[phase.status as keyof typeof statusConfig].color;

                        return (
                            <div
                                key={phase.title}
                                className={`p-6 rounded-2xl border ${phase.status === "current"
                                        ? "bg-accent/5 border-accent/30"
                                        : "bg-white/[0.02] border-border"
                                    }`}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <StatusIcon className={`w-5 h-5 ${statusColor}`} />
                                    <span className={`text-sm font-medium ${statusColor}`}>{statusLabel}</span>
                                </div>
                                <h2 className="text-xl font-semibold text-foreground mb-4">{phase.title}</h2>
                                <ul className="space-y-2">
                                    {phase.items.map((item, i) => (
                                        <li key={i} className="text-foreground-muted text-sm flex gap-2">
                                            <span className="text-accent">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* Feedback CTA */}
                <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-accent/10 to-accent-secondary/10 border border-accent/20 text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Have a feature request?</h3>
                    <p className="text-foreground-muted mb-4">
                        We'd love to hear your ideas. Open a discussion on GitHub.
                    </p>
                    <a
                        href="https://github.com/reactatoms/reactatoms/discussions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-white font-medium transition-transform hover:scale-[1.02]"
                    >
                        Share Your Ideas
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}
