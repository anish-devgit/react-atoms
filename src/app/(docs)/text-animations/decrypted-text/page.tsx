import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

const componentCode = `import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const styles = {
  wrapper: {
    display: 'inline-block',
    whiteSpace: 'pre-wrap' as const
  },
  srOnly: {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: 0
  }
};

interface DecryptedTextProps extends React.ComponentPropsWithoutRef<typeof motion.span> {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view' | 'both';
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  ...props
}: DecryptedTextProps) {
  // ... implementation
}`;

const usageCode = `import DecryptedText from "@/components/ui/DecryptedText";

// Basic usage - hover to decrypt
<DecryptedText text="Hover me!" />

// Customized speed and characters
<DecryptedText
  text="Customize me"
  speed={100}
  maxIterations={20}
  characters="ABCD1234!?"
  className="revealed"
  parentClassName="all-letters"
  encryptedClassName="encrypted"
/>

// Animate on view (runs once when scrolled into view)
<DecryptedText
  text="This text animates when in view"
  animateOn="view"
  revealDirection="center"
  sequential
/>`;

const props = [
    {
        name: "text",
        type: "string",
        defaultValue: '""',
        description: "The text content to decrypt."
    },
    {
        name: "speed",
        type: "number",
        defaultValue: "50",
        description: "Time in ms between each iteration."
    },
    {
        name: "maxIterations",
        type: "number",
        defaultValue: "10",
        description: "Max number of random iterations (non-sequential mode)."
    },
    {
        name: "sequential",
        type: "boolean",
        defaultValue: "false",
        description: "Whether to reveal one character at a time in sequence."
    },
    {
        name: "revealDirection",
        type: '"start" | "end" | "center"',
        defaultValue: '"start"',
        description: "Direction from which characters reveal in sequential mode."
    },
    {
        name: "useOriginalCharsOnly",
        type: "boolean",
        defaultValue: "false",
        description: "Restrict scrambling to only characters already in the text."
    },
    {
        name: "characters",
        type: "string",
        defaultValue: '"A-Z, a-z, symbols"',
        description: "Characters used for scrambling."
    },
    {
        name: "className",
        type: "string",
        defaultValue: '""',
        description: "CSS class for revealed characters."
    },
    {
        name: "parentClassName",
        type: "string",
        defaultValue: '""',
        description: "CSS class for the main container."
    },
    {
        name: "encryptedClassName",
        type: "string",
        defaultValue: '""',
        description: "CSS class for encrypted characters."
    },
    {
        name: "animateOn",
        type: '"view" | "hover" | "both"',
        defaultValue: '"hover"',
        description: "Trigger scrambling on hover or scroll-into-view."
    }
];

export default function DecryptedTextPage() {
    return (
        <ComponentDocTemplate
            title="Decrypted Text"
            description="A text animation component that simulates a 'decryption' or 'scrambling' effect, where random characters transition into the target text either on hover or when the element enters the viewport."
            slug="decrypted-text-demo"
            tags={["animation", "text", "hover", "interactive"]}
            packageName="framer-motion"
            componentCode={componentCode}
            usageCode={usageCode}
            props={props}
        />
    );
}
