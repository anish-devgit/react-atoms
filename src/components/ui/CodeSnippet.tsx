"use client";

import { useState, memo } from "react";
import { Check, Copy } from "lucide-react";

interface CodeSnippetProps {
    children: string;
}

function CodeSnippetComponent({ children }: CodeSnippetProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-mono text-sm text-white/90"
        >
            {children}
            {copied ? (
                <Check className="w-4 h-4 text-green-400" />
            ) : (
                <Copy className="w-4 h-4 text-white/50" />
            )}
        </button>
    );
}

export const CodeSnippet = memo(CodeSnippetComponent);
