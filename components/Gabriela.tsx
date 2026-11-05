"use client";
// Gabriela: su nombre gigante entra letra por letra con desenfoque; abajo, retrato grande a un lado
// (se descubre de abajo hacia arriba con paralaje) y sus datos y una frase al otro.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Foto } from "./Foto";
import { revelarLetras, revelarPalabras, reducido } from "@/lib/revelar";
import type { Contenido } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Gabriela({ t }: { t: Contenido }) {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(raiz);
      q(".gab-nombre .fila").forEach((f, i) => revelarLetras(f, { inicio: "top 90%", retraso: i * 0.15 }));
      revelarPalabras(q(".gab-frase")[0], { scrub: true, inicio: "top 85%", fin: "bottom 60%" });
      if (reducido()) return;
      const foto = q(".gab-foto")[0];
      gsap.fromTo(foto, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: foto, start: "top 80%" } });
      gsap.fromTo(q(".gab-foto .foto-fondo")[0], { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: foto, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(q(".gab-datos > div"), { y: 24, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: q(".gab-datos")[0], start: "top 88%" } });
    },
    { scope: raiz }
  );

  return (
    <section className="gab lado" id="gabriela" ref={raiz}>
      <h2 className="gab-nombre ancha" aria-label={t.gabriela.nombre.join(" ")}>
        <span className="fila" aria-hidden="true">{t.gabriela.nombre[0]}</span>
        <span className="fila" aria-hidden="true">{t.gabriela.nombre[1]}</span>
      </h2>
      <div className="gab-grid">
        <Foto className="gab-foto" etiqueta={t.gabriela.foto} pendiente={t.pendiente} />
        <div className="gab-lado">
          <span className="ceja">{t.gabriela.ceja}</span>
          <p className="gab-frase serif">{t.gabriela.frase}</p>
          <div className="gab-datos">
            {t.gabriela.datos.map(([a, b]) => (
              <div key={a}>
                <span>{a}</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
