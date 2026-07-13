import { PageHeader, Card } from "@/components/custom/primitives";
import { Wrench, Zap, Paintbrush, Hammer, Sparkles, Snowflake, Camera, Wifi, Home, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { adminService, type AdminCategory } from "@/services/adminService";

const iconMap: Record<string, any> = { Canalizador: Wrench, Eletricista: Zap, Pintor: Paintbrush, Pedreiro: Hammer, Limpeza: Sparkles, AC: Snowflake, CCTV: Camera, Internet: Wifi, Electrodomésticos: Home };

export default function AdminCategories() {
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
      <PageHeader title="Categorias" subtitle="Gere as categorias de serviço." action={
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"><PlusCircle className="h-4 w-4" /> Nova categoria</button>
      } />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => {
          const Icon = iconMap[c.name] ?? Wrench;
          return (
            <Card key={c.id} className="card-hover">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                <div className="flex-1"><p className="font-medium text-ink">{c.name}</p><p className="text-xs text-muted-foreground">{c.services?.length ?? 0} serviços</p></div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
