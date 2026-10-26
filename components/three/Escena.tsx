"use client";
// Lienzo WebGL compartido: luces de estudio sin descargas externas y pausa cuando sale de pantalla.
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Escena({ children, camaraZ = 4.2, className }: { children: ReactNode; camaraZ?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // ?captura: congela el lienzo tras unos segundos (para capturas automáticas en máquinas sin GPU)
  const [congelado, setCongelado] = useState(false);

  useEffect(() => {
    if (!location.search.includes("captura")) return;
    const id = setTimeout(() => setCongelado(true), Number(new URLSearchParams(location.search).get("captura")) || 8000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <Canvas
        frameloop={visible && !congelado ? "always" : "never"}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, camaraZ], fov: 30 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NeutralToneMapping;
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 4]} intensity={1.4} />
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={3} position={[0, 3, 2]} scale={[6, 1.5, 1]} rotation-x={Math.PI / 2.4} />
          <Lightformer form="rect" intensity={2} position={[-3, 0.5, 1]} scale={[1, 4, 1]} rotation-y={Math.PI / 2.5} />
          <Lightformer form="rect" intensity={2} position={[3, -0.5, 1]} scale={[1, 4, 1]} rotation-y={-Math.PI / 2.5} />
          <Lightformer form="circle" color="#f2b8c6" intensity={1.6} position={[0, -2, -3]} scale={3} />
          <Lightformer form="ring" color="#ffffff" intensity={1.2} position={[0, 0, 4]} scale={2.5} />
        </Environment>
        {children}
      </Canvas>
    </div>
  );
}
