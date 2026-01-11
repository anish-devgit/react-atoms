"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { categories } from "@/data/categories";
import { getComponentsByCategory } from "@/data/components";
import clsx from "clsx";

function SidebarComponent() {
    const pathname = usePathname();
    const [expandedCategories, setExpandedCategories] = useState<string[]>(
        // Expand the current category by default
        categories.map((c) => c.id)
    );

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    return (
        <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin pr-2">
                <div className="pb-5 mb-5 border-b border-border/50">
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider px-3 mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-gradient-to-b from-accent to-accent-secondary rounded-full"></span>
                        Get Started
                    </h3>
                    <div className="space-y-1">
                        <Link
                            href="/get-started/introduction"
                            className={clsx(
                                "group flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                pathname === "/get-started/introduction"
                                    ? "bg-gradient-to-r from-accent/15 to-accent/10 text-accent border-l-2 border-accent shadow-sm"
                                    : "text-foreground-muted hover:text-foreground hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent hover:translate-x-0.5"
                            )}
                        >
                            <span>Introduction</span>
                        </Link>
                        <Link
                            href="/get-started/installation"
                            className={clsx(
                                "group flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                pathname === "/get-started/installation"
                                    ? "bg-gradient-to-r from-accent/15 to-accent/10 text-accent border-l-2 border-accent shadow-sm"
                                    : "text-foreground-muted hover:text-foreground hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent hover:translate-x-0.5"
                            )}
                        >
                            <span>Installation</span>
                        </Link>
                        <Link
                            href="/get-started/mcp"
                            className={clsx(
                                "group flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                pathname === "/get-started/mcp"
                                    ? "bg-gradient-to-r from-accent/15 to-accent/10 text-accent border-l-2 border-accent shadow-sm"
                                    : "text-foreground-muted hover:text-foreground hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent hover:translate-x-0.5"
                            )}
                        >
                            <span>MCP</span>
                        </Link>
                        <Link
                            href="/get-started/index"
                            className={clsx(
                                "group flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                pathname === "/get-started/index"
                                    ? "bg-gradient-to-r from-accent/15 to-accent/10 text-accent border-l-2 border-accent shadow-sm"
                                    : "text-foreground-muted hover:text-foreground hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent hover:translate-x-0.5"
                            )}
                        >
                            <span>Index</span>
                        </Link>
                    </div>
                </div>

                <div className="pb-5 mb-5">
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider px-3 mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-gradient-to-b from-accent-secondary to-accent rounded-full"></span>
                        Components
                    </h3>
                </div>

                <nav className="space-y-1">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        const isExpanded = expandedCategories.includes(category.id);
                        const categoryComponents = getComponentsByCategory(category.id);
                        const isCategoryActive = pathname.includes(`/components/${category.id}`);

                        return (
                            <div key={category.id}>
                                {/* Category Header */}
                                <button
                                    onClick={(e) => {
                                        // Prevent any default behavior that might cause jumps
                                        e.preventDefault();

                                        // If we're on the components page, scroll to the category
                                        if (pathname === '/components') {
                                            const element = document.getElementById(category.id);
                                            if (element) {
                                                // Use native scrollIntoView which respects scroll-margin-top (scroll-mt-24)
                                                element.scrollIntoView({
                                                    behavior: 'smooth',
                                                    block: 'start'
                                                });
                                            }
                                        }
                                        // Always toggle the category expansion
                                        toggleCategory(category.id);
                                    }}
                                    className={clsx(
                                        "group w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative overflow-hidden",
                                        isCategoryActive
                                            ? "bg-gradient-to-r from-accent/15 via-accent/10 to-transparent text-accent shadow-md shadow-accent/5"
                                            : "text-foreground-muted hover:text-foreground hover:bg-gradient-to-r hover:from-white/8 hover:to-transparent"
                                    )}
                                >
                                    {/* Animated background on hover */}
                                    {!isCategoryActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    )}

                                    <div className="flex items-center gap-3 relative z-10">
                                        <Icon className={clsx(
                                            "w-4 h-4 transition-all duration-200",
                                            isCategoryActive ? "text-accent drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" : "text-foreground-muted group-hover:text-accent group-hover:scale-110"
                                        )} />
                                        <span>{category.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 relative z-10">
                                        <span className={clsx(
                                            "text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-all duration-200",
                                            isCategoryActive
                                                ? "bg-accent/20 text-accent"
                                                : "bg-white/5 text-foreground-muted/70 group-hover:bg-accent/10 group-hover:text-accent"
                                        )}>{category.count}</span>
                                        <ChevronDown
                                            className={clsx(
                                                "w-4 h-4 transition-all duration-200",
                                                isExpanded && "rotate-180",
                                                isCategoryActive ? "text-accent" : "text-foreground-muted group-hover:text-accent"
                                            )}
                                        />
                                    </div>
                                </button>

                                {/* Component List */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="ml-4 mt-1 mb-2 space-y-0.5 border-l border-border/50 pl-3">
                                                {categoryComponents.map((component) => {
                                                    const isActive = pathname === `/components/${category.id}/${component.slug}`;

                                                    return (
                                                        <Link
                                                            key={component.slug}
                                                            href={`/components/${category.id}/${component.slug}`}
                                                            className={clsx(
                                                                "group flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 relative",
                                                                isActive
                                                                    ? "bg-gradient-to-r from-accent/10 to-transparent text-accent font-medium"
                                                                    : "text-foreground-muted hover:text-foreground hover:bg-white/5 hover:translate-x-1"
                                                            )}
                                                        >
                                                            {isActive && <span className="absolute left-0 w-0.5 h-full bg-accent rounded-r" />}
                                                            <span className="truncate">{component.name}</span>
                                                            {component.isNew && (
                                                                <span className="flex-shrink-0 px-2 py-0.5 text-[9px] font-bold rounded-md bg-gradient-to-r from-accent to-accent-secondary text-white uppercase tracking-wider shadow-sm animate-pulse">
                                                                    New
                                                                </span>
                                                            )}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </nav>

                {/* New Components Section */}
                <div className="mt-6 pt-4 border-t border-border">
                    <Link
                        href="/components"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground-muted hover:text-foreground hover:bg-white/5 transition-colors duration-150"
                    >
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span>What's New</span>
                    </Link>
                </div>
            </div>
        </aside >
    );
}

export const Sidebar = memo(SidebarComponent);
