"use client";

import { memo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Float } from "@react-three/drei";
import { Mesh } from "three";

function RotatingCylinder() {
    const meshRef = useRef<Mesh>(null);
    const particlesRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
        if (particlesRef.current) {
            particlesRef.current.rotation.y -= 0.001;
        }
    });

    return (
        <>
            {/* Main Cylinder */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh ref={meshRef} position={[0, 0, 0]}>
                    <cylinderGeometry args={[2, 2, 1.5, 64, 1, true]} />
                    <meshStandardMaterial
                        color="#1e40af"
                        emissive="#3b82f6"
                        emissiveIntensity={0.2}
                        metalness={0.8}
                        roughness={0.2}
                        transparent
                        opacity={0.6}
                        wireframe={false}
                    />
                </mesh>
            </Float>

            {/* Inner Ring */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <torusGeometry args={[1.8, 0.02, 16, 100]} />
                <meshStandardMaterial
                    color="#60a5fa"
                    emissive="#3b82f6"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Particles */}
            <mesh ref={particlesRef}>
                {Array.from({ length: 30 }).map((_, i) => {
                    const angle = (i / 30) * Math.PI * 2;
                    const radius = 3;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;
                    const y = (Math.random() - 0.5) * 2;

                    return (
                        <mesh key={i} position={[x, y, z]}>
                            <sphereGeometry args={[0.03, 16, 16]} />
                            <meshStandardMaterial
                                color="#60a5fa"
                                emissive="#3b82f6"
                                emissiveIntensity={0.8}
                            />
                        </mesh>
                    );
                })}
            </mesh>
        </>
    );
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#60a5fa" />
            <RotatingCylinder />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </>
    );
}

function PremiumVisualComponent() {
    return (
        <div className="w-full h-[600px] relative">
            <Canvas
                className="absolute inset-0"
                style={{ background: "transparent" }}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}

export const PremiumVisual = memo(PremiumVisualComponent);
