import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyBox from "@/components/BuyBox";
import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import { SITE_URL } from "@/lib/config";
import { getProductBySlug, getRelated, products } from "@/lib/products";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.descriptionShort}. Cotiza por WhatsApp.`,
    alternates: { canonical: `/producto/${p.slug}` },
    openGraph: { title: p.title, description: p.descriptionShort, url: `/producto/${p.slug}`, images: [{ url: p.images[0], width: 800, height: 1000, alt: p.title }] },
    twitter: { card: "summary_large_image", title: p.title, description: p.descriptionShort, images: [p.images[0]] },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();
  const related = getRelated(p);

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product", name: p.title, sku: p.sku,
    description: p.descriptionShort, image: p.images, category: p.category,
    aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews },
    offers: {
      "@type": "Offer", price: p.price, priceCurrency: p.currency, url: `${SITE_URL}/producto/${p.slug}`,
      availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav aria-label="Migas de pan" className="mb-6 text-sm text-ink/60">
        <Link href="/" className="hover:text-brand-strong">Inicio</Link> / <Link href="/#catalogo" className="hover:text-brand-strong">{p.category}</Link> / <span className="text-ink">{p.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <Gallery images={p.images} title={p.title} priority />
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/55">{p.category} · SKU {p.sku}</p>
          <h1 className="font-display text-3xl font-bold leading-tight">{p.title}</h1>
          <p className="text-sm text-ink/70"><span className="text-brand">★</span> {p.rating} · {p.reviews} reseñas</p>
          <p className="text-ink/80">{p.descriptionShort}.</p>
          <BuyBox product={p} />
          <ul className="mt-2 grid gap-2 rounded-2xl bg-peach/40 p-4 text-sm">
            <li>✓ Asesoría técnica antes de comprar</li>
            <li>✓ Cotización por volumen</li>
            <li>✓ Envío a todo México </li>
          </ul>
        </div>
      </div>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-xl font-bold">Descripción</h2>
        <p className="mt-2 leading-relaxed text-ink/80">{p.descriptionLong}</p>
        <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded-full bg-white px-3 py-1 text-xs ring-1 ring-ink/15">{t}</span>)}</div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">También te puede gustar</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => <ProductCard key={r.id} product={r} />)}
        </div>
      </section>
    </main>
  );
}
