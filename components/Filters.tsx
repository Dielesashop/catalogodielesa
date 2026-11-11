"use client";
import type { SortKey } from "@/lib/products";

export const PRICE_RANGES = [
  { label: "Todos los precios", min: undefined, max: undefined },
  { label: "Hasta $200", min: 0, max: 200 },
  { label: "$200 – $500", min: 200, max: 500 },
  { label: "$500 – $1,000", min: 500, max: 1000 },
  { label: "Más de $1,000", min: 1000, max: undefined },
];

const SORTS: [SortKey, string][] = [
  ["popular", "Más populares"], ["newest", "Más recientes"], ["oldest", "Más antiguos"],
  ["price-asc", "Precio: menor a mayor"], ["price-desc", "Precio: mayor a menor"],
];

interface Props {
  categories: string[]; category: string; onCategory: (c: string) => void;
  range: number; onRange: (i: number) => void; sort: SortKey; onSort: (s: SortKey) => void;
}

export default function Filters({ categories, category, onCategory, range, onRange, sort, onSort }: Props) {
  const chip = (active: boolean) =>
    `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
      active ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-ink/15 hover:bg-peach/50"}`;
  const select = "rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm";

  return (
    <div className="space-y-4">
      <div role="group" aria-label="Categorías" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <button className={chip(category === "")} aria-pressed={category === ""} onClick={() => onCategory("")}>Todo</button>
        {categories.map((c) => (
          <button key={c} className={chip(category === c)} aria-pressed={category === c} onClick={() => onCategory(c)}>{c}</button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2 text-sm">Precio
          <select className={select} value={range} onChange={(e) => onRange(+e.target.value)}>
            {PRICE_RANGES.map((r, i) => <option key={r.label} value={i}>{r.label}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">Ordenar por
          <select className={select} value={sort} onChange={(e) => onSort(e.target.value as SortKey)}>
            {SORTS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </label>
      </div>
    </div>
  );
}
