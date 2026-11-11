import Image from "next/image";
import Link from "next/link";
import CartButton from "@/components/CartButton";
import { STORE_NAME } from "@/lib/config";
import { waLink } from "@/lib/whatsapp";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-peach/60 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
          {/* Icono de la marca: el mismo favicon.ico de app/ */}
          <Image
            src="/favicon.ico"
            alt={`Logo de ${STORE_NAME}`}
            width={32}
            height={32}
            unoptimized
            priority
            className="h-8 w-8 rounded-lg shadow-sm ring-1 ring-ink/10"
          />
          {STORE_NAME}
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium sm:gap-3">
          <Link href="/#catalogo" className="hidden rounded-md px-3 py-2 hover:bg-peach/40 sm:block">Catálogo</Link>
          <CartButton />
          <a href={waLink(`Hola ${STORE_NAME}, necesito asesoría con un producto.`)} target="_blank" rel="noopener noreferrer"
             className="rounded-full bg-ink px-4 py-2 text-white transition hover:bg-brand-strong">
            <span className="hidden sm:inline">Hablar por </span>WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
