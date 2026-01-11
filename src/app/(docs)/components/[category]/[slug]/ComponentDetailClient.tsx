"use client";

import { memo, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Sun, Moon, Copy, Check } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import clsx from "clsx";
import type { ComponentItem } from "@/data/components";

interface Props {
    component: ComponentItem;
    code: string;
    usage: string;
}

function ComponentDetailClientComponent({ component, code, usage }: Props) {
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Tabs.Root defaultValue="preview" className="w-full">
            {/* Tab Header */}
            <div className="flex items-center justify-between mb-4">
                <Tabs.List className="flex gap-1 p-1 rounded-lg bg-white/5 border border-border">
                    <Tabs.Trigger
                        value="preview"
                        className="px-4 py-2 text-sm rounded-md transition-colors data-[state=active]:bg-accent data-[state=active]:text-white text-foreground-muted hover:text-foreground"
                    >
                        Preview
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="code"
                        className="px-4 py-2 text-sm rounded-md transition-colors data-[state=active]:bg-accent data-[state=active]:text-white text-foreground-muted hover:text-foreground"
                    >
                        Code
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="usage"
                        className="px-4 py-2 text-sm rounded-md transition-colors data-[state=active]:bg-accent data-[state=active]:text-white text-foreground-muted hover:text-foreground"
                    >
                        Usage
                    </Tabs.Trigger>
                </Tabs.List>

                <div className="flex items-center gap-2">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-lg border border-border hover:bg-white/5 transition-colors"
                        aria-label="Toggle preview theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="w-4 h-4 text-foreground-muted" />
                        ) : (
                            <Moon className="w-4 h-4 text-foreground-muted" />
                        )}
                    </button>

                    {/* Copy Button */}
                    <button
                        onClick={copyCode}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-white/5 transition-colors text-sm"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 text-green-500" />
                                <span className="text-green-500">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 text-foreground-muted" />
                                <span className="text-foreground-muted">Copy</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Preview Tab */}
            <Tabs.Content value="preview" className="outline-none">
                <div
                    className={clsx(
                        "min-h-[300px] rounded-xl border border-border",
                        theme === "dark"
                            ? "bg-background-secondary"
                            : "bg-white"
                    )}
                >
                    <ComponentPreview slug={component.slug} theme={theme} />
                </div>
            </Tabs.Content>

            {/* Code Tab */}
            <Tabs.Content value="code" className="outline-none">
                <CodeBlock code={code} language="tsx" />
            </Tabs.Content>

            {/* Usage Tab */}
            <Tabs.Content value="usage" className="outline-none">
                <CodeBlock code={usage} language="tsx" />
            </Tabs.Content>
        </Tabs.Root>
    );
}

export const ComponentDetailClient = memo(ComponentDetailClientComponent);
