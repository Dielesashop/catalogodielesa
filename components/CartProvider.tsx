"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { cartReducer, cartTotals, lineKey, type CartLine } from "@/lib/cart";
import { getProductById } from "@/lib/products";
import type { Product } from "@/types/product";

const STORAGE_KEY = "dielesa-cart-v1";

interface CartItem { key: string; line: CartLine; product: Product }
interface CartCtx {
  items: CartItem[]; count: number; total: number; ready: boolean;
  open: boolean; setOpen: (v: boolean) => void;
  add: (p: Product, qty?: number, options?: Record<string, string>) => void;
  setQty: (key: string, qty: number) => void; remove: (key: string) => void; clear: () => void;
}
const Ctx = createContext<CartCtx | null>(null);

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return c;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, []);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Cargar desde localStorage (solo en el cliente, tras montar)
  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(parsed)) {
        const valid = parsed.filter(
          (l): l is CartLine => l && typeof l.id === "string" && Number.isFinite(l.qty) && l.qty > 0 && !!getProductById(l.id),
        );
        dispatch({ type: "hydrate", lines: valid });
      }
    } catch { /* storage bloqueado o JSON dañado: arrancamos vacío */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lines)); } catch { /* sin espacio o modo privado */ }
  }, [lines, ready]);

  const add = useCallback((p: Product, qty = 1, options?: Record<string, string>) => {
    dispatch({ type: "add", line: { id: p.id, qty, options } });
    setOpen(true);
  }, []);

  const value = useMemo<CartCtx>(() => {
    const items = lines.flatMap((line) => {
      const product = getProductById(line.id);
      return product ? [{ key: lineKey(line), line, product }] : [];
    });
    const { count, total } = cartTotals(lines, (id) => getProductById(id)?.price);
    return {
      items, count, total, ready, open, setOpen, add,
      setQty: (key, qty) => dispatch({ type: "setQty", key, qty }),
      remove: (key) => dispatch({ type: "remove", key }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [lines, ready, open, add]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
