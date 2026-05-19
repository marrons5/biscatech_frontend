import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/custom/pageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const tags = ["Pontual", "Profissional", "Limpo", "Bom preço", "Recomendaria"];

const Rate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [chosen, setChosen] = useState<string[]>([]);

  const toggle = (t: string) =>
    setChosen((c) => (c.includes(t) ? c.filter((x) => x !== t) : [...c, t]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      toast("Escolhe uma avaliação");
      return;
    }
    toast("Obrigado!", {
      description: "A tua avaliação ajuda a comunidade.",
    });
    navigate("/app/pedidos");
  };

  const labels = ["", "Mau", "Fraco", "Ok", "Bom", "Excelente"];

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <main className="container max-w-6xl px-4 lg:px-8 pt-6 lg:pt-10">
        <PageHeader title="Avaliar" subtitle={`Pedido #${id}`} back />
        <form onSubmit={submit} className="space-y-5">
          {/* Pro card */}
          <section className="rounded-3xl bg-card border border-border/60 shadow-card p-5 text-center">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-hero flex items-center justify-center text-primary-foreground font-extrabold text-xl shadow-glow">
              JM
            </div>
            <p className="font-bold mt-3">João Mateus</p>
            <p className="text-xs text-muted-foreground">
              Canalizador · Talatona
            </p>

            <div className="flex justify-center gap-2 mt-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(i)}
                  className="active:scale-90 transition-transform">
                  <Star
                    className={cn(
                      "h-10 w-10 transition-colors",
                      i <= (hover || rating)
                        ? "fill-warning text-warning"
                        : "text-muted-foreground/30",
                    )}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm font-bold mt-2 h-5">
              {labels[hover || rating]}
            </p>
          </section>

          {/* Tags */}
          <section>
            <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-2 px-1">
              O que se destacou?
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => {
                const sel = chosen.includes(t);
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggle(t)}
                    className={cn(
                      "px-3.5 h-9 rounded-full border text-sm font-semibold transition-all",
                      sel
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary/40",
                    )}>
                    {t}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Comment */}
          <section className="space-y-1.5">
            <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground px-1">
              Comentário (opcional)
            </p>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conta como foi a experiência…"
              maxLength={300}
              className="rounded-2xl min-h-[100px] resize-none"
            />
          </section>

          <Button type="submit" variant="default" size="lg" className="w-full">
            Enviar avaliação
          </Button>
        </form>
      </main>
    </div>
  );
};

export { Rate };
