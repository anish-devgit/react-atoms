"use client";

import { useEffect, useRef } from "react";

interface SplashCursorProps {
    splashColor?: string;
    size?: number;
    splashForce?: number;
    dissipation?: number;
}

export default function SplashCursor({
    splashColor = "rgba(100, 200, 255, 0.5)",
    size = 20,
    splashForce = 5,
    dissipation = 0.95,
}: SplashCursorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerRef = useRef({ x: 0, y: 0, down: false });
    const ripplesRef = useRef<{ x: number; y: number; r: number; opacity: number }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Add new ripple if moving
            if (pointerRef.current.down || (Math.random() < 0.05 && (Math.abs(pointerRef.current.x) > 0 || Math.abs(pointerRef.current.y) > 0))) {
                ripplesRef.current.push({
                    x: pointerRef.current.x,
                    y: pointerRef.current.y,
                    r: 0,
                    opacity: 1
                });
            }

            // Update and draw ripples
            for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
                const ripple = ripplesRef.current[i];
                ripple.r += splashForce;
                ripple.opacity *= dissipation;

                if (ripple.opacity < 0.01) {
                    ripplesRef.current.splice(i, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
                    ctx.fillStyle = splashColor.replace("0.5", ripple.opacity.toFixed(2)); // Hacky color replacement for demo
                    ctx.fill();
                }
            }

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointerRef.current.x = e.clientX - rect.left;
            pointerRef.current.y = e.clientY - rect.top;
            pointerRef.current.down = true;

            // Add immediate ripple on move for responsiveness
            ripplesRef.current.push({
                x: pointerRef.current.x,
                y: pointerRef.current.y,
                r: 0,
                opacity: 1
            });
        };

        // Reset down state after a short delay to simulate "splash" vs "drag"
        const handleMouseUp = () => {
            pointerRef.current.down = false;
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            cancelAnimationFrame(animId);
        };
    }, [splashColor, size, splashForce, dissipation]);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-50" />;
}
