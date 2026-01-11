import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

const componentCode = `"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface TrueFocusProps {
  text: string;
  className?: string;
  focusedClassName?: string;
  blurredClassName?: string;
  focusSpeed?: number;
  blurAmount?: number;
}

export default function TrueFocus({
  text,
  className = "",
  focusedClassName = "",
  blurredClassName = "",
  focusSpeed = 1,
  blurAmount = 3,
}: TrueFocusProps) {
  // Progressive focus effect that sweeps through text
  // See full implementation in source code
}`;

const usageCode = `import TrueFocus from "@/components/ui/TrueFocus";

// Basic progressive focus
<TrueFocus text="Watch each word come into focus" />

// Custom blur and speed
<TrueFocus
  text="Slow dramatic reveal"
  focusSpeed={3}
  blurAmount={5}
/>

// Styled focus effect
<TrueFocus
  text="Quality over quantity"
  className="text-4xl font-bold"
  focusedClassName="text-white"
  blurredClassName="text-white/30"
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
        description: "CSS classes to apply to the container."
    },
    {
        name: "focusedClassName",
        type: "string",
        defaultValue: '""',
        description: "CSS classes for characters that are in focus."
    },
    {
        name: "blurredClassName",
        type: "string",
        defaultValue: '""',
        description: "CSS classes for characters that are out of focus."
    },
    {
        name: "focusSpeed",
        type: "number",
        defaultValue: "1",
        description: "Duration of the focus sweep animation (in seconds)."
    },
    {
        name: "blurAmount",
        type: "number",
        defaultValue: "3",
        description: "Maximum blur radius in pixels for out-of-focus characters."
    }
];

export default function TrueFocusPage() {
    return (
        <ComponentDocTemplate
            title="True Focus"
            description="A sophisticated text animation that progressively focuses through text, creating a wave of clarity that sweeps from start to finish, highlighting each character as it comes into focus."
            slug="true-focus-demo"
            tags={["animation", "text", "blur", "focus", "progressive"]}
            packageName="framer-motion"
            componentCode={componentCode}
            usageCode={usageCode}
            props={props}
        />
    );
}
