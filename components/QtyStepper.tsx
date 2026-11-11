"use client";
import { MAX_QTY } from "@/lib/cart";

export default function QtyStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  const btn = "grid h-9 w-9 place-items-center rounded-full text-lg transition hover:bg-peach/60 disabled:opacity-40";
  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-full bg-white ring-1 ring-ink/15">
      <button type="button" className={btn} aria-label="Quitar una unidad" onClick={() => onChange(value - 1)}>−</button>
      <span aria-live="polite" className="w-8 text-center text-sm font-semibold">{value}</span>
      <button type="button" className={btn} aria-label="Agregar una unidad" disabled={value >= MAX_QTY} onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}
