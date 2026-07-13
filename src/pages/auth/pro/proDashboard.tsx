import { Link } from "react-router-dom";
import { PageHeader, StatCard, Card, Badge } from "@/components/custom/primitives";
import { Inbox, Star, TrendingUp, CheckCircle2, ArrowRight, Wrench, Zap, Sparkles } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/context/authContext";
import { serviceRequestService, type IServiceRequest } from "@/services/serviceRequestService";
import { proService } from "@/services/proService";
import { notificationService, type AppNotification } from "@/services/notificationService";

const iconMap: Record<string, typeof Wrench> = { Reparo: Wrench, Instalação: Zap, Manutenção: Sparkles };

const ProDashboard = () => {
  const { user } = useContext(AuthContext)!;
  const [online, setOnline] = useState(true);
  const [requests, setRequests] = useState<IServiceRequest[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [reqRes, profRes, notifRes] = await Promise.all([
          serviceRequestService.list({ scope: "assigned" }),
          proService.getProfile(),
          notificationService.list(),
        ]);
        if (reqRes.data.success) setRequests(reqRes.data.data.slice(0, 3));
        if (profRes.data.success) setProfile(profRes.data.data);
        if (notifRes.data.success) setNotifications(notifRes.data.data.slice(0, 3));
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <PageHeader
        title={`Boa tarde, ${user?.name?.split(" ")[0] ?? "profissional"} 👷`}
        subtitle="Aqui está a tua actividade de hoje."
        action={
          <button onClick={() => setOnline(!online)} className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition", online ? "border-success bg-success-soft text-success" : "border-border bg-card text-muted-foreground")}>
            <span className={cn("h-2 w-2 rounded-full", online ? "bg-success" : "bg-muted-foreground")} />
            {online ? "Disponível" : "Offline"}
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Inbox} label="Serviços activos" value={String(requests.length)} />
        <StatCard icon={CheckCircle2} label="Completados" value={String(profile?.completedServices ?? 0)} tone="success" />
        <StatCard icon={Star} label="Avaliação" value={String(profile?.ratingAverage ?? "—")} tone="warning" />
        <StatCard icon={TrendingUp} label="Taxa aceitação" value={profile?.acceptanceRate ? `${profile.acceptanceRate}%` : "—"} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Serviços activos</h2>
              <Link to="/pro/services" className="text-sm font-medium text-primary hover:underline">Ver todos</Link>
            </div>
            {loading ? (
              <p className="text-sm text-muted-foreground">A carregar...</p>
            ) : requests.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum serviço activo. <Link to="/pro/jobs" className="text-primary">Ver pedidos disponíveis</Link></p>
            ) : (
              <div className="space-y-3">
                {requests.map((r) => {
                  const Icon = iconMap[r.type] ?? Wrench;
                  const tone = r.status === "accepted" || r.status === "in_progress" ? "primary" : r.status === "completed" ? "success" : "warning" as const;
                  const label = r.status === "accepted" ? "Aceite" : r.status === "in_progress" ? "Em andamento" : r.status === "completed" ? "Concluído" : r.status;
                  return (
                    <div key={r.id} className="flex items-center gap-4 rounded-xl border border-border p-4 transition hover:border-primary/40">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-ink">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.location} · {new Date(r.date).toLocaleDateString("pt-AO")}</p>
                      </div>
                      <Badge tone={tone}>{label}</Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 text-lg font-semibold text-ink">Notificações</h2>
            <ul className="space-y-3 text-sm">
              {notifications.length === 0 ? (
                <li className="text-muted-foreground">Nenhuma notificação recente.</li>
              ) : notifications.map((n, i) => (
                <li key={i} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" /><span className="text-ink">{n.title}</span></li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="mb-3 text-lg font-semibold text-ink">Acções rápidas</h2>
            <div className="space-y-2">
              <Link to="/pro/jobs" className="flex w-full items-center gap-2 rounded-xl border border-border p-3 text-sm font-medium text-ink transition hover:border-primary hover:bg-primary-soft"><Inbox className="h-4 w-4 text-primary" /> Ver pedidos disponíveis <ArrowRight className="ml-auto h-4 w-4" /></Link>
              <Link to="/pro/earnings" className="flex w-full items-center gap-2 rounded-xl border border-border p-3 text-sm font-medium text-ink transition hover:border-primary hover:bg-primary-soft"><TrendingUp className="h-4 w-4 text-primary" /> Ver ganhos <ArrowRight className="ml-auto h-4 w-4" /></Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export { ProDashboard };
