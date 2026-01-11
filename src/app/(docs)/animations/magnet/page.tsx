"use client";

import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

export default function MagnetPage() {
  return (
    <ComponentDocTemplate
      slug="magnet"
      title="Magnet"
      description="A magnetic cursor-following effect that pulls elements towards the mouse position."
      packageName="@/components/ui/Magnet"
      props={[
        { name: "children", type: "React.ReactNode", description: "The element to magnetize", required: true },
        { name: "padding", type: "number", defaultValue: "100", description: "Distance around element to trigger effect" },
        { name: "disabled", type: "boolean", defaultValue: "false", description: "Disable the effect" },
        { name: "magnetStrength", type: "number", defaultValue: "2", description: "Strength of the magnetic pull (higher is weaker)" },
      ]}
      componentCode={`
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
}`}
      usageCode={`
import Magnet from '@/components/ui/Magnet';

// Wrap any element to make it magnetic
<Magnet padding={200} magnetStrength={3}>
  <button className="px-6 py-3 bg-white text-black rounded-full">
    Hover Me
  </button>
</Magnet>
`}
    />
  );
}
