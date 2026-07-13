import { PageHeader, Card } from "@/components/custom/primitives";
import { useEffect, useState } from "react";
import { adminService, type AdminCategory } from "@/services/adminService";

export default function AdminServices() {
  const [cats, setCats] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await adminService.listCategories();
        if (res.data.success) setCats(res.data.data);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <>
      <PageHeader title="Serviços" subtitle="Sub-serviços dentro de cada categoria." />
      <Card>
        <ul className="divide-y divide-border">
          {cats.map((cat) => (
            <li key={cat.id} className="py-4">
              <p className="mb-2 font-medium text-ink">{cat.name}</p>
              <div className="flex flex-wrap gap-2">
                {cat.services.length === 0 ? (
                  <span className="text-xs text-muted-foreground">Nenhum serviço.</span>
                ) : cat.services.map((s) => <span key={s.id} className="rounded-full bg-muted px-3 py-1 text-xs text-ink">{s.name}</span>)}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
