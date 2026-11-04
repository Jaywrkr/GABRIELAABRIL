"use client";
// Instagram + contacto final: las letras de "Hablemos" suben una por una y el círculo de WhatsApp es magnético.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Foto } from "./Foto";
import { Magnetico } from "./Magnetico";
import { INSTAGRAM, WEB_SEBASTIAN, WHATSAPP, type Contenido } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Contacto({ t }: { t: Contenido }) {
  const raiz = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(raiz.current!.querySelectorAll(".ig-item"), {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: raiz.current!.querySelector(".ig-grid"), start: "top 85%" },
      });
      gsap.from(raiz.current!.querySelectorAll(".contacto-titulo .letra"), {
        yPercent: 110,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.035,
        scrollTrigger: { trigger: raiz.current!.querySelector(".contacto-titulo"), start: "top 85%" },
      });
      gsap.from(raiz.current!.querySelector(".contacto-circulo"), {
        scale: 0,
        rotate: -90,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: raiz.current!.querySelector(".contacto-titulo"), start: "top 80%" },
      });
    },
    { scope: raiz }
  );

  return (
    <div ref={raiz}>
      <section className="seccion lado" style={{ paddingTop: 0 }}>
        <div className="seccion-cab" style={{ alignItems: "baseline" }}>
          <span className="ceja">{t.instagram.ceja}</span>
          <a className="ig-usuario" href="#" data-cursor="Instagram">
            @{INSTAGRAM} ↗
          </a>
        </div>
        <div className="ig-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <Foto key={i} etiqueta={`Reel ${i + 1}`} clara={i % 3 === 2} className="ig-item" />
          ))}
        </div>
      </section>

      <section className="contacto lado" id="contacto">
        <span className="ceja">{t.contacto.ceja}</span>
        <div className="contacto-fila">
          <h2 className="contacto-titulo ancha" aria-label={t.contacto.titulo} style={{ ["--n" as string]: t.contacto.titulo.length }}>
            {t.contacto.titulo.split("").map((l, i) => (
              <span className="letra" key={i} aria-hidden="true">
                {l === " " ? " " : l}
              </span>
            ))}
          </h2>
          <Magnetico fuerza={0.45}>
            <a className="contacto-circulo" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener">
              {t.contacto.boton} ↗
            </a>
          </Magnetico>
        </div>
        <div className="contacto-pie">
          <span>{t.contacto.direccion}</span>
          <span>{t.contacto.horario}</span>
          <a href={WEB_SEBASTIAN}>{t.contacto.sebastian}</a>
          <span>{t.contacto.derechos}</span>
        </div>
      </section>
    </div>
  );
}
