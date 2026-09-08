import { Link } from "@tanstack/react-router";
import { Home, Film, Star, Music, Trophy, Calendar, Sparkle, Crown } from "lucide-react";
import type { ReactNode } from "react";

import { categories } from "@/lib/vs-data";

const nav = [
  { icon: Home, label: "Home", to: "/" as const },
  { icon: Film, label: "Desfiles", slug: "melhor-desfile" },
  { icon: Crown, label: "Décadas", slug: "decadas" },
  { icon: Star, label: "Angels", slug: "melhor-angel" },
  { icon: Sparkle, label: "Abertura", slug: "melhor-abertura" },
  { icon: Music, label: "Trilha", slug: "melhor-trilha" },
  { icon: Trophy, label: "Fantasy Bra", slug: "fantasy-bra" },
  { icon: Calendar, label: "Coleções", slug: "colecoes" },
];

const ticker = [
  { pos: "1º", pct: "71%", cat: "MELHOR ANGEL", name: "ADRIANA LIMA", sub: "1999 — 2018" },
  { pos: "2º", pct: "65%", cat: "MELHOR ABERTURA", name: "GISELE BÜNDCHEN", sub: '"SEXY SANTA" 2000' },
  { pos: "3º", pct: "60%", cat: "MELHOR TRILHA", name: "RIHANNA", sub: '"DIAMONDS" 2012' },
  { pos: "4º", pct: "58%", cat: "FANTASY BRA", name: "HEIDI KLUM", sub: '"RED HOT" 2001' },
  { pos: "5º", pct: "57%", cat: "MELHOR RETORNO", name: "ASHLEY GRAHAM", sub: "SHOW 2024" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="fixed inset-x-0 top-0 z-30 flex h-20 items-center gap-4 bg-primary px-4 text-primary-foreground">
        <div className="hidden items-center gap-3 md:flex">
          <span className="rounded-full border-2 border-primary-foreground px-3 py-1 text-[11px] font-bold tracking-widest">
            FAÇA SUAS APOSTAS:
          </span>
          <span className="text-xs font-bold tracking-widest">ENTRAR</span>
          <span className="opacity-50">|</span>
          <span className="text-xs font-bold tracking-widest">REGISTRAR</span>
        </div>
        <Link to="/" className="mx-auto text-center leading-none">
          <div className="font-display text-3xl tracking-tight md:text-4xl">RUNWAY WAVY</div>
          <div className="text-[10px] font-bold tracking-[0.5em] text-accent-foreground/70">
            VICTORIA&apos;S SECRET 2026
          </div>
        </Link>
        <input
          placeholder="Pesquisar desfiles, modelos..."
          className="hidden w-72 rounded-full bg-card px-4 py-2 text-sm text-card-foreground placeholder:text-muted-foreground lg:block"
        />
      </header>

      <aside className="fixed left-0 top-20 bottom-0 z-20 hidden w-[86px] flex-col overflow-y-auto border-r-2 border-accent/40 bg-sidebar py-3 md:flex">
        {nav.map(({ icon: Icon, label, to, slug }) =>
          to ? (
            <Link
              key={label}
              to={to}
              className="group flex flex-col items-center gap-2 border-b border-accent/20 px-2 py-4 text-center transition-all duration-300 hover:bg-pink-500/10"
              activeProps={{ className: "bg-pink-500/15 shadow-[inset_3px_0_0_0_rgba(236,72,153,0.8)]" }}
            >
              <Icon className="size-6 text-gold transition-colors duration-300 group-hover:text-pink-300" strokeWidth={2.2} />
              <span className="text-[10px] font-semibold leading-tight text-gold-soft transition-colors duration-300 group-hover:text-pink-300">{label}</span>
            </Link>
          ) : (
            <Link
              key={label}
              to="/categoria/$slug"
              params={{ slug: slug! }}
              className="group flex flex-col items-center gap-2 border-b border-accent/20 px-2 py-4 text-center transition-all duration-300 hover:bg-pink-500/10"
              activeProps={{ className: "bg-pink-500/15 shadow-[inset_3px_0_0_0_rgba(236,72,153,0.8)]" }}
            >
              <Icon className="size-6 text-gold transition-colors duration-300 group-hover:text-pink-300" strokeWidth={2.2} />
              <span className="text-[10px] font-semibold leading-tight text-gold-soft transition-colors duration-300 group-hover:text-pink-300">{label}</span>
            </Link>
          ),
        )}
      </aside>

      <main className="pt-20 md:pl-[86px]">{children}</main>
    </div>
  );
}

export function StoriesRow() {
  return (
    <div className="flex gap-5 overflow-x-auto border-b-2 border-gold/30 bg-panel px-5 py-4">
      {categories.map((c) => (
        <Link
          key={c.slug}
          to="/categoria/$slug"
          params={{ slug: c.slug }}
          className="group flex w-24 shrink-0 flex-col items-center gap-2 text-center"
        >
          <span className="rounded-full bg-primary p-[3px] transition-transform group-hover:scale-105">
            <img
              src={c.circle}
              alt={c.title}
              loading="lazy"
              width={640}
              height={640}
              className="size-20 rounded-full border-2 border-panel object-cover"
            />
          </span>
          <span className="whitespace-pre-line text-[10px] font-bold leading-tight tracking-wider text-gold-soft">
            {c.short}
          </span>
        </Link>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="flex items-stretch overflow-x-auto border-b-2 border-gold/30 bg-panel">
      <div className="flex shrink-0 items-center gap-3 border-r border-gold/30 px-4 py-3">
        <Crown className="size-7 text-gold" />
        <div>
          <div className="font-display text-sm text-gold">QUEM É A MAIOR ANGEL?</div>
          <div className="text-[10px] tracking-widest text-muted-foreground">
            VOTAÇÃO POPULAR (GLOBAL)
          </div>
        </div>
      </div>
      {ticker.map((t) => (
        <div key={t.pos} className="flex shrink-0 items-center gap-3 border-r border-gold/20 px-4 py-3">
          <span className="text-xs font-bold text-gold">{t.pos}</span>
          <span className="font-display text-2xl text-primary">{t.pct}</span>
          <div>
            <span className="inline-block bg-gold px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-accent-foreground">
              {t.cat}
            </span>
            <div className="font-display text-sm">{t.name}</div>
            <div className="text-[10px] text-muted-foreground">{t.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
