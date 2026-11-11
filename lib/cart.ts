// Lógica pura del carrito (sin React ni localStorage) para poder probarla fácil.
export interface CartLine {
  id: string; // id del producto
  qty: number;
  options?: Record<string, string>;
}

export const MAX_QTY = 99;

export const lineKey = (l: Pick<CartLine, "id" | "options">) =>
  `${l.id}|${JSON.stringify(Object.entries(l.options ?? {}).sort())}`;

export type CartAction =
  | { type: "add"; line: CartLine }
  | { type: "setQty"; key: string; qty: number }
  | { type: "remove"; key: string }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const clamp = (n: number) => Math.min(MAX_QTY, Math.max(0, Math.floor(n)));

export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "add": {
      const key = lineKey(action.line);
      const qty = clamp(action.line.qty);
      if (qty === 0) return state;
      return state.some((l) => lineKey(l) === key)
        ? state.map((l) => (lineKey(l) === key ? { ...l, qty: clamp(l.qty + qty) } : l))
        : [...state, { ...action.line, qty }];
    }
    case "setQty":
      return state
        .map((l) => (lineKey(l) === action.key ? { ...l, qty: clamp(action.qty) } : l))
        .filter((l) => l.qty > 0);
    case "remove":
      return state.filter((l) => lineKey(l) !== action.key);
    case "clear":
      return [];
    case "hydrate":
      return action.lines;
  }
}

export function cartTotals(lines: CartLine[], priceOf: (id: string) => number | undefined) {
  return lines.reduce(
    (acc, l) => ({ count: acc.count + l.qty, total: acc.total + l.qty * (priceOf(l.id) ?? 0) }),
    { count: 0, total: 0 },
  );
}
