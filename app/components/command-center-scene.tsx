"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

interface OrbitNode {
  label: string;
  metric: string;
  color: string;
  radius: number;
  speed: number;
  y: number;
  size: number;
}

const nodes: OrbitNode[] = [
  { label: "CSM", metric: "50+ accounts", color: "#67e8f9", radius: 2.85, speed: 0.18, y: 0.75, size: 0.15 },
  { label: "AI Ops", metric: "4h → 5m", color: "#34d399", radius: 2.35, speed: -0.24, y: -0.2, size: 0.13 },
  { label: "NRR", metric: "+15% expansion", color: "#fbbf24", radius: 2.65, speed: 0.15, y: -0.95, size: 0.12 },
  { label: "Risk", metric: "-30% tickets", color: "#a78bfa", radius: 2.05, speed: -0.31, y: 1.2, size: 0.115 },
  { label: "Trust", metric: "95% CSAT", color: "#38bdf8", radius: 3.05, speed: 0.12, y: -0.45, size: 0.14 },
];

function Core() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.16;
      group.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    }
    if (inner.current) {
      const pulse = 1 + Math.sin(t * 2.2) * 0.035;
      inner.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.58, 4]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#06b6d4"
          emissiveIntensity={1.8}
          roughness={0.18}
          metalness={0.38}
          transparent
          opacity={0.88}
        />
      </mesh>
      {[1.35, 1.75, 2.2].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2 + index * 0.55, index * 0.72, 0]}>
          <torusGeometry args={[radius, 0.008, 12, 160]} />
          <meshBasicMaterial color={index === 1 ? "#34d399" : "#67e8f9"} transparent opacity={0.48 - index * 0.08} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.75, 0.004, 12, 220]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

function OrbitingNodes() {
  const group = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.04;
    nodeRefs.current.forEach((node, index) => {
      if (!node) return;
      const config = nodes[index];
      const angle = t * config.speed + index * 1.25;
      node.position.x = Math.cos(angle) * config.radius;
      node.position.z = Math.sin(angle) * config.radius;
      node.position.y = config.y + Math.sin(t * 0.6 + index) * 0.12;
    });
  });

  return (
    <group ref={group}>
      {nodes.map((node, index) => (
        <group
          key={node.label}
          ref={(element) => {
            nodeRefs.current[index] = element;
          }}
        >
          <mesh>
            <sphereGeometry args={[node.size, 24, 24]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={1.6} roughness={0.2} />
          </mesh>
          <mesh>
            <sphereGeometry args={[node.size * 2.6, 24, 24]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.08} />
          </mesh>
          <Html center distanceFactor={8} className="pointer-events-none hidden select-none md:block">
            <div className="rounded-full border border-cyan-200/25 bg-slate-950/75 px-3 py-1.5 text-center shadow-[0_0_24px_rgba(34,211,238,0.18)] backdrop-blur-xl">
              <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan-100">{node.label}</div>
              <div className="whitespace-nowrap text-[11px] text-slate-300">{node.metric}</div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

function DataLattice() {
  const lineSegments = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 64; i += 1) {
      const angle = (i / 64) * Math.PI * 2;
      const radius = 4.1 + Math.sin(i * 1.7) * 0.24;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(i * 0.9) * 1.2, Math.sin(angle) * radius));
    }
    return points;
  }, []);

  return (
    <group>
      {lineSegments.map((point, index) => {
        const next = lineSegments[(index + 1) % lineSegments.length];
        const mid = point.clone().add(next).multiplyScalar(0.5);
        const distance = point.distanceTo(next);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          next.clone().sub(point).normalize(),
        );
        return (
          <mesh key={`${point.x}-${index}`} position={mid} quaternion={quaternion}>
            <cylinderGeometry args={[0.003, 0.003, distance, 6]} />
            <meshBasicMaterial color="#0e7490" transparent opacity={0.23} />
          </mesh>
        );
      })}
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 5]} color="#67e8f9" intensity={1.4} />
      <pointLight position={[-4, -2, -2]} color="#34d399" intensity={1.1} />
      <Stars radius={80} depth={42} count={1100} factor={2.4} saturation={0} fade speed={0.28} />
      <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.26}>
        <Core />
        <OrbitingNodes />
        <DataLattice />
      </Float>
      <mesh position={[0, -1.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.6, 96]} />
        <meshBasicMaterial color="#0891b2" transparent opacity={0.055} />
      </mesh>
      <Environment preset="city" />
    </>
  );
}

export function CommandCenterScene() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas camera={{ position: [0, 1.2, 8.2], fov: 45 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: false }}>
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.08)_35%,rgba(2,6,23,0.82)_78%)]" />
    </div>
  );
}
