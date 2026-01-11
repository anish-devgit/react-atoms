import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

const componentCode = `"use client";

import { motion } from "framer-motion";
import { CSSProperties } from "react";

interface GradientTextProps {
  text: string;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  animationDirection?: "horizontal" | "vertical" | "diagonal";
  showBorder?: boolean;
}

export default function GradientText({
  text,
  className = "",
  colors = ["#ff0080", "#7928ca", "#ff0080"],
  animationSpeed = 3,
  animationDirection = "horizontal",
  showBorder = false,
}: GradientTextProps) {
  // Animated gradient text effect
  // See full implementation in source code
}`;

const usageCode = `import GradientText from "@/components/ui/GradientText";

// Basic gradient animation
<GradientText text="Vibrant animated text" />

// Custom colors and speed
<GradientText
  text="Custom gradient"
  colors={["#00fff9", "#ff00ff", "#00fff9"]}
  animationSpeed={2}
/>

// With border and direction
<GradientText
  text="Diagonal flow"
  className="text-6xl font-bold"
  animationDirection="diagonal"
  showBorder={true}
/>`;

const props = [
    {
        name: "text",
        type: "string",
        defaultValue: "",
        description: "The text content to display.",
        required: true
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "CSS classes to apply to the text element."
    },
    {
        name: "colors",
        type: "string[]",
        defaultValue: '["#ff0080", "#7928ca", "#ff0080"]',
        description: "Array of color values for the gradient."
    },
    {
        name: "animationSpeed",
        type: "number",
        defaultValue: "3",
        description: "Duration of one complete gradient animation cycle (in seconds)."
    },
    {
        name: "animationDirection",
        type: '"horizontal" | "vertical" | "diagonal"',
        defaultValue: '"horizontal"',
        description: "Direction of the gradient animation flow."
    },
    {
        name: "showBorder",
        type: "boolean",
        defaultValue: "false",
        description: "Whether to show a matching gradient border around the text."
    }
];

export default function GradientTextPage() {
    return (
        <ComponentDocTemplate
            title="Gradient Text"
            description="An animated text component that displays text with a flowing, animated gradient effect. The gradient smoothly transitions through the specified colors, creating eye-catching, dynamic typography."
            slug="gradient-text-demo"
            tags={["animation", "text", "gradient", "color"]}
            packageName="framer-motion"
            componentCode={componentCode}
            usageCode={usageCode}
            props={props}
        />
    );
}
