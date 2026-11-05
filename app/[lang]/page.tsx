import { notFound } from "next/navigation";
import { contenido, esIdioma } from "@/lib/content";
import { Intro } from "@/components/Intro";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Cinta } from "@/components/Cinta";
import { Manifiesto } from "@/components/Manifiesto";
import { TratamientosFijos } from "@/components/TratamientosFijos";
import { Tecnologia } from "@/components/Tecnologia";
import { Caso } from "@/components/Caso";
import { Gabriela } from "@/components/Gabriela";
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
        <TratamientosFijos t={t} />
        <Tecnologia t={t} />
        <Caso t={t} />
        <Gabriela t={t} />
        <Consultorio t={t} />
        <Contacto t={t} lang={lang} />
      </main>
    </>
  );
}
