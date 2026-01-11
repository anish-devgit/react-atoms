import { categories, getCategoryById } from "@/data/categories";
import { getComponentsByCategory, getComponentBySlug } from "@/data/components";
import { getComponentCode, getComponentUsage } from "@/data/componentCodes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ComponentDetailClient } from "./ComponentDetailClient";

interface Props {
    params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
    const allParams: { category: string; slug: string }[] = [];

    for (const category of categories) {
        const components = getComponentsByCategory(category.id);
        for (const component of components) {
            allParams.push({
                category: category.id,
                slug: component.slug,
            });
        }
    }

    return allParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category: categoryId, slug } = await params;
    const component = getComponentBySlug(slug);
    const category = getCategoryById(categoryId);

    if (!component || !category) {
        return { title: "Component Not Found - ReactAtoms" };
    }

    return {
        title: `${component.name} - ${category.name} - ReactAtoms`,
        description: component.description,
    };
}

export default async function ComponentDetailPage({ params }: Props) {
    const { category: categoryId, slug } = await params;
    const component = getComponentBySlug(slug);
    const category = getCategoryById(categoryId);

    if (!component || !category || component.category !== categoryId) {
        notFound();
    }

    const code = getComponentCode(slug);
    const usage = getComponentUsage(slug);

    return (
        <main>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-foreground-muted mb-6">
                <Link href="/components" className="hover:text-foreground transition-colors">
                    Components
                </Link>
                <span>/</span>
                <Link href={`/components/${categoryId}`} className="hover:text-foreground transition-colors">
                    {category.name}
                </Link>
                <span>/</span>
                <span className="text-foreground">{component.name}</span>
            </nav>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-foreground">{component.name}</h1>
                    {component.isNew && (
                        <span className="px-2 py-1 text-xs font-medium rounded bg-accent/20 text-accent">
                            NEW
                        </span>
                    )}
                </div>
                <p className="text-foreground-muted">{component.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {component.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded bg-white/5 text-foreground-muted border border-border"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Component Detail with Tabs */}
            <ComponentDetailClient
                component={component}
                code={code}
                usage={usage}
            />
        </main>
    );
}
