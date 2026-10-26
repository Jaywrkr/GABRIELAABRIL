"use client";
// Efectos de scroll globales: entrada suave de bloques [data-revelar] y arco de la sonrisa.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Efectos() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ScrollTrigger.batch("[data-revelar]", {
      start: "top 90%",
      once: true,
      onEnter: (els) => gsap.from(els, { y: 40, autoAlpha: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, clearProps: "transform,opacity,visibility" }),
    });

    // Banda de docencia: la frase se desplaza en paralaje lento
    gsap.to(".docencia blockquote", {
      yPercent: -18,
      ease: "none",
      scrollTrigger: { trigger: ".docencia", start: "top bottom", end: "bottom top", scrub: true },
    });

    // Titular de contacto: crece levemente al acercarse
    gsap.from(".contacto h2", {
      scale: 0.92,
      transformOrigin: "left bottom",
      ease: "none",
      scrollTrigger: { trigger: ".contacto", start: "top bottom", end: "top 30%", scrub: true },
    });

    // Recalcular cuando cargan las fuentes
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });
  return null;
}
