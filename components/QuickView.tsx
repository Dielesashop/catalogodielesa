"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import BuyBox from "@/components/BuyBox";
import Gallery from "@/components/Gallery";
import type { Product } from "@/types/product";

export default function QuickView({ product: p, onClose }: { product: Product; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; prev?.focus(); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 grid place-items-end bg-ink/60 sm:place-items-center sm:p-6" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={p.title} onClick={(e) => e.stopPropagation()}
           className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl md:grid-cols-2">
        <button ref={closeRef} onClick={onClose} aria-label="Cerrar" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow hover:bg-peach/60">✕</button>
        <div className="p-4 md:p-6"><Gallery images={p.images} title={p.title} /></div>
        <div className="flex flex-col gap-3 p-6 md:pt-14">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/55">{p.category} · SKU {p.sku}</p>
          <h2 className="font-display text-2xl font-bold leading-tight">{p.title}</h2>
          <p className="text-sm text-ink/70"><span className="text-brand">★</span> {p.rating} · {p.reviews} reseñas</p>
          <p className="text-sm leading-relaxed text-ink/80">{p.descriptionShort}.</p>
          <BuyBox product={p} />
          <Link href={`/producto/${p.slug}`} className="text-center text-sm underline hover:text-brand-strong">Ver página completa</Link>
        </div>
      </div>
    </div>
  );
}
