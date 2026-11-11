import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...products.map((p) => ({ url: `${SITE_URL}/producto/${p.slug}`, lastModified: p.createdAt, priority: 0.7 })),
  ];
}
