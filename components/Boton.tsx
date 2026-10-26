"use client";
// Botón magnético: se inclina hacia el cursor (Motion). En táctil queda quieto.
import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode, MouseEvent } from "react";

export function Boton({
  href,
  children,
  lleno = false,
  externo = false,
  chico = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  lleno?: boolean;
  externo?: boolean;
  chico?: boolean;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function mover(e: MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.22);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  }
  function soltar() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noopener" : undefined}
      className={`boton ${lleno ? "lleno" : "vacio"} ${chico ? "chico" : ""} ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={mover}
      onMouseLeave={soltar}
      whileTap={{ scale: 0.97 }}
    >
      <span className="boton-texto">{children}</span>
    </motion.a>
  );
}
