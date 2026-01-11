"use client";

import { memo } from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

interface Props {
    slug: string;
    theme?: "dark" | "light";
}

// Dynamically import demo components
const demoComponents: Record<string, ComponentType> = {
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
    "split-text": dynamic(() => import("@/components/demos/SplitTextDemo")),
    "blur-text": dynamic(() => import("@/components/demos/BlurTextDemo")),
    "true-focus": dynamic(() => import("@/components/demos/TrueFocusDemo")),
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
    "aurora-bg": dynamic(() => import("@/components/demos/AuroraBackgroundDemo")), // Alias
    "orbital-fluids": dynamic(() => import("@/components/demos/OrbitalFluids").then(mod => ({ default: mod.OrbitalFluidsDemo }))),
    "grid-vortex": dynamic(() => import("@/components/demos/GridVortex").then(mod => ({ default: mod.GridVortexDemo }))),
    "gradient-mesh": dynamic(() => import("@/components/demos/GradientMeshDemo")),
    "dot-grid": dynamic(() => import("@/components/demos/DotGridDemo")),
    "noise-texture": dynamic(() => import("@/components/demos/NoiseTextureDemo")),
};

function ComponentPreviewComponent({ slug, theme = "dark" }: Props) {
    const PreviewComponent = demoComponents[slug];

    if (!PreviewComponent) {
        return (
            <div className="flex items-center justify-center min-h-[200px] p-8">
                <div className="text-foreground-muted text-sm">
                    Preview not available
                </div>
            </div>
        );
    }

    return (
        <div className={clsx(
            "flex items-center justify-center min-h-[200px] p-8",
            theme === "light" && "bg-white rounded-xl"
        )}>
            <PreviewComponent />
        </div>
    );
}

export const ComponentPreview = memo(ComponentPreviewComponent);
