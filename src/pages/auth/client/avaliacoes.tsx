import { Star, ThumbsUp } from "lucide-react";
import { PageHeader } from "@/components/custom/pageHeader";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  pro: string;
  service: string;
  initials: string;
  rating: number;
  date: string;
  comment: string;
  helpful?: number;
}

const myReviews: Review[] = [
  {
    id: "1",
    pro: "João Mateus",
    service: "Canalizador",
    initials: "JM",
    rating: 5,
    date: "12 Abr 2026",
    comment:
      "Excelente trabalho! Chegou a horas, resolveu o problema rapidamente e deixou tudo limpo. Recomendo.",
    helpful: 8,
  },
  {
    id: "2",
    pro: "Pedro Cunha",
    service: "Eletricista",
    initials: "PC",
    rating: 4,
    date: "5 Abr 2026",
    comment:
      "Bom serviço, profissional e atencioso. Demorou um pouco mais do que o previsto.",
    helpful: 3,
  },
  {
    id: "3",
    pro: "Aline Costa",
    service: "Eletricista",
    initials: "AC",
    rating: 5,
    date: "28 Mar 2026",
    comment:
      "Super profissional, explicou tudo o que estava a fazer. Voltarei a chamar com certeza!",
    helpful: 12,
  },
];

const distribution = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 16 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

const Stars = ({ value, size = 14 }: { value: number; size?: number }) => (
  <div className="inline-flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        style={{ width: size, height: size }}
        className={cn(
          i <= value ? "fill-warning text-warning" : "text-muted-foreground/30",
        )}
      />
    ))}
  </div>
);

const Avaliacoes = () => {
  const total = myReviews.length;
  const avg = (myReviews.reduce((a, r) => a + r.rating, 0) / total).toFixed(1);

  return (
    <div className="min-h-screen bg-background pb-12">
      <main className="container max-w-6xl px-4 lg:px-8 pt-6 lg:pt-10">
        <PageHeader
          title="Avaliações"
          subtitle="O que dizem sobre os teus serviços"
        />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <section className="lg:col-span-2">
            <h2 className="text-sm font-bold mb-4 text-muted-foreground uppercase tracking-wider">
              Recentes
            </h2>
            <div className="space-y-3">
              {myReviews.map((r) => (
                <article
                  key={r.id}
                  className="rounded-3xl bg-card border border-border/60 shadow-card p-5">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                      {r.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-bold truncate">{r.pro}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {r.service} • {r.date}
                          </p>
                        </div>
                        <Stars value={r.rating} />
                      </div>
                      <p className="text-sm text-foreground/85 mt-2 leading-relaxed">
                        {r.comment}
                      </p>
                      {r.helpful !== undefined && (
                        <button className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors">
                          <ThumbsUp className="h-3 w-3" /> Útil ({r.helpful})
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="relative overflow-hidden rounded-3xl bg-primary-gradient p-6 shadow-glow text-primary-foreground">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
              <div className="relative">
                <p className="text-6xl font-extrabold leading-none">{avg}</p>
                <Stars value={Math.round(parseFloat(avg))} size={18} />
                <p className="text-xs text-primary-foreground/85 mt-1">
                  {total} avaliações
                </p>

                <div className="mt-5 space-y-1.5">
                  {distribution.map((d) => (
                    <div
                      key={d.stars}
                      className="flex items-center gap-2 text-[11px]">
                      <span className="w-3 font-bold">{d.stars}</span>
                      <Star className="h-3 w-3 fill-current" />
                      <div className="flex-1 h-1.5 rounded-full bg-white/25 overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full"
                          style={{ width: `${d.pct}%` }}
                        />
                      </div>
                      <span className="w-7 text-right text-primary-foreground/80">
                        {d.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export  {Avaliacoes};
