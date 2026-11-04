"use client";
// "Mi objetivo es…": el texto se enciende palabra por palabra con desenfoque al hacer scroll,
// alrededor de un retrato en blanco y negro que sube más lento (paralaje).
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Foto } from "./Foto";
import { Magnetico } from "./Magnetico";
import { revelarPalabras, reducido } from "@/lib/revelar";
import type { Contenido } from "@/lib/content";

gsap.registerPlugin(useGSAP);

export function Objetivo({ t }: { t: Contenido }) {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(raiz);
      revelarPalabras(q(".obj-izq")[0], { scrub: true, inicio: "top 85%", fin: "top 45%" });
      revelarPalabras(q(".obj-der")[0], { scrub: true, inicio: "top 80%", fin: "bottom 60%" });
      if (reducido()) return;
      const foto = q(".obj-foto")[0];
      gsap.fromTo(foto, { clipPath: "inset(30% 20% 30% 20%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: foto, start: "top 95%", end: "top 40%", scrub: true } });
      gsap.fromTo(foto, { y: 120 }, { y: -120, ease: "none", scrollTrigger: { trigger: raiz.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(q(".obj-foto .foto-fondo"), { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { trigger: foto, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(q(".obj-pie > *"), { y: 20, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: q(".obj-pie")[0], start: "top 90%" } });
    },
    { scope: raiz }
  );

  return (
    <section className="objetivo" id="objetivo" ref={raiz}>
      <div className="obj-grid lado">
        <p className="obj-izq serif">{t.objetivo.izquierda}</p>
        <Foto className="obj-foto" etiqueta={t.objetivo.foto} pendiente={t.pendiente} />
        <p className="obj-der serif">{t.objetivo.derecha}</p>
        <div className="obj-pie">
          <p>{t.objetivo.cita}</p>
          <Magnetico>
            <a className="pastilla-btn pastilla-oscura" href="#gabriela">
              {t.objetivo.boton} <i aria-hidden="true">+</i>
            </a>
          </Magnetico>
        </div>
      </div>
    </section>
  );
}
