"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

// Dynamically import demo components
const demos: Record<string, ComponentType> = {
    // Text Animations
    "gradient-text": dynamic(() => import("@/components/demos/GradientText").then(mod => ({ default: mod.GradientText }))),
    "glitch-text": dynamic(() => import("@/components/demos/GlitchText").then(mod => ({ default: mod.GlitchText }))),
    "blur-reveal": dynamic(() => import("@/components/demos/BlurReveal").then(mod => ({ default: mod.BlurReveal }))),
    "wave-text": dynamic(() => import("@/components/demos/WaveTextDemo")),
    "fade-up-text": dynamic(() => import("@/components/demos/FadeUpTextDemo")),
    "quantum-focus": dynamic(() => import("@/components/demos/QuantumFocus").then(mod => ({ default: mod.QuantumFocusDemo }))),
    "flux-text": dynamic(() => import("@/components/demos/FluxText").then(mod => ({ default: mod.FluxTextDemo }))),
    "aurora-text": dynamic(() => import("@/components/demos/AuroraText").then(mod => ({ default: mod.AuroraTextDemo }))),
    "mist-reveal": dynamic(() => import("@/components/demos/MistReveal").then(mod => ({ default: mod.MistRevealDemo }))),
    "typewriter": dynamic(() => import("@/components/demos/TypewriterDemo")),

    // Legacy text demos
    "decrypted-text": dynamic(() => import("@/components/demos/DecryptedTextDemo")),
    "decrypted-text-demo": dynamic(() => import("@/components/demos/DecryptedTextDemo")), // Alias for legacy pages
    "split-text": dynamic(() => import("@/components/demos/SplitTextDemo")),
    "split-text-demo": dynamic(() => import("@/components/demos/SplitTextDemo")), // Alias for legacy pages
    "blur-text": dynamic(() => import("@/components/demos/BlurTextDemo")),
    "blur-text-demo": dynamic(() => import("@/components/demos/BlurTextDemo")), // Alias for legacy pages
    "true-focus": dynamic(() => import("@/components/demos/TrueFocusDemo")),
    "true-focus-demo": dynamic(() => import("@/components/demos/TrueFocusDemo")), // Alias for legacy pages
    "gradient-text-demo": dynamic(() => import("@/components/demos/GradientTextDemo")),

    // Animations
    "fade-in": dynamic(() => import("@/components/demos/FadeIn").then(mod => ({ default: mod.FadeIn }))),
    "slide-up": dynamic(() => import("@/components/demos/SlideUp").then(mod => ({ default: mod.SlideUp }))),
    "scale-in": dynamic(() => import("@/components/demos/ScaleIn").then(mod => ({ default: mod.ScaleIn }))),
    "floating-card": dynamic(() => import("@/components/demos/FloatingCard").then(mod => ({ default: mod.FloatingCard }))),
    "magnet": dynamic(() => import("@/components/demos/MagnetDemo")),
    "splash-cursor": dynamic(() => import("@/components/demos/SplashCursorDemo")),
    "stagger-list": dynamic(() => import("@/components/demos/StaggerListDemo")),
    "bounce-in": dynamic(() => import("@/components/demos/BounceInDemo")),

    // Effects
    "glow-button": dynamic(() => import("@/components/demos/GlowButton").then(mod => ({ default: mod.GlowButton }))),
    "ripple-button": dynamic(() => import("@/components/demos/RippleButton").then(mod => ({ default: mod.RippleButton }))),
    "hover-lift": dynamic(() => import("@/components/demos/HoverLift").then(mod => ({ default: mod.HoverLift }))),
    "shimmer-effect": dynamic(() => import("@/components/demos/ShimmerEffectDemo")),
    "gradient-border": dynamic(() => import("@/components/demos/GradientBorderDemo")),

    // UI Components
    "spotlight-card": dynamic(() => import("@/components/demos/SpotlightCardDemo")),
    "tilted-scroll": dynamic(() => import("@/components/demos/TiltedScrollDemo")),
    "glass-card": dynamic(() => import("@/components/demos/GlassCardDemo")),
    "animated-counter": dynamic(() => import("@/components/demos/AnimatedCounterDemo")),
    "toggle-switch": dynamic(() => import("@/components/demos/ToggleSwitchDemo")),
    "progress-bar": dynamic(() => import("@/components/demos/ProgressBarDemo")),
    "notification-badge": dynamic(() => import("@/components/demos/NotificationBadgeDemo")),

    // Backgrounds
    "aurora-background": dynamic(() => import("@/components/demos/AuroraBackgroundDemo")),
    "aurora-bg": dynamic(() => import("@/components/demos/AuroraBackgroundDemo")), // Alias for aurora component
    "orbital-fluids": dynamic(() => import("@/components/demos/OrbitalFluids").then(mod => ({ default: mod.OrbitalFluidsDemo }))),
    "grid-vortex": dynamic(() => import("@/components/demos/GridVortex").then(mod => ({ default: mod.GridVortexDemo }))),
    "gradient-mesh": dynamic(() => import("@/components/demos/GradientMeshDemo")),
    "dot-grid": dynamic(() => import("@/components/demos/DotGridDemo")),
    "noise-texture": dynamic(() => import("@/components/demos/NoiseTextureDemo")),
};

// Get contextual background based on component category
function getContextBackground(slug: string): string {
    // Text animations - hero section context
    if (['gradient-text', 'glitch-text', 'typewriter', 'wave-text', 'fade-up-text', 'blur-reveal', 'quantum-focus', 'flux-text', 'aurora-text', 'mist-reveal', 'decrypted-text', 'split-text', 'blur-text', 'true-focus', 'gradient-text-demo', 'decrypted-text-demo', 'split-text-demo', 'blur-text-demo', 'true-focus-demo'].includes(slug)) {
        return 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(168, 85, 247, 0.15), transparent), linear-gradient(to bottom, rgba(168, 85, 247, 0.05) 0%, transparent 50%)';
    }

    // Animations - interactive app context
    if (['fade-in', 'slide-up', 'scale-in', 'stagger-list', 'bounce-in', 'magnet', 'splash-cursor', 'floating-card'].includes(slug)) {
        return 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 50%), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 40px, rgba(255, 255, 255, 0.02) 41px)';
    }

    // Effects - button/CTA context
    if (['glow-button', 'ripple-button', 'hover-lift', 'shimmer-effect', 'gradient-border'].includes(slug)) {
        return 'linear-gradient(to bottom, rgba(168, 85, 247, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%), radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.1), transparent 50%)';
    }

    // UI Components - dashboard context
    if (['glass-card', 'animated-counter', 'toggle-switch', 'progress-bar', 'notification-badge', 'spotlight-card', 'tilted-scroll'].includes(slug)) {
        return 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0px, transparent 1px, transparent 20px, rgba(255, 255, 255, 0.03) 21px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0px, transparent 1px, transparent 20px, rgba(255, 255, 255, 0.03) 21px)';
    }

    // Backgrounds - full page context
    if (['orbital-fluids', 'grid-vortex', 'gradient-mesh', 'dot-grid', 'aurora-background', 'aurora-bg', 'noise-texture'].includes(slug)) {
        return 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 100%)';
    }

    // Default
    return 'transparent';
}

interface LivePreviewProps {
    slug: string;
    name: string;
}

export function LivePreview({ slug, name }: LivePreviewProps) {
    const PreviewComponent = demos[slug];
    const contextBg = getContextBackground(slug);

    if (!PreviewComponent) {
        // Fallback animation for components without demos
        return (
            <div className="h-32 flex items-center justify-center" style={{ background: contextBg }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="w-16 h-10 rounded-md bg-gradient-to-br from-white/5 to-white/10 border border-white/5 backdrop-blur-sm"
                />
            </div>
        );
    }

    return (
        <div className="h-32 flex items-center justify-center relative overflow-hidden">
            {/* Contextual background */}
            <div className="absolute inset-0" style={{ background: contextBg }} />

            {/* Component preview */}
            <div className="relative z-10">
                <PreviewComponent />
            </div>
        </div>
    );
}
