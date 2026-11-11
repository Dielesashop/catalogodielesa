import { STORE_NAME } from "@/lib/config";
import { waLink } from "@/lib/whatsapp";

type SocialNetwork = "TikTok" | "Facebook" | "Instagram";

type SocialProfile = {
  network: SocialNetwork;
  href: string;
  description: string;
  followers: string;
};

const socialProfiles: SocialProfile[] = [
  {
    network: "TikTok",
    href: "https://www.tiktok.com/@dielesa.shop",
    description: "Videos e ideas",
    followers: "1.2 mil",
  },
  {
    network: "Facebook",
    href: "https://www.facebook.com/DielesaShop",
    description: "Novedades y comunidad",
    followers: "800",
  },
  {
    network: "Instagram",
    href: "https://www.instagram.com/dielesa_shop/",
    description: "Inspiración visual",
    followers: "600",
  },
];

const trust: [string, string][] = [
  ["Asesoría técnica", "Te ayudamos a elegir calibre y capacidad"],
  ["Cotización por volumen", "Mejor precio en compras grandes"],
  ["Envío a todo México", "Coordinamos la entrega contigo"],
];

const tiktokPath =
  "M19.59 6.69a4.79 4.79 0 0 1-3.77-4.1V2h-3.55v13.67a2.9 2.9 0 1 1-2.9-2.9c.3 0 .59.05.86.13V9.28a6.4 6.4 0 1 0 5.59 6.36V8.7a8.27 8.27 0 0 0 4.84 1.56V6.71c-.36 0-.72-.01-1.07-.02z";

function SocialIcon({ network }: { network: SocialNetwork }) {
  if (network === "TikTok") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={tiktokPath} />
      </svg>
    );
  }

  if (network === "Facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3-.1-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.1v3.2h2.9V21h3.4z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-peach/60 via-cream to-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-14 sm:px-6 md:grid-cols-[1.3fr_1fr] md:pb-14 md:pt-20">
        <div>
          <p className="mb-3 inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-strong">
            Material eléctrico, automatización y ferretero
          </p>

          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            Lo que tu instalación necesita,{" "}
            <span className="text-brand-strong">
              listo para cotizar hoy.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-lg text-ink/80">
            Cable, protecciones, control y herramienta de {STORE_NAME}. Arma tu
            lista y recibe atención directa por WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#catalogo"
              className="rounded-full bg-brand-strong px-6 py-3 font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-[#b84200]"
            >
              Ver catálogo
            </a>

            <a
              href={waLink(`Hola ${STORE_NAME}, quiero una cotización.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-ink px-6 py-3 font-semibold transition hover:bg-ink hover:text-white"
            >
              Pedir cotización
            </a>
          </div>
        </div>

        <div className="self-center">
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            {trust.map(([title, description]) => (
              <li
                key={title}
                className="rounded-2xl bg-white/80 p-4 shadow-card"
              >
                <p className="font-display font-semibold">{title}</p>
                <p className="text-sm text-ink/70">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section
        aria-labelledby="hero-social-heading"
        className="relative isolate w-full overflow-hidden border-y border-brand/15 bg-gradient-to-r from-white/45 via-peach/25 to-white/45 py-7 sm:py-9"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-brand/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-peach/60 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.85fr_2fr] lg:items-center lg:gap-10">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-strong">
              <span
                aria-hidden="true"
                className="h-2 w-2 animate-pulse rounded-full bg-brand shadow-sm shadow-brand/40"
              />
              Nuestra comunidad
            </p>

            <h2
              id="hero-social-heading"
              className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl"
            >
              También estamos{" "}
              <span className="text-brand-strong">en tus redes.</span>
            </h2>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/70">
              Síguenos para conocer novedades, ideas y todo lo que pasa en{" "}
              {STORE_NAME}.
            </p>
          </div>

          <div className="grid gap-1 sm:grid-cols-3 sm:gap-0">
            {socialProfiles.map((social) => (
              <a
                key={social.network}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visitar ${social.network}. ${social.followers} seguidores`}
                className="group relative flex items-center gap-3 overflow-hidden rounded-2xl px-3 py-4 transition duration-300 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:rounded-none sm:border-l sm:border-brand/15 sm:px-5 sm:py-5 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0 sm:hover:bg-transparent"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-5 -top-7 h-20 w-20 rounded-full bg-brand/0 blur-2xl transition-colors duration-300 group-hover:bg-brand/15"
                />

                <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-peach/60 text-brand-strong ring-1 ring-brand/10 transition duration-300 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-brand-strong group-hover:text-white group-hover:shadow-md">
                  <SocialIcon network={social.network} />
                </span>

                <span className="relative z-10 min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold text-ink sm:text-base">
                      {social.network}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-lg leading-none text-brand/50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-strong"
                    >
                      ↗
                    </span>
                  </span>

                  <span className="mt-0.5 block text-xs text-ink/65">
                    {social.description}
                  </span>

                  <span className="mt-2 flex items-baseline gap-1.5">
                    <span className="font-display text-sm font-bold text-brand-strong">
                      {social.followers}
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-ink/55">
                      seguidores
                    </span>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}