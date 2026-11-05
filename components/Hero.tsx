"use client";
// Hero como en la referencia: mitad fondo claro, mitad video. El título cruza las dos mitades
// (oscuro sobre el claro, blanco sobre el video). Los clips rotan solos. Con el scroll el video
// llena la pantalla y una frase enorme cruza de derecha a izquierda.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { REF, type Contenido } from "@/lib/content";

const CLIPS_HERO = REF.hero;

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

function Titulo({ t }: { t: Contenido }) {
  return (
    <h1 className="hero-titulo ancha" aria-hidden="true">
      <span className="fila">{t.hero.titulo[0]}</span>
      <span className="fila">{t.hero.titulo[1]}</span>
      <span className="fila it">{t.hero.italica}</span>
    </h1>
  );
}

export function Hero({ t }: { t: Contenido }) {
  const raiz = useRef<HTMLElement>(null);
  const [clip, setClip] = useState(0);

  // Rotación de clips cada 4,5 s
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setClip((c) => (c + 1) % CLIPS_HERO.length), 4500);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(raiz);
      const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducido) return;
      const movil = window.matchMedia("(max-width: 760px)").matches;

      // Entrada: las filas del título suben (en las dos capas a la vez) y el video se abre desde el borde
      const filas = q(".hero-titulo .fila");
      const espera = document.documentElement.dataset.intro === "1" ? 1.8 : 0.15;
      const entrada = gsap.timeline({ delay: espera });
      entrada
        .from(filas, { yPercent: 40, opacity: 0, filter: "blur(18px)", duration: 1.6, ease: "expo.out", stagger: { each: 0.1, grid: [2, 3], from: "start" } }, 0)
        .from(q(".hero-video"), { clipPath: movil ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 0% 100%)", duration: 1.8, ease: "expo.inOut" }, 0)
        .from(q(".hero-clips"), { scale: 1.35, duration: 2.4, ease: "expo.out" }, 0.2)
        .from(q(".hero-pie > *"), { y: 16, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.05 }, 0.9);

      // Scroll: el video llena la pantalla, el título se va y la frase cruza
      const frase = q(".hero-frase")[0] as HTMLElement;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: q(".hero-pin")[0], start: "top top", end: "+=220%", pin: true, scrub: 1, anticipatePin: 1 },
      });
      tl.fromTo(q(".hero-video"), { clipPath: movil ? "inset(58% 0% 0% 0%)" : "inset(0% 0% 0% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45 }, 0)
        .fromTo(q(".hero-clips"), { y: 0 }, { y: 0, duration: 1 }, 0)
        .to(q(".hero-titulo"), { yPercent: -70, opacity: 0, filter: "blur(10px)", duration: 0.35 }, 0.2)
        .to(q(".hero-pie"), { opacity: 0, duration: 0.2 }, 0.15)
        .fromTo(frase, { x: () => window.innerWidth * 0.9 }, { x: () => -(frase.scrollWidth - window.innerWidth * 0.55), duration: 0.75, ease: "none" }, 0.3)

    },
    { scope: raiz }
  );

  return (
    <section className="hero" ref={raiz} id="inicio">
      <h1 className="oculto" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        Dra. Gabriela Abril — {t.hero.titulo.join(" ")} {t.hero.italica}
      </h1>
      <div className="hero-pin">
        {/* Capa clara */}
        <div className="hero-base">
          <Titulo t={t} />
          <div className="hero-pie lado">
            <p>{t.hero.texto}</p>
          </div>
        </div>

        {/* Capa de video: misma posición del título, en blanco */}
        <div className="hero-video">
          <div className="hero-clips" aria-hidden="true">
            {CLIPS_HERO.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} className={"hero-img " + (i === clip ? "on" : "")} src={src} alt="" />
            ))}
          </div>
          <div className="hero-velo" aria-hidden="true" />
          <Titulo t={t} />
          <p className="hero-frase ancha" aria-hidden="true">
            {t.hero.frase[0]} <span className="it">{t.hero.frase[1]}</span> {t.hero.frase[2]}
          </p>
          <div className="hero-pie lado">
            <span className="ceja" style={{ color: "inherit" }}>
              {t.hero.pie}
            </span>
            <div className="hero-indicador" aria-hidden="true">
              {CLIPS_HERO.map((src, i) => (
                <span key={src + clip} className={i === clip ? "on" : ""} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
