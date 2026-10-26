"use client";
// Casos: carrusel (Embla) con un comparador antes/después arrastrable en cada diapositiva.
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Titular } from "./Titular";
import type { Contenido } from "@/lib/content";

// Ilustración provisional: [desplazamiento x, diferencia de alto, giro] por diente
type Ajuste = [number, number, number];
const casos: { antes: { c: string; d: Ajuste[]; gap: number }; despues: string }[] = [
  { antes: { c: "#DCC292", d: [[0, -8, -4], [0, 6, 3], [0, -3, 0], [0, 4, 2], [0, -10, -5], [0, 2, 1]], gap: 10 }, despues: "#F6F2EA" },
  { antes: { c: "#E5CFA2", d: [[0, -18, 0], [0, -4, 0], [0, -26, 0], [0, -22, 0], [0, -6, 0], [0, -16, 0]], gap: 6 }, despues: "#F3ECDD" },
  { antes: { c: "#E9D7B0", d: [[0, 4, -7], [14, -4, 9], [-6, 6, -6], [8, 0, 8], [-12, -2, -9], [0, 6, 6]], gap: 2 }, despues: "#F2EADA" },
];
const base = [
  { x: 150, w: 70, h: 118 },
  { x: 226, w: 80, h: 140 },
  { x: 312, w: 84, h: 160 },
  { x: 404, w: 84, h: 160 },
  { x: 494, w: 80, h: 140 },
  { x: 580, w: 70, h: 118 },
];

function Boca({ color, ajustes, gap }: { color: string; ajustes?: Ajuste[]; gap: number }) {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="500" fill="#2C1418" />
      <path d="M60 150 C 220 70, 580 70, 740 150 L 740 0 L 60 0 Z" fill="#B76A73" />
      <path d="M40 330 C 220 470, 580 470, 760 330 L 760 500 L 40 500 Z" fill="#8A3446" />
      {base.map((b, i) => {
        const [dx, dh, rot] = ajustes ? ajustes[i] : [0, 0, 0];
        const x = b.x + dx + (i < 3 ? -1 : 1) * (gap / 2);
        const y = 104;
        const w = b.w - 4;
        const h = b.h + dh;
        const cx = x + w / 2;
        return (
          <g key={i} transform={`rotate(${rot} ${cx} ${y})`}>
            <path d={`M${x} ${y} L${x + w} ${y} L${x + w} ${y + h - 26} Q${x + w} ${y + h} ${cx} ${y + h} Q${x} ${y + h} ${x} ${y + h - 26} Z`} fill={color} />
            <path d={`M${x + 10} ${y + 20} L${x + 10} ${y + h - 34}`} stroke={`rgba(255,255,255,${ajustes ? 0.25 : 0.55})`} strokeWidth="6" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

function Comparador({ i, t }: { i: number; t: Contenido }) {
  const [corte, setCorte] = useState(50);
  const c = casos[i];
  return (
    <div className="comparador" style={{ ["--corte" as string]: `${corte}%` }}>
      <Boca color={c.antes.c} ajustes={c.antes.d} gap={c.antes.gap} />
      <div className="capa-despues">
        <Boca color={c.despues} gap={0} />
      </div>
      <span className="etq a">{t.casos.antes}</span>
      <span className="etq d">{t.casos.despues}</span>
      <div className="divisor" />
      <input type="range" min={0} max={100} value={corte} onChange={(e) => setCorte(+e.target.value)} aria-label={t.casos.comparar} />
    </div>
  );
}

export function Casos({ t }: { t: Contenido }) {
  const [ref, api] = useEmblaCarousel({
    align: "start",
    loop: false,
    // No arrastrar el carrusel cuando se arrastra el comparador
    watchDrag: (_api, evt) => !(evt.target as HTMLElement).closest(".comparador"),
  });
  const [sel, setSel] = useState(0);

  useEffect(() => {
    if (!api) return;
    const f = () => setSel(api.selectedScrollSnap());
    api.on("select", f);
    f();
    return () => {
      api.off("select", f);
    };
  }, [api]);

  const ir = useCallback((i: number) => api?.scrollTo(i), [api]);

  return (
    <section className="casos" id="casos">
      <div className="marco">
        <div className="sec-cab">
          <p className="ceja">{t.casos.ceja}</p>
          <Titular>
            {t.casos.titulo[0]}
            <em>{t.casos.titulo[1]}</em>
          </Titular>
        </div>

        <div className="casos-grid">
          <div className="embla" ref={ref}>
            <div className="embla-pista">
              {t.casos.lista.map((_, i) => (
                <div className="embla-slide" key={i}>
                  <Comparador i={i} t={t} />
                </div>
              ))}
            </div>
          </div>

          <div className="casos-lado">
            <div className="casos-lista" role="tablist" aria-label={t.casos.ceja}>
              {t.casos.lista.map(([titulo, sub], i) => (
                <button key={titulo} type="button" role="tab" aria-selected={sel === i} className="caso-btn" onClick={() => ir(i)}>
                  <span className="caso-n">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <b>{titulo}</b>
                    <span>{sub}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="casos-flechas">
              <button type="button" onClick={() => api?.scrollPrev()} disabled={sel === 0} aria-label={t.casos.anterior}>
                <ArrowLeft size={18} strokeWidth={1.4} />
              </button>
              <button type="button" onClick={() => api?.scrollNext()} disabled={sel === t.casos.lista.length - 1} aria-label={t.casos.siguiente}>
                <ArrowRight size={18} strokeWidth={1.4} />
              </button>
            </div>
            <p className="nota">
              <span className="marcador">{t.casos.ilustracion}</span>
              <span>{t.casos.nota}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
