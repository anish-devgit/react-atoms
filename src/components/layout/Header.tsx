"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { AtomicLogo } from "@/components/ui/AtomicLogo";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/components", label: "Components" },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll for navbar shrink effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
                ? "py-2 backdrop-blur-xl bg-background/90 border-border"
                : "py-4 backdrop-blur-md bg-background/70 border-border-subtle"
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo - Left */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <AtomicLogo size={28} className="text-foreground group-hover:text-accent transition-colors duration-200" />
                        <span className="text-base font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                            ReactAtoms
                        </span>
                    </Link>

                    {/* Navigation - Center (Desktop) */}
                    <nav className="hidden md:flex items-center gap-1 px-1 py-1 rounded-full bg-surface-default border border-border">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href ||
                                (link.href !== "/" && pathname.startsWith(link.href));

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${isActive
                                        ? "text-foreground"
                                        : "text-foreground-muted hover:text-foreground"
                                        }`}
                                >
                                    {/* Active indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute inset-0 rounded-full bg-white/[0.08]"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions - Right */}
                    <div className="flex items-center gap-3">
                        {/* Docs - Subtle text link (Desktop) */}
                        <Link
                            href="/docs"
                            className="hidden md:block text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                        >
                            Docs
                        </Link>

                        {/* GitHub Star CTA - Gradient Pill (Desktop) */}
                        <a
                            href="https://github.com/anish-devgit/react-atoms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-accent-secondary text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.02]"
                        >
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>Star</span>
                            <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-white/20">
                                1.2k
                            </span>
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5 text-foreground" />
                            ) : (
                                <Menu className="w-5 h-5 text-foreground" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.nav
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-1">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;

                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors duration-200 ${isActive
                                                ? "bg-white/[0.08] text-foreground"
                                                : "text-foreground-muted hover:text-foreground hover:bg-white/[0.04]"
                                                }`}
                                        >
                                            {isActive && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            )}
                                            {link.label}
                                        </Link>
                                    );
                                })}

                                <Link
                                    href="/docs"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-4 py-3 rounded-xl text-foreground-muted hover:text-foreground hover:bg-white/[0.04] transition-colors duration-200"
                                >
                                    Docs
                                </Link>

                                {/* Mobile GitHub CTA */}
                                <a
                                    href="https://github.com/anish-devgit/react-atoms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-white font-medium"
                                >
                                    <Github className="w-4 h-4" />
                                    Star on GitHub
                                </a>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}
