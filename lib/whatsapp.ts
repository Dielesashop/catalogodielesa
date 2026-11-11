import { WHATSAPP_NUMBER } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const productQuoteLink = (p: Product, qty = 1, options?: Record<string, string>) => {
  const opts = options && Object.keys(options).length
    ? ` [${Object.entries(options).map(([k, v]) => `${k}: ${v}`).join(", ")}]` : "";
  return waLink(
    `Hola, me interesa este producto:\n${qty}x (SKU: ${p.sku}) — ${formatPrice(p.price, p.currency)}\n¿Me confirman disponibilidad y precio por cantidad?`,
  );
};
