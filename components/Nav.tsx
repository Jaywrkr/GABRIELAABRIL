"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Boton } from "./Boton";
import { lenis } from "./ScrollSuave";
import type { Contenido, Idioma } from "@/lib/content";

export function Nav({ t, lang }: { t: Contenido; lang: Idioma }) {
  const [abierto, setAbierto] = useState(false);
  const [oculta, setOculta] = useState(false);

  // La barra se esconde al bajar y vuelve al subir
  useEffect(() => {
    let ultimo = window.scrollY;
    const f = () => {
      const y = window.scrollY;
      setOculta(y > 160 && y > ultimo);
      ultimo = y;
    };
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    if (abierto) lenis?.stop();
    else lenis?.start();
  }, [abierto]);

  return (
    <>
      <motion.header className="nav" animate={{ y: oculta && !abierto ? "-110%" : "0%" }} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.1, 1] }}>
        <div className="marco nav-fila">
          <a className="firma" href="#inicio">
            Gabriela Abril
            <small>{t.nav.subtitulo}</small>
          </a>
          <ul className="nav-enlaces">
            {t.nav.enlaces.map(([href, txt]) => (
              <li key={href}>
                <a href={href}>{txt}</a>
              </li>
            ))}
          </ul>
          <div className="nav-acciones">
            <div className="idioma" role="group" aria-label="Idioma / Language">
              {(["es", "en"] as const).map((l) => (
                <Link key={l} href={`/${l}`} className={l === lang ? "on" : ""} aria-current={l === lang ? "page" : undefined} scroll={false}>
                  {l === lang && <motion.span layoutId="idioma-pastilla" className="pastilla" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                  <span className="idioma-txt">{l.toUpperCase()}</span>
                </Link>
              ))}
            </div>
            <Boton href="#contacto" lleno chico className="solo-escritorio">
              {t.nav.agendar}
            </Boton>
            <button type="button" className="nav-menu" onClick={() => setAbierto(true)} aria-label={t.nav.menu} aria-expanded={abierto}>
              <Menu size={20} strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {abierto && (
          <motion.div
            className="menu-movil"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="marco menu-movil-cab">
              <span className="firma">Gabriela Abril</span>
              <button type="button" className="nav-menu" onClick={() => setAbierto(false)} aria-label={t.nav.cerrar}>
                <X size={22} strokeWidth={1.4} />
              </button>
            </div>
            <ul className="marco">
              {[...t.nav.enlaces, ["#contacto", t.nav.agendar] as [string, string]].map(([href, txt], i) => (
                <motion.li key={href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.6 }}>
                  <a href={href} onClick={() => setAbierto(false)}>
                    {txt}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
