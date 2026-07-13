import { PageHeader, Card, Badge } from "@/components/custom/primitives";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { adminService, type AdminComplaint } from "@/services/adminService";

const statusTone: Record<string, "danger" | "warning" | "success" | "neutral"> = {
  OPEN: "danger",
  IN_REVIEW: "warning",
  RESOLVED: "success",
  DISMISSED: "neutral",
};

const statusLabel: Record<string, string> = {
  OPEN: "Aberta",
  IN_REVIEW: "Em análise",
  RESOLVED: "Resolvida",
  DISMISSED: "Arquivada",
};

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState<AdminComplaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await adminService.listComplaints();
        if (res.data.success) setComplaints(res.data.data);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  const updateStatus = async (id: string, status: "IN_REVIEW" | "RESOLVED" | "DISMISSED") => {
    try {
      const res = await adminService.updateComplaintStatus(id, { status });
      if (res.data.success) {
        toast.success("Estado actualizado!");
        setComplaints((prev) => prev.map((c) => c.id === id ? { ...c, status } : c));
      }
    } catch {
      toast.error("Erro ao actualizar.");
    }
  };

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <>
      <PageHeader title="Reclamações" subtitle={`${complaints.length} reclamações.`} />
      {complaints.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma reclamação.</p>
      ) : (
        <div className="space-y-3">
          {complaints.map((r) => (
            <Card key={r.id} className="flex items-center gap-4">
              <div className="flex-1">
                <p className="font-medium text-ink">#{r.id.slice(-6)} · {r.subject}</p>
                <p className="text-xs text-muted-foreground">Aberto por {r.customer?.name ?? "N/A"} · {new Date(r.createdAt).toLocaleDateString("pt-AO")}</p>
              </div>
              <Badge tone={statusTone[r.status] ?? "neutral"}>{statusLabel[r.status] ?? r.status}</Badge>
              {r.status === "OPEN" && (
                <div className="flex gap-1">
                  <button onClick={() => updateStatus(r.id, "IN_REVIEW")} className="rounded-lg bg-warning px-3 py-1.5 text-xs font-medium text-warning-foreground">Analisar</button>
                  <button onClick={() => updateStatus(r.id, "RESOLVED")} className="rounded-lg bg-success px-3 py-1.5 text-xs font-medium text-success-foreground">Resolver</button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
