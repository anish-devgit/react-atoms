import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Book, Code, Zap, Package } from "lucide-react";

export const metadata: Metadata = {
    title: "Documentation - ReactAtoms",
    description: "Learn how to use ReactAtoms components in your projects",
};

const sections = [
    {
        icon: Zap,
        title: "Quick Start",
        description: "Get up and running in under 2 minutes",
        href: "/components",
    },
    {
        icon: Package,
        title: "Installation",
        description: "Copy components directly - no npm install required",
        href: "/components",
    },
    {
        icon: Code,
        title: "Usage",
        description: "Browse components and copy the code you need",
        href: "/components",
    },
    {
        icon: Book,
        title: "Components",
        description: "Explore all 25+ production-ready components",
        href: "/components",
    },
];

export default function DocsPage() {
    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Documentation</h1>
                    <p className="text-lg text-foreground-muted">
                        ReactAtoms is a collection of copy-paste ready React components.
                        No installation needed - just browse, copy, and use.
                    </p>
                </div>

                {/* Quick Start */}
                <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-accent/10 to-accent-secondary/10 border border-accent/20">
                    <h2 className="text-xl font-semibold text-foreground mb-4">How It Works</h2>
                    <ol className="space-y-3 text-foreground-muted">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-sm flex items-center justify-center">1</span>
                            <span>Browse the component library</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-sm flex items-center justify-center">2</span>
                            <span>Click on a component to see the live preview</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-sm flex items-center justify-center">3</span>
                            <span>Copy the code from the "Code" tab</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-sm flex items-center justify-center">4</span>
                            <span>Paste into your project and customize</span>
                        </li>
                    </ol>
                </div>

                {/* Sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {sections.map((section) => (
                        <Link
                            key={section.title}
                            href={section.href}
                            className="group p-5 rounded-xl bg-white/[0.02] border border-border hover:border-accent/30 transition-colors"
                        >
                            <section.icon className="w-8 h-8 text-accent mb-3" />
                            <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                                {section.title}
                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </h3>
                            <p className="text-sm text-foreground-muted">{section.description}</p>
                        </Link>
                    ))}
                </div>

                {/* Requirements */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Requirements</h2>
                    <ul className="space-y-2 text-foreground-muted">
                        <li>• React 18+</li>
                        <li>• Tailwind CSS 3+</li>
                        <li>• Framer Motion (for animated components)</li>
                    </ul>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href="/components"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-white font-medium transition-transform hover:scale-[1.02]"
                    >
                        Browse Components
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
