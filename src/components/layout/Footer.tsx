import Link from "next/link";
import { Github, Twitter, Heart } from "lucide-react";

const navigation = {
    product: [
        { name: "Components", href: "/components" },
        { name: "Tools", href: "/tools" },
        { name: "Text Animations", href: "/components/text-animations" },
        { name: "Animations", href: "/components/animations" },
    ],
    resources: [
        { name: "Documentation", href: "/docs" },
        { name: "Partners", href: "/partners" },
        { name: "Changelog", href: "/changelog" },
        { name: "Roadmap", href: "/roadmap" },
    ],
    community: [
        { name: "GitHub", href: "https://github.com/reactatoms/reactatoms", external: true },
        { name: "Twitter", href: "https://twitter.com/reactatoms", external: true },
        { name: "Discord", href: "https://discord.gg/reactatoms", external: true },
    ],
};

export function Footer() {
    return (
        <footer className="relative border-t border-border bg-background-secondary/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Branding */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 group mb-4">
                            <div className="w-8 h-8 rounded-lg overflow-hidden">
                                <img src="/logo.png" alt="ReactAtoms" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-lg font-semibold text-foreground">
                                ReactAtoms
                            </span>
                        </Link>
                        <p className="text-sm text-foreground-muted mb-6 max-w-xs">
                            Production-ready React components for developers who ship fast.
                            Open source and free forever.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/reactatoms/reactatoms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5 text-foreground-muted hover:text-foreground transition-colors" />
                            </a>
                            <a
                                href="https://twitter.com/reactatoms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5 text-foreground-muted hover:text-foreground transition-colors" />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Product</h3>
                        <ul className="space-y-3">
                            {navigation.product.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Resources</h3>
                        <ul className="space-y-3">
                            {navigation.resources.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Community</h3>
                        <ul className="space-y-3">
                            {navigation.community.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-foreground-muted">
                        © {new Date().getFullYear()} ReactAtoms. MIT License.
                    </p>
                    <p className="text-sm text-foreground-muted">
                        Built by{" "}
                        <a
                            href="https://github.com/anish-devgit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors"
                        >
                            Anish Raj
                        </a>
                        {" · "}Open Source{" · "}MIT Licensed
                    </p>
                </div>
            </div>
        </footer>
    );
}
