"use client";
// Lista de tratamientos. Al pasar el mouse, la fila se llena de blanco y una imagen sigue al cursor;
// la imagen cambia de tratamiento deslizándose hacia arriba o abajo.
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Foto } from "./Foto";
import type { Contenido } from "@/lib/content";

gsap.registerPlugin(useGSAP);

export function Tratamientos({ t }: { t: Contenido }) {
  const raiz = useRef<HTMLElement>(null);
  const flotante = useRef<HTMLDivElement>(null);
  const [activo, setActivo] = useState(0);
  const mover = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useGSAP(
    () => {
      const f = flotante.current!;
      mover.current = {
        x: gsap.quickTo(f, "x", { duration: 0.7, ease: "power3" }),
        y: gsap.quickTo(f, "y", { duration: 0.7, ease: "power3" }),
      };
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(raiz.current!.querySelectorAll(".trat-fila"), {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: raiz.current!.querySelector(".trat-lista"), start: "top 85%" },
      });
    },
    { scope: raiz }
  );

  const entrar = (i: number) => {
    setActivo(i);
    gsap.to(flotante.current, { scale: 1, duration: 0.6, ease: "expo.out" });
  };
  const salir = () => gsap.to(flotante.current, { scale: 0, duration: 0.5, ease: "expo.inOut" });

  return (
    <section
      className="seccion lado"
      id="tratamientos"
      ref={raiz}
      onPointerMove={(e) => {
        mover.current?.x(e.clientX);
        mover.current?.y(e.clientY);
      }}
    >
      <div className="seccion-cab">
        <span className="ceja">{t.tratamientos.ceja}</span>
        <span className="ceja">{String(t.tratamientos.items.length).padStart(2, "0")}</span>
      </div>
      <ul className="trat-lista" onPointerLeave={salir}>
        {t.tratamientos.items.map(([nombre, tipo, desc], i) => (
          <li className="trat-fila" key={nombre} onPointerEnter={() => entrar(i)}>
            <a href="#contacto" data-cursor={t.tratamientos.ver}>
              <span className="trat-n">{String(i + 1).padStart(2, "0")}</span>
              <span className={"trat-nombre " + (i % 2 ? "it" : "ancha")}>{nombre}</span>
              <span className="trat-desc">
                <span style={{ display: "block", color: "inherit", opacity: 0.6, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 6 }}>{tipo}</span>
                {desc}
              </span>
              <svg className="trat-flecha" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M6 18L18 6M8 6h10v10" />
              </svg>
            </a>
          </li>
        ))}
      </ul>

      <div className="trat-flotante" ref={flotante} aria-hidden="true">
        <div className="trat-flotante-pista" style={{ transform: `translateY(${-activo * 100}%)` }}>
          {t.tratamientos.items.map(([nombre], i) => (
            <Foto key={nombre} etiqueta={nombre} clara={i % 2 === 1} className="trat-flotante-foto" />
          ))}
        </div>
      </div>
    </section>
  );
}
