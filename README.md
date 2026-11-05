# Dra. Gabriela Abril — web

Sitio de la Dra. Gabriela Abril, Restauradora y Estética Dental (Cuenca, Ecuador). Bilingüe en `/es` y `/en`.
Estilo C en blanco y negro: tipografía ancha (Archivo), acento en itálica (Instrument Serif).

## Stack

Next.js · GSAP (ScrollTrigger, SplitText) · Lenis · Motion · fuentes servidas desde el propio sitio (@fontsource).

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000 → /es
```

## Dónde se edita

| Qué | Archivo |
|---|---|
| Textos ES/EN, WhatsApp, Instagram, link a Sebastián | `lib/content.ts` |
| Colores, tipografía, layout | `app/globals.css` |
| Clips del hero y video de tecnología | `public/video/` y `lib/content.ts` (`CLIPS_HERO`, `VIDEO_TECNOLOGIA`) — H.264, 1920×1080, 5–8 s, sin audio |
| Hero que crece con el scroll | `components/Hero.tsx` |

## Pendiente de la doctora

- Video y fotos reales (hero, retrato, consultorio, casos con consentimiento, reels)
- WhatsApp, Instagram, dirección y horario
