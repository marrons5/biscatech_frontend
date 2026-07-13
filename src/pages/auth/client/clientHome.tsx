import { Link } from "react-router-dom";
import { PageHeader, StatCard, Card, Badge } from "@/components/custom/primitives";
import { ClipboardList, Clock, Star, TrendingUp, PlusCircle, ArrowRight, Wrench, Zap, Sparkles, Calendar } from "lucide-react";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import { serviceRequestService, type IServiceRequest } from "@/services/serviceRequestService";

const iconMap: Record<string, typeof Wrench> = { Canalizador: Wrench, Eletricista: Zap, Limpeza: Sparkles };

const ClientHome = () => {
  const { user } = useContext(AuthContext)!;
  const [requests, setRequests] = useState<IServiceRequest[]>([]);
  const [stats, setStats] = useState({ active: 0, completed: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await serviceRequestService.list();
        if (res.data.success) {
          const all = res.data.data;
          setRequests(all.slice(0, 3));
          setStats({
            active: all.filter((r) => ["pending", "accepted", "in_progress"].includes(r.status)).length,
            completed: all.filter((r) => r.status === "completed").length,
            total: all.length,
          });
        }
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <PageHeader
        title={`Olá, ${user?.name?.split(" ")[0] ?? "utilizador"} 👋`}
        subtitle="Aqui está o resumo dos teus serviços."
        action={
          <Link to="/client/request/create" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg">
            <PlusCircle className="h-4 w-4" /> Novo pedido
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={ClipboardList} label="Pedidos activos" value={String(stats.active)} change="Em curso" />
        <StatCard icon={TrendingUp} label="Total concluídos" value={String(stats.completed)} change={stats.total > 0 ? `${stats.total} total` : undefined} />
        <StatCard icon={Star} label="Avaliação" value={stats.total > 0 ? "4,9" : "—"} tone="warning" />
        <StatCard icon={Clock} label="Tempo médio resposta" value="—" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Pedidos recentes</h2>
              <Link to="/client/requests" className="text-sm font-medium text-primary hover:underline">Ver todos</Link>
            </div>
            {loading ? (
              <p className="text-sm text-muted-foreground">A carregar...</p>
            ) : requests.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum pedido ainda. <Link to="/client/request/create" className="text-primary">Criar primeiro pedido</Link></p>
            ) : (
              <div className="space-y-3">
                {requests.map((r) => {
                  const Icon = iconMap[r.title] ?? Wrench;
                  const s = r.status;
                  const tone = s === "in_progress" || s === "accepted" ? "primary" : s === "completed" ? "success" : s === "cancelled" || s === "expired" ? "danger" : "warning" as const;
                  const label = s === "pending" ? "Pendente" : s === "accepted" ? "Aceite" : s === "in_progress" ? "Em andamento" : s === "completed" ? "Concluído" : s === "cancelled" ? "Cancelado" : s;
                  return (
                    <div key={r.id} className="flex items-center gap-4 rounded-xl border border-border p-4 transition hover:border-primary/40">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-ink">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.location} · {new Date(r.date).toLocaleDateString("pt-AO")}</p>
                      </div>
                      <Badge tone={tone}>{label}</Badge>
                      <Link to={`/client/request/${r.id}`} className="rounded-lg p-2 text-muted-foreground hover:bg-muted"><ArrowRight className="h-4 w-4" /></Link>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 text-lg font-semibold text-ink">Acções rápidas</h2>
            <div className="space-y-2">
              {[
                { label: "Canalizador urgente", icon: Wrench },
                { label: "Eletricista", icon: Zap },
                { label: "Limpeza semanal", icon: Sparkles },
              ].map((a) => (
                <Link key={a.label} to="/client/request/create" className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-sm transition hover:border-primary hover:bg-primary-soft">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary"><a.icon className="h-4 w-4" /></span>
                  <span className="flex-1 text-left font-medium text-ink">{a.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold text-ink">Notificações</h2>
            </div>
            <p className="text-sm text-muted-foreground">As tuas notificações aparecerão aqui.</p>
          </Card>
        </div>
      </div>
    </>
  );
};

export { ClientHome };
