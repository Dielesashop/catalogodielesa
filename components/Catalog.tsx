"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { categories, queryProducts, type SortKey } from "@/lib/products";
import type { Product } from "@/types/product";
import SearchBar from "@/components/SearchBar";
import Filters, { PRICE_RANGES } from "@/components/Filters";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";

const PAGE = 12;

export default function Catalog() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [range, setRange] = useState(0);
  const [sort, setSort] = useState<SortKey>("popular");
  const [shown, setShown] = useState(PAGE);
  const [active, setActive] = useState<Product | null>(null);

  useEffect(() => setShown(PAGE), [q, category, range, sort]);

  const { items, total, hasMore } = useMemo(
    () => queryProducts({ q, category: category || undefined, minPrice: PRICE_RANGES[range].min, maxPrice: PRICE_RANGES[range].max, sort, page: 1, limit: shown }),
    [q, category, range, sort, shown],
  );
  const close = useCallback(() => setActive(null), []);
  const clear = () => { setQ(""); setCategory(""); setRange(0); setSort("popular"); };

  return (
    <section id="catalogo" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-14 sm:px-6">
      <h2 className="font-display text-3xl font-bold">Catálogo</h2>
      <p className="mt-1 text-ink/70">Encuentra lo que necesitas y cotízalo en un mensaje.</p>
      <div className="mt-6 space-y-5">
        <SearchBar value={q} onChange={setQ} />
        <Filters categories={categories} category={category} onCategory={setCategory} range={range} onRange={setRange} sort={sort} onSort={setSort} />
      </div>
      <p aria-live="polite" className="mt-6 text-sm text-ink/60">{total} {total === 1 ? "producto" : "productos"}</p>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-white p-10 text-center shadow-card">
          <p className="font-display text-xl font-semibold">No encontramos resultados</p>
          <p className="mt-1 text-ink/70">Prueba con otra palabra o quita algún filtro.</p>
          <button onClick={clear} className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-strong">Limpiar filtros</button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => <ProductCard key={p.id} product={p} onQuickView={setActive} priority={i < 4} />)}
        </div>
      )}

      {hasMore && (
        <div className="mt-10 text-center">
          <button onClick={() => setShown((n) => n + PAGE)} className="rounded-full border-2 border-ink px-8 py-3 font-semibold transition hover:bg-ink hover:text-white">
            Ver más productos
          </button>
        </div>
      )}
      {active && <QuickView product={active} onClose={close} />}
    </section>
  );
}
