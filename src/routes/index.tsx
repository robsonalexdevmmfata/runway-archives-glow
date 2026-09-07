import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteShell, Ticker, StoriesRow } from "@/components/site-shell";
import heroRunway from "@/assets/hero-runway.jpg";
import show60s from "@/assets/show-1960s.jpg";
import show90s from "@/assets/show-1990s.jpg";
import show00s from "@/assets/show-2000s.jpg";
import show10s from "@/assets/show-2010s.jpg";
import show2026 from "@/assets/show-2026.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Melhor Desfile — Runway Wavy | Victoria's Secret 1963–2026" },
      {
        name: "description",
        content:
          "Ranking dos desfiles da Victoria's Secret de 1963 a 2026 com modelos, asas, trilha sonora e momentos históricos.",
      },
      { property: "og:title", content: "Melhor Desfile — Runway Wavy" },
      {
        property: "og:description",
        content: "Os desfiles mais icônicos da Victoria's Secret, década por década.",
      },
    ],
  }),
  component: Index,
});

const shows = [
  {
    img: show60s,
    era: "1963 — 1979",
    title: "A ERA DAS VITRINES",
    crew: "Roy Raymond • Primeiras apresentações em loja",
    models: "Modelos de catálogo • Sem passarela oficial",
    music: "Jazz suave e bossa instrumental ao vivo",
    rank: "1º",
    tag: "ARQUIVO",
    slug: "decadas",
  },
  {
    img: show90s,
    era: "1995 — 1999",
    title: "NASCEM AS ANGELS",
    crew: "Plaza Hotel • Cannes • Primeiro webcast",
    models: "Stephanie Seymour, Tyra Banks, Karen Mulder, Helena Christensen",
    music: "Trilha pop-rock dos anos 90 • Primeiras asas de pena",
    rank: "2º",
    tag: "HISTÓRICO",
    slug: "melhor-angel",
  },
  {
    img: show00s,
    era: "2000 — 2009",
    title: "OS ANOS DE OURO",
    crew: "Cannes • Nova York • Miami",
    models: "Gisele Bündchen, Heidi Klum, Adriana Lima, Alessandra Ambrosio, Karolína Kurková",
    music: "Sting, Ricky Martin, Justin Timberlake, Seal",
    rank: "3º",
    tag: "CULTUAL",
    slug: "melhor-abertura",
  },
  {
    img: show10s,
    era: "2010 — 2018",
    title: "A ERA ARENA",
    crew: "Londres • Paris • Xangai",
    models: "Candice Swanepoel, Behati Prinsloo, Lily Aldridge, Taylor Hill, Kendall Jenner",
    music: "Rihanna, Taylor Swift, The Weeknd, Lady Gaga, Bruno Mars",
    rank: "4º",
    tag: "GLOBAL",
    slug: "melhor-trilha",
  },
  {
    img: show2026,
    era: "2024 — 2026",
    title: "O GRANDE RETORNO",
    crew: "Brooklyn • Direção criativa renovada",
    models: "Ashley Graham, Paloma Elsesser, Gigi Hadid, Alex Consani, Valentina Sampaio",
    music: "Cher, Tyla, Lisa, K-pop e R&B ao vivo",
    rank: "5º",
    tag: "2026",
    slug: "melhor-desfile",
  },
];

const stats = [
  { n: "31", label: "DESFILES REALIZADOS" },
  { n: "63", label: "ANOS DE HISTÓRIA" },
  { n: "42", label: "ANGELS OFICIAIS" },
  { n: "28", label: "FANTASY BRAS" },
];

function Index() {
  return (
    <SiteShell>
      <Ticker />
      <StoriesRow />

      <section className="relative overflow-hidden px-4 py-10 text-center">
        <img
          src={heroRunway}
          alt="Passarela de desfile de lingerie iluminada em rosa"
          width={1600}
          height={900}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative">
          <div className="border-y border-dashed border-gold/50 py-1 text-[11px] tracking-[0.6em] text-gold-soft">
            VICTORIA&apos;S SECRET • 1963 — 2026
          </div>
          <h1 className="my-4 font-display text-5xl text-gold drop-shadow-lg md:text-7xl">
            MELHOR DESFILE
          </h1>
          <div className="border-y border-dashed border-gold/50 py-1 text-[11px] tracking-[0.6em] text-gold-soft">
            RANKING DA HISTÓRIA
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 px-4 pb-12 md:grid-cols-3 xl:grid-cols-5">
        {shows.map((s) => (
          <Link
            key={s.title}
            to="/categoria/$slug"
            params={{ slug: s.slug }}
            className="flex flex-col text-center transition-transform hover:-translate-y-1"
          >
            <div className="text-[11px] font-bold tracking-[0.35em] text-gold-soft">{s.tag}</div>
            <div className="mt-2 border-2 border-dashed border-gold/60 p-2">
              <img
                src={s.img}
                alt={`Pôster do desfile ${s.title}`}
                loading="lazy"
                width={700}
                height={1000}
                className="aspect-[7/10] w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col bg-card px-3 py-4">
              <div className="text-[11px] tracking-[0.3em] text-primary">{s.era}</div>
              <h2 className="mt-1 font-display text-xl leading-tight">{s.title}</h2>
              <p className="mt-1 text-[11px] font-semibold text-gold">{s.crew}</p>
              <p className="mt-3 text-[11px] leading-snug text-muted-foreground">
                <span className="font-bold text-foreground">MODELOS: </span>
                {s.models}
              </p>
              <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
                <span className="font-bold text-foreground">MÚSICA: </span>
                {s.music}
              </p>
              <div className="mx-auto mt-4 flex size-9 items-center justify-center rounded-full border border-gold text-xs font-bold text-gold">
                {s.rank}
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-2 gap-4 bg-primary px-6 py-8 text-primary-foreground md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-4xl">{s.n}</div>
            <div className="text-[10px] font-bold tracking-[0.25em]">{s.label}</div>
          </div>
        ))}
      </section>

      <footer className="bg-panel px-6 py-8 text-center text-xs text-muted-foreground">
        Runway Wavy — arquivo não oficial dedicado à história dos desfiles da Victoria&apos;s Secret.
      </footer>
    </SiteShell>
  );
}
