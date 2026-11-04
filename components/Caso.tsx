"use client";
// Caso destacado: comparador antes/después. Se arrastra con el mouse o el dedo, y con las flechas del teclado.
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Foto } from "./Foto";
import type { Contenido } from "@/lib/content";

gsap.registerPlugin(useGSAP);

export function Caso({ t }: { t: Contenido }) {
  const raiz = useRef<HTMLElement>(null);
  const [corte, setCorte] = useState(50);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const marco = raiz.current!.querySelector(".caso-marco")!;
      gsap.from(marco, {
        clipPath: "inset(18% 12% 18% 12% round 6px)",
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: marco, start: "top 80%" },
      });
      // Pequeña demostración: el divisor se mueve solo una vez para invitar a arrastrar
      const obj = { v: 50 };
      gsap.to(obj, {
        keyframes: [{ v: 32, duration: 0.7 }, { v: 66, duration: 0.9 }, { v: 50, duration: 0.7 }],
        ease: "power2.inOut",
        onUpdate: () => setCorte(obj.v),
        scrollTrigger: { trigger: marco, start: "top 55%" },
      });
    },
    { scope: raiz }
  );

  return (
    <section className="seccion lado" id="casos" ref={raiz}>
      <div className="seccion-cab">
        <span className="ceja">{t.caso.ceja}</span>
      </div>
      <div className="caso-marco" style={{ ["--corte" as string]: `${corte}%` }} data-cursor={t.caso.arrastra}>
        <Foto className="caso-capa" etiqueta={t.caso.antes} />
        <Foto className="caso-capa caso-despues" etiqueta={t.caso.despues} clara />
        <div className="caso-linea" />
        <div className="caso-asa">↔</div>
        <input type="range" min={0} max={100} step={0.1} value={corte} onChange={(e) => setCorte(+e.target.value)} aria-label={t.caso.comparar} />
      </div>
      <div className="caso-pie">
        <b>{t.caso.titulo}</b>
        <span className="ceja">{t.caso.nota}</span>
      </div>
    </section>
  );
}
