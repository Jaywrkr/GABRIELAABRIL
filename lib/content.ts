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
      ["#objetivo", "Filosofía"],
      ["#tratamientos", "Tratamientos"],
      ["#tecnologia", "Tecnología"],
      ["#gabriela", "Gabriela"],
      ["#consultorio", "Consultorio"],
      ["#contacto", "Contacto"],
    ] as [string, string][],
    agendar: "Agendar cita",
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
  objetivo: {
    ceja: "Filosofía",
    izquierda: "Mi objetivo es",
    derecha:
      "diseñar sonrisas que se vean naturales, en armonía con tu rostro, con técnicas actuales y un trato cercano en cada paso.",
    cita: "Especialista en Restauradora y Estética Dental y docente de la Universidad de Cuenca.",
    foto: "Retrato de Gabriela",
    boton: "Conóceme",
  },
  tratamientos: {
    ceja: "Tratamientos",
    indice: "Tratamientos:",
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
    ceja: "Tecnología",
    titulo: ["Tecnología al servicio de", "resultados", "naturales"],
    lista: ["Diseño digital de sonrisa", "Escaneo digital", "Fotografía clínica", "Alineadores a medida"],
    nota: "Lista por confirmar con Gabriela",
    video: "Video del consultorio · pendiente",
  },
  caso: {
    ceja: "Casos",
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
    arcos: ["Estoy aquí", "para realzar", "tu sonrisa"],
    porque: "¿Por qué yo?",
  },
  consultorio: {
    ceja: "El consultorio",
    titulo: ["Un lugar", "sereno"],
    texto: "Luz natural y tiempo sin apuros, en Cuenca.",
    fotos: ["Sala de atención", "Recepción", "Detalle de materiales", "Luz de la mañana", "Instrumental"],
  },
  instagram: { ceja: "Instagram" },
  cierre: {
    frase: ["Tu sonrisa", "perfecta,", "cobra", "vida"],
    foto: "Silueta · foto pendiente",
  },
  contacto: {
    titulo: ["Agenda tu", "valoración"],
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
      ["#objetivo", "Philosophy"],
      ["#tratamientos", "Treatments"],
      ["#tecnologia", "Technology"],
      ["#gabriela", "Gabriela"],
      ["#consultorio", "Studio"],
      ["#contacto", "Contact"],
    ],
    agendar: "Book a visit",
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
  objetivo: {
    ceja: "Philosophy",
    izquierda: "My goal is",
    derecha:
      "to design smiles that look natural, in harmony with your face, using current techniques and close care at every step.",
    cita: "Specialist in Restorative and Aesthetic Dentistry and lecturer at the Universidad de Cuenca.",
    foto: "Portrait of Gabriela",
    boton: "About me",
  },
  tratamientos: {
    ceja: "Treatments",
    indice: "Treatments:",
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
    ceja: "Technology",
    titulo: ["Technology for", "natural", "results"],
    lista: ["Digital smile design", "Digital scanning", "Clinical photography", "Custom aligners"],
    nota: "List to be confirmed with Gabriela",
    video: "Studio video · pending",
  },
  caso: {
    ceja: "Cases",
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
    arcos: ["I am here", "to enhance", "your smile"],
    porque: "Why me?",
  },
  consultorio: {
    ceja: "The studio",
    titulo: ["A calm", "place"],
    texto: "Natural light and unhurried time, in Cuenca.",
    fotos: ["Treatment room", "Reception", "Material details", "Morning light", "Instruments"],
  },
  instagram: { ceja: "Instagram" },
  cierre: {
    frase: ["Bringing", "your perfect", "smile", "to life"],
    foto: "Silhouette · photo pending",
  },
  contacto: {
    titulo: ["Book your", "consultation"],
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

// ---------------------------------------------------------------------------
// IMÁGENES DE REFERENCIA (Unsplash, licencia libre). Son provisionales: solo para que el cliente vea
// cómo se va a ver la web. Se reemplazan con la sesión de fotos y video de Gabriela.
// ---------------------------------------------------------------------------
const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const REF = {
  hero: [u("1489278353717-f64c6ee8a4d2", 2000), u("1629909613654-28e377c37b09", 2000), u("1777331903190-341a3dd0441b", 2000)],
  pastillas: [u("1677026010083-78ec7f1b84ed", 600), u("1564420228450-d9a5bc8d6565", 600)],
  tratamientos: [
    u("1677026010083-78ec7f1b84ed"), // diseño de sonrisa
    u("1564420228450-d9a5bc8d6565"), // ortodoncia invisible
    u("1606811971618-4486d14f3f99"), // restauradora
    u("1588776814546-1ffcf47267a5"), // nuevas tecnologías
  ],
  tecnologiaFondo: u("1598256989800-fe5f95da9787", 2000),
  tecnologia: [u("1593022356769-11f762e25ed9"), u("1771442873038-dda05b6ca447"), u("1606811856475-5e6fcdc6e509"), u("1564420228450-d9a5bc8d6565")],
  antes: u("1670250492416-570b5b7343b1"),
  despues: u("1654373535457-383a0a4d00f9"),
  consultorio: [
    u("1704455306251-b4634215d98f"),
    u("1762625570087-6d98fca29531"),
    u("1629909614456-6b1c5c94cecc"),
    u("1629909613654-28e377c37b09"),
    u("1648775507324-b48dd3791fa5"),
  ],
  instagram: [
    u("1567516364473-233c4b6fcfbe", 600),
    u("1681939282781-341ac4f61996", 600),
    u("1617812191081-2a24e3f30e45", 600),
    u("1593022356769-11f762e25ed9", 600),
    u("1548382131-e0ebb1f0cdea", 600),
    u("1667133295352-ef4c83620e8e", 600),
  ],
  cierre: u("1594756154841-ac5d160dbf46", 2000),
};
