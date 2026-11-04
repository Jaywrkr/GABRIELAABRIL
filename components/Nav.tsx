"use client";
// Barra como en la referencia: marca a la izquierda, "Menú" y "Tratamientos" al centro, idioma y
// "Agendar cita" a la derecha. Se invierte sola sobre fondos claros y oscuros.
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Magnetico } from "./Magnetico";
import { lenis } from "./ScrollSuave";
import { WHATSAPP, type Contenido, type Idioma } from "@/lib/content";

const curva = [0.76, 0, 0.24, 1] as const;

export function Nav({ t, lang }: { t: Contenido; lang: Idioma }) {
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState(false);

  useEffect(() => {
    if (menu) lenis?.stop();
    else lenis?.start();
  }, [menu]);

  useEffect(() => {
    if (!panel) return;
    const cerrar = () => setPanel(false);
    window.addEventListener("scroll", cerrar, { once: true, passive: true });
    return () => window.removeEventListener("scroll", cerrar);
  }, [panel]);

  const idiomas = (
    <div className="nav-idioma" role="group" aria-label="Idioma / Language">
      {(["es", "en"] as const).map((l) => (
        <Link key={l} href={`/${l}`} className={l === lang ? "on" : ""} aria-current={l === lang ? "page" : undefined}>
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <header className="nav">
        <div className="nav-fila lado">
          <a className="nav-marca" href="#inicio" aria-label="Dra. Gabriela Abril">
            <span className="nav-sello">GA</span>
            <span className="nav-lineas">
              Gabriela Abril
              <br />
              {lang === "es" ? "Estética Dental" : "Aesthetic Dentistry"}
            </span>
          </a>
          <div className="nav-centro">
            <button type="button" onClick={() => setMenu(true)} aria-expanded={menu}>
              {t.nav.menu}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M0 2h14M0 8h14" />
              </svg>
            </button>
            <button type="button" className="solo-escritorio" onClick={() => setPanel((p) => !p)} aria-expanded={panel}>
              {t.nav.tratamientos}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" style={{ transform: panel ? "rotate(180deg)" : "none", transition: "transform .4s" }}>
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>
          </div>
          <div className="nav-der">
            {idiomas}
            <Magnetico fuerza={0.25}>
              <a className="pastilla-btn pastilla-clara" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener">
                {t.nav.agendar} <i aria-hidden="true">+</i>
              </a>
            </Magnetico>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {panel && (
          <motion.div
            className="panel-trat"
            initial={{ opacity: 0, y: -10, x: "-50%", filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, x: "-50%", filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, x: "-50%", filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: curva }}
          >
            {t.tratamientos.items.map((x, i) => (
              <a key={x.foto} href="#tratamientos" onClick={() => setPanel(false)}>
                <span>
                  <span style={{ color: "#888", marginRight: 12 }}>{String(i + 1).padStart(2, "0")}</span>
                  {x.nombre.join(" ")}
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="menu lado"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0% 0)" }}
            transition={{ duration: 0.85, ease: curva }}
          >
            <div className="menu-cab">
              <span className="nav-sello">GA</span>
              <button type="button" className="menu-cerrar" onClick={() => setMenu(false)} aria-label={t.nav.cerrar}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <ul>
              {t.nav.enlaces.map(([href, txt], i) => (
                <li key={href}>
                  <motion.a
                    href={href}
                    onClick={() => setMenu(false)}
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-105%" }}
                    transition={{ duration: 0.9, ease: curva, delay: 0.25 + i * 0.05 }}
                  >
                    <small>{String(i + 1).padStart(2, "0")}</small>
                    {txt}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="menu-pie">
              {idiomas}
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener">
                {t.nav.agendar} ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
