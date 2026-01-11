"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import Link from "next/link";
import { components, ComponentItem } from "@/data/components";
import { LivePreview } from "@/components/ui/LivePreview";
import clsx from "clsx";

const categories = [
    { id: "all", label: "All Components" },
    { id: "text-animations", label: "Text Animations" },
    { id: "animations", label: "Animations" },
    { id: "components", label: "UI Components" },
    { id: "backgrounds", label: "Backgrounds" },
    { id: "effects", label: "Effects" },
];

export default function IndexPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Filter components
    const filteredComponents = components.filter((component) => {
        const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            component.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || component.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-[1200px] mx-auto min-h-screen pb-20">
            {/* Header */}
            <div className="mb-12 space-y-6">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Component Gallery
                    </h1>
                    <p className="text-lg text-foreground-muted max-w-2xl">
                        Browse our collection of {components.length}+ animated components.
                        Copy and paste them into your project to build stunning interfaces.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card-bg/50 backdrop-blur-sm p-4 rounded-xl border border-border/50 sticky top-20 z-40 transition-all duration-200">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                        <input
                            type="text"
                            placeholder="Search components..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-background-secondary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-foreground-muted/50"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={clsx(
                                    "whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                                    selectedCategory === cat.id
                                        ? "bg-accent text-white border-accent"
                                        : "bg-background-secondary text-foreground-muted border-border hover:border-accent/50 hover:text-foreground"
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredComponents.map((component) => (
                        <motion.div
                            layout
                            key={component.slug}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link
                                href={
                                    component.category === "text-animations"
                                        ? `/text-animations/${component.slug}`
                                        : `/components/${component.category}/${component.slug}`
                                }
                                className="group block h-full bg-card-bg border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
                            >
                                {/* Preview Area */}
                                <div className="h-48 bg-background-secondary/50 relative overflow-hidden flex items-center justify-center p-6 group-hover:bg-background-secondary transition-colors">
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px]" />
                                    <div className="relative w-full h-full flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300">
                                        <div className="pointer-events-none">
                                            <LivePreview slug={component.slug} name={component.name} />
                                        </div>
                                    </div>

                                    {component.isNew && (
                                        <div className="absolute top-3 right-3 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 rounded">
                                            New
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                                            {component.name}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-foreground-muted line-clamp-2 mb-4">
                                        {component.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {component.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-foreground-muted border border-white/5"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredComponents.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-foreground-muted" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No components found</h3>
                    <p className="text-foreground-muted">
                        Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("all");
                        }}
                        className="mt-6 px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
