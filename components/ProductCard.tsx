"use client";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export const stockBadge = (stock: number) =>
  stock === 0 ? { text: "Agotado · consúltanos", cls: "bg-ink/10 text-ink" }
  : stock <= 5 ? { text: `Últimas ${stock} piezas`, cls: "bg-brand/15 text-brand-strong" }
  : { text: "Disponible", cls: "bg-emerald-100 text-emerald-900" };

interface Props { product: Product; onQuickView?: (p: Product) => void; priority?: boolean }

export default function ProductCard({ product: p, onQuickView, priority = false }: Props) {
  const badge = stockBadge(p.stock);
  const href = `/producto/${p.slug}`;

  // Estilo mejorado: llamativo, con sombra suave, interactivo y a ancho completo
  const btnStyle = "group/btn mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-brand-strong py-2.5 px-4 text-center text-sm font-semibold text-white shadow-md shadow-brand-strong/20 transition-all duration-300 hover:bg-[#b84200] hover:shadow-lg hover:shadow-brand-strong/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

  const buttonContent = (
    <>
      <span>Ver detalles</span>
      <svg
        className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </>
  );

  const img = (
    <>
      <Image src={p.images[0]} alt={p.title} fill priority={priority} sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
             className="object-cover transition duration-500 group-hover:scale-105" />
      <span className="absolute left-3 top-3 flex flex-wrap gap-1.5">
        {p.tags.includes("más vendido") && <span className="rounded-full bg-brand-strong px-2.5 py-1 text-xs font-semibold text-white">Más vendido</span>}
        {p.tags.includes("nuevo") && <span className="rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-white">Nuevo</span>}
      </span>
    </>
  );
  const imgCls = "relative block aspect-[4/5] overflow-hidden bg-peach/30";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(42,33,27,.35)]">
      {onQuickView
        ? <button onClick={() => onQuickView(p)} aria-label={`Vista rápida de ${p.title}`} className={imgCls}>{img}</button>
        : <Link href={href} aria-label={p.title} className={imgCls}>{img}</Link>}
      
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-ink/55">{p.category}</p>
        <h3 className="font-display text-base font-semibold leading-snug">
          <Link href={href} className="hover:text-brand-strong">{p.title}</Link>
        </h3>
        <p className="line-clamp-2 text-sm text-ink/70">{p.descriptionShort}</p>
        
        <div className="mt-1 flex items-center justify-between text-sm">
          <span aria-label={`Calificación ${p.rating} de 5`} className="text-ink/70">
            <span className="text-brand">★</span> {p.rating} <span className="text-ink/40">({p.reviews})</span>
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge.cls}`}>{badge.text}</span>
        </div>
        
        <p className="mt-auto pt-2 font-display text-2xl font-bold">{formatPrice(p.price, p.currency)}</p>
        
        {/* Botón único de Ver detalles */}
        {onQuickView ? (
          <button type="button" onClick={() => onQuickView(p)} className={btnStyle}>
            {buttonContent}
          </button>
        ) : (
          <Link href={href} className={btnStyle}>
            {buttonContent}
          </Link>
        )}
      </div>
    </article>
  );
}