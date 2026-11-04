"use client";
// Frase grande que se "enciende" palabra por palabra al hacer scroll, con dos pastillas de video entre las palabras.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Fragment, useRef } from "react";
import type { Contenido } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Manifiesto({ t }: { t: Contenido }) {
  const ref = useRef<HTMLElement>(null);
  const palabras = t.manifiesto.texto.split(" ");
  const pastillas = new Set([1, Math.floor(palabras.length * 0.6)]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ref.current!.querySelectorAll(".palabra, .pastilla"),
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current!.querySelector("p.grande"), start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
      gsap.from(ref.current!.querySelectorAll(".pastilla"), {
        width: 0,
        ease: "expo.out",
        duration: 1.4,
        stagger: 0.15,
        scrollTrigger: { trigger: ref.current!.querySelector("p.grande"), start: "top 75%" },
      });
    },
    { scope: ref }
  );

  return (
    <section className="seccion manifiesto lado" ref={ref}>
      <span className="ceja">{t.manifiesto.ceja}</span>
      <p className="grande">
        {palabras.map((p, i) => (
          <Fragment key={i}>
            <span className={"palabra" + (t.manifiesto.italicas.includes(p) ? " it" : "")}>{p}</span>
            {pastillas.has(i) && (
              <span className="pastilla" aria-hidden="true">
                <video src="/video/hero.mp4" autoPlay muted loop playsInline />
              </span>
            )}
          </Fragment>
        ))}
      </p>
    </section>
  );
}
