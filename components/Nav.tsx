"use client";
// Barra fija que se invierte sola sobre blanco o negro (mix-blend-mode: difference).
// En móvil abre un menú a pantalla completa con las opciones subiendo una por una.
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { lenis } from "./ScrollSuave";
import type { Contenido, Idioma } from "@/lib/content";

const curva = [0.76, 0, 0.24, 1] as const;

export function Nav({ t, lang }: { t: Contenido; lang: Idioma }) {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (abierto) lenis?.stop();
    else lenis?.start();
  }, [abierto]);

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
          <a className="nav-marca" href="#inicio">
            Gabriela Abril®
          </a>
          <nav className="nav-enlaces" aria-label="Principal">
            {t.nav.enlaces.map(([href, txt]) => (
              <a key={href} href={href}>
                {txt}
              </a>
            ))}
          </nav>
          <div className="nav-der">
            {idiomas}
            <a className="nav-agendar" href="#contacto">
              {t.nav.agendar} ↗
            </a>
            <button type="button" className="nav-menu" onClick={() => setAbierto(true)} aria-label={t.nav.menu} aria-expanded={abierto}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 9h16M4 15h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {abierto && (
          <motion.div
            className="menu lado"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0% 0)" }}
            transition={{ duration: 0.8, ease: curva }}
          >
            <div className="menu-cab">
              <span className="nav-marca">Gabriela Abril®</span>
              <button type="button" className="nav-menu" style={{ display: "flex" }} onClick={() => setAbierto(false)} aria-label={t.nav.cerrar}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <ul>
              {[...t.nav.enlaces].map(([href, txt], i) => (
                <li key={href}>
                  <motion.a
                    href={href}
                    onClick={() => setAbierto(false)}
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-105%" }}
                    transition={{ duration: 0.9, ease: curva, delay: 0.25 + i * 0.06 }}
                  >
                    {txt}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="menu-pie">
              {idiomas}
              <a href="#contacto" onClick={() => setAbierto(false)}>
                {t.nav.agendar} ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
