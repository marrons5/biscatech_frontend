import { PageHeader, StatCard, Card, Badge } from "@/components/custom/primitives";
import { Users, ShieldCheck, ClipboardList, TrendingUp, Wrench, Zap, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { adminService } from "@/services/adminService";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activePros, setActivePros] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [usersRes] = await Promise.all([
          adminService.listUsers(),
        ]);
        if (usersRes.data.success) {
          const all = usersRes.data.data;
          setTotalUsers(all.length);
          setActivePros(all.filter((u) => u.role === "provider" && u.status === "ACTIVE").length);
          setPendingApprovals(all.filter((u) => u.status === "PENDING_VERIFICATION"));
        }
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Visão geral da plataforma." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Utilizadores" value={String(totalUsers)} />
        <StatCard icon={ShieldCheck} label="Profissionais activos" value={String(activePros)} tone="success" />
        <StatCard icon={ClipboardList} label="Pedidos (mês)" value="—" tone="primary" />
        <StatCard icon={TrendingUp} label="GMV estimado" value="—" tone="warning" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-6 text-lg font-semibold text-ink">Crescimento — últimos 12 meses</h2>
          <div className="flex h-56 items-end gap-3">
            {[30, 45, 40, 55, 65, 60, 75, 82, 88, 90, 95, 100].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full flex-1 flex items-end"><div className="w-full rounded-t-lg bg-primary" style={{ height: `${h}%` }} /></div>
                <span className="text-[10px] text-muted-foreground">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-ink">Aprovações pendentes</h2>
          <ul className="space-y-3">
            {pendingApprovals.length === 0
              ? <li className="text-sm text-muted-foreground">Nenhuma aprovação pendente.</li>
              : pendingApprovals.slice(0, 5).map((p) => (
                  <li key={p.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">{p.name?.split(" ").map((x: string) => x[0]).join("")}</div>
                    <div className="flex-1 min-w-0"><p className="truncate text-sm font-medium text-ink">{p.name}</p><p className="text-xs text-muted-foreground">{p.role}</p></div>
                    <button className="rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Rever</button>
                  </li>
                ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-ink">Serviços mais pedidos</h2>
          <div className="space-y-3">
            {[
              { i: Wrench, l: "Canalizador", v: 82 },
              { i: Zap, l: "Eletricista", v: 65 },
              { i: Sparkles, l: "Limpeza", v: 55 },
              { i: Star, l: "AC", v: 40 },
            ].map((r) => (
              <div key={r.l}>
                <div className="mb-1 flex justify-between text-sm"><span className="flex items-center gap-2 text-ink"><r.i className="h-4 w-4 text-primary" />{r.l}</span><span className="font-medium">{r.v}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${r.v}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-ink">Actividade recente</h2>
          <ul className="space-y-3 text-sm">
            {[
              { t: "Novo utilizador registado", d: "N/A", tone: "primary" as const },
              { t: "Reclamação aberta", d: "N/A", tone: "danger" as const },
              { t: "Prestador aprovado", d: "N/A", tone: "success" as const },
              { t: "Categoria criada", d: "N/A", tone: "warning" as const },
            ].map((a, i) => (
              <li key={i} className="flex items-center justify-between">
                <div><p className="font-medium text-ink">{a.t}</p><p className="text-xs text-muted-foreground">{a.d}</p></div>
                <Badge tone={a.tone}>—</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
