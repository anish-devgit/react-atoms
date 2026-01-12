"use client";

import { memo, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import * as THREE from "three";
import { Vector2 } from "three";

// Premium glass code card with reflection
function GlassCodeCard({
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
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            const t = state.clock.elapsedTime + delay;
            groupRef.current.position.y = position[1] + Math.sin(t * 0.4) * 0.15;
            groupRef.current.rotation.y = (rotation?.[1] || 0) + Math.sin(t * 0.2) * 0.03;
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
            {/* Glass card body */}
            <mesh>
                <boxGeometry args={[2.4, 1.5, 0.05]} />
                <MeshTransmissionMaterial
                    backside
                    samples={4}
                    thickness={0.5}
                    chromaticAberration={0.2}
                    anisotropy={0.3}
                    distortion={0.1}
                    distortionScale={0.2}
                    temporalDistortion={0.1}
                    iridescence={0.5}
                    iridescenceIOR={1}
                    iridescenceThicknessRange={[0, 1400]}
                    color="#1e3a5f"
                    transparent
                    opacity={0.7}
                />
            </mesh>

            {/* Top accent line */}
            <mesh position={[0, 0.65, 0.03]}>
                <boxGeometry args={[2.3, 0.04, 0.01]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.8} />
            </mesh>

            {/* Code lines with syntax highlighting effect */}
            {[
                { y: 0.35, width: 1.6, color: "#94a3b8", indent: 0 },
                { y: 0.15, width: 1.2, color: "#22d3ee", indent: 0.2 },
                { y: -0.05, width: 1.4, color: "#a78bfa", indent: 0.2 },
                { y: -0.25, width: 0.9, color: "#4ade80", indent: 0.4 },
                { y: -0.45, width: 1.1, color: "#94a3b8", indent: 0.2 },
            ].map((line, i) => (
                <mesh key={i} position={[-0.9 + line.indent + line.width / 2, line.y, 0.03]}>
                    <boxGeometry args={[line.width, 0.06, 0.01]} />
                    <meshBasicMaterial color={line.color} transparent opacity={0.7} />
                </mesh>
            ))}

            {/* Glowing corner accents */}
            <mesh position={[-1.1, 0.65, 0.03]}>
                <circleGeometry args={[0.05, 16]} />
                <meshBasicMaterial color="#f472b6" />
            </mesh>
            <mesh position={[-0.95, 0.65, 0.03]}>
                <circleGeometry args={[0.05, 16]} />
                <meshBasicMaterial color="#facc15" />
            </mesh>
            <mesh position={[-0.8, 0.65, 0.03]}>
                <circleGeometry args={[0.05, 16]} />
                <meshBasicMaterial color="#4ade80" />
            </mesh>
        </group>
    );
}

// Glowing React atom with orbiting electrons
function PremiumReactAtom({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    const atomRef = useRef<THREE.Group>(null);
    const electron1Ref = useRef<THREE.Mesh>(null);
    const electron2Ref = useRef<THREE.Mesh>(null);
    const electron3Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (atomRef.current) {
            atomRef.current.rotation.y += 0.003;
            atomRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
        }

        // Orbiting electrons
        const orbitRadius = 0.5;
        if (electron1Ref.current) {
            electron1Ref.current.position.x = Math.cos(t * 2) * orbitRadius;
            electron1Ref.current.position.z = Math.sin(t * 2) * orbitRadius;
        }
        if (electron2Ref.current) {
            electron2Ref.current.position.x = Math.cos(t * 2 + Math.PI * 0.66) * orbitRadius;
            electron2Ref.current.position.y = Math.sin(t * 2 + Math.PI * 0.66) * orbitRadius * 0.8;
        }
        if (electron3Ref.current) {
            electron3Ref.current.position.y = Math.cos(t * 2 + Math.PI * 1.33) * orbitRadius;
            electron3Ref.current.position.z = Math.sin(t * 2 + Math.PI * 1.33) * orbitRadius;
        }
    });

    return (
        <group ref={atomRef} position={position} scale={scale}>
            {/* Glowing nucleus */}
            <mesh>
                <sphereGeometry args={[0.18, 32, 32]} />
                <meshStandardMaterial
                    color="#3b82f6"
                    emissive="#1d4ed8"
                    emissiveIntensity={2}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Outer glow */}
            <mesh>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshBasicMaterial color="#60a5fa" transparent opacity={0.2} />
            </mesh>

            {/* Orbital rings */}
            <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[0.5, 0.012, 16, 64]} />
                <meshBasicMaterial color="#60a5fa" transparent opacity={0.5} />
            </mesh>
            <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
                <torusGeometry args={[0.5, 0.012, 16, 64]} />
                <meshBasicMaterial color="#818cf8" transparent opacity={0.5} />
            </mesh>
            <mesh rotation={[-Math.PI / 3, 0, -Math.PI / 6]}>
                <torusGeometry args={[0.5, 0.012, 16, 64]} />
                <meshBasicMaterial color="#c084fc" transparent opacity={0.5} />
            </mesh>

            {/* Orbiting electrons */}
            <mesh ref={electron1Ref}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={2} />
            </mesh>
            <mesh ref={electron2Ref}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={2} />
            </mesh>
            <mesh ref={electron3Ref}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={2} />
            </mesh>
        </group>
    );
}

// Flowing particle streams
function ParticleStreams() {
    const streamRef = useRef<THREE.Points>(null);
    const count = 400;

    const { geometry, velocities } = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const vel = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 15;
            positions[i3 + 2] = -3 - Math.random() * 10;

            // Blue to purple gradient
            const t = Math.random();
            colors[i3] = 0.23 + t * 0.4;
            colors[i3 + 1] = 0.51 + t * 0.2;
            colors[i3 + 2] = 0.96;

            vel[i] = 0.002 + Math.random() * 0.003;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        return { geometry: geo, velocities: vel };
    }, []);

    useFrame(() => {
        if (streamRef.current) {
            const positions = streamRef.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                positions[i3] += velocities[i];

                // Reset when off screen
                if (positions[i3] > 10) {
                    positions[i3] = -10;
                    positions[i3 + 1] = (Math.random() - 0.5) * 15;
                }
            }

            streamRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={streamRef} geometry={geometry}>
            <pointsMaterial
                size={0.03}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Ambient floating hexagons
function FloatingHexagons() {
    const hexagonsRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (hexagonsRef.current) {
            hexagonsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        }
    });

    const hexagons = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => ({
            position: [
                (Math.random() - 0.3) * 15,
                (Math.random() - 0.5) * 10,
                -5 - Math.random() * 8
            ] as [number, number, number],
            scale: 0.15 + Math.random() * 0.25,
            rotation: Math.random() * Math.PI
        }));
    }, []);

    return (
        <group ref={hexagonsRef}>
            {hexagons.map((hex, i) => (
                <mesh key={i} position={hex.position} rotation={[0, 0, hex.rotation]} scale={hex.scale}>
                    <circleGeometry args={[1, 6]} />
                    <meshBasicMaterial color="#1e40af" transparent opacity={0.08} wireframe />
                </mesh>
            ))}
        </group>
    );
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={55} />
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
            <pointLight position={[-5, -3, 3]} intensity={0.5} color="#8b5cf6" />
            <pointLight position={[0, 3, 2]} intensity={0.3} color="#22d3ee" />

            {/* Premium glass code cards */}
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <GlassCodeCard position={[3.5, 1.2, 0]} rotation={[0.05, -0.25, 0.02]} scale={0.85} delay={0} />
            </Float>
            <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.15}>
                <GlassCodeCard position={[4.5, -0.8, -1.5]} rotation={[-0.03, -0.35, -0.02]} scale={0.7} delay={1.5} />
            </Float>
            <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
                <GlassCodeCard position={[2.5, -2, -2.5]} rotation={[0.02, -0.15, 0.01]} scale={0.55} delay={3} />
            </Float>

            {/* React atoms */}
            <PremiumReactAtom position={[1.5, 2.2, 0.5]} scale={1} />
            <PremiumReactAtom position={[5.5, 0.3, -0.5]} scale={0.7} />
            <PremiumReactAtom position={[3, -2.5, 0]} scale={0.5} />

            <ParticleStreams />
            <FloatingHexagons />

            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.3}
                    luminanceSmoothing={0.9}
                    intensity={1.5}
                    radius={0.8}
                />
                <ChromaticAberration offset={new Vector2(0.0005, 0.0005)} />
                <Vignette offset={0.25} darkness={0.6} />
            </EffectComposer>
        </>
    );
}

function UltraPremiumVisual() {
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

export const MillionDollarVisual = memo(UltraPremiumVisual);
