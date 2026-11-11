import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL, STORE_NAME } from "@/lib/config";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${STORE_NAME} | Material eléctrico y automatización`, template: `%s | ${STORE_NAME}` },
  description: "Material eléctrico y de automatización. Arma tu lista y cotiza directo por WhatsApp.",
  openGraph: { type: "website", locale: "es_MX", siteName: STORE_NAME },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
