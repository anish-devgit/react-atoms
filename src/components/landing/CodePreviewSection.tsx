"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

type TabType = "react" | "tailwind";

export function CodePreviewSection() {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>("react");

    const codeExamples = {
        react: `import { BlurText } from "@/components/ui/BlurText";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function WelcomePage() {
  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl">
        <BlurText
          text="Welcome to ReactAtoms"
          className="text-7xl font-bold mb-6"
          delay={50}
        />
        <p className="text-xl text-gray-400 mb-8">
          Beautiful components that ship in seconds.
          Copy, paste, and start building your product.
        </p>
        <Button size="lg" variant="primary">
          Get Started
        </Button>
      </div>
    </Container>
  );
}`,
        tailwind: `<div class="min-h-screen flex items-center justify-center bg-black">
  <div class="text-center max-w-2xl px-4">
    <h1 class="text-7xl font-bold mb-6 text-white animate-blur-in">
      Welcome to ReactAtoms
    </h1>
    <p class="text-xl text-gray-400 mb-8">
      Beautiful components that ship in seconds.
      Copy, paste, and start building your product.
    </p>
    <button class="px-6 py-3 bg-white text-black rounded-lg 
                   font-medium hover:bg-gray-100 transition">
      Get Started
    </button>
  </div>
</div>`
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(codeExamples[activeTab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative py-32 px-4 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />

            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl sm:text-6xl font-bold text-foreground mb-4"
                    >
                        Build with any framework
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground-muted max-w-2xl mx-auto"
                    >
                        Works seamlessly with React, Next.js, or any modern frontend framework.
                    </motion.p>
                </div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex gap-2 p-1 bg-white/5 border border-white/10 rounded-full">
                        <button
                            onClick={() => setActiveTab("react")}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === "react"
                                ? "bg-white text-black"
                                : "text-foreground-muted hover:text-foreground"
                                }`}
                        >
                            React
                        </button>
                        <button
                            onClick={() => setActiveTab("tailwind")}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === "tailwind"
                                ? "bg-white text-black"
                                : "text-foreground-muted hover:text-foreground"
                                }`}
                        >
                            Tailwind
                        </button>
                    </div>
                </motion.div>

                {/* Code + Preview Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm"
                >
                    <div className="grid lg:grid-cols-2 divide-x divide-white/10">
                        {/* Code Panel */}
                        <div className="relative">
                            {/* Window Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs text-foreground-muted font-mono">
                                    {activeTab === "react" ? "component.tsx" : "index.html"}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-green-400" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-foreground-muted" />
                                    )}
                                </button>
                            </div>

                            {/* Code Content */}
                            <div className="p-6 font-mono text-sm overflow-auto max-h-[600px] bg-black/20">
                                <pre className="text-foreground-secondary leading-relaxed">
                                    <code className="language-tsx">
                                        {activeTab === "react" ? (
                                            <>
                                                <span className="text-purple-400">import</span> {'{ '}
                                                <span className="text-blue-300">BlurText</span>
                                                {' }'} <span className="text-purple-400">from</span>{' '}
                                                <span className="text-green-400">"@/components/ui/BlurText"</span>;{'\n'}
                                                <span className="text-purple-400">import</span> {'{ '}
                                                <span className="text-blue-300">Button</span>
                                                {' }'} <span className="text-purple-400">from</span>{' '}
                                                <span className="text-green-400">"@/components/ui/Button"</span>;{'\n'}
                                                <span className="text-purple-400">import</span> {'{ '}
                                                <span className="text-blue-300">Container</span>
                                                {' }'} <span className="text-purple-400">from</span>{' '}
                                                <span className="text-green-400">"@/components/ui/Container"</span>;{'\n\n'}

                                                <span className="text-purple-400">export default function</span>{' '}
                                                <span className="text-yellow-300">WelcomePage</span>
                                                <span className="text-blue-300">()</span> {'{\n'}
                                                {'  '}<span className="text-purple-400">return</span> ({'\n'}
                                                {'    '}<span className="text-pink-400">&lt;Container</span>{' '}
                                                <span className="text-blue-300">className</span>=
                                                <span className="text-green-400">"min-h-screen flex items-center justify-center"</span>
                                                <span className="text-pink-400">&gt;</span>{'\n'}
                                                {'      '}<span className="text-pink-400">&lt;div</span>{' '}
                                                <span className="text-blue-300">className</span>=
                                                <span className="text-green-400">"text-center max-w-2xl"</span>
                                                <span className="text-pink-400">&gt;</span>{'\n'}
                                                {'        '}<span className="text-pink-400">&lt;BlurText</span>{'\n'}
                                                {'          '}<span className="text-blue-300">text</span>=
                                                <span className="text-green-400">"Welcome to ReactAtoms"</span>{'\n'}
                                                {'          '}<span className="text-blue-300">className</span>=
                                                <span className="text-green-400">"text-7xl font-bold mb-6"</span>{'\n'}
                                                {'          '}<span className="text-blue-300">delay</span>=
                                                <span className="text-orange-400">{'{50}'}</span>{'\n'}
                                                {'        '}<span className="text-pink-400">/&gt;</span>{'\n'}
                                                {'        '}<span className="text-pink-400">&lt;p</span>{' '}
                                                <span className="text-blue-300">className</span>=
                                                <span className="text-green-400">"text-xl text-gray-400 mb-8"</span>
                                                <span className="text-pink-400">&gt;</span>{'\n'}
                                                {'          '}Beautiful components that ship in seconds.{'\n'}
                                                {'          '}Copy, paste, and start building your product.{'\n'}
                                                {'        '}<span className="text-pink-400">&lt;/p&gt;</span>{'\n'}
                                                {'        '}<span className="text-pink-400">&lt;Button</span>{' '}
                                                <span className="text-blue-300">size</span>=
                                                <span className="text-green-400">"lg"</span>{' '}
                                                <span className="text-blue-300">variant</span>=
                                                <span className="text-green-400">"primary"</span>
                                                <span className="text-pink-400">&gt;</span>{'\n'}
                                                {'          '}Get Started{'\n'}
                                                {'        '}<span className="text-pink-400">&lt;/Button&gt;</span>{'\n'}
                                                {'      '}<span className="text-pink-400">&lt;/div&gt;</span>{'\n'}
                                                {'    '}<span className="text-pink-400">&lt;/Container&gt;</span>{'\n'}
                                                {'  '});{'\n'}
                                                {'}'}
                                            </>
                                        ) : (
                                            codeExamples.tailwind
                                        )}
                                    </code>
                                </pre>
                            </div>
                        </div>

                        {/* Preview Panel */}
                        <div className="relative min-h-[600px] flex items-center justify-center p-12 bg-black/40">
                            {/* Grid background */}
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                                backgroundSize: '50px 50px'
                            }} />

                            {/* Live Preview Content */}
                            <div className="relative z-10 text-center max-w-xl">
                                <motion.h3
                                    className="text-6xl font-bold text-white mb-6"
                                    initial={{ filter: "blur(10px)", opacity: 0 }}
                                    animate={{ filter: "blur(0px)", opacity: 1 }}
                                    transition={{
                                        duration: 1,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                >
                                    Welcome to ReactAtoms
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-xl text-gray-400 mb-8"
                                >
                                    Beautiful components that ship in seconds.
                                    Copy, paste, and start building your product.
                                </motion.p>
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
                                >
                                    Get Started
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
