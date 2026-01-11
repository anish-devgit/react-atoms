"use client";

import { memo, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    PerspectiveCamera,
    Environment,
    MeshTransmissionMaterial,
    Float,
    Sphere,
} from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField, Vignette } from "@react-three/postprocessing";
import { Vector2 } from "three";
import * as THREE from "three";

function HolographicSphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <Sphere ref={meshRef} args={[2.5, 128, 128]} position={[0, 0, 0]}>
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    thickness={0.5}
                    chromaticAberration={0.5}
                    anisotropy={0.5}
                    distortion={0.3}
                    distortionScale={0.5}
                    temporalDistortion={0.1}
                    iridescence={1}
                    iridescenceIOR={1}
                    iridescenceThicknessRange={[0, 1400]}
                    color="#3b82f6"
                    emissive="#1e40af"
                    emissiveIntensity={0.5}
                    metalness={0.9}
                    roughness={0.1}
                />
            </Sphere>

            {/* Inner ring */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.05, 32, 100]} />
                <meshStandardMaterial
                    color="#60a5fa"
                    emissive="#3b82f6"
                    emissiveIntensity={1.5}
                    metalness={1}
                    roughness={0}
                />
            </mesh>
        </Float>
    );
}

function MorphingParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 1500;

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Random sphere distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const radius = 4 + Math.random() * 2;

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Blue color variations
            colors[i3] = 0.23 + Math.random() * 0.2;
            colors[i3 + 1] = 0.51 + Math.random() * 0.2;
            colors[i3 + 2] = 0.96 + Math.random() * 0.04;

            sizes[i] = Math.random() * 2 + 1;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        return geo;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const time = state.clock.elapsedTime;

                // Orbital motion
                positions[i3] += Math.sin(time + i) * 0.002;
                positions[i3 + 1] += Math.cos(time + i * 0.5) * 0.002;
                positions[i3 + 2] += Math.sin(time * 0.5 + i * 0.3) * 0.002;
            }

            particlesRef.current.geometry.attributes.position.needsUpdate = true;
            particlesRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <points ref={particlesRef} geometry={geometry}>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />

            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                castShadow
                color="#3b82f6"
            />
            <pointLight position={[-10, -10, -5]} intensity={1} color="#60a5fa" />
            <pointLight position={[10, 5, -10]} intensity={0.8} color="#93c5fd" />

            {/* Environment */}
            <Environment preset="city" />

            {/* Main Elements */}
            <HolographicSphere />
            <MorphingParticles />

            {/* Post-Processing */}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.9}
                    intensity={2.0}
                    radius={0.9}
                />
                <ChromaticAberration
                    offset={new Vector2(0.002, 0.002)}
                />
                <DepthOfField
                    focusDistance={0.01}
                    focalLength={0.06}
                    bokehScale={3}
                />
                <Vignette
                    offset={0.3}
                    darkness={0.6}
                    eskil={false}
                />
            </EffectComposer>
        </>
    );
}

function MillionDollarVisualComponent() {
    return (
        <div className="w-full h-[700px] relative">
            <Canvas
                className="absolute inset-0"
                style={{ background: "transparent" }}
                gl={{
                    antialias: true,
                    alpha: true,
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

export const MillionDollarVisual = memo(MillionDollarVisualComponent);
