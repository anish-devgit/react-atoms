import {
    Type,
    Sparkles,
    MousePointer2,
    LayoutGrid,
    Palette,
    LucideIcon,
} from "lucide-react";

export interface Category {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    count: number;
}

export const categories: Category[] = [
    {
        id: "text-animations",
        name: "Text Animations",
        description: "Dynamic text effects and animated typography",
        icon: Type,
        count: 6,
    },
    {
        id: "animations",
        name: "Animations",
        description: "Entrance animations and motion effects",
        icon: Sparkles,
        count: 5,
    },
    {
        id: "effects",
        name: "Effects",
        description: "Interactive hover and click effects",
        icon: MousePointer2,
        count: 5,
    },
    {
        id: "components",
        name: "UI Components",
        description: "Cards, inputs, and interactive elements",
        icon: LayoutGrid,
        count: 5,
    },
    {
        id: "backgrounds",
        name: "Backgrounds",
        description: "Animated backgrounds and textures",
        icon: Palette,
        count: 4,
    },
];

export function getCategoryById(id: string): Category | undefined {
    return categories.find((cat) => cat.id === id);
}
