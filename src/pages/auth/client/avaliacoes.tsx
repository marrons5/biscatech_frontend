import { PageHeader, Card } from "@/components/custom/primitives";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { reviewService, type Review } from "@/services/reviewService";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < n ? "fill-primary text-primary" : "text-muted"}`} />
      ))}
    </div>
  );
}

const Avaliacoes = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await reviewService.list();
        if (res.data.success) setReviews(res.data.data);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0;

  return (
    <>
      <PageHeader title="Avaliações" subtitle="Avaliações que deste aos profissionais." />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-muted-foreground">Média dada</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-4xl font-semibold text-ink">{avg.toFixed(1)}</p>
            <Stars n={Math.round(avg)} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{reviews.length} avaliações</p>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">Pendentes</p>
          <p className="mt-2 text-4xl font-semibold text-ink">{reviews.length > 0 ? "—" : "0"}</p>
          <p className="mt-1 text-xs text-muted-foreground">Serviços por avaliar</p>
        </Card>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-muted-foreground">A carregar...</p>
      ) : (
        <div className="mt-8 space-y-3">
          {reviews.map((r) => (
            <Card key={r.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">?</div>
                  <div>
                    <p className="font-medium text-ink">Avaliação</p>
                    <p className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString("pt-AO")}</p>
                  </div>
                </div>
                <Stars n={r.rating} />
              </div>
              {r.comment && <p className="mt-4 text-sm text-ink">"{r.comment}"</p>}
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export { Avaliacoes };
