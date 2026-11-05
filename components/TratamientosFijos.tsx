"use client";
// Tratamientos como en la referencia: la sección queda fija y, con el scroll, cambia de tratamiento.
// La foto nueva sube como una cortina, el nombre en itálica se desenfoca y vuelve, y el texto de la
// derecha se reemplaza. En móvil son tarjetas apiladas.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Foto } from "./Foto";
import { reducido } from "@/lib/revelar";
import { lenis } from "./ScrollSuave";
import { REF, type Contenido } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const tonos = ["media", "clara", "", "media"] as const;

export function TratamientosFijos({ t }: { t: Contenido }) {
  const raiz = useRef<HTMLElement>(null);
  const [activo, setActivo] = useState(0);
  const actual = useRef(0);
  const st = useRef<ScrollTrigger | null>(null);
  const items = t.tratamientos.items;

  const { contextSafe } = useGSAP(
    () => {
      const q = gsap.utils.selector(raiz);
      // Estado inicial: solo la primera foto y el primer nombre visibles
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
        gsap.from(q(".trat-pin .trat-fotos"), { clipPath: "inset(12% 10% 12% 10% round 4px)", ease: "none", scrollTrigger: { trigger: q(".trat")[0] ?? raiz.current, start: "top 90%", end: "top top", scrub: true } });
      });

      // Móvil: cada tarjeta entra con su foto abriéndose
      mm.add("(max-width: 900px)", () => {
        q(".trat-movil article").forEach((art) => {
          gsap.from(art.querySelector(".trat-fotos"), { clipPath: "inset(20% 10% 20% 10%)", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: art, start: "top 85%" } });
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
    // Foto: la nueva entra como cortina desde abajo (o desde arriba si se vuelve)
    gsap.set(fotos[i], { zIndex: 2 });
    gsap.set(fotos[prev], { zIndex: 1 });
    gsap.fromTo(fotos[i], { clipPath: baja ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut", overwrite: true });
    gsap.fromTo(fotos[i].querySelector(".foto-fondo"), { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "expo.out", overwrite: true });
    // Nombre: sale desenfocado, entra el nuevo
    gsap.to(nombres[prev], { autoAlpha: 0, filter: "blur(14px)", y: baja ? -30 : 30, duration: 0.6, ease: "power2.in", overwrite: true });
    gsap.fromTo(nombres[i], { autoAlpha: 0, filter: "blur(14px)", y: baja ? 40 : -40 }, { autoAlpha: 1, filter: "blur(0px)", y: 0, duration: 1.1, ease: "expo.out", delay: 0.35, overwrite: true });
    // Texto de la derecha
    gsap.fromTo(q(".trat-bloque > *"), { opacity: 0, y: 18, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "expo.out", stagger: 0.06, delay: 0.25, overwrite: true });
  });

  const ir = (i: number) => {
    const s = st.current;
    if (!s) return;
    const y = s.start + (s.end - s.start) * (i / (items.length - 1));
    if (lenis) lenis.scrollTo(y + 2, { duration: 1.2 });
    else window.scrollTo({ top: y + 2, behavior: "smooth" });
  };

  const it = items[activo];
  const nombre = (n: string[], i: number) => (
    <h3 className="trat-nombre it" key={i}>
      <span className="fila">{n[0]}</span>
      <span className="fila">{n[1]}</span>
    </h3>
  );

  return (
    <section className="trat" id="tratamientos" ref={raiz}>
      {/* Escritorio */}
      <div className="trat-pin lado">
        <div className="trat-fotos" data-cursor={t.tratamientos.ver}>
          {items.map((x, i) => (
            <Foto key={x.foto} src={REF.tratamientos[i]} etiqueta={x.foto} pendiente={t.pendiente} clara={tonos[i] === "clara"} className={`trat-foto ${tonos[i]}`} />
          ))}
          {items.map((x, i) => nombre(x.nombre, i))}
        </div>
        <div className="trat-der">
          <div className="trat-bloque">
            <span className="ceja">{t.tratamientos.ceja} · {String(activo + 1).padStart(2, "0")}</span>
            <p className="trat-resumen">{it.resumen}</p>
            <div className="trat-items">
              <Foto className="trat-mini" src={REF.tratamientos[activo]} etiqueta={it.foto} />
              <ul>
                {it.items.map((x) => (
                  <li key={x}>
                    <a href="#contacto">
                      <span>{x}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="trat-pie">
            <div className="trat-indice">
              <span className="ceja" style={{ marginBottom: 6 }}>{t.tratamientos.indice}</span>
              {items.map((x, i) => (
                <button key={x.foto} type="button" className={i === activo ? "on" : ""} onClick={() => ir(i)}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {x.nombre.join(" ")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Móvil */}
      <div className="trat-movil lado">
        <span className="ceja">{t.tratamientos.ceja}</span>
        {items.map((x, i) => (
          <article key={x.foto}>
            <div className="trat-fotos">
              <Foto className="trat-foto" src={REF.tratamientos[i]} etiqueta={x.foto} pendiente={t.pendiente} clara={tonos[i] === "clara"} />
              {nombre(x.nombre, i)}
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
