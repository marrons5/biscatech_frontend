import { PageHeader, Card, Badge } from "@/components/custom/primitives";
import { Search, MapPin, Clock, Wallet, Wrench, Zap, Sparkles, Snowflake, Check, X, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { serviceRequestService, type IServiceRequest } from "@/services/serviceRequestService";

const iconMap: Record<string, typeof Wrench> = { repair: Wrench, installation: Zap, maintenance: Sparkles, emergency: Snowflake };

export default function AvailableJobs() {
  const [list, setList] = useState<IServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await serviceRequestService.list({ scope: "available" });
        if (res.data.success) setList(res.data.data);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  const accept = async (id: string) => {
    try {
      const res = await serviceRequestService.accept(id, {});
      if (res.data.success) {
        toast.success("Pedido aceite!");
        setList((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      toast.error("Erro ao aceitar pedido.");
    }
  };

  return (
    <>
      <PageHeader title="Pedidos disponíveis" subtitle="Escolhe os pedidos perto de ti." />
      <Card>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Pesquisar pedidos..." className="h-10 w-full rounded-full border border-border bg-muted/50 pl-10 pr-4 text-sm outline-none focus:border-primary focus:bg-card" />
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-ink hover:border-ink">
            <Filter className="h-4 w-4" /> Filtros
          </button>
        </div>
        {loading ? (
          <p className="text-sm text-muted-foreground">A carregar...</p>
        ) : list.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum pedido disponível de momento.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {list.map((r) => {
              const Icon = iconMap[r.type] ?? Wrench;
              return (
                <div key={r.id} className="card-hover rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-ink">{r.title}</p>
                        {r.type === "emergency" && <Badge tone="danger">Urgente</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{r.type}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-primary" />{r.location}</div>
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-3.5 w-3.5 text-primary" />{new Date(r.date).toLocaleDateString("pt-AO")}</div>
                    <div className="flex items-center gap-1.5 font-medium text-ink"><Wallet className="h-3.5 w-3.5 text-success" />{(r.proposedValue ?? r.price) ? `${Number(r.proposedValue ?? r.price).toLocaleString()} Kz` : "—"}</div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-border py-2 text-sm font-medium text-muted-foreground hover:border-danger hover:text-danger">
                      <X className="h-4 w-4" /> Rejeitar
                    </button>
                    <button onClick={() => accept(r.id)} className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-primary py-2 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 hover:-translate-y-0.5 transition">
                      <Check className="h-4 w-4" /> Aceitar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </>
  );
}
