"use client";

import { ComponentCard } from "@/components/ui/ComponentCard";
import { ComponentItem } from "@/data/components";
import { ComponentPreview } from "@/components/ui/ComponentPreview";

interface CategoryContentProps {
    components: ComponentItem[];
}

export function CategoryContent({ components }: CategoryContentProps) {
    return (
        <div className="space-y-6">
            {components.map((component) => (
                <ComponentCard
                    key={component.slug}
                    component={component}
                    preview={<ComponentPreview slug={component.slug} />}
                />
            ))}
        </div>
    );
}
