import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { SiteShell, Ticker, StoriesRow } from "@/components/site-shell";
import { getCategory, type Nominee } from "@/lib/vs-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);

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
          <article 
            key={n.name + n.rank} 
            className="bg-background pb-6 text-center cursor-pointer transition-all duration-300 hover:bg-pink-500/10 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] group"
            onClick={() => setSelectedNominee(n)}
          >
            <div className="py-3 text-[11px] font-bold tracking-[0.35em] text-gold-soft group-hover:text-pink-300 transition-colors">
              {category.label}
            </div>
            <img
              src={n.img}
              alt={n.name}
              loading="lazy"
              width={640}
              height={1024}
              className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <h2 className="mt-4 font-display text-2xl group-hover:text-pink-300 transition-colors">{n.name}</h2>
            <p className="mt-1 px-2 text-[11px] font-bold text-gold group-hover:text-pink-400 transition-colors">{n.sub}</p>
            <div className="mx-auto mt-4 flex size-9 items-center justify-center rounded-full border border-foreground/60 text-xs font-bold group-hover:border-pink-400 group-hover:text-pink-400 group-hover:shadow-[0_0_10px_rgba(236,72,153,0.5)] transition-all">
              {n.rank}
            </div>
          </article>
        ))}
      </section>

      <Dialog open={!!selectedNominee} onOpenChange={(open) => !open && setSelectedNominee(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-pink-500/30">
          {selectedNominee && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-4xl text-gold text-center">
                  {selectedNominee.name}
                </DialogTitle>
                <DialogDescription className="text-pink-300 text-center text-base">
                  {selectedNominee.sub}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                {/* Imagem Principal */}
                <div className="relative">
                  <img
                    src={selectedNominee.img}
                    alt={selectedNominee.name}
                    className="w-full max-h-[500px] object-cover rounded-lg shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                  />
                  <div className="absolute top-4 right-4 flex size-12 items-center justify-center rounded-full border-2 border-pink-400 bg-background/80 backdrop-blur-sm text-xl font-bold text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                    {selectedNominee.rank}
                  </div>
                </div>

                {/* Vídeo da Runway (se disponível) */}
                {selectedNominee.videoUrl && (
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl text-gold-soft text-center">
                      Vídeo da Runway
                    </h3>
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                      <iframe
                        src={selectedNominee.videoUrl}
                        title={`${selectedNominee.name} - Runway Video`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {/* Detalhes Adicionais */}
                {selectedNominee.details && (
                  <div className="bg-panel p-6 rounded-lg border border-pink-500/20">
                    <h3 className="font-display text-2xl text-gold-soft mb-3">Detalhes</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedNominee.details}</p>
                  </div>
                )}

                {/* Galeria de Imagens Adicionais */}
                {selectedNominee.gallery && selectedNominee.gallery.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl text-gold-soft text-center">Galeria</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedNominee.gallery.map((imgUrl, idx) => (
                        <img
                          key={idx}
                          src={imgUrl}
                          alt={`${selectedNominee.name} - Imagem ${idx + 1}`}
                          className="aspect-[3/4] w-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(236,72,153,0.2)]"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Tag do Label */}
                <div className="text-center py-4 border-t border-pink-500/20">
                  <span className="text-[11px] font-bold tracking-[0.35em] text-pink-300">
                    {category.label}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <footer className="bg-panel px-6 py-8 text-center text-xs text-muted-foreground">
        Runway Wavy — arquivo não oficial dedicado à história dos desfiles da Victoria&apos;s Secret.
      </footer>
    </SiteShell>
  );
}
