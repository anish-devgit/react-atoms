"use client";

import { useEffect, useRef, useState, memo } from "react";

interface Atom {
    x: number;
    y: number;
    angle: number;
    orbitRadius: number;
    orbitSpeed: number;
    driftSpeed: number; // How fast atom drifts inward
    radius: number;
    opacity: number;
    maxOpacity: number;
    hue: number;
    lifecycle: "fadein" | "orbit" | "fadeout";
    age: number;
}

function AnimatedBackgroundComponent() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const atomsRef = useRef<Atom[]>([]);
    const timeRef = useRef(0);
    const lastFrameTime = useRef(0);

    const [reducedMotion, setReducedMotion] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [scrollOpacity, setScrollOpacity] = useState(1);
    const [isScrolling, setIsScrolling] = useState(false);

    // Brand colors - muted
    const colors = {
        violet: 270,
        blue: 230,
        pink: 330,
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mediaQuery.matches);
        setIsMobile(window.innerWidth < 768);

        const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        const handleResize = () => setIsMobile(window.innerWidth < 768);

        mediaQuery.addEventListener("change", handleChange);
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;
        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => setIsScrolling(false), 200);

            const scrollY = window.scrollY;
            const fadeStart = 50;
            const fadeEnd = 500;
            const opacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
            setScrollOpacity(Math.max(0, Math.min(1, opacity)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || isMobile) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        // Gravitational core center - behind hero text
        const getCore = (width: number, height: number) => ({
            x: width * 0.5,
            y: height * 0.4,
        });

        const resizeCanvas = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            initializeAtoms(rect.width, rect.height);
        };

        const initializeAtoms = (width: number, height: number) => {
            const numAtoms = 25;
            const hues = [colors.violet, colors.blue, colors.pink];
            const core = getCore(width, height);

            atomsRef.current = Array.from({ length: numAtoms }, (_, i) => {
                // Start atoms at various orbital distances from center
                const orbitRadius = 150 + Math.random() * 300;
                const angle = Math.random() * Math.PI * 2;

                // Muted colors, low opacity
                const maxOpacity = 0.3 + Math.random() * 0.3; // 0.3 to 0.6

                return {
                    x: core.x + Math.cos(angle) * orbitRadius,
                    y: core.y + Math.sin(angle) * orbitRadius * 0.7, // Elliptical
                    angle,
                    orbitRadius,
                    orbitSpeed: (0.0001 + Math.random() * 0.0002) * (Math.random() > 0.5 ? 1 : -1),
                    driftSpeed: 0.02 + Math.random() * 0.03, // Slow inward drift
                    radius: 2 + Math.random() * 1.5, // 2-3.5px
                    opacity: 0, // Start invisible
                    maxOpacity,
                    hue: hues[Math.floor(Math.random() * hues.length)],
                    lifecycle: "fadein",
                    age: Math.random() * 100, // Stagger initial ages
                };
            });
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas, { passive: true });

        // Draw soft gravitational core (not a visible hole)
        const drawGravityCore = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
            const core = getCore(width, height);

            // Very soft radial gradient - barely visible
            const gradient = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, 200);
            gradient.addColorStop(0, "rgba(168, 85, 247, 0.05)"); // Muted violet
            gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.02)"); // Soft blue
            gradient.addColorStop(1, "transparent");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        };

        // Draw single atom with subtle glow
        const drawAtom = (ctx: CanvasRenderingContext2D, atom: Atom) => {
            if (atom.opacity < 0.01) return;

            const { x, y, radius, opacity, hue } = atom;

            // Subtle glow (2-4px effective radius)
            const glowRadius = radius * 1.5;
            const glow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
            glow.addColorStop(0, `hsla(${hue}, 50%, 55%, ${opacity})`); // Muted saturation
            glow.addColorStop(0.6, `hsla(${hue}, 50%, 55%, ${opacity * 0.3})`);
            glow.addColorStop(1, "transparent");

            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
            ctx.fill();

            // Core dot
            ctx.fillStyle = `hsla(${hue}, 50%, 65%, ${opacity * 1.2})`;
            ctx.beginPath();
            ctx.arc(x, y, radius * 0.6, 0, Math.PI * 2);
            ctx.fill();
        };

        const animate = (timestamp: number) => {
            if (!isVisible || reducedMotion) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            // Very calm FPS - 40fps normally, 25fps while scrolling
            const targetFPS = isScrolling ? 25 : 40;
            const frameInterval = 1000 / targetFPS;

            if (timestamp - lastFrameTime.current < frameInterval) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }
            lastFrameTime.current = timestamp;

            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);
            ctx.globalAlpha = scrollOpacity;

            timeRef.current += 0.005; // Very slow time progression

            const core = getCore(rect.width, rect.height);

            // Draw gravity core first
            drawGravityCore(ctx, rect.width, rect.height);

            // Update and draw atoms
            atomsRef.current.forEach((atom) => {
                atom.age += 1;

                // Lifecycle management
                if (atom.lifecycle === "fadein") {
                    atom.opacity = Math.min(atom.maxOpacity, atom.opacity + 0.01);
                    if (atom.opacity >= atom.maxOpacity) {
                        atom.lifecycle = "orbit";
                    }
                } else if (atom.lifecycle === "orbit") {
                    // Check if atom is close to center (start fading out)
                    if (atom.orbitRadius < 80) {
                        atom.lifecycle = "fadeout";
                    }
                } else if (atom.lifecycle === "fadeout") {
                    atom.opacity = Math.max(0, atom.opacity - 0.015);
                    if (atom.opacity <= 0) {
                        // Respawn at edge
                        const edgeAngle = Math.random() * Math.PI * 2;
                        const edgeRadius = 400 + Math.random() * 100;
                        atom.orbitRadius = edgeRadius;
                        atom.angle = edgeAngle;
                        atom.x = core.x + Math.cos(edgeAngle) * edgeRadius;
                        atom.y = core.y + Math.sin(edgeAngle) * edgeRadius * 0.7;
                        atom.opacity = 0;
                        atom.lifecycle = "fadein";
                        atom.age = 0;
                    }
                }

                // Slow orbital motion
                atom.angle += atom.orbitSpeed;

                // Gentle inward drift
                atom.orbitRadius = Math.max(0, atom.orbitRadius - atom.driftSpeed);

                // Calculate position in elliptical orbit
                atom.x = core.x + Math.cos(atom.angle) * atom.orbitRadius;
                atom.y = core.y + Math.sin(atom.angle) * atom.orbitRadius * 0.7;

                // Subtle wobble for organic feel
                atom.x += Math.sin(timeRef.current * 0.5 + atom.age * 0.1) * 1;
                atom.y += Math.cos(timeRef.current * 0.3 + atom.age * 0.1) * 0.8;

                drawAtom(ctx, atom);
            });

            ctx.globalAlpha = 1;
            animationRef.current = requestAnimationFrame(animate);
        };

        // Static fallback for reduced motion
        const drawStatic = () => {
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);
            drawGravityCore(ctx, rect.width, rect.height);
        };

        if (reducedMotion) {
            drawStatic();
        } else {
            animationRef.current = requestAnimationFrame(animate);
        }

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationRef.current);
        };
    }, [reducedMotion, isVisible, scrollOpacity, isScrolling, isMobile]);

    // Mobile: Deep gradient only
    if (isMobile) {
        return (
            <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 60% 50% at 50% 40%, rgba(168, 85, 247, 0.05) 0%, transparent 60%)
                        `,
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 0%, rgba(6, 0, 16, 0.7) 100%)",
                    }}
                />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Deep near-black gradient base */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(180deg, rgba(10, 5, 20, 1) 0%, rgba(6, 2, 15, 1) 100%)",
                }}
            />

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{
                    willChange: "transform",
                    transform: "translateZ(0)",
                }}
            />

            {/* Vignette for depth */}
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, rgba(4, 2, 10, 0.6) 100%)",
                }}
            />
        </div>
    );
}

export const AnimatedBackground = memo(AnimatedBackgroundComponent);
