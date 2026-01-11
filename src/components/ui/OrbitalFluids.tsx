"use client";

import { useEffect, useRef } from "react";

interface OrbitalFluidsProps {
    className?: string;
    particleCount?: number;
    color?: string;
}

export function OrbitalFluids({
    className = "",
    particleCount = 100,
    color = "#a5b4fc" // Indigo-300
}: OrbitalFluidsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width;
        let height = canvas.height;
        let animationFrameId: number;
        let particles: Particle[] = [];

        // Mouse state
        const mouse = { x: width / 2, y: height / 2, active: false };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.size = Math.random() * 2 + 0.5;
            }

            update() {
                // Gravity towards center or mouse
                const targetX = mouse.active ? mouse.x : width / 2;
                const targetY = mouse.active ? mouse.y : height / 2;

                const dx = targetX - this.x;
                const dy = targetY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Gravitational pull
                if (dist > 5) {
                    const force = (mouse.active ? 0.2 : 0.05) / (dist * 0.05 + 1);
                    this.vx += dx * force * 0.01;
                    this.vy += dy * force * 0.01;
                }

                // Friction
                this.vx *= 0.96;
                this.vy *= 0.96;

                this.x += this.vx;
                this.y += this.vy;

                // Bounce off walls (optional, but keeps them in frame mostly)
                if (this.x < 0 || this.x > width) this.vx *= -0.8;
                if (this.y < 0 || this.y > height) this.vy *= -0.8;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.6;
                ctx.fill();

                // Trail effect (optional simple trail)
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - this.vx * 4, this.y - this.vy * 4);
                ctx.strokeStyle = color;
                ctx.lineWidth = this.size / 2;
                ctx.stroke();
            }
        }

        const resize = () => {
            if (!containerRef.current) return;
            const { clientWidth, clientHeight } = containerRef.current;
            canvas.width = clientWidth;
            canvas.height = clientHeight;
            width = clientWidth;
            height = clientHeight;

            // Re-init particles on resize to avoid them being lost
            if (particles.length === 0) {
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Slight trail fade
            // ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            // ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        window.addEventListener("resize", resize);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleCount, color]);

    return (
        <div ref={containerRef} className={`absolute inset-0 z-0 ${className}`}>
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
