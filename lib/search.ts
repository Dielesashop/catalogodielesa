import type { Product } from "@/types/product";

export const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// ¿Distancia de edición ≤ 1? (tolera una letra de más, de menos o distinta)
function within1(a: string, b: string) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (a.length < b.length) j++;
    else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

/** Búsqueda aproximada: cada palabra debe aparecer o coincidir con un error de tecleo. */
export function matchesQuery(p: Product, needle: string) {
  const hay = norm(`${p.title} ${p.descriptionShort} ${p.tags.join(" ")} ${p.category} ${p.sku}`);
  const hayWords = hay.split(/[^a-z0-9]+/).filter(Boolean);
  return needle.split(/\s+/).filter(Boolean).every(
    (w) =>
      hay.includes(w) ||
      (w.length >= 4 && hayWords.some((h) => within1(w, h) || within1(w, h.slice(0, w.length)))),
  );
}
