"use client";
// Cierre como en la referencia: una foto en silueta que se abre desde el centro hasta llenar la pantalla
// mientras la frase final llega palabra por palabra con desenfoque.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Foto } from "./Foto";
import { reducido } from "@/lib/revelar";
import { REF, type Contenido } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Cierre({ t }: { t: Contenido }) {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducido()) return;
      const q = gsap.utils.selector(raiz);
      const movil = window.matchMedia("(max-width: 760px)").matches;
      const tl = gsap.timeline({ scrollTrigger: { trigger: q(".cierre-pin")[0], start: "top top", end: "+=150%", pin: true, scrub: 1 } });
      tl.fromTo(q(".cierre-foto")[0], { clipPath: movil ? "inset(24% 14% 24% 14% round 4px)" : "inset(22% 32% 22% 32% round 4px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1, ease: "none" }, 0)
        .fromTo(q(".cierre-foto .foto-fondo")[0], { scale: 1.4 }, { scale: 1, duration: 1, ease: "none" }, 0)
        .from(q(".cierre-txt .palabra"), { opacity: 0, filter: "blur(20px)", y: 50, duration: 0.4, stagger: 0.09, ease: "power2.out" }, 0.2);
    },
    { scope: raiz }
  );

  const [a, b, c, d] = t.cierre.frase;
  return (
    <section className="cierre" ref={raiz}>
      <div className="cierre-pin">
        <Foto className="cierre-foto" src={REF.cierre} etiqueta={t.cierre.foto} />
        <div className="cierre-txt lado" aria-label={t.cierre.frase.join(" ")}>
          <p className="ancha" aria-hidden="true">
            <span className="palabra">{a}</span> <span className="palabra it">{b}</span>
          </p>
          <p className="ancha" aria-hidden="true">
            <span className="palabra">{c}</span> <span className="palabra it">{d}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
