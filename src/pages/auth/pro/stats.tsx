import { PageHeader, StatCard, Card } from "@/components/custom/primitives";
import { Star, CheckCircle2, TrendingUp, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { statsService, type ProStatsSummary } from "@/services/statsService";

export default function Stats() {
  const [summary, setSummary] = useState<ProStatsSummary | null>(null);
  const [chart, setChart] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await statsService.getProStats();
        if (res.data.success) {
          setSummary(res.data.data.summary);
          if (res.data.data.servicesByTypeChart?.length) {
            const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
            const dayMap: Record<string, number> = {};
            res.data.data.servicesByTypeChart.forEach((s: any, i: number) => {
              dayMap[days[i] ?? days[0]] = s.count;
            });
            setChart(days.map((d) => dayMap[d] ?? 0));
          }
        }
      } catch { /* ignore */ } finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <>
      <PageHeader title="Estatísticas" subtitle="Como está o teu desempenho." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CheckCircle2} label="Serviços concluídos" value={String(summary?.completedServicesCount ?? 0)} tone="success" />
        <StatCard icon={TrendingUp} label="Ganhos obtidos" value={summary?.obtainedEarnings ? `${summary.obtainedEarnings.toLocaleString()} Kz` : "0 Kz"} tone="primary" />
        <StatCard icon={Star} label="Cancelados" value={String(summary?.canceledServicesCount ?? 0)} tone="warning" />
        <StatCard icon={Clock} label="Potencial" value={summary?.potentialEarnings ? `${summary.potentialEarnings.toLocaleString()} Kz` : "0 Kz"} />
      </div>
      <Card className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-ink">Volume por dia da semana</h2>
        <div className="flex h-40 items-end gap-4">
          {chart.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full flex-1 flex items-end"><div className="w-full rounded-t-lg bg-primary" style={{ height: `${Math.min(h * 10, 100)}%` }} /></div>
              <span className="text-xs text-muted-foreground">{["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][i]}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
