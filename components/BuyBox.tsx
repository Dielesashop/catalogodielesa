"use client";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import QtyStepper from "@/components/QtyStepper";
import { stockBadge } from "@/components/ProductCard";
import { formatPrice } from "@/lib/format";
import { productQuoteLink } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

export default function BuyBox({ product: p }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [sel, setSel] = useState<Record<string, string>>(() =>
    Object.fromEntries(Object.entries(p.attributes ?? {}).map(([k, v]) => [k, v[0]])),
  );
  const badge = stockBadge(p.stock);
  const options = Object.keys(sel).length ? sel : undefined;

  return (
    <div className="flex flex-col gap-4">
      <p className="font-display text-3xl font-bold">{formatPrice(p.price, p.currency)}</p>
      <span className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${badge.cls}`}>{badge.text}</span>

      {p.attributes && Object.entries(p.attributes).map(([name, opts]) => (
        <div key={name} role="radiogroup" aria-label={name}>
          <p className="mb-1.5 text-sm font-semibold">{name}: <span className="font-normal text-ink/70">{sel[name]}</span></p>
          <div className="flex flex-wrap gap-2">
            {opts.map((o) => (
              <button key={o} role="radio" aria-checked={sel[name] === o} onClick={() => setSel((s) => ({ ...s, [name]: o }))}
                      className={`rounded-full px-3.5 py-1.5 text-sm transition ${sel[name] === o ? "bg-ink text-white" : "bg-white ring-1 ring-ink/20 hover:bg-peach/50"}`}>
                {o}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-3">
        <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} label="Cantidad" />
        <button disabled={p.stock === 0} onClick={() => add(p, qty, options)}
                className="flex-1 rounded-full bg-brand-strong px-6 py-3 font-semibold text-white shadow-card transition hover:bg-[#b84200] disabled:cursor-not-allowed disabled:bg-ink/30">
          {p.stock === 0 ? "Agotado" : "Agregar al carrito"}
        </button>
      </div>
      <a href={productQuoteLink(p, qty, options)} target="_blank" rel="noopener noreferrer"
         className="rounded-full border-2 border-ink px-6 py-3 text-center font-semibold transition hover:bg-ink hover:text-white">
        Ver en WhatsApp ahora
      </a>
    </div>
  );
}
