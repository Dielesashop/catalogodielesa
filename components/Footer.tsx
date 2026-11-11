import { STORE_NAME } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-peach/60 bg-white/50 py-8 text-center text-sm text-ink/70">
      <p>© {new Date().getFullYear()} {STORE_NAME}. Precios y existencias sujetos a confirmación por WhatsApp.</p>
    </footer>
  );
}
