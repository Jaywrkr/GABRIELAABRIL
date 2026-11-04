"use client";
// Hero: mitad texto (blanco) y mitad video. Con el scroll la sección queda fija y el video crece
// hasta llenar la pantalla; el texto se va y aparece el titular sobre el video.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Magnetico } from "./Magnetico";
import { WHATSAPP, type Contenido } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export function Hero({ t }: { t: Contenido }) {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const q = gsap.utils.selector(raiz);

      // Entrada: líneas del titular suben desde una máscara (después de la intro)
      const split = SplitText.create(q(".hero-titulo")[0], { type: "lines", mask: "lines", linesClass: "linea-split" });
      if (!reducido) {
        const entrada = gsap.timeline({ delay: document.documentElement.dataset.intro === "1" ? 1.9 : 0.2 });
        entrada
          .from(split.lines, { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.09 })
          .from(q(".hero-ceja, .hero-baja > *"), { y: 18, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.06 }, "-=0.9")
          .from(q(".hero-video"), { clipPath: window.innerWidth > 760 ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)", duration: 1.6, ease: "expo.inOut" }, 0)
          .from(q(".hero-video video"), { scale: 1.4, duration: 2.2, ease: "expo.out" }, 0.2);
      }
      if (reducido) return () => split.revert();

      const mm = gsap.matchMedia();
      mm.add({ escritorio: "(min-width: 761px)", movil: "(max-width: 760px)" }, (ctx) => {
        const { escritorio } = ctx.conditions as { escritorio: boolean };
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: q(".hero-pin")[0], start: "top top", end: "+=150%", pin: true, scrub: 0.8, anticipatePin: 1 },
        });
        tl.fromTo(q(".hero-video"), { clipPath: escritorio ? "inset(0% 0% 0% 50%)" : "inset(54% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, 0)
          .fromTo(q(".hero-video video"), { scale: 1.18 }, { scale: 1, duration: 1 }, 0)
          .to(q(".hero-texto"), { xPercent: escritorio ? -18 : 0, yPercent: escritorio ? 0 : -12, opacity: 0, duration: 0.55 }, 0)
          .fromTo(q(".hero-video-capa"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.7)
          .from(q(".hero-video-titulo > span"), { yPercent: 60, opacity: 0, stagger: 0.08, duration: 0.3 }, 0.72);
      });
      return () => {
        mm.revert();
        split.revert();
      };
    },
    { scope: raiz }
  );

  return (
    <section className="hero" ref={raiz} id="inicio">
      <div className="hero-pin">
        <div className="hero-texto lado">
          <span className="ceja hero-ceja">{t.hero.ceja}</span>
          <h1 className="hero-titulo ancha">
            {t.hero.lineas[0]}
            <br />
            {t.hero.lineas[1]}
            <span className="it">{t.hero.italica}</span>
          </h1>
          <div className="hero-baja">
            <p>{t.hero.texto}</p>
            <Magnetico>
              <a className="boton boton-negro" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener" data-cursor="WhatsApp">
                {t.hero.cta} <span className="boton-flecha">↗</span>
              </a>
            </Magnetico>
            <span className="hero-scroll">{t.hero.scroll} ↓</span>
          </div>
        </div>

        <div className="hero-video">
          {/* PENDIENTE: reemplazar por el video real de Gabriela (mp4 H.264, 1920×1080, 10–15 s, sin audio) */}
          <video src="/video/hero.mp4" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
          <div className="hero-video-capa lado">
            <h2 className="hero-video-titulo ancha">
              <span style={{ display: "block" }}>{t.hero.videoTitulo[0]}</span>
              <span style={{ display: "block" }}>
                {t.hero.videoTitulo[1]} <span className="it">{t.hero.videoItalica}</span>
              </span>
            </h2>
            <div className="hero-video-pie">
              <span>Gabriela Abril</span>
              <span>{t.hero.videoPie}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
