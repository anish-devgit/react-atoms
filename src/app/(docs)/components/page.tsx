"use client";

import { Suspense, useState, useMemo } from "react";
import { categories } from "@/data/categories";
import { getComponentsByCategory, getNewComponents, components } from "@/data/components";
import { LivePreview } from "@/components/ui/LivePreview";
import Link from "next/link";
import { ArrowRight, Sparkles, Box, Layout, Type, MousePointer, Layers, Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

// Map category IDs to specific icons (fallback to Box)
const categoryIcons: Record<string, any> = {
    "getting-started": Box,
    "animations": Sparkles,
    "buttons": MousePointer,
    "text": Type,
    "layout": Layout,
    "feedback": Layers,
};

function ComponentsContent() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const newComponents = getNewComponents();
    const searchParams = useSearchParams();
    const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

    // Handle scrolling to category when URL hash or query param changes
    useEffect(() => {
        const categoryParam = searchParams?.get('category');
        const hash = window.location.hash.slice(1); // Remove #
        const targetCategory = categoryParam || hash;

        if (targetCategory && categoryRefs.current[targetCategory]) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                const element = categoryRefs.current[targetCategory];
                if (element) {
                    const offset = 100; // Offset for sticky header
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }, [searchParams]);

    // Filter logic
    const filteredCategories = useMemo(() => {
        if (!searchQuery && activeFilter === "all") {
            return categories;
        }

        return categories.map((category: any) => {
            const categoryComponents = getComponentsByCategory(category.id);
            const filtered = categoryComponents.filter((comp: any) => {
                const matchesSearch = searchQuery === "" ||
                    comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    comp.description.toLowerCase().includes(searchQuery.toLowerCase());

                const matchesFilter = activeFilter === "all" || category.id === activeFilter;

                return matchesSearch && matchesFilter;
            });

            return {
                ...category,
                filteredComponents: filtered,
                shouldShow: filtered.length > 0
            };
        }).filter((cat: any) => cat.shouldShow);
    }, [searchQuery, activeFilter]);

    const totalComponents = components.length;
    const filteredCount = filteredCategories.reduce((acc: number, cat: any) => acc + (cat.filteredComponents?.length || 0), 0);

    return (
        <main>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
                    Components Library
                </h1>
                <p className="text-lg text-foreground-muted max-w-2xl">
                    Browse {totalComponents} production-ready components. Copy, paste, ship.
                </p>
            </div>

            {/* Search & Filter Bar */}
            <div className="mb-8 space-y-4">
                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                    <input
                        type="text"
                        placeholder="Search components..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-card-bg border border-border rounded-xl text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                    />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveFilter("all")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === "all"
                            ? "bg-accent text-white"
                            : "bg-card-bg text-foreground-muted hover:text-foreground hover:bg-card-bg-hover border border-border"
                            }`}
                    >
                        All ({totalComponents})
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveFilter(category.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === category.id
                                ? "bg-accent text-white"
                                : "bg-card-bg text-foreground-muted hover:text-foreground hover:bg-card-bg-hover border border-border"
                                }`}
                        >
                            {category.name} ({getComponentsByCategory(category.id).length})
                        </button>
                    ))}
                </div>

                {/* Results count */}
                {(searchQuery || activeFilter !== "all") && (
                    <p className="text-sm text-foreground-muted">
                        Showing {filteredCount} of {totalComponents} components
                    </p>
                )}
            </div>

            {/* New Components Highlight */}
            {newComponents.length > 0 && (
                <div className="mb-12 p-6 rounded-2xl bg-surface-default border border-border relative overflow-hidden">
                    <div className="relative flex items-center gap-2 mb-4">
                        <div className="p-1.5 rounded-md bg-accent-subtle border border-accent-border">
                            <Sparkles className="w-4 h-4 text-accent" />
                        </div>
                        <h2 className="text-lg font-semibold text-foreground">Recently Added</h2>
                    </div>
                    <div className="relative flex flex-wrap gap-2">
                        {newComponents.map((comp) => (
                            <Link
                                key={comp.slug}
                                href={`/components/${comp.category}/${comp.slug}`}
                                className="px-3.5 py-1.5 rounded-lg bg-background border border-border text-sm text-foreground-muted hover:text-foreground hover:border-accent-border hover:bg-surface-hover transition-all"
                            >
                                {comp.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Categories Grid */}
            <div className="space-y-16">
                {filteredCategories.map((category) => {
                    const Icon = categoryIcons[category.id] || category.icon || Box;
                    const categoryComponents = category.filteredComponents || getComponentsByCategory(category.id);

                    return (
                        <section
                            key={category.id}
                            id={category.id}
                            className="scroll-mt-24"
                        >
                            {/* Category Header */}
                            <div className="flex items-center justify-between mb-6 group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-border flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors">
                                        <Icon className="w-5 h-5 text-foreground-muted group-hover:text-accent transition-colors" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-foreground">
                                            {category.name}
                                        </h2>
                                        <p className="text-sm text-foreground-muted">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href={`/components/${category.id}`}
                                    className="flex items-center gap-1.5 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg hover:bg-white/5"
                                >
                                    View all
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Components Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {categoryComponents.slice(0, 8).map((component: any) => (
                                    <Link
                                        key={component.slug}
                                        href={`/components/${category.id}/${component.slug}`}
                                        className="group relative flex flex-col p-1 rounded-xl bg-card-bg border border-border hover:border-accent/30 hover:bg-card-bg-hover transition-all duration-300"
                                    >
                                        {/* Live Preview Area */}
                                        <div className="mb-3 rounded-lg bg-black/20 border border-border overflow-hidden relative">
                                            {/* Live Component Preview */}
                                            <div className="relative">
                                                <LivePreview slug={component.slug} name={component.name} />
                                            </div>

                                            {component.isNew && (
                                                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-accent text-white shadow-lg shadow-accent/20">
                                                    NEW
                                                </div>
                                            )}

                                            {/* Live Preview Badge */}
                                            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-medium bg-black/60 backdrop-blur-sm text-white/70 border border-white/10">
                                                Live Preview
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="px-3 pb-3">
                                            <h3 className="font-medium text-foreground text-sm mb-1 group-hover:text-accent transition-colors">
                                                {component.name}
                                            </h3>
                                            <p className="text-[11px] text-foreground-muted line-clamp-2 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                                                {component.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Show more if there are more components */}
                            {categoryComponents.length > 8 && (
                                <div className="mt-4 pl-1">
                                    <Link
                                        href={`/components/${category.id}`}
                                        className="inline-flex items-center text-xs font-medium text-foreground-muted hover:text-accent transition-colors"
                                    >
                                        +{categoryComponents.length - 8} more components
                                    </Link>
                                </div>
                            )}
                        </section>
                    );
                })}
            </div>
        </main>
    );
}

export default function ComponentsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <ComponentsContent />
        </Suspense>
    );
}
