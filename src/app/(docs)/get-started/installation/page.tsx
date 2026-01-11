import Link from "next/link";
import { Check, Terminal, FileCode } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function InstallationPage() {
    return (
        <main className="max-w-3xl">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-foreground mb-4">Installation</h1>
                <p className="text-lg text-foreground-muted leading-relaxed">
                    Setting up ReactAtoms is easy. Since we aren't a traditional library, you just need
                    a Next.js project with Tailwind CSS and Framer Motion specific utilities.
                </p>
            </div>

            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4 scroll-mt-24" id="dependencies">
                        1. Install Dependencies
                    </h2>
                    <p className="text-foreground-muted mb-4">
                        We rely on `framer-motion` for animations and `clsx` + `tailwind-merge` for class management.
                    </p>
                    <div className="rounded-lg overflow-hidden border border-border">
                        <CodeBlock
                            code="npm install framer-motion clsx tailwind-merge lucide-react"
                            language="bash"
                        />
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4 scroll-mt-24" id="utilities">
                        2. Add Utility Helper
                    </h2>
                    <p className="text-foreground-muted mb-4">
                        Create a `cn` utility to handle Tailwind class merging. This is standard in most modern React projects (like shadcn/ui).
                    </p>
                    <div className="flex items-center gap-2 text-sm text-foreground-muted mb-3 font-mono bg-white/5 w-fit px-3 py-1 rounded-md border border-border">
                        <FileCode className="w-4 h-4" />
                        <span>src/lib/utils.ts</span>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-border">
                        <CodeBlock
                            code={`import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
                            language="typescript"
                        />
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4 scroll-mt-24" id="ready">
                        3. You're Ready
                    </h2>
                    <p className="text-foreground-muted mb-6">
                        That's it! You can now browse the components and copy the code directly into your project.
                    </p>

                    <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-accent mb-2 flex items-center gap-2">
                            <Check className="w-5 h-5" />
                            Wait, that's it?
                        </h3>
                        <p className="text-foreground-muted text-sm leading-6">
                            Yes. ReactAtoms is designed to be **copy-paste**.
                            We don't want you to fight with a complex build system or huge dependency tree.
                            Just copy the file, and you own the code.
                        </p>
                    </div>
                </section>

                <div className="flex items-center gap-4 mt-12 pt-8 border-t border-border">
                    <Link
                        href="/components"
                        className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
                    >
                        <span>Start Browsing</span>
                        <Terminal className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
