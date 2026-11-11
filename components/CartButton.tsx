"use client";
import { useCart } from "@/components/CartProvider";

export default function CartButton() {
  const { count, ready, setOpen } = useCart();
  const n = ready ? count : 0;
  return (
    <button onClick={() => setOpen(true)} aria-label={`Abrir carrito, ${n} ${n === 1 ? "producto" : "productos"}`}
            className="relative grid h-10 w-10 place-items-center rounded-full ring-1 ring-ink/15 transition hover:bg-peach/50">
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6" /><circle cx="9" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /></svg>
      {n > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-strong px-1 text-xs font-bold text-white">{n}</span>}
    </button>
  );
}
