import { Link } from "react-router-dom";
import { PageHeader, Card, Badge } from "@/components/custom/primitives";
import { PlusCircle, Search, Wrench, Zap, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { serviceRequestService, type IServiceRequest } from "@/services/serviceRequestService";

const tabs = ["Todos", "Activos", "Agendados", "Concluídos", "Cancelados"] as const;

const iconMap: Record<string, typeof Wrench> = { Reparo: Wrench, Instalação: Zap, Manutenção: Sparkles };

function mapStatus(s: string) {
  if (s === "pending" || s === "created") return ["Pendente", "warning"] as const;
  if (s === "accepted") return ["Aceite", "primary"] as const;
  if (s === "in_progress") return ["Em andamento", "primary"] as const;
  if (s === "completed") return ["Concluído", "success"] as const;
  if (s === "cancelled") return ["Cancelado", "danger"] as const;
  if (s === "expired") return ["Expirado", "danger"] as const;
  return [s, "neutral"] as const;
}

function filterByTab(r: IServiceRequest, tab: string) {
  if (tab === "Todos") return true;
  if (tab === "Activos") return ["pending", "accepted", "in_progress"].includes(r.status);
  if (tab === "Agendados") return r.status === "accepted";
  if (tab === "Concluídos") return r.status === "completed";
  if (tab === "Cancelados") return ["cancelled", "expired"].includes(r.status);
  return true;
}

export default function Requests() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Todos");
  const [data, setData] = useState<IServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await serviceRequestService.list();
        if (res.data.success) setData(res.data.data);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  const filtered = data.filter((r) => filterByTab(r, tab));

  return (
    <>
      <PageHeader
        title="Meus pedidos"
        subtitle="Acompanha o estado de cada pedido em tempo real."
        action={
          <Link to="/client/request/create" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg">
            <PlusCircle className="h-4 w-4" /> Novo pedido
          </Link>
        }
      />

      <Card>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Pesquisar pedido..." className="h-10 w-full rounded-full border border-border bg-muted/50 pl-10 pr-4 text-sm outline-none focus:border-primary focus:bg-card" />
          </div>
          <div className="flex gap-1 rounded-full bg-muted p-1">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cn("rounded-full px-3 py-1.5 text-xs font-medium transition", tab === t ? "bg-card text-ink shadow-sm" : "text-muted-foreground hover:text-ink")}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          {loading ? (
            <div className="p-8 text-center text-sm text-muted-foreground">A carregar...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">Nenhum pedido encontrado</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Serviço</th>
                  <th className="px-4 py-3 text-left">Data</th>
                  <th className="px-4 py-3 text-left">Local</th>
                  <th className="px-4 py-3 text-left">Estado</th>
                  <th className="px-4 py-3 text-right">Preço</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((r) => {
                  const [label, tone] = mapStatus(r.status);
                  const Icon = iconMap[r.type] ?? Wrench;
                  return (
                    <tr key={r.id} className="transition hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary"><Icon className="h-4 w-4" /></span>
                          <span className="font-medium text-ink">{r.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(r.date).toLocaleDateString("pt-AO")}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r.location}</td>
                      <td className="px-4 py-3"><Badge tone={tone as any}>{label}</Badge></td>
                      <td className="px-4 py-3 text-right font-medium text-ink">{r.price ? `${Number(r.price).toLocaleString()} Kz` : "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <Link to={`/client/request/${r.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                          Detalhes <ArrowRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </>
  );
}
