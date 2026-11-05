"use client";
// Instagram + contacto final. El formulario no necesita servidor: arma el mensaje y abre WhatsApp
// con el texto listo para enviar.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, type FormEvent } from "react";
import { Foto } from "./Foto";
import { Magnetico } from "./Magnetico";
import { revelarPalabras, reducido } from "@/lib/revelar";
import { INSTAGRAM, WEB_SEBASTIAN, WHATSAPP, type Contenido, type Idioma } from "@/lib/content";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Contacto({ t, lang }: { t: Contenido; lang: Idioma }) {
  const raiz = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(raiz);
      revelarPalabras(q(".contacto h2")[0]);
      if (reducido()) return;
      gsap.from(q(".ig-item"), { y: 90, opacity: 0, duration: 1.3, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: q(".ig-grid")[0], start: "top 88%" } });
      gsap.from(q(".form > *"), { y: 24, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: q(".form")[0], start: "top 85%" } });
      gsap.from(q(".pie-marca")[0], { yPercent: 50, opacity: 0, filter: "blur(16px)", duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: q(".pie-marca")[0], start: "top 98%" } });
    },
    { scope: raiz }
  );

  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const texto = `${t.contacto.saludo} ${d.get("nombre") || ""}. ${d.get("mensaje") || ""} (${d.get("telefono") || ""})`.trim();
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
  };

  return (
    <div ref={raiz}>
      <section className="ig lado">
        <div className="ig-cab">
          <span className="ceja">{t.instagram.ceja}</span>
          <a className="ig-usuario subraya" href="#" data-cursor="Instagram">
            @{INSTAGRAM}
          </a>
        </div>
        <div className="ig-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <Foto key={i} etiqueta={`Reel ${i + 1}`} clara={i % 3 === 1} className="ig-item" />
          ))}
        </div>
      </section>

      <section className="contacto lado" id="contacto">
        <div className="contacto-grid">
          <h2 className="ancha">
            {t.contacto.titulo[0]} <span className="it">{t.contacto.titulo[1]}</span>
          </h2>
          <form className="form" onSubmit={enviar}>
            <label>
              {t.contacto.nombre}
              <input id="f-nombre" name="nombre" autoComplete="name" required />
            </label>
            <label>
              {t.contacto.telefono}
              <input id="f-telefono" name="telefono" type="tel" autoComplete="tel" />
            </label>
            <label className="ancho">
              {t.contacto.mensaje}
              <textarea id="f-mensaje" name="mensaje" rows={3} />
            </label>
            <div className="form-pie">
              <Magnetico fuerza={0.4}>
                <button className="form-enviar" type="submit">
                  {t.contacto.enviar} ↗
                </button>
              </Magnetico>
            </div>
          </form>
        </div>

        <div className="pie">
          {t.contacto.columnas.map(([titulo, filas]) => (
            <div key={titulo}>
              <h3>{titulo}</h3>
              <ul>
                {filas.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3>WhatsApp · Instagram</h3>
            <ul>
              <li>
                <a className="subraya" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener">
                  WhatsApp ↗
                </a>
              </li>
              <li>
                <a className="subraya" href="#">
                  @{INSTAGRAM} ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3>{lang === "es" ? "Idioma" : "Language"}</h3>
            <ul>
              <li>
                <Link className="subraya" href="/es">Español</Link>
              </li>
              <li>
                <Link className="subraya" href="/en">English</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="pie-marca" aria-hidden="true">Gabriela Abril</p>
        <div className="pie-final">
          <span>{t.contacto.derechos}</span>
          <a className="subraya" href={WEB_SEBASTIAN}>{t.contacto.sebastian}</a>
        </div>
      </section>
    </div>
  );
}
