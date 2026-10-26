"use client";
// Hero: el diente de porcelana flota, sigue el cursor y toma el tono elegido en la guía VITA.
import { useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Escena } from "./Escena";
import { geometriaDiente } from "@/lib/geometria";
import { tonos } from "@/lib/content";
import { tonoActual } from "@/lib/tono";

const BLANCO = new THREE.Color("#ffffff");

function Diente({ movil }: { movil: boolean }) {
  // Porcelana: material físico con algo de transmisión, brillo de esmalte (clearcoat) y un velo rosado (sheen)
  const grupo = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  const geo = useMemo(() => geometriaDiente(), []);
  const objetivo = useMemo(() => new THREE.Color(), []);
  const atenuacion = useMemo(() => new THREE.Color(), []);
  const entrada = useRef(0);

  useFrame((state, dt) => {
    const g = grupo.current;
    if (!g) return;
    // Entrada: sube y gira desde abajo la primera vez
    entrada.current = Math.min(1, entrada.current + dt * 0.55);
    const e = 1 - Math.pow(1 - entrada.current, 3);
    g.position.y = THREE.MathUtils.lerp(-0.6, 0, e);
    const sigue = movil ? 0 : 1;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, 0.42 + (1 - e) * -1.6 + state.pointer.x * 0.45 * sigue + Math.sin(state.clock.elapsedTime * 0.3) * 0.25, 0.06);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.25 * sigue, 0.06);
    g.scale.setScalar(THREE.MathUtils.lerp(0.85, 1, e));

    // Tono: transición suave hacia el color elegido
    const m = mat.current;
    if (m) {
      atenuacion.set(tonos[tonoActual()].color);
      objetivo.copy(atenuacion).lerp(BLANCO, 0.25);
      m.color.lerp(objetivo, 0.08);
      m.attenuationColor.lerp(atenuacion, 0.08);
    }
  });

  return (
    <group ref={grupo}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5} floatingRange={[-0.06, 0.06]}>
        <mesh geometry={geo} rotation={[0.08, 0, 0]}>
          <meshPhysicalMaterial
            ref={mat}
            color={tonos[3].color}
            roughness={0.2}
            metalness={0}
            transmission={0.35}
            thickness={0.8}
            ior={1.5}
            attenuationColor={tonos[3].color}
            attenuationDistance={1.6}
            clearcoat={1}
            clearcoatRoughness={0.06}
            sheen={0.5}
            sheenRoughness={0.4}
            sheenColor="#f6d5dc"
            iridescence={0.12}
            iridescenceIOR={1.3}
            specularIntensity={1}
            envMapIntensity={1.15}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Formas de color detrás del diente: le dan algo que refractar.
function Fondo() {
  return (
    <group position={[0, 0, -1.6]}>
      <mesh position={[0, 0.05, -0.1]}>
        <circleGeometry args={[1.25, 96]} />
        <meshBasicMaterial color="#f3dfe0" toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function DienteHero({ movil = false }: { movil?: boolean }) {
  return (
    <Escena className="lienzo-hero" camaraZ={4.9}>
      <Fondo />
      <Diente movil={movil} />
      <ContactShadows position={[0, -1.05, 0]} opacity={0.35} scale={4} blur={2.8} far={2} color="#5a2433" />
    </Escena>
  );
}
