"use client";
// Revelado de texto como en la referencia: cada palabra pasa de desenfocada y transparente a nítida.
// Con `scrub` avanza con el scroll; sin él, se dispara una vez al entrar en pantalla.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const reducido = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function revelarPalabras(
  el: Element,
  { scrub = false, inicio = "top 85%", fin = "bottom 55%", retraso = 0, desde = 0.1 }: { scrub?: boolean; inicio?: string; fin?: string; retraso?: number; desde?: number } = {}
) {
  const split = SplitText.create(el, { type: "words", wordsClass: "palabra" });
  if (reducido()) return split;
  if (scrub) {
    gsap.fromTo(
      split.words,
      { opacity: desde, filter: "blur(8px)" },
      { opacity: 1, filter: "blur(0px)", ease: "none", stagger: 0.08, scrollTrigger: { trigger: el, start: inicio, end: fin, scrub: true } }
    );
  } else {
    gsap.from(split.words, {
      opacity: 0,
      filter: "blur(14px)",
      y: 18,
      duration: 1.3,
      ease: "expo.out",
      stagger: 0.035,
      delay: retraso,
      scrollTrigger: { trigger: el, start: inicio, once: true },
    });
  }
  return split;
}

// Letras que suben con desenfoque (titulares gigantes)
export function revelarLetras(el: Element, { inicio = "top 85%", retraso = 0 } = {}) {
  const split = SplitText.create(el, { type: "chars", charsClass: "letra" });
  if (reducido()) return split;
  gsap.from(split.chars, {
    yPercent: 70,
    opacity: 0,
    filter: "blur(16px)",
    duration: 1.5,
    ease: "expo.out",
    stagger: 0.03,
    delay: retraso,
    scrollTrigger: { trigger: el, start: inicio, once: true },
  });
  return split;
}
