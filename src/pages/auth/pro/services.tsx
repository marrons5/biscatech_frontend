import { PageHeader, Card, Badge } from "@/components/custom/primitives";
import { Wrench, Zap, Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serviceRequestService, type IServiceRequest } from "@/services/serviceRequestService";

const iconMap: Record<string, typeof Wrench> = { Reparo: Wrench, Instalação: Zap, Manutenção: Sparkles };

export default function Services() {
  const [data, setData] = useState<IServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await serviceRequestService.list({ scope: "assigned" });
        if (res.data.success) setData(res.data.data);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <PageHeader title="Meus serviços" subtitle="Serviços que aceitaste — activos e agendados." />
      {loading ? (
        <p className="text-sm text-muted-foreground">A carregar...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum serviço activo.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {data.map((r) => {
            const Icon = iconMap[r.type] ?? Wrench;
            const tone = r.status === "accepted" ? "warning" : r.status === "in_progress" ? "primary" : "success" as const;
            const label = r.status === "accepted" ? "Agendado" : r.status === "in_progress" ? "Em curso" : r.status === "completed" ? "Concluído" : r.status;
            return (
              <Card key={r.id} className="card-hover">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-ink">{r.title}</p>
                      <Badge tone={tone}>{label}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{r.location} · {new Date(r.date).toLocaleDateString("pt-AO")}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink">{r.price ? `${Number(r.price).toLocaleString()} Kz` : "—"}</span>
                      <Link to={`/pro/request/${r.id}`} className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-soft">Detalhes <ArrowRight className="h-3 w-3" /></Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
