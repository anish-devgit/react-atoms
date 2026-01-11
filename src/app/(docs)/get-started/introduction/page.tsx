import Link from "next/link";
import { ArrowRight, Check, Copy } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function IntroductionPage() {
    return (
        <main className="max-w-3xl">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-foreground mb-4">Introduction</h1>
                <p className="text-lg text-foreground-muted leading-relaxed">
                    ReactAtoms is a collection of production-ready React components, animations, and effects.
                    Copy and paste them into your project to build stunning, interactive UIs in minutes.
                </p>
            </div>

            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4 scroll-mt-24" id="philosophy">
                        Philosophy
                    </h2>
                    <p className="text-foreground-muted mb-4 leading-7">
                        ReactAtoms follows a simple philosophy: <strong>Code you own</strong>.
                    </p>
                    <p className="text-foreground-muted mb-4 leading-7">
                        Instead of installing a heavy dependency like `@react-atoms/core`, we provide the raw source code.
                        You copy the components into your project and customize them to fit your needs.
                        This gives you complete control over the styling, behavior, and bundle size.
                    </p>
                    <ul className="space-y-2 text-foreground-muted mt-6">
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>No massive NPM dependencies</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>Fully customizable source code</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>Build on top of Tailwind CSS & Framer Motion</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span>Modern, accessible, and performant</span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4 scroll-mt-24" id="faq">
                        FAQ
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-foreground mb-2">
                                Is this a component library?
                            </h3>
                            <p className="text-foreground-muted leading-7">
                                Not in the traditional sense. It's a collection of copy-paste components.
                                Think of it visually like a UI kit, but effectively like a snippet library.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-foreground mb-2">
                                Can I use this in my commercial projects?
                            </h3>
                            <p className="text-foreground-muted leading-7">
                                Yes. The code is open source (MIT). You can use it for personal and commercial projects.
                                You don't need to attribute us, but it's appreciated!
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-foreground mb-2">
                                Which frameworks are supported?
                            </h3>
                            <p className="text-foreground-muted leading-7">
                                We focus on **React**. Most components use **Tailwind CSS** for styling and **Framer Motion** for animations.
                                They work great with Next.js, Vite, Remix, or any React framework.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="flex items-center gap-4 mt-12 pt-8 border-t border-border">
                    <Link
                        href="/get-started/installation"
                        className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
                    >
                        <span>Start Installation</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link
                        href="/components"
                        className="px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-white/5 transition-colors"
                    >
                        Browse Components
                    </Link>
                </div>
            </div>
        </main>
    );
}
