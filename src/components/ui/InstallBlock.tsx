"use client";

import { memo, useState } from "react";
import { CodeBlock } from "./CodeBlock";

interface InstallBlockProps {
    packageName: string;
    componentCode: string;
}

function InstallBlockComponent({ packageName, componentCode }: InstallBlockProps) {
    const [method, setMethod] = useState<"cli" | "manual">("cli");

    const cliCommands = {
        npm: `npm install ${packageName}`,
        yarn: `yarn add ${packageName}`,
        pnpm: `pnpm add ${packageName}`,
    };

    return (
        <div className="space-y-4">
            {/* Toggle */}
            <div className="flex items-center gap-2 p-1 rounded-lg bg-white/5 border border-border w-fit">
                <button
                    onClick={() => setMethod("cli")}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${method === "cli"
                            ? "bg-accent text-white"
                            : "text-foreground-muted hover:text-foreground"
                        }`}
                >
                    CLI
                </button>
                <button
                    onClick={() => setMethod("manual")}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${method === "manual"
                            ? "bg-accent text-white"
                            : "text-foreground-muted hover:text-foreground"
                        }`}
                >
                    Manual
                </button>
            </div>

            {/* Content */}
            {method === "cli" ? (
                <div className="space-y-3">
                    <div>
                        <div className="text-xs text-foreground-muted mb-2 font-medium">NPM</div>
                        <CodeBlock code={cliCommands.npm} language="bash" showLineNumbers={false} />
                    </div>
                    <div>
                        <div className="text-xs text-foreground-muted mb-2 font-medium">YARN</div>
                        <CodeBlock code={cliCommands.yarn} language="bash" showLineNumbers={false} />
                    </div>
                    <div>
                        <div className="text-xs text-foreground-muted mb-2 font-medium">PNPM</div>
                        <CodeBlock code={cliCommands.pnpm} language="bash" showLineNumbers={false} />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="text-sm text-foreground-muted mb-3">
                        Copy and paste the following code into your project.
                    </div>
                    <CodeBlock code={componentCode} language="tsx" />
                </div>
            )}
        </div>
    );
}

export const InstallBlock = memo(InstallBlockComponent);
