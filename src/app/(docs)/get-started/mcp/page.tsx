"use client";

import { CodeBlock } from "@/components/ui/CodeBlock";
import { Copy, Terminal, Server } from "lucide-react";
import Link from "next/link";

const mcpConfigCode = `{
  "registries": {
    "reactbits": {
      "name": "reactbits",
      "baseUrl": "https://reactbits.dev/r",
      "config": {
        "format": "tsx"
      }
    }
  }
}`;

export default function MCPPage() {
    return (
        <main className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground mb-6">Model Context Protocol</h1>

            <p className="text-lg text-foreground-muted mb-8 leading-relaxed">
                Connect your AI editor to ReactBits using the Model Context Protocol (MCP).
                This allows assistants like Cursor to directly access and install components
                without manual copying.
            </p>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-12">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                        <Server className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">What is MCP?</h3>
                        <p className="text-foreground-muted leading-relaxed">
                            MCP is a standard for exposing model context from local and remote resources.
                            By configuring this server, you enable your AI tools to "see" and understand
                            the ReactBits library structure and component code directly.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-10">
                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Configuration</h2>
                    <p className="text-foreground-muted mb-6">
                        Add the following registry configuration to your project's <code className="px-1.5 py-0.5 rounded bg-white/10 text-foreground font-mono text-sm">components.json</code> file:
                    </p>
                    <CodeBlock code={mcpConfigCode} language="json" />
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Usage with Cursor</h2>
                    <div className="space-y-4 text-foreground-muted leading-relaxed">
                        <p>
                            Once configured, you can ask Cursor to add components naturally:
                        </p>
                        <div className="bg-background-secondary border border-border rounded-lg p-4 font-mono text-sm text-foreground flex items-center gap-3">
                            <Terminal className="w-4 h-4 text-accent" />
                            <span>Add the Gradient Text component to my landing page</span>
                        </div>
                        <p>
                            The AI will automatically fetch the component code, install necessary dependencies
                            (like framer-motion), and place the file in your configured components directory.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Manual Installation</h2>
                    <p className="text-foreground-muted">
                        Prefer the classic way? You can always copy/paste component code directly.
                        Check out the <Link href="/get-started/installation" className="text-accent hover:underline">Installation guide</Link> for details.
                    </p>
                </section>
            </div>
        </main>
    );
}
