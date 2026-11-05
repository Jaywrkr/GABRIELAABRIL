"use client";
// Tecnología: el video crece desde una ventana hasta llenar la pantalla (técnica del video de referencia)
// y luego la lista en filas del estilo C: al pasar el mouse la fila se llena de blanco y una imagen sigue al cursor.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Foto } from "./Foto";
import { revelarPalabras, reducido } from "@/lib/revelar";
import { VIDEO_TECNOLOGIA, type Contenido } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Tecnologia({ t }: { t: Contenido }) {
  const raiz = useRef<HTMLDivElement>(null);
  const flotante = useRef<HTMLDivElement>(null);
  const [activo, setActivo] = useState(0);
  const mover = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(raiz);
      mover.current = {
        x: gsap.quickTo(flotante.current, "x", { duration: 0.7, ease: "power3" }),
        y: gsap.quickTo(flotante.current, "y", { duration: 0.7, ease: "power3" }),
      };
      revelarPalabras(q(".tec-titulo")[0], { inicio: "top 85%" });
      if (reducido()) return;
      const movil = window.matchMedia("(max-width: 900px)").matches;
      gsap.fromTo(
        q(".tec-video")[0],
        { clipPath: movil ? "inset(8% 6% 8% 6% round 6px)" : "inset(14% 18% 14% 18% round 6px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: q(".tec-video-sec")[0], start: "top top", end: "+=90%", pin: true, scrub: 0.8 } }
      );
      gsap.fromTo(q(".tec-video video")[0], { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: q(".tec-video-sec")[0], start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(q(".fila-item"), { y: 60, opacity: 0, filter: "blur(8px)", duration: 1.2, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: q(".filas")[0], start: "top 85%" } });
    },
    { scope: raiz }
  );

  const entrar = (i: number) => {
    setActivo(i);
    gsap.to(flotante.current, { scale: 1, duration: 0.6, ease: "expo.out" });
  };
  const salir = () => gsap.to(flotante.current, { scale: 0, duration: 0.5, ease: "expo.inOut" });

  return (
    <div ref={raiz} id="tecnologia">
      <section className="tec-video-sec">
        <div className="tec-video">
          <video src={VIDEO_TECNOLOGIA} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
          <span className="ceja">{t.tecnologia.video}</span>
        </div>
      </section>
      <section
        className="seccion lado"
        onPointerMove={(e) => {
          mover.current?.x(e.clientX);
          mover.current?.y(e.clientY);
        }}
      >
        <div className="seccion-cab">
          <span className="ceja">{t.tecnologia.ceja}</span>
          <span className="ceja">{String(t.tecnologia.lista.length).padStart(2, "0")}</span>
        </div>
        <h2 className="tec-titulo ancha">
          {t.tecnologia.titulo[0]} <span className="it">{t.tecnologia.titulo[1]}</span> {t.tecnologia.titulo[2]}
        </h2>
        <ul className="filas" onPointerLeave={salir}>
          {t.tecnologia.lista.map((nombre, i) => (
            <li className="fila-item" key={nombre} onPointerEnter={() => entrar(i)}>
              <a href="#contacto" data-cursor={t.tratamientos.ver}>
                <span className="fila-n">{String(i + 1).padStart(2, "0")}</span>
                <span className={"fila-nombre " + (i % 2 ? "it" : "ancha")}>{nombre}</span>
                <span className="fila-desc">{t.tecnologia.descs[i]}</span>
                <svg className="fila-flecha" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                  <path d="M6 18L18 6M8 6h10v10" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        <p className="tec-nota">{t.tecnologia.nota}</p>

        <div className="flotante" ref={flotante} aria-hidden="true">
          <div className="flotante-pista" style={{ transform: `translateY(${-activo * 100}%)` }}>
            {t.tecnologia.lista.map((nombre, i) => (
              <Foto key={nombre} etiqueta={nombre} clara={i % 2 === 1} className="flotante-foto" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
