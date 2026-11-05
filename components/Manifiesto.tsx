"use client";
// Manifiesto del estilo C: la frase grande se enciende palabra por palabra (con el desenfoque del video de
// referencia) y dos pastillas de video se abren entre las palabras.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Fragment, useRef } from "react";
import { reducido } from "@/lib/revelar";
import { REF, type Contenido } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Manifiesto({ t }: { t: Contenido }) {
  const ref = useRef<HTMLElement>(null);
  const palabras = t.manifiesto.texto.split(" ");
  const pastillas = new Set([1, Math.floor(palabras.length * 0.6)]);

  useGSAP(
    () => {
      if (reducido()) return;
      const p = ref.current!.querySelector("p.grande")!;
      gsap.fromTo(
        ref.current!.querySelectorAll(".palabra, .pastilla"),
        { opacity: 0.12, filter: "blur(8px)" },
        { opacity: 1, filter: "blur(0px)", ease: "none", stagger: 0.06, scrollTrigger: { trigger: p, start: "top 80%", end: "bottom 45%", scrub: true } }
      );
      gsap.from(ref.current!.querySelectorAll(".pastilla"), { width: 0, ease: "expo.out", duration: 1.4, stagger: 0.15, scrollTrigger: { trigger: p, start: "top 70%" } });
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={REF.pastillas[i === 1 ? 0 : 1]} alt="" />
              </span>
            )}
          </Fragment>
        ))}
      </p>
    </section>
  );
}
