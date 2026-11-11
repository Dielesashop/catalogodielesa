// Uso: node scripts/generate-products.mjs  →  data/products.json
// Para editar el catálogo, modifica CATALOG y vuelve a ejecutar.
import { writeFileSync } from "node:fs";

const CURRENCY = "MXN";

// Generador pseudoaleatorio determinista: mismo resultado en cada ejecución.
let seed = 20260428;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
const int = (a, b) => Math.floor(rnd() * (b - a + 1)) + a;

const slugify = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// [título, descripción corta, precio MXN, tag1, tag2]
const CATALOG = {
  "Cableado y conductores": { prefix: "CB", attrs: { Color: ["Negro", "Blanco", "Rojo", "Verde", "Azul"] }, items: [
    ["Cable THW cal. 12 AWG (rollo 100 m)", "Cobre 100 %, aislamiento resistente para instalaciones residenciales", 1290, "cobre", "residencial"],
    ["Cable THW cal. 14 AWG (rollo 100 m)", "Ideal para iluminación y contactos de baja carga", 880, "cobre", "iluminación"],
    ["Cable THHW-LS cal. 10 AWG (rollo 100 m)", "Baja emisión de humos, para alimentadores y cargas mayores", 1990, "cobre", "comercial"],
    ["Cable uso rudo 3x14 AWG (rollo 100 m)", "Doble forro flexible para maquinaria y extensiones", 2650, "uso rudo", "industrial"],
    ["Cable UTP Cat6 (caja 305 m)", "Cobre sólido para redes de datos y cámaras IP", 2490, "redes", "cctv"],
    ["Cable multiconductor 4x18 AWG (50 m)", "Para control, sensores y señales en tableros", 1450, "control", "automatización"],
    ["Tubo conduit PVC 3/4\" (tramo 3 m)", "Ligero, fácil de cortar y no se oxida", 48, "canalización", "pvc"],
    ["Canaleta ranurada 40×40 mm (2 m)", "Orden limpio de cables dentro de tableros", 135, "tableros", "orden"],
    ["Cinta aislante vinilo 18 mm × 20 m", "Aislamiento flexible con buen agarre en frío y calor", 39, "básicos", "aislante"],
    ["Kit de terminales y conectores (200 pzas)", "Surtido de ojillo, punta y empalme con estuche", 249, "kit", "conexión"],
  ]},
  "Protección y distribución": { prefix: "PD", attrs: {}, items: [
    ["Interruptor termomagnético 1P 20 A", "Protege contra sobrecarga y cortocircuito, montaje enchufable", 119, "protección", "monofásico"],
    ["Interruptor termomagnético 2P 30 A", "Para aires acondicionados, boilers y cargas bifásicas", 289, "protección", "bifásico"],
    ["Interruptor termomagnético 3P 40 A", "Protección trifásica para motores y alimentadores", 549, "protección", "trifásico"],
    ["Interruptor diferencial 2P 40 A 30 mA", "Cuida a las personas de fugas a tierra", 890, "seguridad", "diferencial"],
    ["Centro de carga 4 circuitos", "Gabinete listo para instalación residencial pequeña", 359, "residencial", "tablero"],
    ["Centro de carga 8 circuitos", "Espacio para crecer: casas y locales", 649, "residencial", "tablero"],
    ["Supresor de picos monofásico", "Protege equipos electrónicos contra transitorios", 1190, "protección", "electrónicos"],
    ["Gabinete metálico NEMA 12 40×30×20 cm", "Con placa de montaje, para tableros de control", 1490, "gabinete", "industrial"],
    ["Interruptor de seguridad 3P 30 A", "Desconexión visible y segura para motores", 1090, "seguridad", "industrial"],
    ["Riel DIN 35 mm (1 m)", "Base estándar para montar módulos y borneras", 79, "montaje", "accesorio"],
  ]},
  "Automatización y control": { prefix: "AU", attrs: { "Voltaje de bobina": ["24 VDC", "127 VAC", "220 VAC"] }, items: [
    ["Contactor 3P 25 A", "Arranque y paro confiable de motores trifásicos", 690, "motores", "contactor"],
    ["Relevador térmico 9–13 A", "Protege el motor contra sobrecargas prolongadas", 590, "motores", "protección"],
    ["Relevador de control 24 VDC con base", "Interfaz entre PLC y cargas, 8 pines", 169, "relevador", "plc"],
    ["Temporizador DIN multifunción", "Retardos a la conexión y desconexión ajustables", 449, "temporizador", "tableros"],
    ["Sensor inductivo M18 PNP", "Detección de metales sin contacto, 8 mm de alcance", 329, "sensores", "industrial"],
    ["Sensor fotoeléctrico difuso", "Detecta objetos a distancia, salida NPN/PNP", 459, "sensores", "conteo"],
    ["Fuente de poder 24 VDC 5 A (riel DIN)", "Alimentación estable para PLC, sensores y relevadores", 890, "fuentes", "24vdc"],
    ["Botón de paro de emergencia 22 mm", "Hongo con retención, contacto NC", 189, "seguridad", "botonería"],
    ["Controlador de temperatura PID", "Control preciso de hornos, resistencias y procesos", 749, "temperatura", "pid"],
    ["Variador de frecuencia 1 HP monofásico", "Arranque suave y control de velocidad de motores", 3290, "variadores", "ahorro de energía"],
  ]},
  Iluminación: { prefix: "IL", attrs: { "Temperatura de color": ["Cálida 3000 K", "Neutra 4000 K", "Fría 6500 K"] }, items: [
    ["Foco LED 9 W (pack 4)", "Ahorra hasta 80 % frente a un foco incandescente", 139, "led", "hogar"],
    ["Foco LED 12 W (pack 4)", "Más luminosidad para cocinas y talleres", 179, "led", "hogar"],
    ["Reflector LED 50 W exterior IP65", "Resistente a lluvia y polvo, para patios y bodegas", 329, "exterior", "ip65"],
    ["Panel LED 60×60 cm 40 W", "Luz uniforme para oficinas y locales", 599, "oficina", "empotrable"],
    ["Tubo LED T8 18 W (pack 10)", "Reemplazo directo de fluorescente, menor consumo", 649, "led", "comercial"],
    ["Campana LED alta bahía 100 W", "Iluminación potente para naves y almacenes", 990, "industrial", "alta bahía"],
    ["Lámpara de emergencia LED", "Se enciende sola cuando falla la luz, hasta 3 h", 349, "seguridad", "emergencia"],
    ["Tira LED 5 m 12 V", "Iluminación decorativa y de gabinetes, autoadhesiva", 199, "decoración", "12v"],
    ["Sensor de movimiento para pared 180°", "Enciende y apaga la luz sin tocar un switch", 239, "ahorro", "sensor"],
    ["Fotocelda 127 V", "Encendido automático al anochecer", 129, "automático", "exterior"],
  ]},
  "Herramienta y seguridad": { prefix: "HR", attrs: {}, items: [
    ["Multímetro digital True RMS", "Mediciones confiables de voltaje, corriente y resistencia", 899, "medición", "profesional"],
    ["Pinza amperimétrica 600 A", "Mide corriente sin abrir el circuito", 1190, "medición", "profesional"],
    ["Pinza pelacables automática", "Pela y corta de 0.2 a 6 mm² con un solo movimiento", 349, "pinzas", "electricista"],
    ["Juego de destornilladores aislados 1000 V (6 pzas)", "Mango ergonómico, aislamiento certificado", 589, "aislado", "kit"],
    ["Probador de voltaje sin contacto", "Detecta tensión con luz y alarma sonora", 159, "seguridad", "medición"],
    ["Guantes dieléctricos clase 0", "Protección para trabajos en baja tensión", 990, "epp", "dieléctrico"],
    ["Casco de seguridad dieléctrico", "Resistente a impacto y descarga eléctrica", 249, "epp", "casco"],
    ["Lentes de seguridad antiempañantes", "Protección contra impacto y partículas", 89, "epp", "protección"],
    ["Pinza de corte diagonal 6\"", "Corte limpio de cobre, mango aislado", 229, "pinzas", "electricista"],
    ["Taladro rotomartillo inalámbrico 20 V", "Con batería de litio y dos velocidades", 1899, "taladro", "inalámbrico"],
  ]},
};

const long = (title, short, cat) =>
  `${title}: ${short.charAt(0).toLowerCase() + short.slice(1)}. ` +
  `Producto de la línea "${cat}", seleccionado para instalaciones y mantenimiento donde la seguridad y la durabilidad importan. ` +
  `¿No estás seguro del calibre, la capacidad o la compatibilidad? Escríbenos por WhatsApp y te asesoramos antes de comprar. ` +
  `Cotizamos por volumen y revisamos disponibilidad al momento.`;

const products = [];
let n = 0;
for (const [category, { prefix, attrs, items }] of Object.entries(CATALOG)) {
  items.forEach(([title, short, price, t1, t2], i) => {
    n++;
    const slug = slugify(title);
    const stockRoll = rnd();
    products.push({
      id: `p${String(n).padStart(3, "0")}`,
      title,
      slug,
      descriptionShort: short,
      descriptionLong: long(title, short, category),
      price,
      currency: CURRENCY,
      images: [1, 2, 3].map((k) => `https://picsum.photos/seed/${slug}-${k}/800/1000`),
      category,
      tags: [t1, t2, ...(i < 3 ? ["más vendido"] : []), ...(rnd() > 0.85 ? ["nuevo"] : [])],
      stock: stockRoll < 0.06 ? 0 : stockRoll < 0.2 ? int(1, 5) : int(8, 120),
      sku: `${prefix}-${String(i + 1).padStart(3, "0")}`,
      rating: Math.round((4.0 + rnd() * 1.0) * 10) / 10,
      reviews: int(4, 380),
      createdAt: new Date(Date.UTC(2026, 0, 1) + int(0, 300) * 86400000).toISOString(),
      ...(Object.keys(attrs).length && { attributes: attrs }),
    });
  });
}

writeFileSync(new URL("../data/products.json", import.meta.url), JSON.stringify(products, null, 2));
console.log(`✔ ${products.length} productos generados en data/products.json`);
