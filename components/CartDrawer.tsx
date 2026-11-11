"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/CartProvider";
import QtyStepper from "@/components/QtyStepper";
import { formatPrice } from "@/lib/format";

// ─── ⚠️ CAMBIA ESTE NÚMERO POR EL TUYO ───
// Formato: código de país + número, sin espacios ni signos.
// Ejemplo México: 5215512345678
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || " ";
export default function CartDrawer() {
  const { open, setOpen, items, count, total, setQty, remove, clear } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [open, setOpen]);

  // ─── Función que arma el mensaje y abre WhatsApp ───
  const sendToWhatsApp = () => {
    if (items.length === 0) return;

    const currency = items[0].product.currency;

    // Encabezado
    const header = `¡Hola! 👋 Me interesa cotizar los siguientes productos:\n\n`;

    // Lista de productos
    const productList = items
      .map(({ line, product: p }, i) => {
        const subtotal = formatPrice(p.price * line.qty, currency);
        const unitPrice = formatPrice(p.price, currency);
        const options = line.options
          ? ` (${Object.entries(line.options).map(([k, v]) => `${k}: ${v}`).join(", ")})`
          : "";
        return `${i + 1}. *${p.title}*${options}\n   SKU: ${p.sku} | Cant: ${line.qty} | ${unitPrice} c/u → ${subtotal}`;
      })
      .join("\n\n");

    // Total
    const footer = `\n\n───────────────\n💰 *Total estimado: ${formatPrice(total, currency)}*\n\n¿Podrían confirmarme precios y disponibilidad? ¡Gracias!`;

    // Mensaje completo codificado para URL
    const message = encodeURIComponent(header + productList + footer);

    // Abrir WhatsApp en nueva pestaña
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  if (!open) return null;
  const close = () => setOpen(false);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/50" onClick={close} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className="animate-slide-in absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-peach/60 px-5 py-4">
          <h2 className="font-display text-xl font-bold">
            Tu pedido {count > 0 && <span className="text-ink/50">({count})</span>}
          </h2>
          <button
            ref={closeRef}
            onClick={close}
            aria-label="Cerrar carrito"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-peach/60"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="grid flex-1 place-content-center gap-3 px-8 text-center">
            <p className="font-display text-lg font-semibold">Tu carrito está vacío</p>
            <p className="text-sm text-ink/70">
              Agrega productos y arma tu lista para cotizar por WhatsApp.
            </p>
            <button
              onClick={close}
              className="mx-auto rounded-full bg-brand-strong px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#b84200]"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-peach/60 overflow-y-auto px-5">
              {items.map(({ key, line, product: p }) => (
                <li key={key} className="flex gap-3 py-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-peach/30">
                    <Image src={p.images[0]} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <Link
                      href={`/producto/${p.slug}`}
                      onClick={close}
                      className="font-display text-sm font-semibold leading-snug hover:text-brand-strong"
                    >
                      {p.title}
                    </Link>
                    {line.options && (
                      <p className="text-xs text-ink/60">
                        {Object.entries(line.options)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" · ")}
                      </p>
                    )}
                    <p className="text-xs text-ink/60">
                      {formatPrice(p.price, p.currency)} c/u · {p.sku}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <QtyStepper
                        value={line.qty}
                        onChange={(n) => setQty(key, n)}
                        label={`Cantidad de ${p.title}`}
                      />
                      <p className="font-display font-bold">
                        {formatPrice(p.price * line.qty, p.currency)}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(key)}
                      className="w-fit text-xs text-ink/60 underline hover:text-brand-strong"
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-peach/60 bg-white/60 px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-ink/70">Total Neto</span>
                <span className="font-display text-2xl font-bold">
                  {formatPrice(total, items[0].product.currency)}
                </span>
              </div>
              <p className="text-xs text-ink/60">
                Existencias y envio se confirman por WhatsApp.
              </p>
              <div className="flex gap-2">
                {/* ─── ✅ BOTÓN CAMBIADO: ahora envía a WhatsApp ─── */}
                <button
                  onClick={sendToWhatsApp}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Seguir mi cotización
                </button>
                <button
                  onClick={clear}
                  className="rounded-full px-4 py-2.5 text-sm text-ink/60 underline hover:text-brand-strong"
                >
                  Vaciar
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}