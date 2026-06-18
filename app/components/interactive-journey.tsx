"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Line, Stars, Text } from "@react-three/drei";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChevronLeft, ChevronRight, Download, Gamepad2, GitBranch, Mail, MapPin, MousePointer2, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type StationKind = "origin" | "csm" | "automation" | "mawa" | "cornerrush" | "toolsdns" | "contact";

interface JourneyStation {
  id: StationKind;
  title: string;
  shortTitle: string;
  subtitle: string;
  year: string;
  position: [number, number, number];
  color: string;
  accent: string;
  story: string;
  bullets: string[];
  proof: string;
}

const stations: JourneyStation[] = [
  {
    id: "origin",
    title: "Start: Fahim’s command path",
    shortTitle: "Start",
    subtitle: "Customer success + systems builder",
    year: "Now",
    position: [-8, 0, 0],
    color: "#67e8f9",
    accent: "#38bdf8",
    story: "This portfolio is a playable career map. Move Fahim through the stations to see how customer work, technical systems, and AI automation connect.",
    bullets: ["Use WASD / arrows or the on-screen controls", "Walk to glowing stations", "Each station unlocks a story card"],
    proof: "Interactive Three.js career journey",
  },
  {
    id: "csm",
    title: "Enterprise Customer Success",
    shortTitle: "CSM",
    subtitle: "50+ technical accounts owned end-to-end",
    year: "2020 → Present",
    position: [-4.8, 0, 1.4],
    color: "#34d399",
    accent: "#86efac",
    story: "At Everi, Fahim grew into a technical CSM / customer engineer advocate owning onboarding, renewals, QBRs, integrations, health scoring, and expansion conversations.",
    bullets: ["95% customer satisfaction", "15% revenue expansion", "C-level QBRs, pricing, renewals, upsell"],
    proof: "Customer outcomes + executive communication",
  },
  {
    id: "automation",
    title: "AI CS Automation Engine",
    shortTitle: "AI Ops",
    subtitle: "Reporting from 4 hours to 5 minutes",
    year: "2025",
    position: [-1.5, 0, -0.9],
    color: "#fbbf24",
    accent: "#fde68a",
    story: "Fahim built AI-driven customer success automations: LLM reports, health signals, n8n/Zapier flows, and Python tools that compress repetitive account work.",
    bullets: ["4 hours → 5 minutes per account", "30% fewer support escalations", "Churn-risk signals surfaced earlier"],
    proof: "Automation that creates strategic CS time",
  },
  {
    id: "mawa",
    title: "MAWA: AI Customer Success Assistant",
    shortTitle: "MAWA",
    subtitle: "40+ integrations and daily operating system",
    year: "2025",
    position: [1.8, 0, 1.2],
    color: "#a78bfa",
    accent: "#c4b5fd",
    story: "MAWA is Fahim’s full-stack AI assistant used daily for account reporting, follow-up generation, ticket triage, knowledge retrieval, and 1,000+ daily API requests.",
    bullets: ["Python + TypeScript + React", "REST APIs + WebSocket", "Knowledge retrieval and workflow orchestration"],
    proof: "Builder credibility beyond a resume bullet",
  },
  {
    id: "cornerrush",
    title: "CornerRush: Founder Build",
    shortTitle: "CornerRush",
    subtitle: "AI audit wizard, quote calculator, voice agent",
    year: "2025",
    position: [5, 0, -1.2],
    color: "#fb7185",
    accent: "#fda4af",
    story: "CornerRush shows Fahim can own early-stage product cycles: customer discovery, pricing, onboarding, AI lead qualification, and Vercel SSR delivery.",
    bullets: ["Sub-2-second lead voice agent", "Vercel SSR with 90+ Lighthouse", "Solo founder execution loop"],
    proof: "Product thinking + full-stack shipping",
  },
  {
    id: "toolsdns",
    title: "ToolsDNS: API Discovery Layer",
    shortTitle: "ToolsDNS",
    subtitle: "5,000+ tools returned as structured JSON",
    year: "2025",
    position: [8.1, 0, 1],
    color: "#22d3ee",
    accent: "#67e8f9",
    story: "ToolsDNS indexes tool APIs and returns structured discovery results fast, proving Fahim understands developer-tool workflows and AI system efficiency.",
    bullets: ["5,000+ indexed tools", "Under 200ms responses", "98% token consumption reduction"],
    proof: "Developer tools + AI infrastructure thinking",
  },
  {
    id: "contact",
    title: "Recruiter Portal",
    shortTitle: "Contact",
    subtitle: "Technical CSM / AI customer ops / automation roles",
    year: "Next",
    position: [11.4, 0, -0.2],
    color: "#60a5fa",
    accent: "#bfdbfe",
    story: "If this journey matches the kind of hybrid operator you need, Fahim is open to roles where customer outcomes, technical clarity, and AI systems matter.",
    bullets: ["Technical Customer Success", "Customer Engineering", "AI Customer Operations"],
    proof: "Ready for the next mission",
  },
];

const stationById = Object.fromEntries(stations.map((station) => [station.id, station])) as Record<StationKind, JourneyStation>;

interface PlayerState {
  x: number;
  z: number;
  rotation: number;
}

function getNearestStation(player: PlayerState) {
  let nearest = stations[0];
  let distance = Infinity;
  for (const station of stations) {
    const dx = station.position[0] - player.x;
    const dz = station.position[2] - player.z;
    const nextDistance = Math.sqrt(dx * dx + dz * dz);
    if (nextDistance < distance) {
      nearest = station;
      distance = nextDistance;
    }
  }
  return { station: nearest, distance };
}

function useMovement() {
  const keys = useRef<Record<string, boolean>>({});
  const [manualVector, setManualVector] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    function handleDown(event: KeyboardEvent) {
      keys.current[event.key.toLowerCase()] = true;
    }
    function handleUp(event: KeyboardEvent) {
      keys.current[event.key.toLowerCase()] = false;
    }
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  const getVector = useCallback((): [number, number] => {
    let x = manualVector[0];
    let z = manualVector[1];
    if (keys.current.a || keys.current.arrowleft) x -= 1;
    if (keys.current.d || keys.current.arrowright) x += 1;
    if (keys.current.w || keys.current.arrowup) z -= 1;
    if (keys.current.s || keys.current.arrowdown) z += 1;
    return [Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, z))];
  }, [manualVector]);

  return { getVector, setManualVector };
}

function Player({ playerRef }: { playerRef: React.MutableRefObject<PlayerState> }) {
  const group = useRef<THREE.Group>(null);
  const bob = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.set(playerRef.current.x, 0.26, playerRef.current.z);
    group.current.rotation.y = playerRef.current.rotation;
    if (bob.current) bob.current.position.y = Math.sin(clock.elapsedTime * 7) * 0.035;
  });

  return (
    <group ref={group}>
      <group ref={bob}>
        <mesh position={[0, 0.52, 0]} castShadow>
          <capsuleGeometry args={[0.18, 0.42, 8, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.28} roughness={0.24} />
        </mesh>
        <mesh position={[0, 0.98, 0]} castShadow>
          <sphereGeometry args={[0.17, 24, 24]} />
          <meshStandardMaterial color="#e0f2fe" emissive="#38bdf8" emissiveIntensity={0.1} />
        </mesh>
        <mesh position={[0, 1.03, -0.16]}>
          <boxGeometry args={[0.1, 0.035, 0.08]} />
          <meshStandardMaterial color="#020617" />
        </mesh>
        <mesh position={[0, 0.46, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.32, 0.01, 8, 48]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.45} />
        </mesh>
      </group>
    </group>
  );
}

function StationMesh({ station, isActive }: { station: JourneyStation; isActive: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.45;
    group.current.position.y = Math.sin(clock.elapsedTime * 1.4 + station.position[0]) * 0.08;
  });

  return (
    <group position={station.position}>
      <Float speed={1.2} floatIntensity={0.28} rotationIntensity={0.08}>
        <group ref={group} position={[0, 0.76, 0]}>
          <mesh>
            <octahedronGeometry args={[isActive ? 0.48 : 0.36, 1]} />
            <meshStandardMaterial color={station.color} emissive={station.color} emissiveIntensity={isActive ? 1.6 : 0.72} roughness={0.18} metalness={0.25} />
          </mesh>
          <mesh>
            <sphereGeometry args={[isActive ? 1.05 : 0.78, 32, 32]} />
            <meshBasicMaterial color={station.color} transparent opacity={isActive ? 0.12 : 0.055} />
          </mesh>
        </group>
      </Float>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, isActive ? 1.08 : 0.9, 56]} />
        <meshBasicMaterial color={station.color} transparent opacity={isActive ? 0.34 : 0.16} />
      </mesh>
      <Text position={[0, 1.8, 0]} fontSize={0.22} color="#e0f2fe" anchorX="center" anchorY="middle" maxWidth={2.4} textAlign="center">
        {station.shortTitle}
      </Text>
      <Text position={[0, 1.48, 0]} fontSize={0.12} color="#94a3b8" anchorX="center" anchorY="middle" maxWidth={2.2} textAlign="center">
        {station.year}
      </Text>
    </group>
  );
}

function WorldScene({ playerRef, activeId }: { playerRef: React.MutableRefObject<PlayerState>; activeId: StationKind }) {
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);
  const pathPoints = useMemo(() => stations.map((station) => new THREE.Vector3(station.position[0], 0.08, station.position[2])), []);

  useFrame(({ camera }) => {
    const player = playerRef.current;
    cameraTarget.set(player.x, 0.8, player.z + 5.8);
    camera.position.lerp(cameraTarget, 0.075);
    camera.lookAt(player.x + 1.2, 0.75, player.z - 0.8);
  });

  return (
    <>
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 8, 6]} intensity={1.4} color="#e0f2fe" castShadow />
      <pointLight position={[0, 3, 3]} intensity={1.4} color="#22d3ee" />
      <Stars radius={80} depth={38} count={1200} factor={2.2} fade speed={0.2} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.6, -0.02, 0]} receiveShadow>
        <planeGeometry args={[24, 8]} />
        <meshStandardMaterial color="#07111f" roughness={0.8} metalness={0.05} />
      </mesh>
      <gridHelper args={[24, 48, "#0e7490", "#0f172a"]} position={[1.6, 0, 0]} />
      <Line points={pathPoints} color="#22d3ee" lineWidth={2} transparent opacity={0.5} />
      {stations.map((station) => (
        <StationMesh key={station.id} station={station} isActive={activeId === station.id} />
      ))}
      <Player playerRef={playerRef} />
      <Environment preset="night" />
    </>
  );
}

function ProgressMap({ activeId, onJump }: { activeId: StationKind; onJump: (station: JourneyStation) => void }) {
  return (
    <div className="pointer-events-auto flex gap-2 overflow-x-auto rounded-full border border-white/10 bg-slate-950/70 p-2 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl">
      {stations.map((station) => (
        <button
          key={station.id}
          type="button"
          onClick={() => onJump(station)}
          className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition ${
            activeId === station.id ? "bg-cyan-200 text-slate-950" : "bg-white/5 text-slate-300 hover:bg-white/10"
          }`}
        >
          {station.shortTitle}
        </button>
      ))}
    </div>
  );
}

function ControlButton({ children, onVector }: { children: React.ReactNode; onVector: [number, number] }) {
  return (
    <button
      type="button"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        window.dispatchEvent(new CustomEvent("mawa-vector", { detail: onVector }));
      }}
      onPointerUp={() => window.dispatchEvent(new CustomEvent("mawa-vector", { detail: [0, 0] }))}
      onPointerCancel={() => window.dispatchEvent(new CustomEvent("mawa-vector", { detail: [0, 0] }))}
      className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/10 text-cyan-100 shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-95 active:bg-cyan-200 active:text-slate-950"
    >
      {children}
    </button>
  );
}

function MobileControls({ setManualVector }: { setManualVector: (vector: [number, number]) => void }) {
  useEffect(() => {
    function handleVector(event: Event) {
      const customEvent = event as CustomEvent<[number, number]>;
      setManualVector(customEvent.detail);
    }
    window.addEventListener("mawa-vector", handleVector);
    return () => window.removeEventListener("mawa-vector", handleVector);
  }, [setManualVector]);

  return (
    <div className="pointer-events-auto grid grid-cols-3 gap-2 md:hidden">
      <div />
      <ControlButton onVector={[0, -1]}><ArrowUp className="size-5" /></ControlButton>
      <div />
      <ControlButton onVector={[-1, 0]}><ArrowLeft className="size-5" /></ControlButton>
      <ControlButton onVector={[0, 1]}><ArrowDown className="size-5" /></ControlButton>
      <ControlButton onVector={[1, 0]}><ArrowRight className="size-5" /></ControlButton>
    </div>
  );
}

export function InteractiveJourney() {
  const playerRef = useRef<PlayerState>({ x: stations[0].position[0], z: stations[0].position[2], rotation: 0 });
  const { getVector, setManualVector } = useMovement();
  const [activeId, setActiveId] = useState<StationKind>("origin");
  const [isIntroOpen, setIsIntroOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return new URLSearchParams(window.location.search).get("skipIntro") !== "1";
  });
  const [hasMoved, setHasMoved] = useState(false);
  const activeStation = stationById[activeId];

  useEffect(() => {
    let frame = 0;
    function tick() {
      const [xInput, zInput] = getVector();
      const magnitude = Math.hypot(xInput, zInput);
      if (magnitude > 0.01) {
        setHasMoved(true);
        const normalizedX = xInput / Math.max(1, magnitude);
        const normalizedZ = zInput / Math.max(1, magnitude);
        playerRef.current.x = Math.max(-8.6, Math.min(11.8, playerRef.current.x + normalizedX * 0.075));
        playerRef.current.z = Math.max(-2.75, Math.min(2.75, playerRef.current.z + normalizedZ * 0.075));
        playerRef.current.rotation = Math.atan2(normalizedX, normalizedZ);
      }
      const nearest = getNearestStation(playerRef.current);
      if (nearest.distance < 1.75) setActiveId(nearest.station.id);
      frame = window.requestAnimationFrame(tick);
    }
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [getVector]);

  function jumpToStation(station: JourneyStation) {
    playerRef.current.x = station.position[0];
    playerRef.current.z = station.position[2];
    setActiveId(station.id);
    setHasMoved(true);
  }

  function goNext(direction: 1 | -1) {
    const index = stations.findIndex((station) => station.id === activeId);
    const next = stations[Math.max(0, Math.min(stations.length - 1, index + direction))];
    jumpToStation(next);
  }

  return (
    <main className="relative h-[100svh] overflow-hidden bg-slate-950 text-white">
      <Canvas shadows camera={{ position: [-8, 4, 7], fov: 48 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: false }}>
        <WorldScene playerRef={playerRef} activeId={activeId} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,rgba(2,6,23,0.08)_34%,rgba(2,6,23,0.72)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-slate-950/85 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/65 px-3 py-2 shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl">
          <span className="grid size-10 place-items-center rounded-full bg-cyan-200 text-sm font-semibold text-slate-950">SF</span>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-4">Syed Fahim</p>
            <p className="text-xs text-slate-400">Interactive career journey</p>
          </div>
        </div>
        <div className="pointer-events-auto hidden md:block">
          <ProgressMap activeId={activeId} onJump={jumpToStation} />
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <a href="/Syed_Fahim_Resume_CSM.pdf" className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 backdrop-blur-xl transition hover:bg-white/15">
            Resume
          </a>
          <a href="mailto:syedfahimdev@gmail.com" className="rounded-full bg-cyan-200 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white">
            Contact
          </a>
        </div>
      </header>

      <section className="pointer-events-none absolute left-4 top-24 z-20 hidden max-w-[min(92vw,520px)] sm:left-6 lg:left-10 lg:top-28 lg:block">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/72 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
            <Sparkles className="size-3.5" /> Playable Portfolio
          </div>
          <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Move Fahim through the career map.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            This is not a static resume. Walk station to station and watch the story unfold: customer success, automation, MAWA, CornerRush, ToolsDNS, and the next mission.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {["50+ accounts", "95% CSAT", "+15% expansion", "4h → 5m reports"].map((metric) => (
              <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-slate-200">
                {metric}
              </div>
            ))}
          </div>
        </div>
      </section>

      <aside className="pointer-events-none absolute bottom-4 right-4 z-20 w-[calc(100vw-2rem)] max-w-xl sm:bottom-6 sm:right-6">
        <div className="pointer-events-auto rounded-[2rem] border border-white/10 bg-slate-950/78 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]" style={{ backgroundColor: `${activeStation.color}1f`, color: activeStation.accent }}>
                <MapPin className="size-3.5" /> {activeStation.year}
              </div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{activeStation.title}</h2>
              <p className="mt-1 text-sm text-cyan-100">{activeStation.subtitle}</p>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <button type="button" onClick={() => goNext(-1)} className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/10 hover:bg-white/15" aria-label="Previous station"><ChevronLeft className="size-4" /></button>
              <button type="button" onClick={() => goNext(1)} className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/10 hover:bg-white/15" aria-label="Next station"><ChevronRight className="size-4" /></button>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{activeStation.story}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {activeStation.bullets.map((bullet) => (
              <div key={bullet} className="rounded-2xl border border-white/10 bg-white/[0.055] p-3 text-xs leading-5 text-slate-300 sm:text-sm">
                {bullet}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-cyan-200/15 bg-cyan-200/10 p-3 text-sm font-semibold text-cyan-50">
            Proof signal: {activeStation.proof}
          </div>
          {activeStation.id === "contact" ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <a href="mailto:syedfahimdev@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-200 px-4 py-3 text-sm font-semibold text-slate-950"><Mail className="size-4" /> Email</a>
              <a href="https://github.com/syedfahimdev" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white"><GitBranch className="size-4" /> GitHub</a>
              <a href="/Syed_Fahim_Resume_CSM.pdf" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white"><Download className="size-4" /> Resume</a>
            </div>
          ) : null}
        </div>
      </aside>

      <div className="pointer-events-none absolute bottom-4 left-4 z-20 flex flex-col gap-3 sm:bottom-6 sm:left-6">
        <MobileControls setManualVector={setManualVector} />
        <div className="pointer-events-auto max-w-[calc(100vw-2rem)] md:hidden">
          <ProgressMap activeId={activeId} onJump={jumpToStation} />
        </div>
        <div className="pointer-events-auto hidden rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300 backdrop-blur-2xl md:flex md:items-center md:gap-3">
          <Gamepad2 className="size-5 text-cyan-200" /> Use WASD / arrow keys to move. Walk near glowing stations.
        </div>
      </div>

      {isIntroOpen ? (
        <div className="absolute inset-0 z-30 grid place-items-center bg-slate-950/80 px-4 backdrop-blur-md">
          <div className="max-w-xl rounded-[2rem] border border-cyan-200/20 bg-slate-950/88 p-6 text-center shadow-2xl shadow-cyan-950/40 sm:p-8">
            <div className="mx-auto mb-5 grid size-14 place-items-center rounded-3xl bg-cyan-200 text-slate-950">
              <MousePointer2 className="size-6" />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">This one is interactive.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Move the Fahim character through a 3D career world. Each glowing station opens a chapter: CSM, AI automation, MAWA, CornerRush, ToolsDNS, and contact.
            </p>
            <button
              type="button"
              onClick={() => setIsIntroOpen(false)}
              className="mt-6 rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Enter the journey
            </button>
          </div>
        </div>
      ) : null}

      {!hasMoved && !isIntroOpen ? (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-cyan-100 backdrop-blur-xl md:block">
          Press W / A / S / D to move Fahim
        </div>
      ) : null}
    </main>
  );
}
