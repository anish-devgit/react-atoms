import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

const componentCode = `"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  direction?: "top" | "bottom" | "left" | "right" | "none";
  animateBy?: "character" | "word";
  once?: boolean;
}

export default function BlurText({
  text,
  className = "",
  delay = 0,
  direction = "none",
  animateBy = "word",
  once = true,
}: BlurTextProps) {
  // Blur-in text animation with directional movement
  // See full implementation in source code
}`;

const usageCode = `import BlurText from "@/components/ui/BlurText";

// Basic blur-in animation
<BlurText text="Fade in from blur" />

// Blur + directional movement
<BlurText
  text="Blur in from bottom"
  direction="bottom"
  animateBy="word"
/>

// Custom styling and timing
<BlurText
  text="Smooth reveal"
  className="text-5xl font-bold text-white"
  delay={0.3}
  direction="top"
/>`;

const props = [
    {
        name: "text",
        type: "string",
        defaultValue: "",
        description: "The text content to animate.",
        required: true
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "CSS classes to apply to each animated unit."
    },
    {
        name: "delay",
        type: "number",
        defaultValue: "0",
        description: "Initial delay before animation starts (in seconds)."
    },
    {
        name: "direction",
        type: '"top" | "bottom" | "left" | "right" | "none"',
        defaultValue: '"none"',
        description: "Direction from which the text appears."
    },
    {
        name: "animateBy",
        type: '"character" | "word"',
        defaultValue: '"word"',
        description: "Unit to split and animate the text by."
    },
    {
        name: "once",
        type: "boolean",
        defaultValue: "true",
        description: "Whether the animation should run only once when entering viewport."
    }
];

export default function BlurTextPage() {
    return (
        <ComponentDocTemplate
            title="Blur Text"
            description="A text animation component that reveals text with a blur-to-clear effect, optionally combined with directional movement for dynamic text reveals."
            slug="blur-text-demo"
            tags={["animation", "text", "blur", "reveal"]}
            packageName="framer-motion"
            componentCode={componentCode}
            usageCode={usageCode}
            props={props}
        />
    );
}
