import { PageHeader, Card, Badge } from "@/components/custom/primitives";
import { Search, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { adminService, type AdminUser } from "@/services/adminService";

const statusTone: Record<string, "success" | "danger" | "warning" | "neutral"> = {
  ACTIVE: "success",
  SUSPENDED: "danger",
  BANNED: "danger",
  PENDING_VERIFICATION: "warning",
  INACTIVE: "neutral",
};

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await adminService.listUsers();
        if (res.data.success) setUsers(res.data.data);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <>
      <PageHeader title="Utilizadores" subtitle={`${users.length} utilizadores registados.`} />
      <Card>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Pesquisar utilizador..." className="h-10 w-full rounded-full border border-border bg-muted/50 pl-10 pr-4 text-sm outline-none focus:border-primary focus:bg-card" />
          </div>
          <select className="h-10 rounded-full border border-border bg-card px-4 text-sm"><option>Todos os estados</option><option>Activos</option><option>Suspensos</option></select>
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3 text-left">Utilizador</th><th className="px-4 py-3 text-left">Tipo</th><th className="px-4 py-3 text-left">Estado</th><th className="px-4 py-3 text-left">Registado</th><th /></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">{u.name.split(" ").map(x=>x[0]).join("")}</div>
                      <div><p className="font-medium text-ink">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.role === "provider" ? "Profissional" : u.role === "admin" ? "Admin" : "Cliente"}</td>
                  <td className="px-4 py-3"><Badge tone={statusTone[u.status] ?? "neutral"}>{u.status === "ACTIVE" ? "Activo" : u.status === "SUSPENDED" ? "Suspenso" : u.status === "BANNED" ? "Banido" : u.status === "PENDING_VERIFICATION" ? "Pendente" : u.status}</Badge></td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString("pt-AO")}</td>
                  <td className="px-4 py-3 text-right"><button className="rounded-lg p-1.5 hover:bg-muted"><MoreVertical className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
