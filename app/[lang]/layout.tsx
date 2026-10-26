import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { contenido, esIdioma, idiomas } from "@/lib/content";
import { ScrollSuave } from "@/components/ScrollSuave";
import "lenis/dist/lenis.css";
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F2F0" },
    { media: "(prefers-color-scheme: dark)", color: "#160D10" },
  ],
};

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400;1,6..96,500&family=Hanken+Grotesk:wght@300;400;500;600&family=DM+Mono:wght@400&display=swap"
        />
      </head>
      <body>
        <ScrollSuave />
        {children}
      </body>
    </html>
  );
}
