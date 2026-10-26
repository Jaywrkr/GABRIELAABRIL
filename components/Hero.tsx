"use client";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Titular } from "./Titular";
import { Boton } from "./Boton";
import { tonos, WHATSAPP, type Contenido } from "@/lib/content";
import { elegirTono, useTono } from "@/lib/tono";
import { useMovil, useReducido, useWebGL } from "@/lib/hooks";

const DienteHero = dynamic(() => import("./three/DienteHero"), { ssr: false, loading: () => <Poster /> });

// Imagen de reposo mientras carga el 3D (o si el dispositivo no tiene WebGL)
function Poster() {
  return (
    <div className="poster" aria-hidden="true">
      <span className="poster-disco" />
      <svg viewBox="-0.6 -0.8 1.2 1.6" className="poster-diente">
        <path d="M-0.39 0.66 Q0 0.7 0.37 0.66 Q0.475 0.65 0.465 0.5 C0.465 0.08 0.41 -0.36 0.3 -0.56 Q0 -0.8 -0.3 -0.56 C-0.425 -0.36 -0.47 0.08 -0.455 0.56 Q-0.45 0.665 -0.39 0.66Z" />
      </svg>
    </div>
  );
}

export function Hero({ t, lang }: { t: Contenido; lang: "es" | "en" }) {
  const indice = useTono();
  const movil = useMovil();
  const reducido = useReducido();
  const webgl = useWebGL();
  const tono = tonos[indice];

  return (
    <div className="hero" id="inicio">
      <div className="marco hero-grid">
        <div className="hero-texto">
          <motion.p className="ceja" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            {t.hero.ceja}
          </motion.p>
          <Titular as="h1" alCargar retraso={0.15} className="hero-titulo">
            {t.hero.titulo[0]}
            <br />
            {t.hero.titulo[1]}
            <br />
            <em>{t.hero.tituloItalica}</em>
          </Titular>
          <svg className="arco-sonrisa" viewBox="0 0 420 40" aria-hidden="true">
            <path d="M2 4 C 120 44, 300 44, 418 4" />
          </svg>
          <motion.div className="hero-baja" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }}>
            <p className="lead">{t.hero.lead}</p>
            <div className="ctas">
              <Boton href={`https://wa.me/${WHATSAPP}`} externo lleno>
                {t.hero.ctaPrincipal}
              </Boton>
              <Boton href="#casos">{t.hero.ctaSecundario}</Boton>
            </div>
          </motion.div>
        </div>

        <div className="hero-3d">
          {webgl && !reducido ? <DienteHero movil={movil} /> : <Poster />}
          <div className="hero-3d-pie">
            <span className="ceja">{t.hero.tono}</span>
            <motion.b key={tono.codigo} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              {tono.codigo}
            </motion.b>
            <span>{lang === "es" ? tono.es : tono.en}</span>
          </div>
        </div>
      </div>

      <div className="marco">
        <div className="guia">
          <div className="guia-cab">
            <span className="ceja">{t.hero.guiaCeja}</span>
            <p>{t.hero.guiaTexto}</p>
          </div>
          <div className="tabs" role="radiogroup" aria-label={t.hero.guiaCeja}>
            {tonos.map((x, i) => (
              <button
                key={x.codigo}
                type="button"
                role="radio"
                aria-checked={i === indice}
                className={"tab" + (i === indice ? " activo" : "")}
                style={{ ["--c" as string]: x.color }}
                onClick={() => elegirTono(i)}
              >
                <span>{x.codigo}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
