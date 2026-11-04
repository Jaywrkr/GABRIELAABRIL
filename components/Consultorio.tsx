"use client";
// El consultorio: en escritorio la sección queda fija y las fotos avanzan de lado con el scroll;
// en móvil es un carrusel que se desliza con el dedo.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Foto } from "./Foto";
import { Titular } from "./Titular";
import type { Contenido } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Consultorio({ t }: { t: Contenido }) {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        const pin = raiz.current!.querySelector<HTMLElement>(".cons-pin")!;
        const pista = raiz.current!.querySelector<HTMLElement>(".cons-pista")!;
        const distancia = () => pista.scrollWidth - pin.clientWidth;
        const tween = gsap.to(pista, {
          x: () => -distancia(),
          ease: "none",
          scrollTrigger: { trigger: raiz.current, start: "top top", end: () => "+=" + distancia(), pin: true, scrub: 0.8, invalidateOnRefresh: true },
        });
        // Cada foto se mueve un poco dentro de su marco mientras pasa
        pista.querySelectorAll(".foto-fondo").forEach((f) => {
          gsap.fromTo(f, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: f.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: raiz }
  );

  return (
    <section className="consultorio" ref={raiz} id="consultorio">
      <div className="cons-fijo">
      <div className="lado">
        <div className="seccion-cab">
          <span className="ceja">{t.consultorio.ceja}</span>
          <span className="ceja">Cuenca, EC</span>
        </div>
        <div className="cons-cab">
          <Titular className="ancha">
            {t.consultorio.titulo[0]} <span className="it">{t.consultorio.titulo[1]}</span>
          </Titular>
          <p>{t.consultorio.texto}</p>
        </div>
      </div>
      <div className="cons-pin lado">
        <div className="cons-pista">
          {t.consultorio.fotos.map((f, i) => (
            <Foto key={f} etiqueta={f} pendiente={t.pendiente} clara={i % 3 === 1} className="cons-item" />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
