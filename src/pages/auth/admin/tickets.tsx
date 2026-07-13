import { PageHeader, Card, Badge } from "@/components/custom/primitives";
import { useEffect, useState } from "react";
import apiClient from "@/services/apiClient";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  user?: { name: string };
  status: string;
  createdAt: string;
}

const statusTone: Record<string, "primary" | "success" | "neutral"> = {
  OPEN: "primary",
  RESOLVED: "success",
  CLOSED: "neutral",
};

const statusLabel: Record<string, string> = {
  OPEN: "Aberto",
  RESOLVED: "Respondido",
  CLOSED: "Fechado",
};

export default function AdminTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiClient.get<{ success: boolean; data: Ticket[] }>("/api/v1/support/tickets");
        if (res.data.success) setTickets(res.data.data);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <>
      <PageHeader title="Tickets de suporte" subtitle="Pedidos de ajuda de utilizadores." />
      <Card>
        {tickets.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum ticket.</p>
        ) : (
          <ul className="divide-y divide-border">
            {tickets.map((t) => (
              <li key={t.id} className="flex items-center gap-4 py-3">
                <div className="flex-1">
                  <p className="font-medium text-ink">#{t.id.slice(-6)} · {t.subject}</p>
                  <p className="text-xs text-muted-foreground">{t.user?.name ?? "N/A"} · {new Date(t.createdAt).toLocaleDateString("pt-AO")}</p>
                </div>
                <Badge tone={statusTone[t.status] ?? "neutral"}>{statusLabel[t.status] ?? t.status}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
