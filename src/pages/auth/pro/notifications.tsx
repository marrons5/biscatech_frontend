import { PageHeader, Card } from "@/components/custom/primitives";
import { Bell, CheckCheck, Inbox, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { notificationService, type AppNotification } from "@/services/notificationService";

const iconMap: Record<string, typeof Bell> = { order_status: Inbox, new_order: Inbox, review: Star, system: Bell };

export default function ProNotifs() {
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await notificationService.list();
        if (res.data.success) setItems(res.data.data);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  const markAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch { /* ignore */ }
  };

  return (
    <>
      <PageHeader
        title="Notificações"
        action={
          <button onClick={markAllRead} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-ink hover:border-ink">
            <CheckCheck className="h-4 w-4" /> Marcar como lidas
          </button>
        }
      />
      {loading ? (
        <p className="text-sm text-muted-foreground">A carregar...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma notificação.</p>
      ) : (
        <Card className="!p-2">
          <ul className="divide-y divide-border">
            {items.map((n, i) => {
              const Icon = iconMap[n.type] ?? Bell;
              return (
                <li key={i} className="flex items-start gap-4 rounded-xl p-4 hover:bg-muted/40">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-ink">{n.title}</p>
                      {!n.isRead && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{n.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(n.time).toLocaleTimeString("pt-AO", { hour: "2-digit", minute: "2-digit" })}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </>
  );
}
