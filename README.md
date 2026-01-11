# ReactAtoms

**Atomic React components for building stunning user interfaces.**

A production-ready collection of premium React components featuring smooth animations, dynamic backgrounds, and interactive text effects. Built with TypeScript, Tailwind CSS, and Framer Motion.

---

## Why ReactAtoms?

Modern web applications demand polished, interactive UI components. ReactAtoms provides copy-paste-ready components that work out of the box—no complex setup, no vendor lock-in. Each component is atomic, customizable, and performance-optimized.

## Features

- **🎨 Text Animations** — Gradient text, glitch effects, typewriter, split text, and more
- **⚡ Micro-Interactions** — Magnetic buttons, ripple effects, hover lifts, shimmer loading
- **🌌 Dynamic Backgrounds** — Aurora effects, orbital fluids, gradient meshes, noise textures
- **🎯 UI Components** — Glass cards, spotlight effects, animated counters, progress bars
- **📱 Fully Responsive** — Works seamlessly across all devices
- **🎭 Framer Motion Powered** — Smooth, performant animations
- **⚙️ TypeScript First** — Full type safety and IntelliSense support
- **🎨 Tailwind CSS** — Easy customization with utility classes

## Installation

```bash
npm install framer-motion clsx tailwind-merge
```

## Quick Start

```tsx
import { GradientText } from "@/components/ui/GradientText";

export default function App() {
  return (
    <div className="p-8">
      <GradientText
        text="Beautiful Gradient Text"
        colors={["#a855f7", "#ec4899", "#6366f1"]}
      />
    </div>
  );
}
```

## Documentation

Visit [reactatoms.dev](https://reactatoms.dev) for:
- Live component previews
- Interactive demos
- Full API documentation
- Copy-paste code snippets

## Project Structure

```
reactatoms/
├── src/
│   ├── components/
│   │   ├── ui/          # Core components
│   │   └── demos/       # Demo implementations
│   ├── app/             # Next.js app router
│   └── data/            # Component metadata
├── public/              # Static assets
└── docs/                # Documentation
```

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Submitting bug reports
- Proposing new components
- Creating pull requests
- Code style and conventions

## Security

Found a security issue? Please refer to [SECURITY.md](SECURITY.md) for responsible disclosure guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Credits

**Created and maintained by [Anish Raj](https://github.com/anish-devgit)**

---

<div align="center">
  <sub>Built with ❤️ for the React community</sub>
</div>
