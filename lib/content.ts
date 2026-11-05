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

// PENDIENTE: clips reales del hero (mp4 H.264, 1920×1080, 5–8 s cada uno, sin audio)
export const CLIPS_HERO = ["/video/hero-1.mp4", "/video/hero-2.mp4", "/video/hero-3.mp4"];
export const VIDEO_TECNOLOGIA = "/video/tecnologia.mp4";

export type Tratamiento = { nombre: string[]; resumen: string; items: string[]; foto: string };

const es = {
  meta: {
    titulo: "Dra. Gabriela Abril · Estética Dental en Cuenca",
    descripcion:
      "Especialista en Restauradora y Estética Dental en Cuenca, Ecuador. Diseño de sonrisa, ortodoncia invisible y nuevas tecnologías.",
  },
  nav: {
    menu: "Menú",
    tratamientos: "Tratamientos",
    enlaces: [
      ["#tratamientos", "Tratamientos"],
      ["#tecnologia", "Tecnología"],
      ["#casos", "Casos"],
      ["#gabriela", "Gabriela"],
      ["#contacto", "Contacto"],
    ] as [string, string][],
    agendar: "Agendar",
    cerrar: "Cerrar",
  },
  intro: "Estética dental · Cuenca",
  hero: {
    titulo: ["Estética", "dental de"],
    italica: "autor",
    texto: "Restauradora y Estética Dental. Diseño de sonrisa y ortodoncia invisible con nuevas tecnologías.",
    frase: ["Tu sonrisa,", "naturalmente", "mejor."],
    pie: "Clips de video pendientes de grabación",
  },
  cinta: ["Diseño de sonrisa", "Ortodoncia invisible", "Restauradora", "Nuevas tecnologías"],
  manifiesto: {
    ceja: "(02) Filosofía",
    texto: "Cada sonrisa se diseña antes de tocar un solo diente. Natural, precisa y pensada para tu rostro.",
    italicas: ["antes", "Natural,"],
  },
  tratamientos: {
    ceja: "(03) Tratamientos",
    indice: "Tratamientos",
    detalle: "Incluye:",
    ver: "Ver",
    items: [
      { nombre: ["Diseño de", "sonrisa"], resumen: "Forma, proporción y color planificados para tu rostro antes de empezar.", items: ["Planificación digital", "Prueba en boca", "Carillas"], foto: "Sonrisa de paciente" },
      { nombre: ["Ortodoncia", "invisible"], resumen: "Alineadores transparentes para alinear tus dientes sin brackets visibles.", items: ["Valoración y escaneo", "Plan de tratamiento", "Seguimiento"], foto: "Alineador en mano" },
      { nombre: ["Odontología", "restauradora"], resumen: "Dientes desgastados, manchados o fracturados, recuperados con naturalidad.", items: ["Restauraciones estéticas", "Carillas", "Coronas"], foto: "Detalle de restauración" },
      { nombre: ["Nuevas", "tecnologías"], resumen: "Herramientas digitales para planificar con precisión y mostrarte el resultado antes.", items: ["Diseño digital", "Fotografía clínica", "Escaneo"], foto: "Equipo en el consultorio" },
    ] as Tratamiento[],
  },
  tecnologia: {
    ceja: "(04) Tecnología",
    titulo: ["Lo ves", "antes", "de empezar"],
    lista: ["Diseño digital de sonrisa", "Escaneo digital", "Fotografía clínica", "Alineadores a medida"],
    descs: ["Tu nueva sonrisa, diseñada en pantalla.", "Un modelo exacto de tu boca, sin moldes.", "Registro preciso de cada detalle.", "Planificados para tu caso."],
    nota: "Lista por confirmar con Gabriela",
    video: "Video del consultorio · pendiente",
  },
  caso: {
    ceja: "(05) Casos",
    titulo: ["Antes y", "después"],
    arrastra: "Arrastra",
    antes: "Antes",
    despues: "Después",
    nombre: "Diseño de sonrisa",
    nota: "Fotos reales de pacientes, con consentimiento · pendiente",
    comparar: "Comparar antes y después",
  },
  gabriela: {
    nombre: ["Gabriela", "Abril"],
    datos: [
      ["Especialidad", "Restauradora y Estética Dental"],
      ["Docencia", "Universidad de Cuenca"],
      ["Enfoque", "Diseño de sonrisa y nuevas tecnologías"],
    ] as [string, string][],
    frase: "Enseñar lo que practico me obliga a estar al día con cada técnica y cada material.",
    ceja: "(06) Gabriela",
    foto: "Retrato de Gabriela",
  },
  consultorio: {
    ceja: "(07) El consultorio",
    titulo: ["Un lugar", "sereno"],
    texto: "Luz natural y tiempo sin apuros, en Cuenca.",
    fotos: ["Sala de atención", "Recepción", "Detalle de materiales", "Luz de la mañana", "Instrumental"],
  },
  instagram: { ceja: "(08) Instagram" },
  contacto: {
    ceja: "(09) Contacto",
    titulo: "Hablemos",
    formTitulo: "O déjame tu mensaje",
    nombre: "Nombre",
    telefono: "Teléfono",
    mensaje: "¿Qué te gustaría mejorar de tu sonrisa?",
    enviar: "Enviar por WhatsApp",
    saludo: "Hola Dra. Gabriela, soy",
    columnas: [
      ["Tratamientos", ["Diseño de sonrisa", "Ortodoncia invisible", "Restauradora", "Nuevas tecnologías"]],
      ["Consultorio", ["[Dirección del consultorio]", "Cuenca, Ecuador", "[Días y horas de atención]"]],
    ] as [string, string[]][],
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
    menu: "Menu",
    tratamientos: "Treatments",
    enlaces: [
      ["#tratamientos", "Treatments"],
      ["#tecnologia", "Technology"],
      ["#casos", "Cases"],
      ["#gabriela", "Gabriela"],
      ["#contacto", "Contact"],
    ],
    agendar: "Book",
    cerrar: "Close",
  },
  intro: "Aesthetic dentistry · Cuenca",
  hero: {
    titulo: ["Signature", "aesthetic"],
    italica: "dentistry",
    texto: "Restorative and Aesthetic Dentistry. Smile design and invisible orthodontics with new technologies.",
    frase: ["Your smile,", "naturally", "better."],
    pie: "Video clips to be filmed",
  },
  cinta: ["Smile design", "Invisible orthodontics", "Restorative", "New technologies"],
  manifiesto: {
    ceja: "(02) Philosophy",
    texto: "Every smile is designed before a single tooth is touched. Natural, precise and made for your face.",
    italicas: ["before", "Natural,"],
  },
  tratamientos: {
    ceja: "(03) Treatments",
    indice: "Treatments",
    detalle: "Includes:",
    ver: "View",
    items: [
      { nombre: ["Smile", "design"], resumen: "Shape, proportion and shade planned for your face before we begin.", items: ["Digital planning", "Mock-up", "Veneers"], foto: "Patient smile" },
      { nombre: ["Invisible", "orthodontics"], resumen: "Clear aligners to straighten your teeth without visible braces.", items: ["Assessment and scan", "Treatment plan", "Follow-up"], foto: "Aligner in hand" },
      { nombre: ["Restorative", "dentistry"], resumen: "Worn, stained or chipped teeth, restored to look natural.", items: ["Aesthetic restorations", "Veneers", "Crowns"], foto: "Restoration detail" },
      { nombre: ["New", "technologies"], resumen: "Digital tools to plan precisely and show you the result first.", items: ["Digital design", "Clinical photography", "Scanning"], foto: "Equipment in the studio" },
    ],
  },
  tecnologia: {
    ceja: "(04) Technology",
    titulo: ["See it", "before", "we begin"],
    lista: ["Digital smile design", "Digital scanning", "Clinical photography", "Custom aligners"],
    descs: ["Your new smile, designed on screen.", "An exact model of your mouth, no impressions.", "Precise record of every detail.", "Planned for your case."],
    nota: "List to be confirmed with Gabriela",
    video: "Studio video · pending",
  },
  caso: {
    ceja: "(05) Cases",
    titulo: ["Before &", "after"],
    arrastra: "Drag",
    antes: "Before",
    despues: "After",
    nombre: "Smile design",
    nota: "Real patient photos, with consent · pending",
    comparar: "Compare before and after",
  },
  gabriela: {
    nombre: ["Gabriela", "Abril"],
    datos: [
      ["Specialty", "Restorative & Aesthetic Dentistry"],
      ["Teaching", "Universidad de Cuenca"],
      ["Focus", "Smile design and new technologies"],
    ],
    frase: "Teaching what I practice keeps me current with every technique and every material.",
    ceja: "(06) Gabriela",
    foto: "Portrait of Gabriela",
  },
  consultorio: {
    ceja: "(07) The studio",
    titulo: ["A calm", "place"],
    texto: "Natural light and unhurried time, in Cuenca.",
    fotos: ["Treatment room", "Reception", "Material details", "Morning light", "Instruments"],
  },
  instagram: { ceja: "(08) Instagram" },
  contacto: {
    ceja: "(09) Contact",
    titulo: "Let's talk",
    formTitulo: "Or leave me a message",
    nombre: "Name",
    telefono: "Phone",
    mensaje: "What would you like to improve about your smile?",
    enviar: "Send via WhatsApp",
    saludo: "Hello Dr. Gabriela, my name is",
    columnas: [
      ["Treatments", ["Smile design", "Invisible orthodontics", "Restorative", "New technologies"]],
      ["Studio", ["[Studio address]", "Cuenca, Ecuador", "[Opening days and hours]"]],
    ],
    sebastian: "Orthodontics: Dr. Sebastián Silva",
    derechos: "© 2026 Dr. Gabriela Abril",
  },
  pendiente: "pending",
};

export const contenido: Record<Idioma, Contenido> = { es, en };
