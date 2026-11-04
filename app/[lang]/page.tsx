import { notFound } from "next/navigation";
import { contenido, esIdioma } from "@/lib/content";
import { Intro } from "@/components/Intro";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Cinta } from "@/components/Cinta";
import { Manifiesto } from "@/components/Manifiesto";
import { Tratamientos } from "@/components/Tratamientos";
import { Caso } from "@/components/Caso";
import { Estudio } from "@/components/Estudio";
import { Consultorio } from "@/components/Consultorio";
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
        <Cinta items={t.cinta} />
        <Manifiesto t={t} />
        <Tratamientos t={t} />
        <Caso t={t} />
        <Estudio t={t} />
        <Consultorio t={t} />
        <Contacto t={t} />
      </main>
    </>
  );
}
