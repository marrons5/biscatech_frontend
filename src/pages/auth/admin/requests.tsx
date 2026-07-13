import { PageHeader, Card, Badge } from "@/components/custom/primitives";
import { useEffect, useState } from "react";
import { serviceRequestService, type IServiceRequest } from "@/services/serviceRequestService";

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  accepted: "Aceite",
  in_progress: "Em curso",
  awaiting_confirmation: "Por confirmar",
  completed: "Concluído",
  cancelled: "Cancelado",
  expired: "Expirado",
};

const statusTone: Record<string, "primary" | "success" | "danger" | "warning" | "neutral"> = {
  pending: "warning",
  accepted: "primary",
  in_progress: "primary",
  awaiting_confirmation: "warning",
  completed: "success",
  cancelled: "danger",
  expired: "neutral",
};

const typeLabels: Record<string, string> = {
  repair: "Reparação",
  installation: "Instalação",
  maintenance: "Manutenção",
  emergency: "Emergência",
};

export default function AdminRequests() {
  const [requests, setRequests] = useState<IServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await serviceRequestService.list();
        if (res.data.success) setRequests(res.data.data);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <>
      <PageHeader title="Pedidos" subtitle="Todos os pedidos da plataforma." />
      <Card>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3 text-left">ID</th><th className="px-4 py-3 text-left">Título</th><th className="px-4 py-3 text-left">Tipo</th><th className="px-4 py-3 text-left">Estado</th><th className="px-4 py-3 text-left">Data</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-ink">#{r.id.slice(-6)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{typeLabels[r.type] ?? r.type}</td>
                  <td className="px-4 py-3"><Badge tone={statusTone[r.status] ?? "neutral"}>{statusLabels[r.status] ?? r.status}</Badge></td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(r.date).toLocaleDateString("pt-AO")}</td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">Nenhum pedido encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
