"use client";

import { memo, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Sun, Moon, RotateCw } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { InstallBlock } from "@/components/ui/InstallBlock";
import { PropsTable, PropDefinition } from "@/components/ui/PropsTable";
import { LivePreview } from "@/components/ui/LivePreview";
import clsx from "clsx";

interface ComponentDocTemplateProps {
    title: string;
    description: string;
    slug: string;
    tags?: string[];
    isNew?: boolean;
    packageName: string;
    componentCode: string;
    usageCode: string;
    props: PropDefinition[];
}

function ComponentDocTemplateComponent({
    title,
    description,
    slug,
    tags = [],
    isNew = false,
    packageName,
    componentCode,
    usageCode,
    props,
}: ComponentDocTemplateProps) {
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <main className="max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-foreground">{title}</h1>
                    {isNew && (
                        <span className="px-2 py-1 text-xs font-medium rounded bg-accent/20 text-accent">
                            NEW
                        </span>
                    )}
                </div>
                <p className="text-lg text-foreground-muted mb-4">{description}</p>

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs rounded bg-white/5 text-foreground-muted border border-border"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Tabs */}
            <Tabs.Root defaultValue="preview" className="w-full">
                {/* Tab Header */}
                <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
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
                        {/* Refresh Button */}
                        <button
                            onClick={() => setRefreshKey((k) => k + 1)}
                            className="p-2 rounded-lg border border-border hover:bg-white/5 transition-colors"
                            aria-label="Refresh preview"
                            title="Restart animation"
                        >
                            <RotateCw className="w-4 h-4 text-foreground-muted" />
                        </button>

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
                    </div>
                </div>

                {/* Preview Tab */}
                <Tabs.Content value="preview" className="outline-none">
                    <div
                        className={clsx(
                            "min-h-[400px] rounded-xl border border-border relative overflow-hidden",
                            theme === "dark" ? "bg-background-secondary" : "bg-white"
                        )}
                    >
                        {/* Grid Pattern Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px]" />

                        {/* Preview */}
                        <div className="relative" key={refreshKey}>
                            <LivePreview slug={slug} name={title} />
                        </div>
                    </div>
                </Tabs.Content>

                {/* Code Tab */}
                <Tabs.Content value="code" className="outline-none space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground mb-4">Install</h2>
                        <InstallBlock packageName={packageName} componentCode={componentCode} />
                    </div>
                </Tabs.Content>

                {/* Usage Tab */}
                <Tabs.Content value="usage" className="outline-none space-y-8">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground mb-4">Basic Usage</h2>
                        <CodeBlock code={usageCode} language="tsx" />
                    </div>

                    {props.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Props</h2>
                            <PropsTable props={props} />
                        </div>
                    )}
                </Tabs.Content>
            </Tabs.Root>
        </main>
    );
}

export const ComponentDocTemplate = memo(ComponentDocTemplateComponent);
