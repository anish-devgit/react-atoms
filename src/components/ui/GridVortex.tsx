"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface GridVortexProps {
    className?: string;
    gridSize?: number; // Size of grid cells (px)
    lineColor?: string;
    damping?: number; // 0-1, physics drag
}

export function GridVortex({
    className = "",
    gridSize = 40,
    lineColor = "rgba(255, 255, 255, 0.1)",
    damping = 0.95,
}: GridVortexProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position state for the vortex center
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    // We'll use CSS custom properties to update pure CSS transforms efficiently
    // avoiding React renders for every frame usually, but for complex vortex we might need Canvas or heavy SVG.
    // Let's try a CSS Perspective + Transform Origin approach first for performance.

    // Actually, a true "Vortex" requires warping grid lines. 
    // SVG pattern with a filter is great for this (displacement map).
    // But standard SVG DisplacementMap is heavy.

    // Let's go with a specialized Canvas implementation for the grid lines, as it's most performant for warping many lines.
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width;
        let height = canvas.height;
        let animationFrameId: number;

        // Grid nodes
        const nodes: { x: number, y: number, ox: number, oy: number, vx: number, vy: number }[] = [];
        const cols = Math.ceil(width / gridSize) + 2;
        const rows = Math.ceil(height / gridSize) + 2;

        // Init nodes
        const init = () => {
            nodes.length = 0;
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * gridSize - gridSize;
                    const y = j * gridSize - gridSize;
                    nodes.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
                }
            }
        };

        // Mouse tracker in canvas space
        const target = { x: width / 2, y: height / 2 };

        const update = () => {
            // Physics pass
            nodes.forEach(node => {
                const dx = target.x - node.x;
                const dy = target.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Vortex force (rotation + attraction)
                if (dist < 300) {
                    const force = (300 - dist) / 300;

                    // Spiral/Vortex vector
                    // Move towards center
                    // node.vx += dx * force * 0.005;
                    // node.vy += dy * force * 0.005;

                    // Move perpendicular (spiral)
                    // We want a z-depth effect really, pushing AWAY or pulling IN.
                    // "Vortex" implies depth. Let's push nodes AWAY from mouse to create a "hole" or "depression".
                    // node.vx -= dx * force * 0.02;
                    // node.vy -= dy * force * 0.02;

                    // Let's do a "gravity well" style (pulling in z-space simulation by moving simple opacity/scale or just x/y contraction)
                    // A "depression" means lines get closer together? Or further apart?
                    // Perspective: things further away are smaller/closer.
                    // Let's verify behavior: "GridVortex" -> Warps towards center.
                    node.vx += dx * force * 0.02;
                    node.vy += dy * force * 0.02;
                }

                // Spring back to original
                const odx = node.ox - node.x;
                const ody = node.oy - node.y;
                node.vx += odx * 0.05; // Spring stiffness
                node.vy += ody * 0.05;

                node.vx *= 0.9; // Friction
                node.vy *= 0.9;

                node.x += node.vx;
                node.y += node.vy;
            });
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;

            ctx.beginPath();

            // Draw horizontal lines (connecting row neighbors)
            for (let j = 0; j < rows; j++) {
                // Move to first node in row
                const first = nodes[j]; // Indexing logic: grid is row-major? No, loops.
                // nodes are linear: i * rows + j? No, i is col, j is row.
                // let's index properly: nodes[i * rows + j]

                // Draw rows (vary x, fixed y index)
                for (let i = 0; i < cols - 1; i++) {
                    const n1 = nodes[i * rows + j];
                    const n2 = nodes[(i + 1) * rows + j];
                    if (n1 && n2) {
                        ctx.moveTo(n1.x, n1.y);
                        ctx.lineTo(n2.x, n2.y);
                    }
                }
            }

            // Draw vertical lines (vary y, fixed x index)
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows - 1; j++) {
                    const n1 = nodes[i * rows + j];
                    const n2 = nodes[i * rows + (j + 1)];
                    if (n1 && n2) {
                        ctx.moveTo(n1.x, n1.y);
                        ctx.lineTo(n2.x, n2.y);
                    }
                }
            }

            ctx.stroke();
        };

        const loop = () => {
            update();
            draw();
            animationFrameId = requestAnimationFrame(loop);
        };

        const resize = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            width = rect.width;
            height = rect.height;
            init();
        };

        const handleInteract = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            target.x = e.clientX - rect.left;
            target.y = e.clientY - rect.top;
        };

        window.addEventListener("resize", resize);
        canvas.addEventListener("mousemove", handleInteract);

        resize();
        loop();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleInteract);
            cancelAnimationFrame(animationFrameId);
        };
    }, [gridSize, lineColor]);

    return (
        <div ref={containerRef} className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
            <canvas ref={canvasRef} className="block w-full h-full" />
            {/* Vignette overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />
        </div>
    );
}
