"use client";
// Cursor propio (solo con mouse): un punto que se invierte sobre blanco y negro, y crece con una
// etiqueta sobre cualquier elemento con data-cursor="Texto".
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [etiqueta, setEtiqueta] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    gsap.set(el, { xPercent: 0, yPercent: 0, opacity: 0 });
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    let visible = false;
    const mover = (e: PointerEvent) => {
      if (!visible) {
        gsap.to(el, { opacity: 1, duration: 0.3 });
        visible = true;
      }
      x(e.clientX);
      y(e.clientY);
      const objetivo = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setEtiqueta(objetivo ? objetivo.dataset.cursor || "" : null);
    };
    const salir = () => {
      gsap.to(el, { opacity: 0, duration: 0.3 });
      visible = false;
    };
    let ux = -1, uy = -1;
    const revisar = () => {
      if (ux < 0) return;
      const objetivo = document.elementFromPoint(ux, uy)?.closest<HTMLElement>("[data-cursor]");
      setEtiqueta(objetivo ? objetivo.dataset.cursor || "" : null);
    };
    const guardar = (e: PointerEvent) => {
      ux = e.clientX;
      uy = e.clientY;
    };
    window.addEventListener("pointermove", guardar, { passive: true });
    window.addEventListener("scroll", revisar, { passive: true });
    window.addEventListener("pointermove", mover, { passive: true });
    document.documentElement.addEventListener("pointerleave", salir);
    return () => {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointermove", guardar);
      window.removeEventListener("scroll", revisar);
      document.documentElement.removeEventListener("pointerleave", salir);
    };
  }, []);

  return (
    <div ref={ref} className={"cursor" + (etiqueta !== null ? " grande" : "")} aria-hidden="true">
      <span>{etiqueta}</span>
    </div>
  );
}
