"use client";

import { memo, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// Spiral galaxy formation
function Galaxy({ position, scale, rotationSpeed, tilt }: {
    position: [number, number, number];
    scale: number;
    rotationSpeed: number;
    tilt: [number, number, number];
}) {
    const galaxyRef = useRef<THREE.Points>(null);
    const armCount = 3;
    const particleCount = 500;

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            const arm = i % armCount;
            const armAngle = (arm / armCount) * Math.PI * 2;
            const distance = (i / particleCount) * 2.5;
            const spiralAngle = armAngle + distance * 3;

            const randomOffset = (Math.random() - 0.5) * 0.4 * distance;

            positions[i3] = Math.cos(spiralAngle) * distance + randomOffset;
            positions[i3 + 1] = (Math.random() - 0.5) * 0.15;
            positions[i3 + 2] = Math.sin(spiralAngle) * distance + randomOffset;

            const brightness = 0.4 + (1 - distance / 2.5) * 0.6;
            colors[i3] = brightness + 0.05;
            colors[i3 + 1] = brightness;
            colors[i3 + 2] = brightness - 0.02;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        return geo;
    }, []);

    useFrame(() => {
        if (galaxyRef.current) {
            galaxyRef.current.rotation.y += rotationSpeed;
        }
    });

    return (
        <points ref={galaxyRef} position={position} rotation={tilt} scale={scale} geometry={geometry}>
            <pointsMaterial
                size={0.035}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Full screen shimmering stars
function ShimmeringStars() {
    const starsRef = useRef<THREE.Points>(null);
    const starCount = 1000;

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;

            // Full screen distribution
            positions[i3] = (Math.random() - 0.5) * 30;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = -5 - Math.random() * 20;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    useFrame(() => {
        if (starsRef.current) {
            starsRef.current.rotation.y += 0.00003;
        }
    });

    return (
        <points ref={starsRef} geometry={geometry}>
            <pointsMaterial
                size={0.012}
                color="#e8e8e8"
                transparent
                opacity={0.5}
                sizeAttenuation
            />
        </points>
    );
}

// Full screen cosmic dust
function CosmicDust() {
    const dustRef = useRef<THREE.Points>(null);
    const dustCount = 500;

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(dustCount * 3);

        for (let i = 0; i < dustCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 25;
            positions[i3 + 1] = (Math.random() - 0.5) * 16;
            positions[i3 + 2] = -3 - Math.random() * 12;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    useFrame((state) => {
        if (dustRef.current) {
            dustRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.3;
            dustRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.02) * 0.15;
            dustRef.current.rotation.z += 0.00001;
        }
    });

    return (
        <points ref={dustRef} geometry={geometry}>
            <pointsMaterial
                size={0.006}
                color="#777777"
                transparent
                opacity={0.15}
            />
        </points>
    );
}

// Cosmic wave rings
function CosmicWaves() {
    const wave1Ref = useRef<THREE.Mesh>(null);
    const wave2Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (wave1Ref.current) {
            wave1Ref.current.rotation.z += 0.0002;
            const scale = 1 + Math.sin(state.clock.elapsedTime * 0.15) * 0.03;
            wave1Ref.current.scale.setScalar(scale);
        }
        if (wave2Ref.current) {
            wave2Ref.current.rotation.z -= 0.00015;
            wave2Ref.current.rotation.y += 0.0001;
        }
    });

    return (
        <>
            <mesh ref={wave1Ref} position={[3, 0, -10]}>
                <torusGeometry args={[6, 2.5, 8, 64]} />
                <meshBasicMaterial color="#151515" transparent opacity={0.06} wireframe />
            </mesh>
            <mesh ref={wave2Ref} position={[-4, 1, -15]}>
                <torusGeometry args={[8, 3, 8, 64]} />
                <meshBasicMaterial color="#121212" transparent opacity={0.04} wireframe />
            </mesh>
        </>
    );
}

// Light particles across full screen
function LightParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 250;

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 22;
            positions[i3 + 1] = (Math.random() - 0.5) * 14;
            positions[i3 + 2] = -2 - Math.random() * 10;

            const isWarm = Math.random() > 0.88;
            if (isWarm) {
                colors[i3] = 1.0;
                colors[i3 + 1] = 0.95;
                colors[i3 + 2] = 0.85;
            } else {
                const gray = 0.7 + Math.random() * 0.3;
                colors[i3] = gray;
                colors[i3 + 1] = gray;
                colors[i3 + 2] = gray;
            }
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        return geo;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.0003;
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={particlesRef} geometry={geometry}>
            <pointsMaterial
                size={0.018}
                vertexColors
                transparent
                opacity={0.55}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={55} />
            <ambientLight intensity={0.02} />

            {/* Galaxies spread across full screen */}
            <Galaxy position={[4, 1.5, -6]} scale={1.3} rotationSpeed={0.0003} tilt={[0.5, 0, 0.2]} />
            <Galaxy position={[-5, -1, -10]} scale={1.0} rotationSpeed={0.00025} tilt={[0.4, 0.3, 0]} />
            <Galaxy position={[0, 3, -15]} scale={0.7} rotationSpeed={0.0004} tilt={[0.7, 0.1, 0.1]} />
            <Galaxy position={[-3, -3, -8]} scale={0.6} rotationSpeed={0.00035} tilt={[0.3, 0.5, 0.2]} />
            <Galaxy position={[6, -2, -12]} scale={0.5} rotationSpeed={0.00045} tilt={[0.6, 0.2, 0.3]} />

            <ShimmeringStars />
            <CosmicDust />
            <CosmicWaves />
            <LightParticles />

            <EffectComposer>
                <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.7} radius={0.4} />
                <Vignette offset={0.25} darkness={0.75} />
            </EffectComposer>
        </>
    );
}

function CosmicUniverseComponent() {
    return (
        <div className="w-full h-[550px] relative">
            <Canvas
                style={{ background: "#000000" }}
                gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}

export const MillionDollarVisual = memo(CosmicUniverseComponent);
