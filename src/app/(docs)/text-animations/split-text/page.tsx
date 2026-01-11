import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

const componentCode = `"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "character" | "word" | "line";
  stagger?: number;
  direction?: "up" | "down";
  once?: boolean;
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  animateBy = "character",
  stagger = 0.03,
  direction = "up",
  once = true,
}: SplitTextProps) {
  // Split text by character, word, or line and animate each unit
  // See full implementation in source code
}`;

const usageCode = `import SplitText from "@/components/ui/SplitText";

// Basic character-by-character animation
<SplitText text="Hello World" />

// Animate by words
<SplitText
  text="This animates word by word"
  animateBy="word"
  stagger={0.1}
/>

// Custom styling and direction
<SplitText
  text="Slide up from bottom"
  className="text-4xl font-bold text-white"
  direction="up"
  delay={0.2}
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
        name: "animateBy",
        type: '"character" | "word" | "line"',
        defaultValue: '"character"',
        description: "Unit to split and animate the text by."
    },
    {
        name: "stagger",
        type: "number",
        defaultValue: "0.03",
        description: "Delay between each unit's animation (in seconds)."
    },
    {
        name: "direction",
        type: '"up" | "down"',
        defaultValue: '"up"',
        description: "Direction of the slide animation."
    },
    {
        name: "once",
        type: "boolean",
        defaultValue: "true",
        description: "Whether the animation should run only once when entering viewport."
    }
];

export default function SplitTextPage() {
    return (
        <ComponentDocTemplate
            title="Split Text"
            description="A text animation component that splits text into individual characters, words, or lines, animating each unit with a staggered fade and slide effect."
            slug="split-text-demo"
            tags={["animation", "text", "scroll", "reveal"]}
            packageName="framer-motion"
            componentCode={componentCode}
            usageCode={usageCode}
            props={props}
        />
    );
}
