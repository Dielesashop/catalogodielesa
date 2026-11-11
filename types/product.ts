export interface Product {
  id: string;
  title: string;
  slug: string;
  descriptionShort: string;
  descriptionLong: string;
  price: number;
  currency: "MXN" | "USD";
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  sku: string;
  rating: number;
  reviews: number; // sirve para ordenar por popularidad
  createdAt: string; // ISO
  /** Opciones elegibles, p. ej. { "Color": ["Negro","Rojo"] } */
  attributes?: Record<string, string[]>;
}
