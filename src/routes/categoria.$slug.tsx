import { createFileRoute, notFound } from "@tanstack/react-router";

import { SiteShell, Ticker, StoriesRow } from "@/components/site-shell";
import { getCategory } from "@/lib/vs-data";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Categoria indisponível" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.category.title} — Runway Wavy`;
    const d = `${loaderData.category.title}: ${loaderData.category.kicker} nos desfiles da Victoria's Secret.`;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();

  return (
    <SiteShell>
      <Ticker />
      <StoriesRow />

      <section className="px-4 py-8 text-center">
        <div className="border-y border-dashed border-gold/50 py-1 text-[11px] tracking-[0.6em] text-gold-soft">
          {category.kicker}
        </div>
        <h1 className="my-4 font-display text-5xl text-gold drop-shadow-lg md:text-7xl">
          {category.title}
        </h1>
        <div className="border-y border-dashed border-gold/50 py-1 text-[11px] tracking-[0.6em] text-gold-soft" />
      </section>

      <section className="grid grid-cols-2 gap-px bg-border md:grid-cols-3 xl:grid-cols-5">
        {category.nominees.map((n) => (
          <article key={n.name + n.rank} className="bg-background pb-6 text-center">
            <div className="py-3 text-[11px] font-bold tracking-[0.35em] text-gold-soft">
              {category.label}
            </div>
            <img
              src={n.img}
              alt={n.name}
              loading="lazy"
              width={640}
              height={1024}
              className="aspect-[2/3] w-full object-cover"
            />
            <h2 className="mt-4 font-display text-2xl">{n.name}</h2>
            <p className="mt-1 px-2 text-[11px] font-bold text-gold">{n.sub}</p>
            <div className="mx-auto mt-4 flex size-9 items-center justify-center rounded-full border border-foreground/60 text-xs font-bold">
              {n.rank}
            </div>
          </article>
        ))}
      </section>

      <footer className="bg-panel px-6 py-8 text-center text-xs text-muted-foreground">
        Runway Wavy — arquivo não oficial dedicado à história dos desfiles da Victoria&apos;s Secret.
      </footer>
    </SiteShell>
  );
}
