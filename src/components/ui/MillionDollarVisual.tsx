"use client";

import { memo, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// Black hole core with event horizon glow
function BlackHoleCore() {
    const coreRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (coreRef.current) {
            coreRef.current.rotation.z += 0.002;
        }
        if (glowRef.current) {
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
            glowRef.current.scale.setScalar(scale);
        }
    });

    return (
        <group>
            {/* Event horizon - pure black */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[1.2, 64, 64]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Accretion disk glow */}
            <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.8, 0.4, 32, 128]} />
                <meshStandardMaterial
                    color="#3b82f6"
                    emissive="#1e40af"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.7}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Outer glow ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.2, 0.15, 16, 128]} />
                <meshStandardMaterial
                    color="#60a5fa"
                    emissive="#3b82f6"
                    emissiveIntensity={1.5}
                    transparent
                    opacity={0.5}
                />
            </mesh>
        </group>
    );
}

// Orbiting electrons (atomic style)
function AtomicOrbitals() {
    const orbitalsRef = useRef<THREE.Group>(null);
    const electron1Ref = useRef<THREE.Mesh>(null);
    const electron2Ref = useRef<THREE.Mesh>(null);
    const electron3Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Electron 1 - horizontal orbit
        if (electron1Ref.current) {
            const radius = 2.8;
            electron1Ref.current.position.x = Math.cos(t * 1.5) * radius;
            electron1Ref.current.position.z = Math.sin(t * 1.5) * radius;
            electron1Ref.current.position.y = Math.sin(t * 3) * 0.3;
        }

        // Electron 2 - tilted orbit
        if (electron2Ref.current) {
            const radius = 3.2;
            electron2Ref.current.position.x = Math.cos(t * 1.2 + Math.PI * 0.66) * radius;
            electron2Ref.current.position.y = Math.sin(t * 1.2 + Math.PI * 0.66) * radius * 0.7;
            electron2Ref.current.position.z = Math.cos(t * 1.2 + Math.PI * 0.66) * radius * 0.5;
        }

        // Electron 3 - vertical orbit
        if (electron3Ref.current) {
            const radius = 3.5;
            electron3Ref.current.position.y = Math.cos(t * 0.9 + Math.PI * 1.33) * radius;
            electron3Ref.current.position.z = Math.sin(t * 0.9 + Math.PI * 1.33) * radius;
            electron3Ref.current.position.x = Math.sin(t * 1.8) * 0.4;
        }
    });

    return (
        <group ref={orbitalsRef}>
            {/* Orbital paths */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.8, 0.01, 16, 128]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                <torusGeometry args={[3.2, 0.01, 16, 128]} />
                <meshBasicMaterial color="#60a5fa" transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 6]}>
                <torusGeometry args={[3.5, 0.01, 16, 128]} />
                <meshBasicMaterial color="#93c5fd" transparent opacity={0.3} />
            </mesh>

            {/* Electrons */}
            <mesh ref={electron1Ref}>
                <sphereGeometry args={[0.12, 32, 32]} />
                <meshStandardMaterial
                    color="#60a5fa"
                    emissive="#3b82f6"
                    emissiveIntensity={3}
                />
            </mesh>
            <mesh ref={electron2Ref}>
                <sphereGeometry args={[0.1, 32, 32]} />
                <meshStandardMaterial
                    color="#93c5fd"
                    emissive="#60a5fa"
                    emissiveIntensity={3}
                />
            </mesh>
            <mesh ref={electron3Ref}>
                <sphereGeometry args={[0.08, 32, 32]} />
                <meshStandardMaterial
                    color="#bfdbfe"
                    emissive="#93c5fd"
                    emissiveIntensity={3}
                />
            </mesh>
        </group>
    );
}

// Spiraling particles being pulled into black hole
function GravitationalParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 600;

    const { positions, velocities } = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const vel = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const angle = Math.random() * Math.PI * 2;
            const radius = 3 + Math.random() * 3;
            const height = (Math.random() - 0.5) * 2;

            pos[i3] = Math.cos(angle) * radius;
            pos[i3 + 1] = height;
            pos[i3 + 2] = Math.sin(angle) * radius;

            // Orbital velocity
            vel[i3] = -Math.sin(angle) * 0.02;
            vel[i3 + 1] = (Math.random() - 0.5) * 0.005;
            vel[i3 + 2] = Math.cos(angle) * 0.02;
        }

        return { positions: pos, velocities: vel };
    }, []);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
        return geo;
    }, [positions]);

    useFrame(() => {
        if (particlesRef.current) {
            const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;

                // Get current position
                const x = pos[i3];
                const y = pos[i3 + 1];
                const z = pos[i3 + 2];

                // Calculate distance from center
                const dist = Math.sqrt(x * x + y * y + z * z);

                // Gravitational pull toward center
                const pullStrength = 0.0003 / (dist * dist + 0.1);

                // Update with orbital motion + pull
                pos[i3] += velocities[i3] - (x / dist) * pullStrength;
                pos[i3 + 1] += velocities[i3 + 1] - (y / dist) * pullStrength * 0.5;
                pos[i3 + 2] += velocities[i3 + 2] - (z / dist) * pullStrength;

                // Reset if too close to center
                if (dist < 1.5) {
                    const angle = Math.random() * Math.PI * 2;
                    const newRadius = 5 + Math.random() * 2;
                    pos[i3] = Math.cos(angle) * newRadius;
                    pos[i3 + 1] = (Math.random() - 0.5) * 2;
                    pos[i3 + 2] = Math.sin(angle) * newRadius;
                }
            }

            particlesRef.current.geometry.attributes.position.needsUpdate = true;
            particlesRef.current.rotation.y += 0.001;
        }
    });

    return (
        <points ref={particlesRef} geometry={geometry}>
            <pointsMaterial
                size={0.04}
                color="#60a5fa"
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
            <ambientLight intensity={0.1} />
            <pointLight position={[5, 5, 5]} intensity={0.5} color="#3b82f6" />
            <pointLight position={[-5, -5, 5]} intensity={0.3} color="#60a5fa" />

            <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <group rotation={[0.2, 0, 0.1]}>
                    <BlackHoleCore />
                    <AtomicOrbitals />
                    <GravitationalParticles />
                </group>
            </Float>

            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.1}
                    luminanceSmoothing={0.9}
                    intensity={2.5}
                    radius={0.8}
                />
                <Vignette offset={0.3} darkness={0.7} />
            </EffectComposer>
        </>
    );
}

function BlackHoleAtomVisualComponent() {
    return (
        <div className="w-full h-[500px] relative">
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

export const MillionDollarVisual = memo(BlackHoleAtomVisualComponent);
