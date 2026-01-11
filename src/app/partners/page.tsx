import { Metadata } from "next";
import Link from "next/link";
import {
    Heart,
    Shield,
    Users,
    Sparkles,
    CheckCircle,
    ArrowRight,
    ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Partners - ReactAtoms",
    description:
        "Partner with ReactAtoms. Support open source and reach developers building modern products.",
};

const sponsorBenefits = [
    "Logo placement on homepage",
    "Featured in sponsor section",
    "Direct link to your product",
    "Priority support for feature requests",
    "Early access to new tools",
];

const partnerBenefits = [
    "Listed in community partners section",
    "Mentioned in relevant component pages",
    "Included in monthly newsletter",
    "Backlink to your product",
];

const principles = [
    {
        icon: Shield,
        title: "No intrusive elements",
        description: "No popups, banners, or anything that disrupts the developer experience.",
    },
    {
        icon: Users,
        title: "Relevant only",
        description: "We only feature tools and products that genuinely help developers.",
    },
    {
        icon: Heart,
        title: "Transparent",
        description: "Sponsored content is always clearly labeled. No hidden promotions.",
    },
];

export default function PartnersPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />

                <div className="relative max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
                        Partner with ReactAtoms
                    </h1>
                    <p className="text-lg text-foreground-muted max-w-lg mx-auto leading-relaxed">
                        Support open source development and reach thousands of developers
                        building modern products.
                    </p>
                </div>
            </section>

            {/* Principles */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-sm font-medium text-foreground-muted text-center mb-8">
                        Our approach to partnerships
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {principles.map((principle) => (
                            <div
                                key={principle.title}
                                className="text-center p-5 rounded-xl bg-white/[0.02] border border-border"
                            >
                                <principle.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                                <h3 className="font-medium text-foreground mb-2">
                                    {principle.title}
                                </h3>
                                <p className="text-sm text-foreground-muted">
                                    {principle.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Two-Column Layout */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Paid Sponsorship */}
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-accent-secondary/10 border border-accent/20">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-accent" />
                            </div>
                            <h2 className="text-xl font-semibold text-foreground">
                                Paid Sponsorship
                            </h2>
                        </div>

                        <p className="text-foreground-muted mb-6 leading-relaxed">
                            Support ReactAtoms directly and get guaranteed visibility
                            across the platform. Perfect for developer tools, SaaS products,
                            and companies hiring developers.
                        </p>

                        <ul className="space-y-3 mb-8">
                            {sponsorBenefits.map((benefit) => (
                                <li
                                    key={benefit}
                                    className="flex items-start gap-2 text-sm text-foreground"
                                >
                                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>

                        <a
                            href="https://github.com/sponsors/anish-devgit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-white font-medium transition-transform hover:scale-[1.02]"
                        >
                            Become a Sponsor
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Partner Program */}
                    <div className="p-8 rounded-2xl bg-white/[0.02] border border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-foreground-muted/20 flex items-center justify-center">
                                <Users className="w-5 h-5 text-foreground-muted" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-foreground">
                                    Partner Program
                                </h2>
                                <span className="text-xs text-accent">Free</span>
                            </div>
                        </div>

                        <p className="text-foreground-muted mb-6 leading-relaxed">
                            Building something useful for developers? Apply to join our
                            partner program and get free promotion after manual review.
                            We prioritize indie makers and open source projects.
                        </p>

                        <ul className="space-y-3 mb-8">
                            {partnerBenefits.map((benefit) => (
                                <li
                                    key={benefit}
                                    className="flex items-start gap-2 text-sm text-foreground"
                                >
                                    <CheckCircle className="w-4 h-4 text-foreground-muted mt-0.5 flex-shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>

                        <a
                            href="https://github.com/reactatoms/reactatoms/discussions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-medium transition-colors hover:bg-white/5"
                        >
                            Apply to Partner Program
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ / Transparency */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl font-semibold text-foreground text-center mb-8">
                        Frequently asked questions
                    </h2>

                    <div className="space-y-6">
                        <div className="p-5 rounded-xl bg-white/[0.02] border border-border">
                            <h3 className="font-medium text-foreground mb-2">
                                Do you track users or sell data?
                            </h3>
                            <p className="text-sm text-foreground-muted">
                                No. ReactAtoms has no tracking scripts, no analytics cookies,
                                and we never sell user data. Partner visibility is based on
                                static placements, not behavioral targeting.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-white/[0.02] border border-border">
                            <h3 className="font-medium text-foreground mb-2">
                                What kind of products do you feature?
                            </h3>
                            <p className="text-sm text-foreground-muted">
                                Developer tools, SaaS products, open source projects, and
                                companies hiring developers. We manually review all partners
                                to ensure quality and relevance.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-white/[0.02] border border-border">
                            <h3 className="font-medium text-foreground mb-2">
                                How is sponsored content labeled?
                            </h3>
                            <p className="text-sm text-foreground-muted">
                                All paid sponsors are clearly marked in a dedicated "Sponsors"
                                section. We never hide promotional content within editorial
                                content.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
