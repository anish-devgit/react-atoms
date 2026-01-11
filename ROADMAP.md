# ReactAtoms Roadmap

**Vision**: ReactAtoms aims to become the most elegant, copy-paste-ready animation & UI library for modern React apps.

This roadmap outlines our direction, priorities, and implementation timeline. It is community-driven and evolves based on your feedback.

---

## 🗺️ Roadmap Phases

### ✅ Phase 1: Foundation (Completed)
*Establish the core architecture and accessible documentation.*
- [x] **Documentation Infrastructure**: MDX-based docs with live previews and copy-paste code.
- [x] **Core Text Animations**: High-quality text effects (Flux, Aurora, Quantum).
- [x] **Background Effects**: Canvas-based interactive backgrounds.
- [x] **Live Previews**: Interactive playgrounds for all components.
- [x] **OSS Hygiene**: Issue templates, PR templates, CI/CD, and automation.

### 🚧 Phase 2: Component Expansion (In Progress)
*Scale the library to cover common UI patterns with motion.*
- [ ] **20+ Additional Text Animations**: Expanding the text effects library.
- [ ] **High-Impact UI Components**: Dock, Apple-style Carousel, Spotlight Cards.
- [ ] **Performance Optimizations**: Guards for heavy canvas / WebGL effects.
- [ ] **Mobile Improvements**: Better touch interactions and responsive layouts.
- [ ] **Accessibility Audit**: Ensuring full WCAG compliance (ARIA, keyboard nav).

### 🔜 Phase 3: Advanced Experiences (Planned)
*Complex, composition-ready layouts and interactions.*
- [ ] **Complex Layouts**: Bento grids, dashboard shells, split-screen layouts.
- [ ] **Advanced Backgrounds**: Deeper WebGL integrations and fluid simulations.
- [ ] **Gesture-Driven Components**: Draggable, swipeable, and physics-based interactions.

### 🌱 Phase 4: Ecosystem & Community (Future)
*Building tools and community around the library.*
- [ ] **Contributor Spotlight**: Showcasing top community contributions.
- [ ] **Community Components**: Curated components built by you.
- [ ] **Presets & Themes**: Drop-in design tokens.
- [ ] **Framework Adapters**: Potential support for Astro/Vue (long-term).

---

## 🤝 How You Can Help

We welcome contributions of all sizes! Here is how you can get involved:

- **Pick an Issue**: Look for [good first issue](https://github.com/anish-devgit/react-atoms/labels/good%20first%20issue) or [help wanted](https://github.com/anish-devgit/react-atoms/labels/help%20wanted) labels.
- **Improve Documentation**: Fix typos, add examples, or improve clarity.
- **Suggest Components**: Have a cool animation idea? Open a feature request.
- **Optimize Performance**: Help us make animations smoother on lower-end devices.

👉 Read our [Contributing Guide](CONTRIBUTING.md) to get started.

---

## 🚫 Non-Goals

To maintain quality and flexibility, we explicitly **avoid**:
- **Heavy Abstractions**: We prefer copy-paste code over complex NPM packages.
- **Vendor Lock-in**: You own the code. Modify it as you see fit.
- **Runtime Dependencies**: We rely on standard libraries (Framer Motion, Tailwind) and avoid bloat.

---

*This roadmap is a living document. Last updated: January 2026.*
