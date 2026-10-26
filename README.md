# Dra. Gabriela Abril — web

Sitio de la Dra. Gabriela Abril, Odontología Restauradora y Estética Dental (Cuenca, Ecuador). Bilingüe en `/es` y `/en`.

## Stack

- Next.js (App Router) + TypeScript, desplegable en Vercel sin configuración extra
- **GSAP** (ScrollTrigger + SplitText) para titulares y la sección de proceso fija
- **Lenis** para el scroll con inercia
- **React Three Fiber + Drei** para el diente de porcelana en 3D (geometría hecha en código, sin modelos externos)
- **Motion** para botones magnéticos, menú móvil y selector de idioma
- **Embla** para el carrusel de casos
- **Lucide** para los pocos iconos

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000 → redirige a /es
npm run build
```

## Dónde se edita

| Qué | Archivo |
|---|---|
| Todo el texto (ES/EN), WhatsApp, link a la web de Sebastián | `lib/content.ts` |
| Colores, tipografía, layout | `app/globals.css` |
| Forma del diente 3D | `lib/geometria.ts` |
| Escena del hero (material, luces) | `components/three/DienteHero.tsx` |
| Etapas del proceso (escaneo → diseño → prueba → porcelana) | `components/three/DienteProceso.tsx` |

## Pendiente de la doctora

- Número de WhatsApp, dirección y horario (`lib/content.ts`)
- Retrato y fotos reales de casos, con consentimiento de los pacientes
- Reseñas reales de Google

## Notas

- Si el dispositivo no tiene WebGL o pide movimiento reducido, se muestra una imagen estática en lugar del 3D.
- `?captura=9000` en la URL congela el 3D tras 9 s. Solo sirve para tomar capturas automáticas en máquinas sin GPU.
