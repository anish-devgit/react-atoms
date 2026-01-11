// Component code templates - real, usable code for each component

export const componentCodes: Record<string, { code: string; usage: string }> = {
  // ============================================
  // TEXT ANIMATIONS
  // ============================================
  "quantum-focus": {
    code: `"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuantumFocusProps {
    children: string; // The text content
    blurAmount?: number;
    repulsion?: number;
    className?: string;
    manualMode?: boolean; // If true, requires click/focus instead of hover
}

export function QuantumFocus({
    children = "Quantum Focus Effect",
    blurAmount = 4,
    repulsion = 20,
    className = "",
    manualMode = false
}: QuantumFocusProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const words = children.split(" ");

    return (
        <div className={\`flex flex-wrap justify-center items-center gap-x-2 \${className}\`}>
            {words.map((word, i) => {
                const isHovered = hoveredIndex === i;
                const distFromHovered = hoveredIndex !== null ? Math.abs(hoveredIndex - i) : 0;
                
                // Calculate repulsion (push away from focused word)
                const x = hoveredIndex !== null 
                    ? (i > hoveredIndex ? repulsion / (distFromHovered || 1) : -repulsion / (distFromHovered || 1))
                    : 0;
                
                // Calculate blur and scale based on distance
                const blur = hoveredIndex !== null && !isHovered ? Math.min(blurAmount + distFromHovered * 2, 8) : 0;
                const scale = isHovered ? 1.2 : hoveredIndex !== null ? 0.9 : 1;
                const opacity = hoveredIndex !== null && !isHovered ? 0.4 : 1;

                return (
                    <motion.span
                        key={i}
                        className="relative cursor-pointer inline-block z-10"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        animate={{
                            x: hoveredIndex !== null && !isHovered ? x : 0,
                            scale,
                            filter: \`blur(\${blur}px)\`,
                            opacity
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                        }}
                    >
                        {/* Chromatic Aberration / RGB Split Effect on Focus */}
                        <AnimatePresence>
                            {isHovered && (
                                <>
                                    <motion.span
                                        initial={{ opacity: 0, x: 0 }}
                                        animate={{ opacity: 0.6, x: -2 }}
                                        exit={{ opacity: 0, x: 0 }}
                                        className="absolute inset-0 text-[#ff00ff] mix-blend-screen pointer-events-none select-none"
                                        aria-hidden="true"
                                    >
                                        {word}
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, x: 0 }}
                                        animate={{ opacity: 0.6, x: 2 }}
                                        exit={{ opacity: 0, x: 0 }}
                                        className="absolute inset-0 text-[#00ffff] mix-blend-screen pointer-events-none select-none"
                                        aria-hidden="true"
                                    >
                                        {word}
                                    </motion.span>
                                </>
                            )}
                        </AnimatePresence>

                        {/* Main Text */}
                        <span className={\`relative z-10 font-bold \${isHovered ? "text-white" : "text-white/90"}\`}>
                            {word}
                        </span>

                        {/* Spotlight Glow Behind */}
                        {isHovered && (
                            <motion.div
                                layoutId="quantum-spotlight"
                                className="absolute inset-0 -z-10 bg-white/10 blur-xl rounded-full"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1.5 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </motion.span>
                );
            })}
        </div>
    );
}`,
    usage: `import { QuantumFocus } from "@/components/ui/QuantumFocus";

export default function Example() {
  return (
    <div className="p-12 bg-black flex items-center justify-center min-h-[300px]">
      <div className="text-4xl text-gray-400">
        <QuantumFocus>
          Hover over these words to see the quantum effect
        </QuantumFocus>
      </div>
    </div>
  );
}`,
  },
  "flux-text": {
    code: `"use client";

import { useEffect, useState, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/\\\\";

interface FluxTextProps {
  children: string;
  className?: string;
  hoverDuration?: number;
}

export function FluxText({ children, className = "", hoverDuration = 300 }: FluxTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayText((currentText) =>
        children
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return children[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= children.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        setIsScrambling(false);
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  const triggerFlux = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    scramble();
  };

  return (
    <span
      className={\`relative inline-block font-mono cursor-pointer group \${className}\`}
      onMouseEnter={triggerFlux}
    >
        <span className="relative z-10 group-hover:text-cyan-400 transition-colors duration-300">
            {displayText}
        </span>
        <span className="absolute inset-0 text-cyan-500 opacity-0 group-hover:opacity-50 blur-md pointer-events-none transition-opacity duration-300 select-none">
            {displayText}
        </span>
    </span>
  );
}`,
    usage: `import { FluxText } from "@/components/ui/FluxText";

export default function Example() {
  return (
    <div className="text-4xl font-bold">
      <FluxText>HOVER_ME_TO_DECRYPT</FluxText>
    </div>
  );
}`,
  },

  "aurora-text": {
    code: `"use client";

import { motion } from "framer-motion";
import React from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export function AuroraText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  speed = 8,
}: AuroraTextProps) {
  const gradientString = colors.join(", ");

  return (
    <span
      className={\`relative inline-block font-bold overflow-hidden \${className}\`}
    >
      <motion.span
        className="absolute inset-0 z-0 mix-blend-overlay pointer-events-none"
        style={{
          background: \`linear-gradient(110deg, \${colors[0]} 30%, \${colors[1]} 50%, \${colors[2]} 70%)\`,
          backgroundSize: "200% 100%",
          filter: "blur(4px) contrast(150%)",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        aria-hidden="true"
      />
      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/50">
        {children}
      </span>
      <motion.span
        className="absolute inset-0 z-20 text-transparent bg-clip-text pointer-events-none select-none"
        style={{
            backgroundImage: \`linear-gradient(135deg, \${gradientString})\`,
            backgroundSize: "300% 300%"
        }}
        animate={{
            backgroundPosition: ["0% 0%", "50% 100%", "100% 0%"]
        }}
        transition={{
            duration: speed,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror"
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}`,
    usage: `import { AuroraText } from "@/components/ui/AuroraText";

export default function Example() {
  return (
    <h1 className="text-5xl font-bold">
      <AuroraText colors={["#FF9A9E", "#FECFEF", "#FF9A9E"]}>
        Aurora Smooth
      </AuroraText>
    </h1>
  );
}`,
  },

  "mist-reveal": {
    code: `"use client";

import { motion } from "framer-motion";

interface MistRevealProps {
  children: string;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  stagger?: number;
}

export function MistReveal({
  children,
  className = "",
  direction = "right",
  duration = 1.2,
  stagger = 0.1,
}: MistRevealProps) {
  const words = children.split(" ");
  
  const variants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      x: direction === "right" ? -50 : direction === "left" ? 50 : 0,
      y: direction === "down" ? -30 : direction === "up" ? 30 : 0,
    },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      transition: {
        duration,
        delay: i * stagger,
        ease: [0.2, 0.65, 0.3, 0.9],
      } as any,
    }),
  };

  return (
    <div className={\`flex flex-wrap gap-x-2 gap-y-1 \${className}\`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          variants={variants}
          className="inline-block relative"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}`,
    usage: `import { MistReveal } from "@/components/ui/MistReveal";

export default function Example() {
  return (
    <MistReveal direction="up" duration={1}>
      The mist slowly reveals the truth...
    </MistReveal>
  );
}`,
  },

  "gradient-text": {
    code: `"use client";

export function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
      {children}
    </span>
  );
}

// Add to your CSS:
// @keyframes gradient-shift {
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// }
// .animate-gradient {
//   background-size: 200% 200%;
//   animation: gradient-shift 4s ease infinite;
// }`,
    usage: `import { GradientText } from "@/components/ui/GradientText";

export default function Example() {
  return (
    <h1 className="text-4xl font-bold">
      <GradientText>Hello World</GradientText>
    </h1>
  );
}`,
  },

  "orbital-fluids": {
    code: `"use client";

import { useEffect, useRef } from "react";

interface OrbitalFluidsProps {
  className?: string;
  particleCount?: number;
  color?: string;
}

export function OrbitalFluids({ 
    className = "", 
    particleCount = 100,
    color = "#a5b4fc"
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
        
        // Trail effect
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
    <div ref={containerRef} className={\`absolute inset-0 z-0 \${className}\`}>
        <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}`,
    usage: `import { OrbitalFluids } from "@/components/ui/OrbitalFluids";

export function OrbitalFluidsDemo() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
        <OrbitalFluids 
            particleCount={200} 
            color="#6366f1" 
        />
        <div className="relative z-10 text-white font-bold text-4xl">
            Gravity Well
        </div>
    </div>
  );
}`,
  },

  "grid-vortex": {
    code: `"use client";

import { useEffect, useRef, useState } from "react";

interface GridVortexProps {
  className?: string;
  gridSize?: number;
  lineColor?: string;
  damping?: number;
}

export function GridVortex({
  className = "",
  gridSize = 40,
  lineColor = "rgba(255, 255, 255, 0.1)",
  damping = 0.95,
}: GridVortexProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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
    
    const target = { x: width / 2, y: height / 2 };

    const update = () => {
        nodes.forEach(node => {
            const dx = target.x - node.x;
            const dy = target.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 300) {
                const force = (300 - dist) / 300;
                node.vx += dx * force * 0.02;
                node.vy += dy * force * 0.02;
            }
            
            const odx = node.ox - node.x;
            const ody = node.oy - node.y;
            node.vx += odx * 0.05;
            node.vy += ody * 0.05;
            
            node.vx *= 0.9;
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
        for (let j = 0; j < rows; j++) {
             for (let i = 0; i < cols - 1; i++) {
                 const n1 = nodes[i * rows + j];
                 const n2 = nodes[(i + 1) * rows + j];
                 if (n1 && n2) {
                    ctx.moveTo(n1.x, n1.y);
                    ctx.lineTo(n2.x, n2.y);
                 }
             }
        }
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
    <div ref={containerRef} className={\`absolute inset-0 overflow-hidden bg-black \${className}\`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />
    </div>
  );
}`,
    usage: `import { GridVortex } from "@/components/ui/GridVortex";

export function GridVortexDemo() {
  return (
    <div className="relative w-full h-full min-h-[400px]">
        <GridVortex 
            gridSize={50} 
            lineColor="rgba(0, 255, 255, 0.3)" 
        />
    </div>
  );
}`,
  },

  "glitch-text": {
    code: `"use client";

export function GlitchText({ children }: { children: string }) {
  return (
    <div className="relative inline-block font-bold">
      <span className="absolute top-0 left-[2px] text-cyan-400 animate-glitch-1 clip-glitch">
        {children}
      </span>
      <span className="absolute top-0 left-[-2px] text-pink-500 animate-glitch-2 clip-glitch">
        {children}
      </span>
      <span className="relative">{children}</span>
    </div>
  );
}

// CSS required - see globals.css for animation keyframes`,
    usage: `import { GlitchText } from "@/components/ui/GlitchText";

export default function Example() {
  return (
    <h1 className="text-3xl text-white">
      <GlitchText>CYBER PUNK</GlitchText>
    </h1>
  );
}`,
  },

  typewriter: {
    code: `"use client";
import { useState, useEffect } from "react";

interface Props {
  text: string;
  speed?: number;
  loop?: boolean;
}

export function Typewriter({ text, speed = 100, loop = true }: Props) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
        if (loop) {
          setTimeout(() => setDisplayText(""), 2000);
        }
      }
    }, speed);

    const cursor = setInterval(() => setShowCursor((v) => !v), 500);

    return () => {
      clearInterval(typing);
      clearInterval(cursor);
    };
  }, [text, speed, loop]);

  return (
    <span className="font-mono">
      {displayText}
      <span className={showCursor ? "opacity-100" : "opacity-0"}>|</span>
    </span>
  );
}`,
    usage: `import { Typewriter } from "@/components/ui/Typewriter";

export default function Example() {
  return (
    <h1 className="text-2xl">
      <Typewriter text="Hello, World!" speed={100} loop={true} />
    </h1>
  );
}`,
  },

  "wave-text": {
    code: `"use client";

import { motion } from "framer-motion";

interface WaveTextProps {
  children: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export function WaveText({ 
  children, 
  delay = 0.05, 
  duration = 0.5,
  className = "" 
}: WaveTextProps) {
  const letters = Array.from(children);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}`,
    usage: `import { WaveText } from "@/components/ui/WaveText";

export default function Example() {
  return (
    <WaveText className="text-4xl font-bold">
      Wave Animation
    </WaveText>
  );
}`,
  },

  "magnet": {
    code: `"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface MagnetProps {
    children: React.ReactNode;
    padding?: number;
    disabled?: boolean;
    magnetStrength?: number;
    activeTransition?: string;
    inactiveTransition?: string;
    wrapperClassName?: string;
    innerClassName?: string;
}

export default function Magnet({
    children,
    padding = 100,
    disabled = false,
    magnetStrength = 2,
    activeTransition = "transform 0.3s ease-out",
    inactiveTransition = "transform 0.5s ease-in-out",
    wrapperClassName = "",
    innerClassName = "",
}: MagnetProps) {
    const [isActive, setIsActive] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const magnetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (disabled) {
            setPosition({ x: 0, y: 0 });
            setIsActive(false);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!magnetRef.current) return;

            const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const dist = Math.sqrt(
                Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
            );

            if (dist < padding) {
                setIsActive(true);
                const offsetX = (e.clientX - centerX) / magnetStrength;
                const offsetY = (e.clientY - centerY) / magnetStrength;
                setPosition({ x: offsetX, y: offsetY });
            } else {
                setIsActive(false);
                setPosition({ x: 0, y: 0 });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [padding, disabled, magnetStrength]);

    return (
        <div
            ref={magnetRef}
            className={\`relative inline-block \${wrapperClassName}\`}
        >
            <div
                className={innerClassName}
                style={{
                    transform: \`translate3d(\${position.x}px, \${position.y}px, 0)\`,
                    transition: isActive ? activeTransition : inactiveTransition,
                    willChange: "transform",
                }}
            >
                {children}
            </div>
        </div>
    );
}`,
    usage: `"use client";

import Magnet from "@/components/ui/Magnet";
import { Move } from "lucide-react";

export default function MagnetDemo() {
    return (
        <div className="relative w-full h-[300px] flex items-center justify-center bg-transparent">
            <Magnet padding={200} magnetStrength={3}>
                <button className="group relative px-8 py-4 bg-foreground text-background rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                    <Move className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span>Magnetic Button</span>
                </button>
            </Magnet>
        </div>
    );
}`,
  },

  "aurora-background": {
    code: `"use client";

  import { Color, Program, Mesh, Triangle, Renderer } from "ogl";
  import { useEffect, useRef } from "react";

  interface AuroraBackgroundProps {
    colorStops?: string[];
amplitude ?: number;
blend ?: number;
speed ?: number;
}

export default function AuroraBackground({
  colorStops = ["#00d8ff", "#7cff67", "#00d8ff"],
  amplitude = 1.0,
  blend = 0.5,
  speed = 1.0,
}: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Create Renderer
    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });

    const gl = renderer.gl;
    // Clear color to transparent
    gl.clearColor(0, 0, 0, 0);

    // Append canvas
    container.appendChild(gl.canvas);

    // Handle Resize
    function resize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height, 0];
      }
    }
    window.addEventListener("resize", resize);

    // Geometry - Full screen triangle
    const geometry = new Triangle(gl);

    // Colors processing
    const c1 = new Color(colorStops[0]);
    const c2 = new Color(colorStops[1]);
    const c3 = new Color(colorStops[2]);

    // Shader Program
    const program = new Program(gl, {
      vertex: \`
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 0, 1);
        }
      \`,
            fragment: \`
        precision highp float;
        uniform float uTime;
        uniform float uAmplitude;
        uniform vec3 uColorStops[3];
        uniform vec2 uResolution;
        uniform float uBlend;
        varying vec2 vUv;

        // Simplex noise function
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                   -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
            dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
            vec3 c1 = uColorStops[0];
            vec3 c2 = uColorStops[1];
            vec3 c3 = uColorStops[2];
            
            vec2 uv = gl_FragCoord.xy / uResolution;
            
            // Allow more vertical movement for the aurora feel
            float noiseVal = snoise(vec2(uv.x * 2.0, uv.y * 1.5 - uTime * 0.1));
            
            float aurora = smoothstep(0.0, uBlend * 1.5, noiseVal * uAmplitude);
            
            // Mix colors based on position and noise
            vec3 color = mix(c1, c2, uv.x + noiseVal * 0.2);
            color = mix(color, c3, uv.y + noiseVal * 0.2);
            
            // Add some "air" transparency
            float alpha = aurora * 0.8;
            
            gl_FragColor = vec4(color, alpha);
        }
      \`,
            uniforms: {
                uTime: { value: 0 },
                uAmplitude: { value: amplitude },
                uColorStops: { value: [c1, c2, c3] },
                uResolution: { value: [container.clientWidth, container.clientHeight, 0] },
                uBlend: { value: blend },
            },
            transparent: true,
            depthTest: false,
        });

        const mesh = new Mesh(gl, { geometry, program });
        let animationId: number;

        function update(t: number) {
            animationId = requestAnimationFrame(update);
            const time = t * 0.001 * speed;
            program.uniforms.uTime.value = time;
            renderer.render({ scene: mesh });
            ctRef.current = t;
        }
        animationId = requestAnimationFrame(update);
        resize();

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            if (container && gl.canvas && container.contains(gl.canvas)) {
                container.removeChild(gl.canvas);
            }
        };
    }, [colorStops, amplitude, blend, speed]);

    return <div ref={containerRef} className="w-full h-full absolute inset-0 pointer-events-none" />;
}`,
    usage: `import AuroraBackground from '@/components/ui/AuroraBackground';

export default function Example() {
  return (
    <div className="relative w-full h-[400px] bg-slate-900 overflow-hidden rounded-lg">
      <AuroraBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-4xl font-bold">Aurora Effect</h1>
      </div>
    </div>
  );
}`,
  },




  "fade-up-text": {
    code: `"use client";
  import { motion } from "framer-motion";

  interface Props {
    text: string;
    className?: string;
    delay?: number;
  }

  export function FadeUpText({ text, className = "", delay = 0 }: Props) {
    const words = text.split(" ");

    return (
      <div className= { \`flex flex-wrap gap-2 \${className}\`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.1 }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}`,
    usage: `import { FadeUpText } from "@/components/ui/FadeUpText";

export default function Example() {
  return (
    <h1 className="text-3xl font-bold">
      <FadeUpText text="Welcome to our site" delay={0.2} />
    </h1>
  );
}`,
  },

  "blur-reveal": {
    code: `"use client";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

export function BlurReveal({ children, duration = 1, delay = 0 }: Props) {
  return (
    <motion.span
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.span>
  );
}`,
    usage: `import { BlurReveal } from "@/components/ui/BlurReveal";

export default function Example() {
  return (
    <h1 className="text-3xl font-bold">
      <BlurReveal duration={1} delay={0.2}>
        Blur Reveal Effect
      </BlurReveal>
    </h1>
  );
}`,
  },

  // ============================================
  // ANIMATIONS
  // ============================================
  "fade-in": {
    code: `"use client";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

export function FadeIn({ children, duration = 0.8, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}`,
    usage: `import { FadeIn } from "@/components/animations/FadeIn";

export default function Example() {
  return (
    <FadeIn duration={0.8} delay={0.2}>
      <div className="p-6 bg-white/10 rounded-xl">
        Content fades in smoothly
      </div>
    </FadeIn>
  );
}`,
  },

  "slide-up": {
    code: `"use client";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  distance?: number;
}

export function SlideUp({ children, duration = 0.6, delay = 0, distance = 30 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}`,
    usage: `import { SlideUp } from "@/components/animations/SlideUp";

export default function Example() {
  return (
    <SlideUp duration={0.6} delay={0.1}>
      <div className="p-6 bg-white/10 rounded-xl">
        Slides up into view
      </div>
    </SlideUp>
  );
}`,
  },

  "scale-in": {
    code: `"use client";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

export function ScaleIn({ children, duration = 0.5, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}`,
    usage: `import { ScaleIn } from "@/components/animations/ScaleIn";

export default function Example() {
  return (
    <ScaleIn duration={0.5}>
      <div className="p-6 bg-white/10 rounded-xl">
        Scales in from smaller size
      </div>
    </ScaleIn>
  );
}`,
  },

  "stagger-list": {
    code: `"use client";
import { motion } from "framer-motion";

interface Props {
  items: React.ReactNode[];
  staggerDelay?: number;
}

export function StaggerList({ items, staggerDelay = 0.1 }: Props) {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className="space-y-2"
    >
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}`,
    usage: `import { StaggerList } from "@/components/animations/StaggerList";

export default function Example() {
  const items = [
    <div className="p-3 bg-white/10 rounded">Item 1</div>,
    <div className="p-3 bg-white/10 rounded">Item 2</div>,
    <div className="p-3 bg-white/10 rounded">Item 3</div>,
  ];

  return <StaggerList items={items} staggerDelay={0.15} />;
}`,
  },

  "bounce-in": {
    code: `"use client";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
}

export function BounceIn({ children, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}`,
    usage: `import { BounceIn } from "@/components/animations/BounceIn";

export default function Example() {
  return (
    <BounceIn delay={0.2}>
      <div className="p-6 bg-white/10 rounded-xl">
        Bounces in with spring physics
      </div>
    </BounceIn>
  );
}`,
  },

  // ============================================
  // EFFECTS
  // ============================================
  "glow-button": {
    code: `"use client";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export function GlowButton({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium overflow-hidden group"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
    </button>
  );
}`,
    usage: `import { GlowButton } from "@/components/ui/GlowButton";

export default function Example() {
  return (
    <GlowButton onClick={() => console.log("clicked")}>
      Click Me
    </GlowButton>
  );
}`,
  },

  "ripple-button": {
    code: `"use client";
import { useState, useRef } from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function RippleButton({ children, onClick, className = "" }: Props) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
    
    onClick?.();
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={\`relative overflow-hidden \${className}\`}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 animate-ripple"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </button>
  );
}`,
    usage: `import { RippleButton } from "@/components/ui/RippleButton";

export default function Example() {
  return (
    <RippleButton className="px-8 py-3 rounded-xl bg-blue-600 text-white">
      Click for Ripple
    </RippleButton>
  );
}`,
  },

  "shimmer-effect": {
    code: `"use client";

interface Props {
  width?: string;
  height?: string;
  className?: string;
}

export function Shimmer({ width = "100%", height = "1rem", className = "" }: Props) {
  return (
    <div
      className={\`rounded bg-white/10 overflow-hidden relative \${className}\`}
      style={{ width, height }}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

export function ShimmerCard() {
  return (
    <div className="space-y-3 p-4 rounded-xl bg-white/5">
      <Shimmer height="8rem" />
      <Shimmer width="60%" />
      <Shimmer width="80%" />
    </div>
  );
}`,
    usage: `import { Shimmer, ShimmerCard } from "@/components/ui/Shimmer";

export default function Loading() {
  return (
    <div className="space-y-4">
      <Shimmer height="1rem" width="200px" />
      <ShimmerCard />
    </div>
  );
}`,
  },

  "hover-lift": {
    code: `"use client";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function HoverLift({ children, className = "" }: Props) {
  return (
    <div
      className={\`transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 cursor-pointer \${className}\`}
    >
      {children}
    </div>
  );
}`,
    usage: `import { HoverLift } from "@/components/ui/HoverLift";

export default function Example() {
  return (
    <HoverLift className="p-6 rounded-xl bg-white/5 border border-white/10">
      <h3>Hover me</h3>
      <p>I lift up on hover</p>
    </HoverLift>
  );
}`,
  },

  "gradient-border": {
    code: `"use client";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function GradientBorder({ children, className = "" }: Props) {
  return (
    <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-[length:200%_auto] animate-gradient">
      <div className={\`rounded-xl bg-gray-900 \${className}\`}>
        {children}
      </div>
    </div>
  );
}`,
    usage: `import { GradientBorder } from "@/components/ui/GradientBorder";

export default function Example() {
  return (
    <GradientBorder className="p-6">
      <h3 className="text-white">Card Title</h3>
      <p className="text-gray-400">With animated gradient border</p>
    </GradientBorder>
  );
}`,
  },

  // ============================================
  // UI COMPONENTS
  // ============================================
  "glass-card": {
    code: `"use client";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: Props) {
  return (
    <div
      className={\`p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 \${className}\`}
    >
      {children}
    </div>
  );
}`,
    usage: `import { GlassCard } from "@/components/ui/GlassCard";

export default function Example() {
  return (
    <GlassCard className="max-w-sm">
      <h3 className="font-semibold mb-2">Glass Card</h3>
      <p className="text-sm opacity-70">
        Beautiful frosted glass effect
      </p>
    </GlassCard>
  );
}`,
  },

  "animated-counter": {
    code: `"use client";
import { useState, useEffect } from "react";

interface Props {
  target: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ target, duration = 2000, className = "" }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span className={\`tabular-nums \${className}\`}>
      {count.toLocaleString()}
    </span>
  );
}`,
    usage: `import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export default function Stats() {
  return (
    <div className="text-5xl font-bold">
      <AnimatedCounter target={10000} duration={2000} />
    </div>
  );
}`,
  },

  "toggle-switch": {
    code: `"use client";
import { motion } from "framer-motion";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function ToggleSwitch({ checked, onChange, disabled = false }: Props) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={\`w-14 h-8 rounded-full p-1 transition-colors duration-200 \${
        checked ? "bg-purple-600" : "bg-gray-600"
      } \${disabled ? "opacity-50 cursor-not-allowed" : ""}\`}
    >
      <motion.div
        animate={{ x: checked ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-6 h-6 rounded-full bg-white"
      />
    </button>
  );
}`,
    usage: `"use client";
import { useState } from "react";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";

export default function Example() {
  const [enabled, setEnabled] = useState(false);

  return (
    <ToggleSwitch checked={enabled} onChange={setEnabled} />
  );
}`,
  },

  "progress-bar": {
    code: `"use client";
import { motion } from "framer-motion";

interface Props {
  value: number;
  max?: number;
  className?: string;
}

export function ProgressBar({ value, max = 100, className = "" }: Props) {
  const percentage = Math.min(100, (value / max) * 100);

  return (
    <div className={\`h-3 rounded-full bg-white/10 overflow-hidden \${className}\`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: \`\${percentage}%\` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
      />
    </div>
  );
}`,
    usage: `import { ProgressBar } from "@/components/ui/ProgressBar";

export default function Example() {
  return (
    <div className="space-y-4">
      <ProgressBar value={75} />
      <ProgressBar value={50} max={100} />
    </div>
  );
}`,
  },

  "notification-badge": {
    code: `"use client";

interface Props {
  children: React.ReactNode;
  count: number;
  showZero?: boolean;
}

export function NotificationBadge({ children, count, showZero = false }: Props) {
  const showBadge = showZero || count > 0;

  return (
    <div className="relative inline-block">
      {children}
      {showBadge && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </div>
  );
}`,
    usage: `import { NotificationBadge } from "@/components/ui/NotificationBadge";
import { Bell } from "lucide-react";

export default function Example() {
  return (
    <NotificationBadge count={5}>
      <button className="p-3 rounded-xl bg-white/10">
        <Bell className="w-5 h-5" />
      </button>
    </NotificationBadge>
  );
}`,
  },

  // ============================================
  // BACKGROUNDS
  // ============================================
  "gradient-mesh": {
    code: `"use client";

export function GradientMeshBg({ className = "" }: { className?: string }) {
  return (
    <div className={\`absolute inset-0 overflow-hidden \${className}\`}>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-pink-500 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>
    </div>
  );
}`,
    usage: `import { GradientMeshBg } from "@/components/backgrounds/GradientMesh";

export default function Section() {
  return (
    <section className="relative min-h-screen">
      <GradientMeshBg />
      <div className="relative z-10">
        {/* Your content */}
      </div>
    </section>
  );
}`,
  },

  "dot-grid": {
    code: `"use client";

interface Props {
  color?: string;
  size?: number;
  spacing?: number;
}

export function DotGridBg({ color = "rgba(168,85,247,0.3)", size = 1, spacing = 20 }: Props) {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: \`radial-gradient(circle, \${color} \${size}px, transparent \${size}px)\`,
        backgroundSize: \`\${spacing}px \${spacing}px\`,
      }}
    />
  );
}`,
    usage: `import { DotGridBg } from "@/components/backgrounds/DotGrid";

export default function Section() {
  return (
    <section className="relative min-h-screen bg-gray-900">
      <DotGridBg color="rgba(168,85,247,0.2)" spacing={24} />
      <div className="relative z-10">
        {/* Your content */}
      </div>
    </section>
  );
}`,
  },

  "aurora-bg": {
    code: `"use client";

export function AuroraBg({ className = "" }: { className?: string }) {
  return (
    <div className={\`absolute inset-0 overflow-hidden \${className}\`}>
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 via-cyan-500/20 to-purple-500/20 animate-aurora" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-aurora animation-delay-2000" />
    </div>
  );
}`,
    usage: `import { AuroraBg } from "@/components/backgrounds/Aurora";

export default function Section() {
  return (
    <section className="relative min-h-screen bg-gray-900">
      <AuroraBg />
      <div className="relative z-10">
        {/* Your content */}
      </div>
    </section>
  );
}`,
  },

  "noise-texture": {
    code: `"use client";

interface Props {
  opacity?: number;
  className?: string;
}

export function NoiseTexture({ opacity = 0.1, className = "" }: Props) {
  return (
    <div
      className={\`absolute inset-0 pointer-events-none \${className}\`}
      style={{
        opacity,
        backgroundImage: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")\`,
      }}
    />
  );
}`,
    usage: `import { NoiseTexture } from "@/components/backgrounds/NoiseTexture";

export default function Section() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
      <NoiseTexture opacity={0.15} />
      <div className="relative z-10">
        {/* Your content */}
      </div>
    </section>
  );
}`,
  },

  "splash-cursor": {
    code: `"use client";

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

      if (pointerRef.current.down || (Math.random() < 0.05 && (Math.abs(pointerRef.current.x) > 0 || Math.abs(pointerRef.current.y) > 0))) {
        ripplesRef.current.push({
            x: pointerRef.current.x,
            y: pointerRef.current.y,
            r: 0,
            opacity: 1
        });
      }

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const ripple = ripplesRef.current[i];
        ripple.r += splashForce;
        ripple.opacity *= dissipation;

        if (ripple.opacity < 0.01) {
          ripplesRef.current.splice(i, 1);
        } else {
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
            ctx.fillStyle = splashColor.replace("0.5", ripple.opacity.toFixed(2));
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
        
        ripplesRef.current.push({
            x: pointerRef.current.x, 
            y: pointerRef.current.y, 
            r: 0, 
            opacity: 1
        });
    };
    
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
}`,
    usage: `import SplashCursor from '@/components/ui/SplashCursor';

export default function Hero() {
  return (
    <div className="relative min-h-screen">
      <SplashCursor />
      {/* Rest of your content */}
    </div>
  );
}`,
  },
  "spotlight-card": {
    code: `"use client";

import { useRef, useState, MouseEvent } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={\`relative rounded-xl border border-white/10 bg-white/5 overflow-hidden \${className}\`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500"
        style={{
          opacity,
          background: \`radial-gradient(600px circle at \${position.x}px \${position.y}px, \${spotlightColor}, transparent 40%)\`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}"`,
    usage: `import SpotlightCard from '@/components/ui/SpotlightCard';

export default function Cards() {
  return (
    <SpotlightCard className="p-8 h-64" spotlightColor="rgba(0, 229, 255, 0.2)">
      <h3 className="text-2xl font-bold mb-4">Hover Me</h3>
      <p className="text-gray-400">
        Move your mouse over this card to see the spotlight effect.
      </p>
    </SpotlightCard>
  );
}`,
  },
  "tilted-scroll": {
    code: `"use client";

import { useRef, useState } from "react";

interface TiltedScrollProps {
  children: React.ReactNode;
  className?: string;
  tiltAngle?: number;
}

export default function TiltedScroll({
  children,
  className = "",
  tiltAngle = -15
}: TiltedScrollProps) {
  return (
    <div className= {\`relative overflow-hidden \${className}\`}>
      <div 
          className="flex flex-col gap-4 will-change-transform"
          style={{
              transform: \`rotate(\${tiltAngle}deg) translateZ(0)\`,
              transformOrigin: "center center",
          }}
      >
          {children}
      </div>
      
      {/* Gradient Masks for fading edges */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
  </div>
);
}"`,
    usage: `import TiltedScroll from '@/components/ui/TiltedScroll';

export default function List() {
  return (
    <TiltedScroll className="h-[400px] w-full" tiltAngle={-10}>
      <div className="p-4 bg-white/5 rounded">Item 1</div>
      <div className="p-4 bg-white/5 rounded">Item 2</div>
      <div className="p-4 bg-white/5 rounded">Item 3</div>
    </TiltedScroll>
  );
}`,
  },

};

export function getComponentCode(slug: string): string {
  return componentCodes[slug]?.code || `// Component code for "${slug}" not found`;
}

export function getComponentUsage(slug: string): string {
  return componentCodes[slug]?.usage || `// Usage example for "${slug}" not found`;
}

