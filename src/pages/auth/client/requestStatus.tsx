import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Phone, MessageCircle, MapPin, Clock, CheckCircle2, Loader2, XCircle, Star } from "lucide-react";
import { PageHeader } from "@/components/custom/pageHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { serviceRequestService, type IServiceRequest } from "@/services/serviceRequestService";

type Status = "pending" | "accepted" | "in_progress" | "completed" | "cancelled";

const flow: { id: Status; label: string; desc: string }[] = [
  { id: "pending", label: "Pendente", desc: "À procura de profissional" },
  { id: "accepted", label: "Aceite", desc: "Profissional a caminho" },
  { id: "in_progress", label: "Em andamento", desc: "A executar o serviço" },
  { id: "completed", label: "Concluído", desc: "Trabalho terminado" },
];

function toLocalStatus(s: string): Status {
  if (s === "created" || s === "pending" || s === "searching_provider") return "pending";
  if (s === "accepted" || s === "provider_accepted" || s === "customer_confirmed") return "accepted";
  if (s === "in_progress") return "in_progress";
  if (s === "completed") return "completed";
  return "cancelled";
}

const RequestStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState<IServiceRequest | null>(null);
  const [status, setStatus] = useState<Status>("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await serviceRequestService.getById(id);
        if (res.data.success) {
          setRequest(res.data.data);
          setStatus(toLocalStatus(res.data.data.status));
        }
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, [id]);

  const currentIdx = flow.findIndex((s) => s.id === status);

  const cancelRequest = async () => {
    if (!id) return;
    try {
      const res = await serviceRequestService.cancelByClient(id);
      if (res.data.success) setStatus("cancelled");
    } catch { /* ignore */ }
  };

  if (loading) return <div className="p-8 text-center text-sm text-muted-foreground">A carregar...</div>;
  if (!request) return <div className="p-8 text-center text-sm text-muted-foreground">Pedido não encontrado.</div>;

  return (
    <div className="min-h-screen bg-background pb-12">
      <main className="container max-w-6xl px-4 lg:px-8 pt-6 lg:pt-10 space-y-5">
        <PageHeader title={`Pedido #${id}`} subtitle={request.title} back />

        {status !== "pending" && status !== "cancelled" && (
          <section className="relative overflow-hidden rounded-3xl bg-primary-gradient p-5 shadow-glow text-primary-foreground">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
            <div className="relative flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-lg font-extrabold">?</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs opacity-90">Profissional</p>
                <p className="font-extrabold text-lg truncate">{request.id.slice(0, 8)}</p>
                <p className="text-xs inline-flex items-center gap-1 opacity-90"><Star className="h-3 w-3 fill-current" /> — · {request.title}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="bg-white/15 border-white/30 text-primary-foreground hover:bg-white/25 hover:text-primary-foreground"><Phone className="h-4 w-4" /> Ligar</Button>
              <Button size="sm"><MessageCircle className="h-4 w-4" /> WhatsApp</Button>
            </div>
          </section>
        )}

        <section className="rounded-3xl bg-card border border-border/60 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Estado</h3>
            {status === "in_progress" && <span className="text-xs font-bold text-primary inline-flex items-center gap-1"><Clock className="h-3 w-3" /> ~{request.eta ?? "—"}</span>}
          </div>
          <ol className="space-y-4">
            {flow.map((s, i) => {
              const reached = i <= currentIdx;
              const active = i === currentIdx;
              return (
                <li key={s.id} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all", reached ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground")}>
                      {active && status === "in_progress" ? <Loader2 className="h-4 w-4 animate-spin" /> : reached ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                    </div>
                    {i < flow.length - 1 && <div className={cn("w-0.5 h-8 mt-1", i < currentIdx ? "bg-primary" : "bg-border")} />}
                  </div>
                  <div className="pb-4">
                    <p className={cn("font-bold text-sm", reached ? "text-foreground" : "text-muted-foreground")}>{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="rounded-3xl bg-card border border-border/60 shadow-card p-5 space-y-3">
          <h3 className="font-bold">Detalhes</h3>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Local</span>
            <span className="font-semibold">{request.location}</span>
          </div>
          <div className="flex items-center justify-between text-sm pt-6 lg:pt-10 border-t border-border/60">
            <span className="text-muted-foreground">Preço</span>
            <span className="font-extrabold text-base">{request.price ? `${Number(request.price).toLocaleString()} Kz` : "A definir"}</span>
          </div>
        </section>

        {status === "completed" ? (
          <Button size="lg" className="w-full" onClick={() => navigate(`/app/rate/${id}`)}><Star className="h-4 w-4" /> Avaliar serviço</Button>
        ) : status === "cancelled" ? (
          <div className="rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive p-4 text-center text-sm font-bold inline-flex items-center justify-center gap-2 w-full"><XCircle className="h-4 w-4" /> Pedido cancelado</div>
        ) : (
          <Button variant="outline" size="lg" className="w-full text-destructive border-destructive/40 hover:bg-destructive/10" onClick={cancelRequest}>Cancelar pedido</Button>
        )}
      </main>
    </div>
  );
};

export { RequestStatus };
