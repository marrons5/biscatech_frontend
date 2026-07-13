import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Clock, CheckCircle2, Loader2, XCircle, Play, Check } from "lucide-react";
import { PageHeader } from "@/components/custom/pageHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { serviceRequestService, type IServiceRequest } from "@/services/serviceRequestService";

type FlowStep = {
  id: string;
  label: string;
  desc: string;
};

const flow: FlowStep[] = [
  { id: "accepted", label: "Aceite", desc: "Serviço aceite por ti" },
  { id: "in_progress", label: "Em andamento", desc: "A executar o serviço" },
  { id: "awaiting_confirmation", label: "Concluído", desc: "Aguardando confirmação do cliente" },
];

function toLocalStatus(s: string): string {
  if (s === "accepted") return "accepted";
  if (s === "in_progress") return "in_progress";
  if (s === "awaiting_confirmation" || s === "pro_completed") return "awaiting_confirmation";
  if (s === "completed") return "completed";
  if (s === "cancelled") return "cancelled";
  return "accepted";
}

const currentIdx = (status: string, steps: FlowStep[]): number => {
  const idx = steps.findIndex((s) => s.id === status);
  return idx >= 0 ? idx : -1;
};

const ProRequestStatus = () => {
  const { id } = useParams();

  const [request, setRequest] = useState<IServiceRequest | null>(null);
  const [status, setStatus] = useState<string>("accepted");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

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

  const handleAction = async (fn: () => Promise<any>, nextStatus: string) => {
    if (!id) return;
    setActionLoading(true);
    try {
      const res = await fn();
      if (res.data.success) setStatus(nextStatus);
    } catch { /* ignore */ }
    setActionLoading(false);
  };

  const startService = () => handleAction(() => serviceRequestService.start(id!), "in_progress");
  const markCompleted = () => handleAction(() => serviceRequestService.markCompleted(id!), "awaiting_confirmation");
  const cancelByPro = () => handleAction(() => serviceRequestService.cancelByPro(id!), "cancelled");

  if (loading) return <div className="p-8 text-center text-sm text-muted-foreground">A carregar...</div>;
  if (!request) return <div className="p-8 text-center text-sm text-muted-foreground">Pedido não encontrado.</div>;

  const idx = currentIdx(status, flow);

  return (
    <div className="min-h-screen bg-background pb-12">
      <main className="container max-w-6xl px-4 lg:px-8 pt-6 lg:pt-10 space-y-5">
        <PageHeader title={`Serviço #${id}`} subtitle={request.title} back />

        <section className="rounded-3xl bg-card border border-border/60 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Estado</h3>
            {status === "in_progress" && <span className="text-xs font-bold text-primary inline-flex items-center gap-1"><Clock className="h-3 w-3" /> Em curso</span>}
            {status === "awaiting_confirmation" && <span className="text-xs font-bold text-warning inline-flex items-center gap-1"><Clock className="h-3 w-3" /> Aguarda cliente</span>}
            {status === "completed" && <span className="text-xs font-bold text-success inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Concluído</span>}
            {status === "cancelled" && <span className="text-xs font-bold text-destructive inline-flex items-center gap-1"><XCircle className="h-3 w-3" /> Cancelado</span>}
          </div>
          <ol className="space-y-4">
            {(status === "cancelled" ? flow.slice(0, 1) : flow).map((s, i) => {
              const reached = i <= idx && status !== "cancelled";
              const active = i === idx && status !== "cancelled";
              return (
                <li key={s.id} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all", reached ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground")}>
                      {active && status === "in_progress" ? <Loader2 className="h-4 w-4 animate-spin" /> : reached ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                    </div>
                    {i < flow.length - 1 && <div className={cn("w-0.5 h-8 mt-1", i < idx ? "bg-primary" : "bg-border")} />}
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
          <div className="grid gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Local</span>
              <span className="font-semibold">{request.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Data</span>
              <span className="font-semibold">{new Date(request.date).toLocaleDateString("pt-AO")}</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border/60">
              <span className="text-muted-foreground">Preço</span>
              <span className="font-extrabold text-base">{request.price ? `${Number(request.price).toLocaleString()} Kz` : "A definir"}</span>
            </div>
          </div>
        </section>

        <div className="space-y-3">
          {status === "accepted" && (
            <Button size="lg" className="w-full" onClick={startService} disabled={actionLoading}>
              {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              Iniciar serviço
            </Button>
          )}

          {status === "in_progress" && (
            <Button size="lg" className="w-full" onClick={markCompleted} disabled={actionLoading}>
              {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Marcar como concluído
            </Button>
          )}

          {status === "awaiting_confirmation" && (
            <div className="rounded-2xl bg-warning/10 border border-warning/30 text-warning p-4 text-center text-sm font-bold w-full">
              A aguardar confirmação do cliente
            </div>
          )}

          {status === "completed" && (
            <div className="rounded-2xl bg-success/10 border border-success/30 text-success p-4 text-center text-sm font-bold inline-flex items-center justify-center gap-2 w-full">
              <CheckCircle2 className="h-4 w-4" /> Serviço concluído
            </div>
          )}

          {status === "cancelled" ? (
            <div className="rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive p-4 text-center text-sm font-bold w-full">
              Serviço cancelado
            </div>
          ) : status !== "completed" && status !== "awaiting_confirmation" ? (
            <Button variant="outline" size="lg" className="w-full text-destructive border-destructive/40 hover:bg-destructive/10" onClick={cancelByPro} disabled={actionLoading}>
              Cancelar serviço
            </Button>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export { ProRequestStatus };
