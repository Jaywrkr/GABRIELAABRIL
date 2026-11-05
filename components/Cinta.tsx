"use client";
// Cinta infinita de tratamientos. Avanza sola y acelera con la velocidad del scroll (cambia de sentido al subir).
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Estrella() {
  return (
    <svg className="cinta-estrella" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" fill="currentColor" />
    </svg>
  );
}

export function Cinta({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const pista = ref.current!.querySelector(".cinta-pista")!;
      const loop = gsap.to(pista, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
      let dir = 1;
      const st = ScrollTrigger.create({
        onUpdate(self) {
          const v = self.getVelocity();
          if (Math.abs(v) < 20) return;
          dir = v > 0 ? 1 : -1;
          gsap.to(loop, { timeScale: dir * Math.min(5, 1 + Math.abs(v) / 400), duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.2, ease: "power2.out", overwrite: false });
        },
      });
      return () => {
        st.kill();
        loop.kill();
      };
    },
    { scope: ref }
  );

  const grupo = (clave: string) => (
    <div className="cinta-grupo" key={clave} aria-hidden={clave === "b"}>
      {items.map((x, i) => (
        <span key={x} style={{ display: "contents" }}>
          <span className={i % 2 ? "it" : ""}>{x}</span>
          <Estrella />
        </span>
      ))}
    </div>
  );

  return (
    <div className="cinta" ref={ref}>
      <div className="cinta-pista">
        {grupo("a")}
        {grupo("b")}
      </div>
    </div>
  );
}
