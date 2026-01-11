"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import { ComponentItem } from "@/data/components";
import { getComponentCode, getComponentUsage } from "@/data/componentCodes";

interface ComponentDetailContentProps {
    component: ComponentItem;
}

export function ComponentDetailContent({
    component,
}: ComponentDetailContentProps) {
    const [previewTheme, setPreviewTheme] = useState<"dark" | "light">("dark");
    const code = getComponentCode(component.slug);
    const usage = getComponentUsage(component.slug);

    return (
        <div className="rounded-2xl border border-border overflow-hidden bg-card-bg">
            {/* Tabs */}
            <Tabs.Root defaultValue="preview" className="w-full">
                <Tabs.List className="flex border-b border-border">
                    <Tabs.Trigger
                        value="preview"
                        className="px-4 py-3 text-sm text-foreground-muted hover:text-foreground data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent transition-colors -mb-px"
                    >
                        Preview
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="code"
                        className="px-4 py-3 text-sm text-foreground-muted hover:text-foreground data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent transition-colors -mb-px"
                    >
                        Code
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="usage"
                        className="px-4 py-3 text-sm text-foreground-muted hover:text-foreground data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent transition-colors -mb-px"
                    >
                        Usage
                    </Tabs.Trigger>

                    {/* Theme Toggle */}
                    <div className="ml-auto px-4 flex items-center">
                        <button
                            onClick={() =>
                                setPreviewTheme(previewTheme === "dark" ? "light" : "dark")
                            }
                            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2 text-sm text-foreground-muted"
                            title="Toggle preview theme"
                        >
                            {previewTheme === "dark" ? (
                                <>
                                    <Sun className="w-4 h-4" />
                                    Light
                                </>
                            ) : (
                                <>
                                    <Moon className="w-4 h-4" />
                                    Dark
                                </>
                            )}
                        </button>
                    </div>
                </Tabs.List>

                {/* Preview Tab */}
                <Tabs.Content value="preview" className="p-8">
                    <div
                        className={`min-h-[300px] rounded-xl flex items-center justify-center transition-colors ${previewTheme === "dark"
                            ? "bg-slate-900"
                            : "bg-slate-100 text-slate-900"
                            }`}
                    >
                        <ComponentPreview slug={component.slug} />
                    </div>
                </Tabs.Content>

                {/* Code Tab */}
                <Tabs.Content value="code" className="p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            Component Code
                        </h3>
                        <p className="text-sm text-foreground-muted">
                            Copy this code to your project. Make sure you have the required
                            dependencies installed.
                        </p>
                    </div>
                    <CodeBlock code={code} language="tsx" />
                </Tabs.Content>

                {/* Usage Tab */}
                <Tabs.Content value="usage" className="p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            Usage Example
                        </h3>
                        <p className="text-sm text-foreground-muted">
                            Here's how to use this component in your React application.
                        </p>
                    </div>
                    <CodeBlock code={usage} language="tsx" />
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
}
