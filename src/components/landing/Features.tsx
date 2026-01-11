"use client";

import { memo } from "react";
import { Zap, Code, Accessibility, Rocket } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Copy. Paste. Ship.",
        description: "No setup, no config. Just copy the code and start building.",
    },
    {
        icon: Code,
        title: "TypeScript Native",
        description: "Full type safety and autocomplete out of the box.",
    },
    {
        icon: Accessibility,
        title: "Accessible",
        description: "WCAG AA compliant, screen reader ready by default.",
    },
    {
        icon: Rocket,
        title: "Performant",
        description: "Optimized for speed with zero dependencies.",
    },
];

function FeaturesComponent() {
    return (
        <section className="py-24 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Built for developers
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                        Everything you need to ship beautiful React interfaces faster.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group p-8 rounded-xl bg-surface-default border border-border hover:border-accent-border transition-all duration-200"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-accent-subtle border border-accent-border">
                                    <feature.icon className="w-6 h-6 text-accent" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-foreground-muted leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const Features = memo(FeaturesComponent);
