"use client";

import { memo, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// Interstellar-style black hole with golden accretion disk
function InterstellarBlackHole() {
    const accretionDiskRef = useRef<THREE.Mesh>(null);
    const innerRingRef = useRef<THREE.Mesh>(null);
    const verticalRingRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Main accretion disk rotation
        if (accretionDiskRef.current) {
            accretionDiskRef.current.rotation.z += 0.002;
        }

        // Inner ring counter-rotation
        if (innerRingRef.current) {
            innerRingRef.current.rotation.z -= 0.003;
        }

        // Vertical ring (photon sphere) wobble
        if (verticalRingRef.current) {
            verticalRingRef.current.rotation.y += 0.001;
            verticalRingRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
        }
    });

    return (
        <group position={[1.5, 0, 0]}>
            {/* Core singularity - absolute black */}
            <mesh>
                <sphereGeometry args={[0.9, 64, 64]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Event horizon shell */}
            <mesh>
                <sphereGeometry args={[0.95, 64, 64]} />
                <meshBasicMaterial
                    color="#0a0a0a"
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Main accretion disk - golden/yellow */}
            <mesh ref={accretionDiskRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.8, 0.35, 32, 128]} />
                <meshStandardMaterial
                    color="#d4a523"
                    emissive="#b8860b"
                    emissiveIntensity={0.8}
                    metalness={0.3}
                    roughness={0.5}
                    transparent
                    opacity={0.85}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Inner hot ring - brighter gold */}
            <mesh ref={innerRingRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.3, 0.15, 32, 128]} />
                <meshStandardMaterial
                    color="#ffd700"
                    emissive="#ffa500"
                    emissiveIntensity={1.2}
                    metalness={0.2}
                    roughness={0.4}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Vertical photon ring (Interstellar signature look) */}
            <mesh ref={verticalRingRef}>
                <torusGeometry args={[1.6, 0.08, 16, 128]} />
                <meshStandardMaterial
                    color="#daa520"
                    emissive="#cd853f"
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.5}
                />
            </mesh>

            {/* Outer faint ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.4, 0.05, 16, 128]} />
                <meshBasicMaterial
                    color="#8b7355"
                    transparent
                    opacity={0.25}
                />
            </mesh>

            {/* Gravitational lensing halo */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.8, 0.02, 16, 128]} />
                <meshBasicMaterial
                    color="#666666"
                    transparent
                    opacity={0.15}
                />
            </mesh>
        </group>
    );
}

// Particles spiraling into black hole
function SpiralParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 700;

    const blackHoleX = 1.5;
    const blackHoleY = 0;
    const blackHoleRadius = 0.9;

    const { geometry, velocities, angularVelocities } = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const vel = new Float32Array(particleCount * 2);
        const angVel = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const i2 = i * 2;

            // Scatter across entire screen
            const x = (Math.random() - 0.5) * 18;
            const y = (Math.random() - 0.5) * 12;
            const z = (Math.random() - 0.5) * 4;

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            sizes[i] = 0.6 + Math.random() * 0.5;

            // Initial orbital velocity
            const dx = blackHoleX - x;
            const dy = blackHoleY - y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const speed = 0.002 + Math.random() * 0.002;
            vel[i2] = -dy / dist * speed;
            vel[i2 + 1] = dx / dist * speed;

            angVel[i] = 0.0004 + Math.random() * 0.0008;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        return { geometry: geo, velocities: vel, angularVelocities: angVel };
    }, []);

    useFrame(() => {
        if (!particlesRef.current) return;

        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        const sizes = particlesRef.current.geometry.attributes.size.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const i2 = i * 2;

            const x = positions[i3];
            const y = positions[i3 + 1];

            const dx = blackHoleX - x;
            const dy = blackHoleY - y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const nx = dx / dist;
            const ny = dy / dist;

            // Gravitational pull
            const gravity = 0.00006 / (dist * dist + 0.1);

            velocities[i2] += nx * gravity;
            velocities[i2 + 1] += ny * gravity;

            // Orbital motion
            velocities[i2] += -ny * angularVelocities[i];
            velocities[i2 + 1] += nx * angularVelocities[i];

            positions[i3] += velocities[i2];
            positions[i3 + 1] += velocities[i2 + 1];
            positions[i3 + 2] *= 0.998;

            // Stretch effect
            if (dist < 3) {
                sizes[i] = Math.max(0.15, (dist / 3) * 0.7);
            }

            // Respawn when absorbed
            if (dist < blackHoleRadius) {
                const edge = Math.floor(Math.random() * 4);
                switch (edge) {
                    case 0: positions[i3] = -9; positions[i3 + 1] = (Math.random() - 0.5) * 12; break;
                    case 1: positions[i3] = 9; positions[i3 + 1] = (Math.random() - 0.5) * 12; break;
                    case 2: positions[i3] = (Math.random() - 0.5) * 18; positions[i3 + 1] = 6; break;
                    case 3: positions[i3] = (Math.random() - 0.5) * 18; positions[i3 + 1] = -6; break;
                }
                positions[i3 + 2] = (Math.random() - 0.5) * 4;

                const newDx = blackHoleX - positions[i3];
                const newDy = blackHoleY - positions[i3 + 1];
                const newDist = Math.sqrt(newDx * newDx + newDy * newDy);
                const speed = 0.002 + Math.random() * 0.002;
                velocities[i2] = -newDy / newDist * speed;
                velocities[i2 + 1] = newDx / newDist * speed;
                sizes[i] = 0.6 + Math.random() * 0.5;
            }
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.geometry.attributes.size.needsUpdate = true;
    });

    return (
        <points ref={particlesRef} geometry={geometry}>
            <pointsMaterial
                size={0.03}
                color="#ffffff"
                transparent
                opacity={0.85}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Faint background stars
function BackgroundStars() {
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(350 * 3);

        for (let i = 0; i < 350; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 30;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = -10 - Math.random() * 10;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    return (
        <points geometry={geometry}>
            <pointsMaterial
                size={0.01}
                color="#555555"
                transparent
                opacity={0.2}
            />
        </points>
    );
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={60} />
            <ambientLight intensity={0.05} />
            <pointLight position={[5, 3, 5]} intensity={0.5} color="#ffd700" />
            <pointLight position={[-5, -3, 5]} intensity={0.2} color="#daa520" />

            <InterstellarBlackHole />
            <SpiralParticles />
            <BackgroundStars />

            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.3}
                    luminanceSmoothing={0.9}
                    intensity={1.5}
                    radius={0.7}
                />
                <Vignette offset={0.2} darkness={0.85} />
            </EffectComposer>
        </>
    );
}

function InterstellarBlackHoleComponent() {
    return (
        <div className="w-full h-[550px] relative">
            <Canvas
                style={{ background: "#000000" }}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}

export const MillionDollarVisual = memo(InterstellarBlackHoleComponent);
