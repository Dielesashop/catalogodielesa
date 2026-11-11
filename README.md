# Dielesa · Catálogo con pedido por WhatsApp

Next.js (App Router) + TypeScript + Tailwind CSS 3. Sin pasarela de pago: el pedido se envía por WhatsApp.

## Estado
Hitos 1 a 3 listos: 50 productos, endpoint `/api/products`, hero, catálogo con filtros, orden y búsqueda aproximada,
vista rápida, página de producto (`/producto/[slug]`, SSG, SEO, Open Graph, JSON-LD, relacionados),
y carrito persistente en localStorage (drawer, cantidades, opciones, total).
Pendiente: envío del pedido completo por WhatsApp (nombre, observaciones), pruebas del carrito y deploy.

## Correr en local
Requiere Node.js 18.18 o superior.

    npm install
    npm run dev

Abre http://localhost:3000 y prueba http://localhost:3000/api/products?category=Iluminación&sort=price-asc

## Configuración (.env.local)
- NEXT_PUBLIC_WHATSAPP_NUMBER: formato internacional solo dígitos (México: 52 + 10 dígitos)
- NEXT_PUBLIC_STORE_NAME
- NEXT_PUBLIC_SITE_URL

## Editar los 50 productos
Edita CATALOG en scripts/generate-products.mjs y ejecuta:

    npm run products:generate

## Deploy
Sube el repo a GitHub, impórtalo en Vercel y agrega las variables de .env.local en Settings → Environment Variables.
# catalogodielesa
