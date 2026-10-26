import { notFound } from "next/navigation";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { contenido, esIdioma, WHATSAPP, WHATSAPP_VISIBLE, WEB_SEBASTIAN } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Proceso } from "@/components/Proceso";
import { Casos } from "@/components/Casos";
import { Titular } from "@/components/Titular";
import { Boton } from "@/components/Boton";
import { Copiar } from "@/components/Copiar";
import { Efectos } from "@/components/Efectos";

export default async function Pagina({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const t = contenido[lang];

  return (
    <>
      <Nav t={t} lang={lang} />
      <main>
        <Hero t={t} lang={lang} />

        {/* Sobre Gabriela */}
        <section className="sobre" id="sobre">
          <div className="marco sobre-grid">
            <p className="ceja">{t.sobre.ceja}</p>
            <div>
              <Titular as="p" className="declaracion">
                {t.sobre.declaracion[0]}
                <em>{t.sobre.declaracion[1]}</em>
                {t.sobre.declaracion[2]}
              </Titular>
              <div className="datos">
                {t.sobre.datos.map(([b, p]) => (
                  <div className="dato" key={b} data-revelar>
                    <b>{b}</b>
                    <p>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tratamientos */}
        <section className="tratamientos" id="tratamientos">
          <div className="marco">
            <div className="sec-cab">
              <p className="ceja">{t.tratamientos.ceja}</p>
              <Titular>
                {t.tratamientos.titulo[0]}
                <em>{t.tratamientos.titulo[1]}</em>
              </Titular>
            </div>
            <ul className="lista">
              {t.tratamientos.items.map(([cod, titulo, texto]) => (
                <li className="item" key={titulo} data-revelar>
                  <a href="#contacto">
                    <span className="cod">{cod}</span>
                    <h3>{titulo}</h3>
                    <p>{texto}</p>
                    <ArrowUpRight className="flecha" size={30} strokeWidth={1} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Proceso t={t} />

        <Casos t={t} />

        {/* Docencia */}
        <section className="docencia">
          <div className="marco">
            <p className="ceja">{t.docencia.ceja}</p>
            <blockquote>
              {t.docencia.frase[0]}
              <em>{t.docencia.frase[1]}</em>
              {t.docencia.frase[2]}
            </blockquote>
            <p data-revelar>{t.docencia.texto}</p>
          </div>
        </section>

        {/* Reseñas (pendientes de Google) */}
        <section id="resenas">
          <div className="marco">
            <div className="sec-cab">
              <p className="ceja">{t.resenas.ceja}</p>
              <Titular>
                {t.resenas.titulo[0]}
                <em>{t.resenas.titulo[1]}</em>
              </Titular>
            </div>
            <div className="resenas-grid">
              {[0, 1, 2].map((i) => (
                <article className="resena" key={i} data-revelar>
                  <q>{t.resenas.texto}</q>
                  <footer>
                    <span>{t.resenas.nombre}</span>
                    <span className="marcador">{t.resenas.pendiente}</span>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Preguntas */}
        <section className="faq" id="preguntas">
          <div className="marco">
            <div className="sec-cab">
              <p className="ceja">{t.faq.ceja}</p>
              <Titular>
                {t.faq.titulo[0]}
                <em>{t.faq.titulo[1]}</em>
              </Titular>
            </div>
            <div className="faq-lista">
              {t.faq.items.map(([q, a]) => (
                <details key={q} data-revelar>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="contacto" id="contacto">
          <div className="marco">
            <p className="ceja">{t.contacto.ceja}</p>
            <h2>
              {t.contacto.titulo[0]}
              <em>{t.contacto.titulo[1]}</em>
            </h2>
            <div className="ctas">
              <Boton href={`https://wa.me/${WHATSAPP}`} externo lleno>
                {t.contacto.whatsapp}
              </Boton>
              <Boton href="https://maps.google.com/?q=Cuenca,Ecuador" externo>
                {t.contacto.mapa}
              </Boton>
            </div>
            <div className="contacto-grid">
              <div data-revelar>
                <p className="ceja">WhatsApp</p>
                <p>{WHATSAPP_VISIBLE}</p>
                <Copiar valor={WHATSAPP_VISIBLE} texto={t.contacto.copiar} hecho={t.contacto.copiado} />
              </div>
              <div data-revelar>
                <p className="ceja">{t.contacto.direccion}</p>
                <p>{t.contacto.direccionValor}</p>
              </div>
              <div data-revelar>
                <p className="ceja">{t.contacto.horario}</p>
                <p>
                  {t.contacto.horarioValor[0]}
                  <br />
                  {t.contacto.horarioValor[1]}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pie">
        <div className="marco">
          <span>© 2026 {lang === "es" ? "Dra." : "Dr."} Gabriela Abril</span>
          <span>
            {t.pie.ortodoncia} <a href={WEB_SEBASTIAN}>{lang === "es" ? "Dr." : "Dr."} Sebastián Silva</a>
          </span>
          <span>Cuenca · Ecuador</span>
        </div>
      </footer>

      <a className="flotante" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener" aria-label="WhatsApp">
        <MessageCircle size={19} strokeWidth={1.6} aria-hidden="true" />
        <span>{t.pie.flotante}</span>
      </a>

      <Efectos />
    </>
  );
}
