"use client";

import { memo, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Float } from "@react-three/drei";
import * as THREE from "three";

function GlowingSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z += 0.003;
            ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
            <group>
                {/* Main glowing sphere */}
                <mesh ref={meshRef}>
                    <sphereGeometry args={[1.8, 64, 64]} />
                    <meshStandardMaterial
                        color="#1e40af"
                        emissive="#3b82f6"
                        emissiveIntensity={0.4}
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={0.85}
                    />
                </mesh>

                {/* Outer ring */}
                <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2.5, 0.03, 32, 128]} />
                    <meshStandardMaterial
                        color="#60a5fa"
                        emissive="#3b82f6"
                        emissiveIntensity={1.5}
                        metalness={1}
                        roughness={0}
                    />
                </mesh>

                {/* Inner ring */}
                <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                    <torusGeometry args={[2.2, 0.02, 32, 128]} />
                    <meshStandardMaterial
                        color="#93c5fd"
                        emissive="#60a5fa"
                        emissiveIntensity={1}
                        metalness={1}
                        roughness={0}
                    />
                </mesh>
            </group>
        </Float>
    );
}

function Particles() {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 800;

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const radius = 3 + Math.random() * 2;

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.001;
        }
    });

    return (
        <points ref={particlesRef} geometry={geometry}>
            <pointsMaterial
                size={0.03}
                color="#60a5fa"
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
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#60a5fa" />
            <GlowingSphere />
            <Particles />
        </>
    );
}

function MillionDollarVisualComponent() {
    return (
        <div className="w-full h-[500px] relative">
            <Canvas
                style={{ background: "transparent" }}
                gl={{ antialias: true, alpha: true }}
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
