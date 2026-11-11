"use client";
import { useMemo, useState } from "react";
import { queryProducts } from "@/lib/products";

interface Props { value: string; onChange: (v: string) => void }

export default function SearchBar({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const suggestions = useMemo(
    () => (value.trim().length >= 2 ? queryProducts({ q: value, limit: 6 }).items : []),
    [value],
  );
  const show = open && suggestions.length > 0;

  const pick = (title: string) => { onChange(title); setOpen(false); setActive(-1); };

  return (
    <div className="relative w-full">
      <label htmlFor="search" className="sr-only">Buscar productos</label>
      <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/50" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      <input
        id="search" type="search" autoComplete="off" value={value} placeholder="Busca: cable 12, contactor, LED…"
        role="combobox" aria-expanded={show} aria-controls="search-list" aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `opt-${active}` : undefined}
        onChange={(e) => { onChange(e.target.value); setOpen(true); setActive(-1); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, suggestions.length - 1)); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          else if (e.key === "Enter" && active >= 0) { e.preventDefault(); pick(suggestions[active].title); }
          else if (e.key === "Escape") setOpen(false);
        }}
        className="w-full rounded-full border border-ink/15 bg-white py-3 pl-12 pr-4 shadow-sm transition placeholder:text-ink/45 focus:border-brand-strong"
      />
      {show && (
        <ul id="search-list" role="listbox" className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
          {suggestions.map((p, i) => (
            <li key={p.id} id={`opt-${i}`} role="option" aria-selected={i === active}
                onMouseDown={() => pick(p.title)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm ${i === active ? "bg-peach/50" : "hover:bg-peach/30"}`}>
              <span>{p.title}</span>
              <span className="shrink-0 text-xs text-ink/50">{p.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
