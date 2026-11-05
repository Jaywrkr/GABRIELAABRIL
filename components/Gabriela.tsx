"use client";
// Gabriela: su nombre gigante entra letra por letra con desenfoque, luego sus datos y una frase.
// Después "Estoy aquí para realzar tu sonrisa" con arcos finos que se dibujan con el scroll.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
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
      gsap.from(q(".gab-datos > div"), { y: 30, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: q(".gab-datos")[0], start: "top 88%" } });

      // Arcos: se dibujan y giran apenas mientras la sección está fija; el texto llega desenfocado
      const arcos = Array.from(raiz.current!.querySelectorAll<SVGPathElement>(".gab-arcos path"));
      arcos.forEach((p) => {
        const l = p.getTotalLength();
        gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
      });
      const tl = gsap.timeline({ scrollTrigger: { trigger: q(".gab-arcos")[0], start: "top top", end: "+=140%", pin: true, scrub: 1 } });
      tl.to(arcos, { strokeDashoffset: 0, duration: 1, stagger: 0.12, ease: "none" }, 0)
        .fromTo(q(".gab-arcos svg"), { rotate: -8 }, { rotate: 6, duration: 1.4, ease: "none" }, 0)
        .from(q(".gab-arcos-txt > *"), { opacity: 0, filter: "blur(18px)", y: 40, duration: 0.5, stagger: 0.12, ease: "power2.out" }, 0.15)
        .to(q(".gab-arcos-txt"), { scale: 0.92, opacity: 0, filter: "blur(10px)", duration: 0.35 }, 1.15);
    },
    { scope: raiz }
  );

  return (
    <section className="gab" id="gabriela" ref={raiz}>
      <div className="lado">
        <h2 className="gab-nombre ancha" aria-label={t.gabriela.nombre.join(" ")}>
          <span className="fila" aria-hidden="true">{t.gabriela.nombre[0]}</span>
          <span className="fila" aria-hidden="true">{t.gabriela.nombre[1]}</span>
        </h2>
        <div className="gab-datos">
          {t.gabriela.datos.map(([a, b]) => (
            <div key={a}>
              <span>{a}</span>
              <span>{b}</span>
            </div>
          ))}
        </div>
        <p className="gab-frase serif">{t.gabriela.frase}</p>
      </div>

      <div className="gab-arcos lado">
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M 120 640 A 520 520 0 0 1 880 -40" />
          <path d="M 40 300 A 460 460 0 1 1 960 300" />
          <path d="M 300 -60 A 380 380 0 0 0 720 660" />
          <path d="M 500 650 A 300 300 0 0 1 500 -50" />
        </svg>
        <p className="gab-arcos-txt">
          <span className="serif">{t.gabriela.arcos[0]}</span>
          <small>{t.gabriela.porque}</small>
          <span className="it">{t.gabriela.arcos[1]}</span>
          <span className="serif ultima">{t.gabriela.arcos[2]}</span>
        </p>
      </div>
    </section>
  );
}
