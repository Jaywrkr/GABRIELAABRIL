"use client";
// Pantalla de entrada: un contador 0→100 y una cortina que sube. Solo la primera vez por sesión.
import { gsap } from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { lenis } from "./ScrollSuave";

export function Intro({ subtitulo }: { subtitulo: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [activa, setActiva] = useState(true);

  useLayoutEffect(() => {
    let vista = false;
    try {
      vista = sessionStorage.getItem("ga-intro") === "1";
      sessionStorage.setItem("ga-intro", "1");
    } catch {}
    if (vista || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiva(false);
      return;
    }
    document.documentElement.dataset.intro = "1";
    lenis?.stop();
    const c = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.dataset.intro = "fin";
        lenis?.start();
        setActiva(false);
      },
    });
    tl.to(c, {
      v: 100,
      duration: 1.3,
      ease: "power2.inOut",
      onUpdate: () => {
        if (num.current) num.current.textContent = String(Math.round(c.v)).padStart(3, "0");
      },
    })
      .to(ref.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "+=0.1");
    return () => {
      tl.kill();
    };
  }, []);

  if (!activa) return null;
  return (
    <div className="intro lado" ref={ref} aria-hidden="true">
      <span className="intro-nombre">Gabriela Abril®</span>
      <div className="intro-pie">
        <span className="ceja">{subtitulo}</span>
        <span className="intro-num" ref={num}>
          000
        </span>
      </div>
    </div>
  );
}
