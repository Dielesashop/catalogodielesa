import { NextRequest, NextResponse } from "next/server";
import { queryProducts, type SortKey } from "@/lib/products";

const num = (v: string | null) => (v !== null && v !== "" && !Number.isNaN(+v) ? +v : undefined);

// GET /api/products?q=&category=&minPrice=&maxPrice=&sort=&page=&limit=
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const result = queryProducts({
    q: sp.get("q") ?? undefined,
    category: sp.get("category") ?? undefined,
    minPrice: num(sp.get("minPrice")),
    maxPrice: num(sp.get("maxPrice")),
    sort: (sp.get("sort") as SortKey) ?? undefined,
    page: Math.max(1, num(sp.get("page")) ?? 1),
    limit: Math.min(50, Math.max(1, num(sp.get("limit")) ?? 12)),
  });
  return NextResponse.json(result, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
