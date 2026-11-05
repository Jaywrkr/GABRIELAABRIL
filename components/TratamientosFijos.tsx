"use client";
// Tratamientos: la sección queda fija (técnica del video de referencia) con composición propia del estilo C:
// la foto llena el marco y el nombre en letra ancha gigante la cruza al centro, invertido sobre la imagen.
// Con el scroll cambia el tratamiento: la foto entra como cortina y el nombre se desenfoca y vuelve.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Foto } from "./Foto";
import { reducido } from "@/lib/revelar";
import { lenis } from "./ScrollSuave";
import type { Contenido } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const tonos = ["media", "clara", "", "media"] as const;

function Nombre({ n }: { n: string[] }) {
  return (
    <h3 className="trat-nombre ancha">
      <span className="fila">{n[0]}</span>
      <span className="fila it">{n[1]}</span>
    </h3>
  );
}

export function TratamientosFijos({ t }: { t: Contenido }) {
  const raiz = useRef<HTMLElement>(null);
  const [activo, setActivo] = useState(0);
  const actual = useRef(0);
  const st = useRef<ScrollTrigger | null>(null);
  const items = t.tratamientos.items;

  const { contextSafe } = useGSAP(
    () => {
      const q = gsap.utils.selector(raiz);
      gsap.set(q(".trat-pin .trat-foto"), { clipPath: (i: number) => (i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)") });
      gsap.set(q(".trat-pin .trat-nombre"), { autoAlpha: (i: number) => (i === 0 ? 1 : 0) });
      if (reducido()) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        st.current = ScrollTrigger.create({
          trigger: q(".trat-pin")[0],
          start: "top top",
          end: () => "+=" + window.innerHeight * (items.length - 0.4),
          pin: true,
          anticipatePin: 1,
          snap: { snapTo: 1 / (items.length - 1), duration: { min: 0.3, max: 0.8 }, ease: "power2.inOut" },
          onUpdate(self) {
            const i = Math.min(items.length - 1, Math.round(self.progress * (items.length - 1)));
            if (i !== actual.current) cambiar(i);
          },
        });
        // Al llegar, el marco se abre desde el centro y el nombre entra letra a letra
        gsap.from(q(".trat-pin .trat-escena")[0], { clipPath: "inset(14% 22% 14% 22% round 4px)", ease: "none", scrollTrigger: { trigger: raiz.current, start: "top 85%", end: "top top", scrub: true } });
        gsap.from(q(".trat-pin .trat-nombre")[0].querySelectorAll(".fila"), { yPercent: 50, opacity: 0, filter: "blur(16px)", duration: 1.4, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: raiz.current, start: "top 30%" } });
      });

      mm.add("(max-width: 900px)", () => {
        q(".trat-movil article").forEach((art) => {
          gsap.from(art.querySelector(".trat-escena"), { clipPath: "inset(20% 10% 20% 10%)", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: art, start: "top 85%" } });
          gsap.from(art.querySelectorAll(".trat-nombre .fila"), { yPercent: 60, opacity: 0, filter: "blur(12px)", duration: 1.3, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: art, start: "top 70%" } });
        });
      });
      return () => mm.revert();
    },
    { scope: raiz }
  );

  const cambiar = contextSafe((i: number) => {
    const q = gsap.utils.selector(raiz);
    const prev = actual.current;
    actual.current = i;
    setActivo(i);
    const fotos = q(".trat-pin .trat-foto");
    const nombres = q(".trat-pin .trat-nombre");
    const baja = i > prev;
    gsap.set(fotos[i], { zIndex: 2 });
    gsap.set(fotos[prev], { zIndex: 1 });
    gsap.fromTo(fotos[i], { clipPath: baja ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut", overwrite: true });
    gsap.fromTo(fotos[i].querySelector(".foto-fondo"), { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "expo.out", overwrite: true });
    gsap.to(nombres[prev], { autoAlpha: 0, filter: "blur(16px)", scale: 0.94, duration: 0.6, ease: "power2.in", overwrite: true });
    gsap.fromTo(nombres[i], { autoAlpha: 0, filter: "blur(16px)", scale: 1.06 }, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 1.2, ease: "expo.out", delay: 0.35, overwrite: true });
    gsap.fromTo(q(".trat-resumen"), { opacity: 0, y: 14, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "expo.out", delay: 0.3, overwrite: true });
  });

  const ir = (i: number) => {
    const s = st.current;
    if (!s) return;
    const y = s.start + (s.end - s.start) * (i / (items.length - 1)) + 2;
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="trat" id="tratamientos" ref={raiz}>
      {/* Escritorio */}
      <div className="trat-pin lado">
        <div className="trat-cab">
          <span className="ceja">{t.tratamientos.ceja}</span>
          <span className="ceja">
            {String(activo + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>
        <div className="trat-escena" data-cursor={t.tratamientos.ver}>
          <div className="trat-fotos">
            {items.map((x, i) => (
              <Foto key={x.foto} etiqueta={x.foto} pendiente={t.pendiente} clara={tonos[i] === "clara"} className={`trat-foto ${tonos[i]}`} />
            ))}
          </div>
          <div className="trat-nombres">
            {items.map((x) => (
              <Nombre key={x.foto} n={x.nombre} />
            ))}
          </div>
        </div>
        <div className="trat-base">
          <p className="trat-resumen">{items[activo].resumen}</p>
          <nav className="trat-indice" aria-label={t.tratamientos.indice}>
            {items.map((x, i) => (
              <button key={x.foto} type="button" className={i === activo ? "on" : ""} onClick={() => ir(i)}>
                {x.nombre.join(" ")}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Móvil */}
      <div className="trat-movil lado">
        <span className="ceja">{t.tratamientos.ceja}</span>
        {items.map((x, i) => (
          <article key={x.foto}>
            <div className="trat-escena">
              <div className="trat-fotos">
                <Foto className={`trat-foto ${tonos[i]}`} etiqueta={x.foto} pendiente={t.pendiente} clara={tonos[i] === "clara"} />
              </div>
              <div className="trat-nombres">
                <Nombre n={x.nombre} />
              </div>
            </div>
            <p>{x.resumen}</p>
            <ul>
              {x.items.map((y) => (
                <li key={y}>{y}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
