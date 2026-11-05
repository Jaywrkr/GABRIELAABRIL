import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { contenido, esIdioma, idiomas } from "@/lib/content";
import { ScrollSuave } from "@/components/ScrollSuave";
import "lenis/dist/lenis.css";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "../globals.css";

export function generateStaticParams() {
  return idiomas.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!esIdioma(lang)) return {};
  const t = contenido[lang];
  return {
    title: t.meta.titulo,
    description: t.meta.descripcion,
    alternates: { languages: { es: "/es", en: "/en" } },
    openGraph: { title: t.meta.titulo, description: t.meta.descripcion, locale: lang === "es" ? "es_EC" : "en_US", type: "website" },
  };
}

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  return (
    <html lang={lang}>
      <body>
        <ScrollSuave />
        {children}
      </body>
    </html>
  );
}
