export interface ComponentItem {
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  isNew?: boolean;
}

// Text Animations (6 fully implemented components)
const textAnimations: ComponentItem[] = [
  {
    slug: "gradient-text",
    name: "Gradient Text",
    description: "Animated gradient flowing through text",
    category: "text-animations",
    tags: ["text", "gradient", "color"],
  },
  {
    slug: "glitch-text",
    name: "Glitch Text",
    description: "Cyberpunk-style glitch distortion effect",
    category: "text-animations",
    tags: ["text", "glitch", "cyber"],
    isNew: true,
  },
  {
    slug: "typewriter",
    name: "Typewriter",
    description: "Classic typewriter effect with blinking cursor",
    category: "text-animations",
    tags: ["text", "typewriter", "cursor"],
  },
  {
    slug: "wave-text",
    name: "Wave Text",
    description: "Characters animate in a wave pattern",
    category: "text-animations",
    tags: ["text", "wave", "animation"],
  },
  {
    slug: "fade-up-text",
    name: "Fade Up Text",
    description: "Text fades in from below with stagger",
    category: "text-animations",
    tags: ["text", "fade", "stagger"],
  },
  {
    slug: "quantum-focus",
    name: "Quantum Focus",
    description: "Magnetic text focus with quantum distortion",
    category: "text-animations",
    tags: ["text", "focus", "interactive"],
    isNew: true,
  },
  {
    slug: "flux-text",
    name: "Flux Text",
    description: "Entropy-based text decoding effect",
    category: "text-animations",
    tags: ["text", "decode", "cyber"],
    isNew: true,
  },
  {
    slug: "aurora-text",
    name: "Aurora Text",
    description: "Organic shimmering magnetic plasma",
    category: "text-animations",
    tags: ["text", "gradient", "aurora"],
    isNew: true,
  },
  {
    slug: "mist-reveal",
    name: "Mist Reveal",
    description: "Directional vaporous text entry",
    category: "text-animations",
    tags: ["text", "blur", "vapor"],
    isNew: true,
  },
  {
    slug: "blur-reveal",
    name: "Blur Reveal",
    description: "Text reveals from blur to focus",
    category: "text-animations",
    tags: ["text", "blur", "reveal"],
    isNew: true,
  },
];

// Animations (5 components)
const animations: ComponentItem[] = [
  {
    slug: "fade-in",
    name: "Fade In",
    description: "Smooth fade entrance animation",
    category: "animations",
    tags: ["fade", "entrance", "opacity"],
  },
  {
    slug: "slide-up",
    name: "Slide Up",
    description: "Slide in from bottom animation",
    category: "animations",
    tags: ["slide", "entrance", "motion"],
  },
  {
    slug: "scale-in",
    name: "Scale In",
    description: "Scale from small to full size",
    category: "animations",
    tags: ["scale", "entrance", "zoom"],
  },
  {
    slug: "stagger-list",
    name: "Stagger List",
    description: "Sequential staggered list animations",
    category: "animations",
    tags: ["stagger", "list", "sequence"],
    isNew: true,
  },
  {
    slug: "bounce-in",
    name: "Bounce In",
    description: "Bouncy spring entrance animation",
    category: "animations",
    tags: ["bounce", "spring", "playful"],
  },
  {
    slug: "magnet",
    name: "Magnet",
    description: "Magnetic cursor tracking effect",
    category: "animations",
    tags: ["magnet", "cursor", "interaction"],
    isNew: true,
  },
];

// Effects (5 components)
const effects: ComponentItem[] = [
  {
    slug: "glow-button",
    name: "Glow Button",
    description: "Button with animated glowing border",
    category: "effects",
    tags: ["button", "glow", "hover"],
  },
  {
    slug: "ripple-button",
    name: "Ripple Button",
    description: "Material design ripple on click",
    category: "effects",
    tags: ["button", "ripple", "click"],
  },
  {
    slug: "shimmer-effect",
    name: "Shimmer Effect",
    description: "Loading shimmer/skeleton effect",
    category: "effects",
    tags: ["loading", "shimmer", "skeleton"],
  },
  {
    slug: "hover-lift",
    name: "Hover Lift",
    description: "Card lifts with shadow on hover",
    category: "effects",
    tags: ["hover", "shadow", "lift"],
    isNew: true,
  },
  {
    slug: "gradient-border",
    name: "Gradient Border",
    description: "Animated rainbow gradient border",
    category: "effects",
    tags: ["border", "gradient", "rainbow"],
  },
];

// UI Components (5 components)
const uiComponents: ComponentItem[] = [
  {
    slug: "glass-card",
    name: "Glass Card",
    description: "Frosted glass morphism card",
    category: "components",
    tags: ["card", "glass", "blur"],
  },
  {
    slug: "animated-counter",
    name: "Animated Counter",
    description: "Number counting up animation",
    category: "components",
    tags: ["counter", "number", "stats"],
  },
  {
    slug: "toggle-switch",
    name: "Toggle Switch",
    description: "Smooth animated toggle switch",
    category: "components",
    tags: ["toggle", "switch", "input"],
  },
  {
    slug: "progress-bar",
    name: "Progress Bar",
    description: "Animated progress indicator",
    category: "components",
    tags: ["progress", "loading", "bar"],
    isNew: true,
  },
  {
    slug: "notification-badge",
    name: "Notification Badge",
    description: "Pulsing notification indicator",
    category: "components",
    tags: ["badge", "notification", "pulse"],
  },
  {
    slug: "spotlight-card",
    name: "Spotlight Card",
    description: "Card with mouse-following gradient spotlight",
    category: "components",
    tags: ["card", "spotlight", "gradient", "hover"],
    isNew: true,
  },
  {
    slug: "tilted-scroll",
    name: "Tilted Scroll",
    description: "3D skewed scrolling list perspective",
    category: "components",
    tags: ["scroll", "3d", "skew", "list"],
    isNew: true,
  },
  {
    slug: "splash-cursor",
    name: "Splash Cursor",
    description: "Fluid splash and ripple cursor effect",
    category: "animations",
    tags: ["cursor", "splash", "ripple", "interaction"],
    isNew: true,
  },
];

// Backgrounds (4 components)
const backgrounds: ComponentItem[] = [
  {
    slug: "orbital-fluids",
    name: "Orbital Fluids",
    description: "Interactive gravity-based particle system",
    category: "backgrounds",
    tags: ["canvas", "particles", "physics"],
    isNew: true,
  },
  {
    slug: "grid-vortex",
    name: "Grid Vortex",
    description: "Geometric warping grid background",
    category: "backgrounds",
    tags: ["grid", "warp", "3d"],
    isNew: true,
  },
  {
    slug: "gradient-mesh",
    name: "Gradient Mesh",
    description: "Animated gradient mesh background",
    category: "backgrounds",
    tags: ["gradient", "mesh", "animated"],
  },
  {
    slug: "dot-grid",
    name: "Dot Grid",
    description: "Subtle animated dot pattern",
    category: "backgrounds",
    tags: ["dots", "grid", "pattern"],
  },
  {
    slug: "aurora-bg",
    name: "Aurora",
    description: "Northern lights aurora effect",
    category: "backgrounds",
    tags: ["aurora", "gradient", "glow"],
    isNew: true,
  },
  {
    slug: "noise-texture",
    name: "Noise Texture",
    description: "Subtle grain/noise overlay",
    category: "backgrounds",
    tags: ["noise", "grain", "texture"],
  },
  {
    slug: "aurora-background",
    name: "Aurora Background",
    description: "Fluid WebGL aurora effect",
    category: "backgrounds",
    tags: ["aurora", "shader", "webgl"],
    isNew: true,
  },
];

// All components combined (25 total)
export const components: ComponentItem[] = [
  ...textAnimations,
  ...animations,
  ...effects,
  ...backgrounds,
  ...uiComponents,
];

// Helper functions
export function getComponentsByCategory(categoryId: string): ComponentItem[] {
  return components.filter((comp) => comp.category === categoryId);
}

export function getComponentBySlug(slug: string): ComponentItem | undefined {
  return components.find((comp) => comp.slug === slug);
}

export function searchComponents(query: string): ComponentItem[] {
  const q = query.toLowerCase();
  return components.filter(
    (comp) =>
      comp.name.toLowerCase().includes(q) ||
      comp.description.toLowerCase().includes(q) ||
      comp.tags.some((tag) => tag.includes(q))
  );
}

export function getNewComponents(): ComponentItem[] {
  return components.filter((comp) => comp.isNew);
}
