import raw from "@/data/products.json";
import type { Product } from "@/types/product";
import { matchesQuery } from "@/lib/search";

export const products = raw as Product[];

export const categories = [...new Set(products.map((p) => p.category))];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export type SortKey = "popular" | "newest" | "oldest" | "price-asc" | "price-desc";

export interface ProductQuery {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortKey;
  page?: number;
  limit?: number;
}

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function queryProducts(opts: ProductQuery = {}) {
  const { q, category, minPrice, maxPrice, sort = "popular", page = 1, limit = 12 } = opts;
  const needle = q ? normalize(q.trim()) : "";

  let list = products.filter((p) => {
    if (category && p.category !== category) return false;
    if (minPrice !== undefined && p.price < minPrice) return false;
    if (maxPrice !== undefined && p.price > maxPrice) return false;
    if (needle && !matchesQuery(p, needle)) return false;
    return true;
  });

  const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
    popular: (a, b) => b.reviews - a.reviews,
    newest: (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    oldest: (a, b) => +new Date(a.createdAt) - +new Date(b.createdAt),
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
  };
  list = [...list].sort(sorters[sort] ?? sorters.popular);

  const total = list.length;
  const start = (page - 1) * limit;
  return { items: list.slice(start, start + limit), total, page, limit, hasMore: start + limit < total };
}

export const getProductById = (id: string) => products.find((p) => p.id === id);

/** Misma categoría primero, ordenados por etiquetas en común y popularidad. */
export function getRelated(p: Product, n = 4): Product[] {
  const score = (o: Product) =>
    (o.category === p.category ? 10 : 0) + o.tags.filter((t) => p.tags.includes(t)).length;
  return products
    .filter((o) => o.id !== p.id)
    .sort((a, b) => score(b) - score(a) || b.reviews - a.reviews)
    .slice(0, n);
}
