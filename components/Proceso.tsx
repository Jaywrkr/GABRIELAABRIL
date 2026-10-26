"use client";
// Sección fija (pinned): mientras haces scroll, el diente pasa por escaneo → diseño → prueba → porcelana.
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Titular } from "./Titular";
import { progreso } from "@/lib/progreso";
import { useMovil, useReducido, useWebGL } from "@/lib/hooks";
import type { Contenido } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DienteProceso = dynamic(() => import("./three/DienteProceso"), { ssr: false });

export function Proceso({ t }: { t: Contenido }) {
  const seccion = useRef<HTMLElement>(null);
  const fijo = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLDivElement>(null);
  const [paso, setPaso] = useState(0);
  const movil = useMovil();
  const reducido = useReducido();
  const webgl = useWebGL();
  const animado = webgl && !reducido;

  useGSAP(
    () => {
      if (!animado) return;
      const st = ScrollTrigger.create({
        trigger: fijo.current,
        start: "top top",
        end: "+=320%",
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate(self) {
          progreso.p = self.progress;
          setPaso(Math.min(3, Math.floor(self.progress * 4)));
          if (barra.current) barra.current.style.transform = `scaleX(${self.progress})`;
        },
      });
      return () => st.kill();
    },
    { scope: seccion, dependencies: [animado] }
  );

  return (
    <section className="proceso" id="proceso" ref={seccion}>
      <div className="marco">
        <div className="sec-cab">
          <p className="ceja">{t.proceso.ceja}</p>
          <Titular>
            {t.proceso.titulo[0]}
            <em>{t.proceso.titulo[1]}</em>
          </Titular>
        </div>
      </div>

      {animado ? (
        <div className="proceso-fijo" ref={fijo}>
          <div className="marco proceso-grid">
            <ol className="proceso-pasos">
              {t.proceso.pasos.map(([titulo, texto], i) => (
                <li key={titulo} className={i === paso ? "activo" : i < paso ? "hecho" : ""} aria-current={i === paso ? "step" : undefined}>
                  <span className="n">{i + 1}</span>
                  <div>
                    <b>{titulo}</b>
                    <p>{texto}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="proceso-3d">
              <DienteProceso movil={movil} />
              <div className="proceso-etiqueta">
                <span className="ceja">{String(paso + 1).padStart(2, "0")} / 04</span>
                <b>{t.proceso.pasos[paso][0]}</b>
              </div>
            </div>
          </div>
          <div className="marco">
            <div className="proceso-avance">
              <div ref={barra} />
            </div>
          </div>
        </div>
      ) : (
        <div className="marco">
          <ol className="pasos-estaticos">
            {t.proceso.pasos.map(([titulo, texto], i) => (
              <li key={titulo}>
                <span className="n">{i + 1}</span>
                <b>{titulo}</b>
                <p>{texto}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
