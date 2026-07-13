import { PageHeader, Card } from "@/components/custom/primitives";
import { PlusCircle, Home, Building2, MapPin, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { userService } from "@/services/supportService";

export default function Addresses() {
  const [list, setList] = useState<{ id: string; icon: typeof Home; label: string; addr: string; ref: string; primary: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await userService.listAddresses();
        if (res.data.success) {
          setList(res.data.data.map((a: any) => ({
            id: a.id,
            icon: a.label === "home" ? Home : a.label === "work" ? Building2 : MapPin,
            label: a.label === "home" ? "Casa" : a.label === "work" ? "Trabalho" : "Outro",
            addr: a.full,
            ref: "",
            primary: a.label === "home",
          })));
        }
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <PageHeader
        title="Endereços"
        subtitle="Guarda locais que usas com frequência."
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg">
            <PlusCircle className="h-4 w-4" /> Novo endereço
          </button>
        }
      />
      {loading ? (
        <p className="text-sm text-muted-foreground">A carregar...</p>
      ) : list.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum endereço guardado.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <Card key={a.id} className="card-hover">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><a.icon className="h-5 w-5" /></span>
                <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"><MoreVertical className="h-4 w-4" /></button>
              </div>
              <div className="mt-5 flex items-center gap-2">
                <h3 className="text-lg font-semibold text-ink">{a.label}</h3>
                {a.primary && <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">Principal</span>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{a.addr}</p>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
