"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { CodeBlock } from "./CodeBlock";
import { ComponentItem } from "@/data/components";
import { getComponentCode, getComponentUsage } from "@/data/componentCodes";
import { Sun, Moon } from "lucide-react";

interface ComponentCardProps {
    component: ComponentItem;
    preview: React.ReactNode;
}

export function ComponentCard({ component, preview }: ComponentCardProps) {
    const [previewTheme, setPreviewTheme] = useState<"dark" | "light">("dark");
    const code = getComponentCode(component.slug);
    const usage = getComponentUsage(component.slug);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group rounded-2xl border border-border bg-card-bg overflow-hidden"
        >
            <div className="p-6 border-b border-border flex items-start justify-between">
                <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        {component.name}
                        {component.isNew && (
                            <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                                New
                            </span>
                        )}
                    </h3>
                    <p className="text-sm text-foreground-muted">{component.description}</p>
                </div>
            </div>

            <Tabs.Root defaultValue="preview">
                <Tabs.List className="flex border-b border-border bg-card-bg">
                    <Tabs.Trigger
                        value="preview"
                        className="flex-1 px-4 py-3 text-sm font-medium text-foreground-muted hover:text-foreground data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent transition-colors"
                    >
                        Preview
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="code"
                        className="flex-1 px-4 py-3 text-sm font-medium text-foreground-muted hover:text-foreground data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent transition-colors"
                    >
                        Code
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="usage"
                        className="flex-1 px-4 py-3 text-sm font-medium text-foreground-muted hover:text-foreground data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent transition-colors"
                    >
                        Usage
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="preview" className="relative group/preview">
                    <div
                        className={`min-h-[300px] flex items-center justify-center p-8 transition-colors ${previewTheme === "dark" ? "bg-[#0B1120]" : "bg-slate-100"
                            }`}
                    >
                        <div className="relative z-10">{preview}</div>
                    </div>
                    <button
                        onClick={() =>
                            setPreviewTheme(previewTheme === "dark" ? "light" : "dark")
                        }
                        className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all opacity-0 group-hover/preview:opacity-100"
                    >
                        {previewTheme === "dark" ? (
                            <Sun className="w-4 h-4" />
                        ) : (
                            <Moon className="w-4 h-4" />
                        )}
                    </button>
                </Tabs.Content>

                <Tabs.Content value="code" className="p-4 bg-[#0B1120]">
                    <CodeBlock code={code} language="tsx" />
                </Tabs.Content>

                <Tabs.Content value="usage" className="p-4 bg-[#0B1120]">
                    <CodeBlock code={usage} language="tsx" />
                </Tabs.Content>
            </Tabs.Root>
        </motion.div>
    );
}
