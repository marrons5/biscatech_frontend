import { PageHeader, StatCard, Card } from "@/components/custom/primitives";
import { Users, TrendingUp, Wallet, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { adminService } from "@/services/adminService";

export default function AdminReports() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await adminService.listUsers();
        if (res.data.success) {
          const raw = res.data.data;
          setTotalUsers(Array.isArray(raw) ? raw.length : raw.total);
        }
      } catch { /* ignore */ }
    })();
  }, []);

  return (
    <>
      <PageHeader title="Relatórios" subtitle="Métricas chave da plataforma." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Novos utilizadores" value={String(totalUsers)} />
        <StatCard icon={TrendingUp} label="Pedidos" value="—" tone="primary" />
        <StatCard icon={Wallet} label="GMV" value="—" tone="success" />
        <StatCard icon={Star} label="NPS" value="—" tone="warning" />
      </div>
      <Card className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-ink">Retenção mensal</h2>
        <div className="flex h-40 items-end gap-3">
          {[50, 58, 62, 68, 72, 75, 78, 80, 82, 84, 86, 88].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full flex-1 flex items-end"><div className="w-full rounded-t-lg bg-success" style={{ height: `${h}%` }} /></div>
              <span className="text-[10px] text-muted-foreground">{h}%</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
