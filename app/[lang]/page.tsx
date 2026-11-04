import { notFound } from "next/navigation";
import { contenido, esIdioma } from "@/lib/content";
import { Intro } from "@/components/Intro";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Objetivo } from "@/components/Objetivo";
import { TratamientosFijos } from "@/components/TratamientosFijos";
import { Tecnologia } from "@/components/Tecnologia";
import { Caso } from "@/components/Caso";
import { Gabriela } from "@/components/Gabriela";
import { Consultorio } from "@/components/Consultorio";
import { Cierre } from "@/components/Cierre";
import { Contacto } from "@/components/Contacto";

export default async function Pagina({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const t = contenido[lang];

  return (
    <>
      <Intro subtitulo={t.intro} />
      <Cursor />
      <Nav t={t} lang={lang} />
      <main>
        <Hero t={t} />
        <Objetivo t={t} />
        <TratamientosFijos t={t} />
        <Tecnologia t={t} />
        <Caso t={t} />
        <Gabriela t={t} />
        <Consultorio t={t} />
        <Cierre t={t} />
        <Contacto t={t} lang={lang} />
      </main>
    </>
  );
}
