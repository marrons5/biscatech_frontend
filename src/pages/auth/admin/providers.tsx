import { PageHeader, Card, Badge } from "@/components/custom/primitives";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { adminService, type AdminUser } from "@/services/adminService";

export default function AdminProviders() {
  const [pending, setPending] = useState<AdminUser[]>([]);
  const [active, setActive] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await adminService.listUsers();
        if (res.data.success) {
          const raw = res.data.data;
          const users = Array.isArray(raw) ? raw : raw.users;
          setPending(users.filter((u: any) => u.role === "provider" && u.status === "pending_verification"));
          setActive(users.filter((u: any) => u.role === "provider" && u.status === "active"));
        }
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  const approve = async (id: string) => {
    try {
      const res = await adminService.verifyPro(id);
      if (res.data.success) {
        toast.success("Profissional verificado!");
        setPending((prev) => prev.filter((p) => p.id !== id));
        setActive((prev) => [...prev, ...pending.filter((p) => p.id === id).map((p) => ({ ...p, status: "ACTIVE" }))]);
      }
    } catch {
      toast.error("Erro ao verificar.");
    }
  };

  const reject = async (id: string) => {
    try {
      const res = await adminService.updateUserStatus(id, { status: "SUSPENDED" });
      if (res.data.success) {
        toast.success("Profissional rejeitado.");
        setPending((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      toast.error("Erro ao rejeitar.");
    }
  };

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <>
      <PageHeader title="Profissionais" subtitle={`${active.length} activos · ${pending.length} aprovações pendentes`} />
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-ink">Aprovações pendentes</h2>
        {pending.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma aprovação pendente.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {pending.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{p.name.split(" ").map(x=>x[0]).join("")}</div>
                  <div><p className="font-medium text-ink">{p.name}</p><p className="text-xs text-muted-foreground">{p.role}</p></div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Registado: {new Date(p.createdAt).toLocaleDateString("pt-AO")}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => reject(p.id)} className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-border py-2 text-sm text-muted-foreground hover:border-danger hover:text-danger"><X className="h-4 w-4" /> Rejeitar</button>
                  <button onClick={() => approve(p.id)} className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-success py-2 text-sm font-medium text-success-foreground"><Check className="h-4 w-4" /> Aprovar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
      <Card className="mt-6">
        <h2 className="mb-4 text-lg font-semibold text-ink">Profissionais activos</h2>
        {active.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum profissional activo.</p>
        ) : (
          <ul className="divide-y divide-border">
            {active.map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{p.name.split(" ").map(x=>x[0]).join("")}</div>
                <div className="flex-1"><p className="font-medium text-ink">{p.name}</p><p className="text-xs text-muted-foreground">{p.email}</p></div>
                <Badge tone="success">Activo</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
