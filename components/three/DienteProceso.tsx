"use client";
// Proceso: el mismo diente atraviesa las 4 etapas según el avance del scroll.
// 0–.25 escaneo (nube de puntos) · .25–.5 diseño (guías de proporción) · .5–.75 prueba (resina mate) · .75–1 porcelana final
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Escena } from "./Escena";
import { geometriaDiente, puntosEscaneo } from "@/lib/geometria";
import { progreso } from "@/lib/progreso";


const ACENTO = new THREE.Color("#c2516d");
const tramo = (p: number, a: number, b: number) => THREE.MathUtils.clamp((p - a) / (b - a), 0, 1);

function Etapas({ movil }: { movil: boolean }) {
  const geo = useMemo(() => geometriaDiente(), []);
  const puntos = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(puntosEscaneo(movil ? 3200 : 5600), 3));
    return g;
  }, [movil]);

  const grupo = useRef<THREE.Group>(null);
  const matPuntos = useRef<THREE.PointsMaterial>(null);
  const plano = useRef<THREE.Mesh>(null);
  const matPlano = useRef<THREE.MeshBasicMaterial>(null);
  const guias = useRef<THREE.Group>(null);
  const matMate = useRef<THREE.MeshStandardMaterial>(null);
  const vidrio = useRef<THREE.Mesh>(null);
  const suave = useRef(0);
  const captura = useMemo(() => location.search.includes("captura"), []);

  useFrame((s) => {
    suave.current = captura ? progreso.p : THREE.MathUtils.lerp(suave.current, progreso.p, 0.1);
    const p = suave.current;

    if (grupo.current) {
      grupo.current.rotation.y = -0.5 + p * Math.PI * 1.15 + Math.sin(s.clock.elapsedTime * 0.4) * 0.05;
      grupo.current.rotation.x = 0.1 - p * 0.1;
    }
    // Escaneo
    const verPuntos = 1 - tramo(p, 0.22, 0.34);
    if (matPuntos.current) matPuntos.current.opacity = verPuntos;
    if (plano.current && matPlano.current) {
      const barrido = tramo(p, 0.0, 0.24);
      plano.current.position.y = THREE.MathUtils.lerp(0.85, -0.85, barrido);
      matPlano.current.opacity = Math.sin(barrido * Math.PI) * 0.55;
      plano.current.visible = barrido > 0 && barrido < 1;
    }
    // Diseño
    const verGuias = tramo(p, 0.26, 0.36) * (1 - tramo(p, 0.55, 0.64));
    guias.current?.children.forEach((c) => {
      const m = (c as THREE.Mesh).material as THREE.Material & { opacity: number };
      m.opacity = verGuias * 0.9;
    });
    if (guias.current) guias.current.visible = verGuias > 0.01;
    // Prueba en boca (resina mate)
    const verMate = tramo(p, 0.27, 0.42) * (1 - tramo(p, 0.74, 0.86));
    if (matMate.current) {
      matMate.current.opacity = verMate;
      matMate.current.roughness = THREE.MathUtils.lerp(0.95, 0.55, tramo(p, 0.45, 0.7));
    }
    // Porcelana final
    if (vidrio.current) {
      const v = tramo(p, 0.72, 0.9);
      vidrio.current.visible = v > 0.001;
      vidrio.current.scale.setScalar(0.94 + v * 0.06);
    }
  });

  // Guías de proporción: contorno, eje medio, tercios y proporción áurea del ancho
  const w = 0.47, h = 0.72, z = 0.32;
  const oro = w * 2 * 0.618 - w;

  return (
    <group ref={grupo} scale={0.86}>
      <points geometry={puntos}>
        <pointsMaterial ref={matPuntos} color={ACENTO} size={movil ? 0.014 : 0.011} sizeAttenuation transparent depthWrite={false} />
      </points>
      <mesh ref={plano} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.05, 0.85, 64]} />
        <meshBasicMaterial ref={matPlano} color={ACENTO} transparent side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      <group ref={guias}>
        <Line points={[[-w, -h, z], [w, -h, z], [w, h, z], [-w, h, z], [-w, -h, z]]} color="#c2516d" lineWidth={1} transparent dashed dashSize={0.04} gapSize={0.03} />
        <Line points={[[0, -h - 0.15, z], [0, h + 0.15, z]]} color="#c2516d" lineWidth={1} transparent />
        <Line points={[[-w - 0.15, -h / 3, z], [w + 0.15, -h / 3, z]]} color="#c2516d" lineWidth={0.8} transparent />
        <Line points={[[-w - 0.15, h / 3, z], [w + 0.15, h / 3, z]]} color="#c2516d" lineWidth={0.8} transparent />
        <Line points={[[oro, -h - 0.1, z], [oro, h + 0.1, z]]} color="#c2516d" lineWidth={0.8} transparent dashed dashSize={0.02} gapSize={0.02} />
      </group>

      <mesh geometry={geo}>
        <meshStandardMaterial ref={matMate} color="#ece4d6" roughness={0.95} metalness={0} transparent depthWrite={false} />
      </mesh>

      <mesh ref={vidrio} geometry={geo} visible={false}>
        <meshPhysicalMaterial
          color="#f4ede0"
          roughness={0.2}
          transmission={0.35}
          thickness={0.8}
          ior={1.5}
          attenuationColor="#efe3c8"
          attenuationDistance={1.6}
          clearcoat={1}
          clearcoatRoughness={0.06}
          sheen={0.5}
          sheenRoughness={0.4}
          sheenColor="#f6d5dc"
          iridescence={0.12}
          iridescenceIOR={1.3}
          envMapIntensity={1.15}
        />
      </mesh>
    </group>
  );
}

function FondoProceso() {
  return (
    <mesh position={[0, 0, -1.8]}>
      <circleGeometry args={[1.15, 96]} />
      <meshBasicMaterial color="#f3dfe0" toneMapped={false} />
    </mesh>
  );
}

export default function DienteProceso({ movil = false }: { movil?: boolean }) {
  return (
    <Escena className="lienzo-proceso" camaraZ={4.6}>
      <FondoProceso />
      <Etapas movil={movil} />
    </Escena>
  );
}
