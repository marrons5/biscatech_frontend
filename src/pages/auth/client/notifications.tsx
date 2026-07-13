import { PageHeader, Card, Badge } from "@/components/custom/primitives";
import { Bell, Star, Wrench, CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { notificationService, type AppNotification } from "@/services/notificationService";

const iconMap: Record<string, typeof Bell> = { order_status: Wrench, new_order: Bell, review: Star, system: Bell, support: Bell };

export default function Notifications() {
  const [groups, setGroups] = useState<{ date: string; items: AppNotification[] }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await notificationService.list();
        if (res.data.success) {
          const all = res.data.data;
          const today: AppNotification[] = [];
          const yesterday: AppNotification[] = [];
          const earlier: AppNotification[] = [];
          const now = new Date();
          const todayStr = now.toDateString();
          const yesterdayStr = new Date(now.getTime() - 86400000).toDateString();
          for (const n of all) {
            const d = new Date(n.time);
            if (d.toDateString() === todayStr) today.push(n);
            else if (d.toDateString() === yesterdayStr) yesterday.push(n);
            else earlier.push(n);
          }
          const g: { date: string; items: AppNotification[] }[] = [];
          if (today.length) g.push({ date: "Hoje", items: today });
          if (yesterday.length) g.push({ date: "Ontem", items: yesterday });
          if (earlier.length) g.push({ date: "Anterior", items: earlier });
          setGroups(g);
        }
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  const markAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setGroups((prev) => prev.map((g) => ({ ...g, items: g.items.map((n) => ({ ...n, isRead: true })) })));
    } catch { /* ignore */ }
  };

  return (
    <>
      <PageHeader
        title="Notificações"
        subtitle="Mantém-te ao corrente do teu dia."
        action={
          <button onClick={markAllRead} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-ink transition hover:border-ink">
            <CheckCheck className="h-4 w-4" /> Marcar tudo como lido
          </button>
        }
      />
      {loading ? (
        <p className="text-sm text-muted-foreground">A carregar...</p>
      ) : groups.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma notificação.</p>
      ) : (
        <div className="space-y-6">
          {groups.map((g) => (
            <div key={g.date}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{g.date}</p>
              <Card className="p-2">
                <ul className="divide-y divide-border">
                  {g.items.map((n, i) => {
                    const Icon = iconMap[n.type] ?? Bell;
                    const tone = n.type === "order_status" ? "primary" : n.type === "review" ? "warning" : n.type === "support" ? "neutral" : "primary" as const;
                    return (
                      <li key={i} className="flex items-start gap-4 rounded-xl p-4 transition hover:bg-muted/40">
                        <Badge tone={tone} className="!p-0 !h-10 !w-10 !rounded-xl flex-none flex items-center justify-center">
                          <Icon className="h-5 w-5" />
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-ink">{n.title}</p>
                            {!n.isRead && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{n.message}</p>
                        </div>
                        <span className="flex-none text-xs text-muted-foreground">{new Date(n.time).toLocaleTimeString("pt-AO", { hour: "2-digit", minute: "2-digit" })}</span>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
