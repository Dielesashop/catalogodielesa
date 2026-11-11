import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cream: "#f8f8f4",       // fondo
        brand: {
          DEFAULT: "#ff6d1f",   // decoración, badges, hover
          strong: "#d94f00",    // botones con texto blanco (contraste AA)
        },
        peach: "#f5c9a8",       // fondos de sección y chips
        ink: "#2a211b",         // texto principal
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px -12px rgba(42,33,27,.25)",
      },
    },
  },
  plugins: [],
};
export default config;
