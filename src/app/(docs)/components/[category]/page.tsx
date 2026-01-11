import { Sidebar } from "@/components/layout/Sidebar";
import { categories, getCategoryById } from "@/data/categories";
import { getComponentsByCategory } from "@/data/components";
import { LivePreview } from "@/components/ui/LivePreview";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
    params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
    return categories.map((category) => ({
        category: category.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category: categoryId } = await params;
    const category = getCategoryById(categoryId);

    if (!category) {
        return { title: "Category Not Found - ReactAtoms" };
    }

    return {
        title: `${category.name} - ReactAtoms`,
        description: category.description,
    };
}

export default async function CategoryPage({ params }: Props) {
    const { category: categoryId } = await params;
    const category = getCategoryById(categoryId);

    if (!category) {
        notFound();
    }

    const Icon = category.icon;
    const categoryComponents = getComponentsByCategory(categoryId);

    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-foreground-muted mb-6">
                            <Link href="/components" className="hover:text-foreground transition-colors">
                                Components
                            </Link>
                            <span>/</span>
                            <span className="text-foreground">{category.name}</span>
                        </nav>

                        {/* Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center">
                                <Icon className="w-7 h-7 text-accent" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
                                <p className="text-foreground-muted">{category.description}</p>
                            </div>
                        </div>

                        {/* Component Count */}
                        <div className="mb-6 text-sm text-foreground-muted">
                            {categoryComponents.length} components
                        </div>

                        {/* Components Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categoryComponents.map((component) => (
                                <Link
                                    key={component.slug}
                                    href={`/components/${categoryId}/${component.slug}`}
                                    className="group relative p-5 rounded-xl bg-white/[0.02] border border-border hover:border-accent/30 transition-all duration-200"
                                >
                                    {/* Preview Area */}
                                    <div className="h-32 mb-4 rounded-lg bg-gradient-to-br from-accent/5 to-accent-secondary/5 flex items-center justify-center overflow-hidden border border-border/50">
                                        <LivePreview slug={component.slug} name={component.name} />
                                    </div>

                                    {/* Info */}
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <h3 className="font-medium text-foreground group-hover:text-accent transition-colors truncate">
                                                {component.name}
                                            </h3>
                                            <p className="text-sm text-foreground-muted line-clamp-2 mt-1">
                                                {component.description}
                                            </p>
                                        </div>
                                        {component.isNew && (
                                            <span className="flex-shrink-0 px-2 py-1 text-[10px] font-medium rounded bg-accent/20 text-accent">
                                                NEW
                                            </span>
                                        )}
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {component.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 text-[10px] rounded bg-white/5 text-foreground-muted"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
