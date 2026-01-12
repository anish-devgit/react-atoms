"use client";

import { memo, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// Floating code block component
function CodeBlock({
    position,
    rotation,
    scale = 1,
    delay = 0
}: {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    delay?: number;
}) {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.001;
            meshRef.current.rotation.y += 0.001;
        }
    });

    return (
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
            <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
                {/* Code block background */}
                <mesh>
                    <boxGeometry args={[2, 1.2, 0.08]} />
                    <meshStandardMaterial
                        color="#0f172a"
                        metalness={0.5}
                        roughness={0.8}
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Border glow */}
                <mesh position={[0, 0, -0.01]}>
                    <boxGeometry args={[2.05, 1.25, 0.06]} />
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
                </mesh>

                {/* Code lines */}
                {[-0.35, -0.15, 0.05, 0.25].map((y, i) => (
                    <mesh key={i} position={[-0.3 + i * 0.1, y, 0.05]}>
                        <boxGeometry args={[0.8 - i * 0.15, 0.06, 0.01]} />
                        <meshBasicMaterial
                            color={i === 1 ? "#22d3ee" : i === 3 ? "#a78bfa" : "#64748b"}
                            transparent
                            opacity={0.8}
                        />
                    </mesh>
                ))}

                {/* React icon indicator */}
                <mesh position={[0.7, 0.4, 0.05]}>
                    <circleGeometry args={[0.08, 16]} />
                    <meshBasicMaterial color="#61dafb" transparent opacity={0.9} />
                </mesh>
            </group>
        </Float>
    );
}

// Floating atom/particle representing React component
function ReactAtom({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    const atomRef = useRef<THREE.Group>(null);
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);
    const ring3Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (ring1Ref.current) ring1Ref.current.rotation.z += 0.01;
        if (ring2Ref.current) ring2Ref.current.rotation.x += 0.008;
        if (ring3Ref.current) ring3Ref.current.rotation.y += 0.012;
        if (atomRef.current) {
            atomRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.1;
        }
    });

    return (
        <group ref={atomRef} position={position} scale={scale}>
            {/* Nucleus */}
            <mesh>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshStandardMaterial
                    color="#3b82f6"
                    emissive="#1d4ed8"
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Orbital rings */}
            <mesh ref={ring1Ref} rotation={[0, 0, 0]}>
                <torusGeometry args={[0.4, 0.015, 16, 64]} />
                <meshBasicMaterial color="#60a5fa" transparent opacity={0.6} />
            </mesh>
            <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[0.4, 0.015, 16, 64]} />
                <meshBasicMaterial color="#60a5fa" transparent opacity={0.6} />
            </mesh>
            <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, Math.PI / 4]}>
                <torusGeometry args={[0.4, 0.015, 16, 64]} />
                <meshBasicMaterial color="#60a5fa" transparent opacity={0.6} />
            </mesh>
        </group>
    );
}

// Background particles
function BackgroundParticles() {
    const particlesRef = useRef<THREE.Points>(null);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const count = 300;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 25;
            positions[i3 + 1] = (Math.random() - 0.5) * 18;
            positions[i3 + 2] = -5 - Math.random() * 15;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <points ref={particlesRef} geometry={geometry}>
            <pointsMaterial size={0.02} color="#475569" transparent opacity={0.4} />
        </points>
    );
}

// Connection lines between elements
function ConnectionLines() {
    const linesRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
        }
    });

    return (
        <group ref={linesRef}>
            {/* Subtle connecting lines */}
            <mesh position={[3, 1, -2]} rotation={[0, 0, Math.PI / 6]}>
                <boxGeometry args={[3, 0.005, 0.005]} />
                <meshBasicMaterial color="#1e40af" transparent opacity={0.2} />
            </mesh>
            <mesh position={[4, -1, -3]} rotation={[0, 0, -Math.PI / 8]}>
                <boxGeometry args={[2.5, 0.005, 0.005]} />
                <meshBasicMaterial color="#1e40af" transparent opacity={0.15} />
            </mesh>
        </group>
    );
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={55} />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={0.6} color="#3b82f6" />
            <pointLight position={[-5, -3, 3]} intensity={0.3} color="#8b5cf6" />

            {/* Floating code blocks - positioned on right side */}
            <CodeBlock position={[4, 1.5, -1]} rotation={[0.1, -0.3, 0.05]} scale={0.9} delay={0} />
            <CodeBlock position={[3, -0.5, -2]} rotation={[-0.05, -0.2, -0.05]} scale={0.7} delay={1} />
            <CodeBlock position={[5, -1.5, -3]} rotation={[0.08, -0.4, 0.03]} scale={0.6} delay={2} />

            {/* React atoms */}
            <ReactAtom position={[2, 2, 0]} scale={0.8} />
            <ReactAtom position={[5, 0, -1]} scale={0.6} />
            <ReactAtom position={[3.5, -2, -0.5]} scale={0.5} />

            <ConnectionLines />
            <BackgroundParticles />

            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.5}
                    luminanceSmoothing={0.9}
                    intensity={0.8}
                    radius={0.5}
                />
                <Vignette offset={0.3} darkness={0.6} />
            </EffectComposer>
        </>
    );
}

function ReactComponentsVisual() {
    return (
        <div className="w-full h-[550px] relative">
            <Canvas
                style={{ background: "transparent" }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}

export const MillionDollarVisual = memo(ReactComponentsVisual);
