"use client";
// Sobre Gabriela (sección clara): la foto se descubre de abajo hacia arriba con paralaje interno.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Foto } from "./Foto";
import { Titular } from "./Titular";
import type { Contenido } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Estudio({ t }: { t: Contenido }) {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const foto = raiz.current!.querySelector(".estudio-foto")!;
      gsap.fromTo(foto, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: foto, start: "top 80%" } });
      gsap.fromTo(foto.querySelector(".foto-fondo"), { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: foto, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(raiz.current!.querySelectorAll(".estudio-texto > p, .estudio-datos > div"), {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: raiz.current!.querySelector(".estudio-texto"), start: "top 80%" },
      });
    },
    { scope: raiz }
  );

  return (
    <section className="seccion estudio lado" id="estudio" ref={raiz}>
      <div className="seccion-cab">
        <span className="ceja">{t.estudio.ceja}</span>
        <span className="ceja">Universidad de Cuenca</span>
      </div>
      <div className="estudio-grid">
        <Foto className="estudio-foto" etiqueta={t.estudio.foto} pendiente={t.pendiente} />
        <div className="estudio-texto">
          <Titular className="ancha">
            {t.estudio.titulo[0]} <span className="it">{t.estudio.titulo[1]}</span> {t.estudio.titulo[2]}
          </Titular>
          <p>{t.estudio.texto}</p>
          <div className="estudio-datos">
            {t.estudio.datos.map(([a, b]) => (
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
