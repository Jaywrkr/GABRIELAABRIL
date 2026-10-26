// Todo el texto del sitio, en español e inglés.
// Los datos marcados como PENDIENTE se reemplazan cuando la doctora los envíe.

export const idiomas = ["es", "en"] as const;
export type Idioma = (typeof idiomas)[number];
export const esIdioma = (v: string): v is Idioma => (idiomas as readonly string[]).includes(v);

// PENDIENTE: número real de WhatsApp (formato internacional sin "+")
export const WHATSAPP = "593900000000";
export const WHATSAPP_VISIBLE = "+593 90 000 0000";
// PENDIENTE: URL de la web de Sebastián cuando exista
export const WEB_SEBASTIAN = "#";

export type Tono = { codigo: string; color: string; es: string; en: string };

// Guía de color dental (sistema VITA). Colores aproximados para pantalla.
export const tonos: Tono[] = [
  { codigo: "A3.5", color: "#D7BD8C", es: "cálido intenso", en: "deep warm" },
  { codigo: "A3", color: "#DFC79A", es: "cálido", en: "warm" },
  { codigo: "A2", color: "#E7D4AC", es: "natural cálido", en: "warm natural" },
  { codigo: "A1", color: "#EEE1C3", es: "natural luminoso", en: "bright natural" },
  { codigo: "B1", color: "#F2E9D4", es: "el natural más claro", en: "lightest natural" },
  { codigo: "BL4", color: "#F4EEE1", es: "blanqueado suave", en: "soft bleached" },
  { codigo: "BL3", color: "#F6F2EA", es: "blanqueado", en: "bleached" },
  { codigo: "BL2", color: "#F9F6F0", es: "muy blanco", en: "very white" },
  { codigo: "BL1", color: "#FCFBF7", es: "el más blanco", en: "whitest" },
];

const es = {
  meta: {
    titulo: "Dra. Gabriela Abril · Estética Dental en Cuenca",
    descripcion:
      "Especialista en Odontología Restauradora y Estética Dental en Cuenca, Ecuador. Diseño de sonrisa, carillas y ortodoncia invisible.",
  },
  nav: {
    subtitulo: "Restauradora & Estética Dental",
    enlaces: [
      ["#tratamientos", "Tratamientos"],
      ["#proceso", "Proceso"],
      ["#casos", "Casos"],
      ["#preguntas", "Preguntas"],
    ] as [string, string][],
    agendar: "Agendar cita",
    menu: "Menú",
    cerrar: "Cerrar",
  },
  hero: {
    ceja: "Dra. Gabriela Abril · Cuenca, Ecuador",
    titulo: ["La belleza", "de una sonrisa"],
    tituloItalica: "bien diseñada.",
    lead: "Diseño de sonrisa, restauraciones estéticas y ortodoncia invisible. Resultados naturales, planificados en digital antes de tocar un solo diente.",
    ctaPrincipal: "Agenda por WhatsApp",
    ctaSecundario: "Ver casos",
    guiaCeja: "Guía de color",
    guiaTexto: "Cada sonrisa tiene su tono. Lo elegimos según tu piel, tus labios y tu rostro, no según un catálogo.",
    tono: "Tono",
    arrastra: "Toca un tono",
  },
  sobre: {
    ceja: "Sobre Gabriela",
    declaracion: ["Una sonrisa bonita no es solo dientes blancos. Es ", "armonía", " con tu rostro."],
    datos: [
      ["Especialista", "En Odontología Restauradora y Estética Dental."],
      ["Docente universitaria", "Universidad de Cuenca, Ecuador."],
      ["Flujo digital", "Escaneo intraoral y diseño digital de sonrisa."],
    ] as [string, string][],
  },
  tratamientos: {
    ceja: "Tratamientos",
    titulo: ["Lo que podemos ", "transformar"],
    items: [
      ["ESTÉTICA", "Diseño de sonrisa", "Planificamos forma, tamaño y color primero en pantalla. Ves tu nueva sonrisa antes de empezar."],
      ["RESTAURADORA", "Carillas y restauraciones", "Recuperamos dientes desgastados, fracturados o manchados con materiales que se ven y se sienten naturales."],
      ["ALINEACIÓN", "Ortodoncia invisible", "Alineadores transparentes para enderezar tus dientes sin brackets. Discretos en el trabajo y en las fotos."],
      ["TECNOLOGÍA", "Nuevas tecnologías", "Escaneo digital en lugar de moldes incómodos, y una planificación más precisa."],
    ] as [string, string, string][],
  },
  proceso: {
    ceja: "Diseño de sonrisa, paso a paso",
    titulo: ["De la primera cita a tu ", "nueva sonrisa"],
    pasos: [
      ["Escaneo digital", "Escaneamos tus dientes en minutos, sin moldes. Así obtenemos un modelo exacto de tu boca."],
      ["Diseño digital", "Diseñamos forma y proporción en pantalla, a la medida de tu rostro y tus labios."],
      ["Prueba en boca", "Pruebas el diseño en tu propia boca antes de cualquier trabajo definitivo."],
      ["Tu sonrisa", "Realizamos el tratamiento final con porcelana o resina de alta estética, y te damos seguimiento."],
    ] as [string, string][],
  },
  casos: {
    ceja: "Casos",
    titulo: ["Antes y ", "después"],
    antes: "Antes",
    despues: "Después",
    ilustracion: "Ilustración",
    nota: "Reemplazar con fotos reales de pacientes (con consentimiento).",
    comparar: "Comparar antes y después",
    anterior: "Caso anterior",
    siguiente: "Caso siguiente",
    lista: [
      ["Diseño de sonrisa con carillas", "Forma, proporción y color · 6 dientes"],
      ["Restauración estética", "Bordes desgastados y fracturados"],
      ["Ortodoncia invisible", "Apiñamiento corregido con alineadores"],
    ] as [string, string][],
  },
  docencia: {
    ceja: "Docencia",
    frase: ["Enseña lo que ", "practica", " cada día."],
    texto: "Como docente de la Universidad de Cuenca, Gabriela se mantiene al día con las técnicas y materiales que enseña a la nueva generación de odontólogos.",
  },
  resenas: {
    ceja: "Pacientes",
    titulo: ["En sus ", "propias palabras"],
    texto: "Aquí va una reseña real de Google.",
    nombre: "Nombre de paciente",
    pendiente: "Pendiente",
  },
  faq: {
    ceja: "Preguntas frecuentes",
    titulo: ["Antes de tu ", "primera cita"],
    items: [
      ["¿Mi sonrisa se verá natural?", "Ese es el objetivo. Diseñamos forma y color en proporción a tu rostro, y pruebas el diseño en tu boca antes del tratamiento definitivo."],
      ["¿El diseño de sonrisa duele?", "La mayoría de pasos son cómodos. Cuando un procedimiento lo requiere, usamos anestesia local. Te explicamos cada paso en tu valoración."],
      ["¿Cuánto dura la ortodoncia invisible?", "Depende de cada caso. Después del escaneo digital te damos un tiempo estimado."],
      ["¿Atienden en inglés?", "Sí. Recibimos pacientes del exterior y residentes de Cuenca que prefieren el inglés."],
      ["¿Cómo agendo una cita?", "Escríbenos por WhatsApp y buscamos un horario que te funcione."],
    ] as [string, string][],
  },
  contacto: {
    ceja: "Contacto",
    titulo: ["Diseñemos ", "la tuya."],
    whatsapp: "Escribir por WhatsApp",
    mapa: "Abrir en Google Maps",
    direccion: "Dirección",
    direccionValor: "Dirección pendiente · Cuenca, Ecuador",
    horario: "Horario",
    horarioValor: ["Lun–Vie · horario pendiente", "Sáb · con cita previa"],
    copiar: "Copiar número",
    copiado: "Copiado",
  },
  pie: { ortodoncia: "Ortodoncia:", flotante: "Agendar" },
  retrato: "Retrato pendiente",
};

export type Contenido = typeof es;

const en: Contenido = {
  meta: {
    titulo: "Dr. Gabriela Abril · Aesthetic Dentistry in Cuenca",
    descripcion:
      "Specialist in Restorative and Aesthetic Dentistry in Cuenca, Ecuador. Smile design, veneers and invisible orthodontics.",
  },
  nav: {
    subtitulo: "Restorative & Aesthetic Dentistry",
    enlaces: [
      ["#tratamientos", "Treatments"],
      ["#proceso", "Process"],
      ["#casos", "Cases"],
      ["#preguntas", "FAQ"],
    ],
    agendar: "Book a visit",
    menu: "Menu",
    cerrar: "Close",
  },
  hero: {
    ceja: "Dr. Gabriela Abril · Cuenca, Ecuador",
    titulo: ["The beauty", "of a smile"],
    tituloItalica: "by design.",
    lead: "Smile design, aesthetic restorations and invisible orthodontics. Natural results, planned digitally before we touch a single tooth.",
    ctaPrincipal: "Book via WhatsApp",
    ctaSecundario: "See cases",
    guiaCeja: "Shade guide",
    guiaTexto: "Every smile has its own shade. We choose it for your skin, your lips and your face, never from a catalog.",
    tono: "Shade",
    arrastra: "Tap a shade",
  },
  sobre: {
    ceja: "About",
    declaracion: ["A beautiful smile is more than white teeth. It is ", "harmony", " with your face."],
    datos: [
      ["Specialist", "In Restorative and Aesthetic Dentistry."],
      ["University lecturer", "Universidad de Cuenca, Ecuador."],
      ["Digital workflow", "Intraoral scanning and digital smile design."],
    ],
  },
  tratamientos: {
    ceja: "Treatments",
    titulo: ["What we can ", "transform"],
    items: [
      ["AESTHETICS", "Smile design", "We plan shape, size and shade on screen first. You see your new smile before we begin."],
      ["RESTORATIVE", "Veneers & restorations", "We restore worn, chipped or stained teeth with materials that look and feel natural."],
      ["ALIGNMENT", "Invisible orthodontics", "Clear aligners to straighten your teeth without brackets. Discreet at work and in photos."],
      ["TECHNOLOGY", "New technologies", "Digital scanning instead of uncomfortable impressions, and more precise planning."],
    ],
  },
  proceso: {
    ceja: "Smile design, step by step",
    titulo: ["From the first visit to your ", "new smile"],
    pasos: [
      ["Digital scan", "We scan your teeth in minutes, no impressions. That gives us an exact model of your mouth."],
      ["Digital design", "We design shape and proportion on screen, tailored to your face and lips."],
      ["Mock-up", "You try the design in your own mouth before any definitive work."],
      ["Your smile", "We complete the final treatment in high-aesthetic porcelain or resin, with follow-up care."],
    ],
  },
  casos: {
    ceja: "Cases",
    titulo: ["Before & ", "after"],
    antes: "Before",
    despues: "After",
    ilustracion: "Illustration",
    nota: "Replace with real patient photos (with consent).",
    comparar: "Compare before and after",
    anterior: "Previous case",
    siguiente: "Next case",
    lista: [
      ["Smile design with veneers", "Shape, proportion and shade · 6 teeth"],
      ["Aesthetic restoration", "Worn and chipped edges"],
      ["Invisible orthodontics", "Crowding corrected with aligners"],
    ],
  },
  docencia: {
    ceja: "Teaching",
    frase: ["She teaches what she ", "practices", " every day."],
    texto: "As a lecturer at the Universidad de Cuenca, Gabriela keeps up with the techniques and materials she teaches to the next generation of dentists.",
  },
  resenas: {
    ceja: "Patients",
    titulo: ["In their ", "own words"],
    texto: "A real Google review goes here.",
    nombre: "Patient name",
    pendiente: "Pending",
  },
  faq: {
    ceja: "FAQ",
    titulo: ["Before your ", "first visit"],
    items: [
      ["Will my smile look natural?", "That is the goal. We design shape and shade in proportion to your face, and you try the design in your mouth before the definitive treatment."],
      ["Does smile design hurt?", "Most steps are comfortable. When a procedure needs it, we use local anesthesia. We explain each step at your consultation."],
      ["How long does invisible orthodontics take?", "It depends on each case. After the digital scan we give you an estimated timeline."],
      ["Do you see patients in English?", "Yes. We welcome patients from abroad and residents of Cuenca who prefer English."],
      ["How do I book?", "Message us on WhatsApp and we will find a time that works for you."],
    ],
  },
  contacto: {
    ceja: "Contact",
    titulo: ["Let's design ", "yours."],
    whatsapp: "Message on WhatsApp",
    mapa: "Open in Google Maps",
    direccion: "Address",
    direccionValor: "Address pending · Cuenca, Ecuador",
    horario: "Hours",
    horarioValor: ["Mon–Fri · hours pending", "Sat · by appointment"],
    copiar: "Copy number",
    copiado: "Copied",
  },
  pie: { ortodoncia: "Orthodontics:", flotante: "Book" },
  retrato: "Portrait pending",
};

export const contenido: Record<Idioma, Contenido> = { es, en };
