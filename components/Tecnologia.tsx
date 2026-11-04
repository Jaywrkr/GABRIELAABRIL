"use client";
// Tecnología: un video que crece desde una ventana hasta llenar la pantalla, un titular enorme que se
// revela con desenfoque y una lista fija: número grande, imagen central que cambia y la lista con el
// elemento activo en negro.
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
  const [activo, setActivo] = useState(0);
  const actual = useRef(0);
  const n = t.tecnologia.lista.length;

  useGSAP(
    () => {
      const q = gsap.utils.selector(raiz);
      revelarPalabras(q(".tec-titulo")[0], { inicio: "top 80%" });
      if (reducido()) return;
      const mm = gsap.matchMedia();
      mm.add({ esc: "(min-width: 901px)", mov: "(max-width: 900px)" }, (ctx) => {
        const { esc } = ctx.conditions as { esc: boolean };
        gsap.fromTo(
          q(".tec-video")[0],
          { clipPath: esc ? "inset(14% 18% 14% 18% round 6px)" : "inset(8% 6% 8% 6% round 6px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: q(".tec-video-sec")[0], start: "top top", end: "+=90%", pin: true, scrub: 0.8 } }
        );
        gsap.fromTo(q(".tec-video video")[0], { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: q(".tec-video-sec")[0], start: "top bottom", end: "bottom top", scrub: true } });
        if (!esc) return;
        const fotos = q(".tec-imgs .foto");
        gsap.set(fotos, { clipPath: (i: number) => (i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)") });
        ScrollTrigger.create({
          trigger: q(".tec-pin")[0],
          start: "top top",
          end: () => "+=" + window.innerHeight * (n - 0.5),
          pin: true,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.3, max: 0.7 }, ease: "power2.inOut" },
          onUpdate(self) {
            const i = Math.min(n - 1, Math.round(self.progress * (n - 1)));
            if (i === actual.current) return;
            const prev = actual.current;
            actual.current = i;
            setActivo(i);
            gsap.set(fotos[i], { zIndex: 2 });
            gsap.set(fotos[prev], { zIndex: 1 });
            gsap.fromTo(fotos[i], { clipPath: i > prev ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut", overwrite: true });
            gsap.fromTo(q(".tec-num b")[0], { yPercent: i > prev ? 60 : -60, opacity: 0, filter: "blur(10px)" }, { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "expo.out", overwrite: true });
          },
        });
      });
      return () => mm.revert();
    },
    { scope: raiz }
  );

  return (
    <div ref={raiz} id="tecnologia">
      <section className="tec-video-sec">
        <div className="tec-video">
          <video src={VIDEO_TECNOLOGIA} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
          <span className="ceja">{t.tecnologia.video}</span>
        </div>
      </section>
      <section className="tec lado">
        <h2 className="tec-titulo ancha">
          {t.tecnologia.titulo[0]} <span className="it">{t.tecnologia.titulo[1]}</span> {t.tecnologia.titulo[2]}
        </h2>
        <div className="tec-pin">
          <div className="tec-num" aria-hidden="true">
            <b style={{ fontWeight: 200, display: "inline-block" }}>{String(activo + 1).padStart(2, "0")}</b>
            <small>/ {String(n).padStart(2, "0")}</small>
          </div>
          <div className="tec-imgs">
            {t.tecnologia.lista.map((x, i) => (
              <Foto key={x} etiqueta={x} pendiente={t.pendiente} clara={i % 2 === 0} />
            ))}
          </div>
          <div>
            <span className="ceja" style={{ display: "block", marginBottom: 20, color: "#777" }}>
              {t.tecnologia.ceja}
            </span>
            <ol className="tec-lista">
              {t.tecnologia.lista.map((x, i) => (
                <li key={x} className={i === activo ? "on" : ""}>
                  {x}
                </li>
              ))}
            </ol>
            <p className="tec-nota">{t.tecnologia.nota}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
