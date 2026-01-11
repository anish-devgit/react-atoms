"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
}

export function CodeBlock({
    code,
    language = "tsx",
    showLineNumbers = true,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const [html, setHtml] = useState<string>("");

    useEffect(() => {
        async function highlight() {
            const highlighted = await codeToHtml(code, {
                lang: language,
                theme: "github-dark-default",
            });
            setHtml(highlighted);
        }
        highlight();
    }, [code, language]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-xl overflow-hidden bg-[#0d1117] border border-border">
            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100 z-10"
                title="Copy code"
            >
                {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                ) : (
                    <Copy className="w-4 h-4 text-foreground-muted" />
                )}
            </button>

            {/* Code */}
            <div
                className="overflow-x-auto text-sm [&>pre]:p-4 [&>pre]:m-0 [&_code]:font-mono"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}
