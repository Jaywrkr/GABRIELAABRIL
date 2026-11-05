"use client";
// Envuelve un botón o enlace: se inclina hacia el cursor y vuelve con un rebote suave. En táctil no hace nada.
import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

export function Magnetico({ children, fuerza = 0.35 }: { children: ReactNode; fuerza?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current?.firstElementChild as HTMLElement | null;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const y = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * fuerza);
      y((e.clientY - r.top - r.height / 2) * fuerza);
    };
    const salir = () => {
      x(0);
      y(0);
    };
    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerleave", salir);
    return () => {
      el.removeEventListener("pointermove", mover);
      el.removeEventListener("pointerleave", salir);
    };
  }, [fuerza]);

  return (
    <span ref={ref} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}
