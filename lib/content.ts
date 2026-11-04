// Todo el texto del sitio, en español e inglés.
// Lo que está entre [corchetes] es pendiente: se reemplaza con los datos reales de la doctora.

export const idiomas = ["es", "en"] as const;
export type Idioma = (typeof idiomas)[number];
export const esIdioma = (v: string): v is Idioma => (idiomas as readonly string[]).includes(v);

// PENDIENTE: número real de WhatsApp (formato internacional sin "+")
export const WHATSAPP = "593900000000";
// PENDIENTE: usuario real de Instagram
export const INSTAGRAM = "[usuario]";
// PENDIENTE: URL de la web de Sebastián
export const WEB_SEBASTIAN = "#";

const es = {
  meta: {
    titulo: "Dra. Gabriela Abril · Estética Dental en Cuenca",
    descripcion:
      "Especialista en Restauradora y Estética Dental en Cuenca, Ecuador. Diseño de sonrisa, ortodoncia invisible y nuevas tecnologías.",
  },
  nav: {
    enlaces: [
      ["#tratamientos", "Tratamientos"],
      ["#casos", "Casos"],
      ["#estudio", "Estudio"],
      ["#contacto", "Contacto"],
    ] as [string, string][],
    agendar: "Agendar",
    menu: "Menú",
    cerrar: "Cerrar",
  },
  intro: "Estética dental",
  hero: {
    ceja: "(01) Estética dental · Cuenca, EC",
    lineas: ["Belleza", "con"],
    italica: "precisión",
    texto:
      "Dra. Gabriela Abril. Especialista en Restauradora y Estética Dental y docente de la Universidad de Cuenca.",
    cta: "Agendar valoración",
    scroll: "Scroll",
    videoTitulo: ["Sonrisas", "que se ven"],
    videoItalica: "naturales",
    videoPie: "Video de Gabriela · pendiente de grabación",
  },
  cinta: ["Diseño de sonrisa", "Ortodoncia invisible", "Restauradora", "Nuevas tecnologías"],
  manifiesto: {
    ceja: "(02) Filosofía",
    texto: "Cada sonrisa se diseña antes de tocar un solo diente. Natural, precisa y pensada para tu rostro.",
    italicas: ["antes", "Natural,"],
  },
  tratamientos: {
    ceja: "(03) Tratamientos",
    items: [
      ["Diseño de sonrisa", "Estética", "Forma, proporción y color planificados para tu rostro."],
      ["Ortodoncia invisible", "Alineación", "Alineadores transparentes, discretos en el trabajo y en las fotos."],
      ["Carillas", "Restauradora", "Dientes desgastados, manchados o fracturados, recuperados con naturalidad."],
      ["Nuevas tecnologías", "Escaneo digital", "Escaneo y diseño digital para planificar con precisión y sin moldes."],
    ] as [string, string, string][],
    ver: "Ver",
  },
  caso: {
    ceja: "(04) Casos",
    arrastra: "Arrastra",
    antes: "Antes",
    despues: "Después",
    titulo: "Diseño de sonrisa · Carillas",
    nota: "Foto real de paciente, con consentimiento · pendiente",
    comparar: "Comparar antes y después",
  },
  estudio: {
    ceja: "(05) Estudio",
    titulo: ["Ciencia que", "se ve", "bonita"],
    texto:
      "Gabriela es especialista en Odontología Restauradora y Estética Dental y docente de la Universidad de Cuenca. Trabaja con nuevas tecnologías para que cada resultado sea preciso y natural.",
    datos: [
      ["Especialidad", "Restauradora y Estética Dental"],
      ["Docencia", "Universidad de Cuenca"],
      ["Enfoque", "Nuevas tecnologías"],
    ] as [string, string][],
    foto: "Retrato de Gabriela",
  },
  consultorio: {
    ceja: "(06) El consultorio",
    titulo: ["Un lugar", "sereno"],
    texto: "Luz natural y tiempo sin apuros, en Cuenca.",
    fotos: ["Sala de atención", "Recepción", "Detalle de materiales", "Luz de la mañana", "Instrumental"],
  },
  instagram: { ceja: "(07) Instagram" },
  contacto: {
    ceja: "(08) Contacto",
    titulo: "Hablemos",
    boton: "WhatsApp",
    direccion: "[Dirección del consultorio], Cuenca",
    horario: "[Días y horas de atención]",
    sebastian: "Ortodoncia: Dr. Sebastián Silva",
    derechos: "© 2026 Dra. Gabriela Abril",
  },
  pendiente: "pendiente",
};

export type Contenido = typeof es;

const en: Contenido = {
  meta: {
    titulo: "Dr. Gabriela Abril · Aesthetic Dentistry in Cuenca",
    descripcion:
      "Specialist in Restorative and Aesthetic Dentistry in Cuenca, Ecuador. Smile design, invisible orthodontics and new technologies.",
  },
  nav: {
    enlaces: [
      ["#tratamientos", "Treatments"],
      ["#casos", "Cases"],
      ["#estudio", "Studio"],
      ["#contacto", "Contact"],
    ],
    agendar: "Book",
    menu: "Menu",
    cerrar: "Close",
  },
  intro: "Aesthetic dentistry",
  hero: {
    ceja: "(01) Aesthetic dentistry · Cuenca, EC",
    lineas: ["Beauty", "with"],
    italica: "precision",
    texto:
      "Dr. Gabriela Abril. Specialist in Restorative and Aesthetic Dentistry and lecturer at the Universidad de Cuenca.",
    cta: "Book a consultation",
    scroll: "Scroll",
    videoTitulo: ["Smiles", "that look"],
    videoItalica: "natural",
    videoPie: "Video of Gabriela · to be filmed",
  },
  cinta: ["Smile design", "Invisible orthodontics", "Restorative", "New technologies"],
  manifiesto: {
    ceja: "(02) Philosophy",
    texto: "Every smile is designed before a single tooth is touched. Natural, precise and made for your face.",
    italicas: ["before", "Natural,"],
  },
  tratamientos: {
    ceja: "(03) Treatments",
    items: [
      ["Smile design", "Aesthetics", "Shape, proportion and shade planned for your face."],
      ["Invisible orthodontics", "Alignment", "Clear aligners, discreet at work and in photos."],
      ["Veneers", "Restorative", "Worn, stained or chipped teeth, restored to look natural."],
      ["New technologies", "Digital scan", "Digital scanning and design for precise planning, no impressions."],
    ],
    ver: "View",
  },
  caso: {
    ceja: "(04) Cases",
    arrastra: "Drag",
    antes: "Before",
    despues: "After",
    titulo: "Smile design · Veneers",
    nota: "Real patient photo, with consent · pending",
    comparar: "Compare before and after",
  },
  estudio: {
    ceja: "(05) Studio",
    titulo: ["Science that", "looks", "beautiful"],
    texto:
      "Gabriela specializes in Restorative and Aesthetic Dentistry and teaches at the Universidad de Cuenca. She works with new technologies so every result is precise and natural.",
    datos: [
      ["Specialty", "Restorative & Aesthetic Dentistry"],
      ["Teaching", "Universidad de Cuenca"],
      ["Focus", "New technologies"],
    ],
    foto: "Portrait of Gabriela",
  },
  consultorio: {
    ceja: "(06) The studio",
    titulo: ["A calm", "place"],
    texto: "Natural light and unhurried time, in Cuenca.",
    fotos: ["Treatment room", "Reception", "Material details", "Morning light", "Instruments"],
  },
  instagram: { ceja: "(07) Instagram" },
  contacto: {
    ceja: "(08) Contact",
    titulo: "Let's talk",
    boton: "WhatsApp",
    direccion: "[Studio address], Cuenca",
    horario: "[Opening days and hours]",
    sebastian: "Orthodontics: Dr. Sebastián Silva",
    derechos: "© 2026 Dr. Gabriela Abril",
  },
  pendiente: "pending",
};

export const contenido: Record<Idioma, Contenido> = { es, en };
