import { PageHeader, Card } from "@/components/custom/primitives";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { reviewService, type Review } from "@/services/reviewService";

export default function AdminReviews() {
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

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <>
      <PageHeader title="Avaliações" subtitle="Todas as avaliações da plataforma." />
      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma avaliação.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((v) => (
            <Card key={v.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="mt-2 text-sm text-ink">{v.comment ? `"${v.comment}"` : "Sem comentário"}</p>
                  {v.tags?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {v.tags.map((t: string) => <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{t}</span>)}
                    </div>
                  )}
                </div>
                <div className="flex gap-0.5">{Array.from({length:5}).map((_,k)=><Star key={k} className={`h-4 w-4 ${k<v.rating?"fill-primary text-primary":"text-muted"}`} />)}</div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{new Date(v.date).toLocaleDateString("pt-AO")}</p>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
