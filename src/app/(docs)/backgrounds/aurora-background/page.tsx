"use client";

import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

export default function AuroraBackgroundPage() {
  return (
    <ComponentDocTemplate
      slug="aurora-background"
      title="Aurora Background"
      description="A fluid, calming aurora borealis effect using WebGL and Simplex Noise."
      packageName="@/components/ui/AuroraBackground"
      props={[
        { name: "colorStops", type: "string[]", defaultValue: "['#00d8ff', '#7cff67', '#00d8ff']", description: "Array of 3 hex colors for the aurora" },
        { name: "speed", type: "number", defaultValue: "1.0", description: "Animation speed multiplier" },
        { name: "amplitude", type: "number", defaultValue: "1.0", description: "Wave amplitude" },
      ]}
      componentCode={`
import { Color, Program, Mesh, Triangle, Renderer } from "ogl";
import { useEffect, useRef } from "react";

interface AuroraBackgroundProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
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

    // Shader Program with Simplex Noise
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
        // ... (Simplex Noise implementation omitted for brevity) ... 
        float snoise(vec2 v){
          // ... implementation ...
          return 130.0 * dot(m, g); // dummy return
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
}`}
      usageCode={`
import AuroraBackground from '@/components/ui/AuroraBackground';

<div className="relative h-[400px] w-full bg-black">
  <AuroraBackground 
    colorStops={["#5227FF", "#7cff67", "#5227FF"]} 
    speed={0.5} 
  />
</div>
`}
    />
  );
}
