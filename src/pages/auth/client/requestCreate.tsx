import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, Lightning, PaintRoller, Hammer, Sparkle, Wind, MapPin, Calendar, ArrowRight, LightbulbIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { catalogService, type PredefinedService } from "@/services/catalogService";
import { serviceRequestService } from "@/services/serviceRequestService";

const iconMap: Record<string, any> = { Canalizador: Wrench, Eletricista: Lightning, Pintor: PaintRoller, Pedreiro: Hammer, Limpeza: Sparkle, "AC / Refr.": Wind };

const RequestCreate = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<{ label: string; icon: any; est: string }[]>([]);
  const [service, setService] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadCat, setLoadCat] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await catalogService.list();
        if ((res as any).data?.success) {
          const cats = (res as any).data.data.services as PredefinedService[];
          const unique = [...new Set(cats.map((s) => s.category))];
          const mapped = unique.map((c) => ({
            label: c,
            icon: iconMap[c] ?? Wrench,
            est: `${Math.min(...cats.filter((s) => s.category === c).map((s) => s.price))?.toLocaleString() ?? "—"} – ${Math.max(...cats.filter((s) => s.category === c).map((s) => s.price))?.toLocaleString() ?? "—"} Kz`,
          }));
          setServices(mapped);
          if (mapped.length) setService(mapped[0].label);
        }
      } catch { /* ignore */ }
      setLoadCat(false);
    })();
  }, []);

  const current = services.find((s) => s.label === service);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location || !date) {
      toast.error("Preenche todos os campos obrigatórios.");
      return;
    }
    setLoading(true);
    try {
      const res = await serviceRequestService.create({ title, description, location, date });
      if (res.data.success) {
        toast.success("Pedido enviado! À procura de profissionais perto de ti.");
        navigate("/client/requests", { replace: true });
      } else {
        toast.error("Erro ao enviar pedido.");
      }
    } catch {
      toast.error("Erro ao enviar pedido. Tenta novamente.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <main className="container max-w-7xl px-6 lg:px-10">
        <form onSubmit={submit} className="grid grid-cols-10 gap-6">
          <div className="col-span-10 lg:col-span-7 space-y-6">
            <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 space-y-5">
              <div>
                <Label className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Categoria</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {loadCat ? (
                    <p className="col-span-3 text-sm text-muted-foreground">A carregar...</p>
                  ) : services.map((s) => {
                    const selected = service === s.label;
                    const Icon = s.icon;
                    return (
                      <button type="button" key={s.label} onClick={() => setService(s.label)} className={cn("flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all", selected ? "border-primary bg-blue-50" : "border-slate-200 bg-white hover:border-primary/30")}>
                        <Icon size={24} weight={selected ? "fill" : "regular"} className={selected ? "text-primary" : "text-slate-500"} />
                        <span className="text-xs font-bold">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="title">Título do Pedido</Label>
                <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Cano roto na cozinha" className="rounded-xl h-11" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="desc">Descreve o teu problema</Label>
                <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Conta os detalhes para receberes melhores orçamentos…" maxLength={300} className="min-h-[120px] rounded-xl resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="loc">Localização</Label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" weight="fill" />
                    <Input id="loc" value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-xl h-11 pl-9" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="date">Data</Label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-11 pl-9 rounded-xl" />
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" disabled={loading} className="rounded-xl w-full">
                {loading ? "A enviar…" : <><ArrowRight size={18} weight="bold" /> Pedir Biscate</>}
              </Button>
            </section>
          </div>

          <aside className="col-span-10 lg:col-span-3 space-y-6">
            <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Estimativa</p>
              <p className="mt-2 text-sm font-medium text-foreground">Orçamento estimado:</p>
              <p className="text-xl font-extrabold text-primary mt-1">{current?.est ?? "—"}</p>
              <p className="text-xs text-muted-foreground mt-2">para a categoria <span className="font-bold text-foreground">{current?.label ?? "—"}</span></p>
            </section>

            <section className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-primary/80 flex items-center gap-1 mb-2"><LightbulbIcon size={14} weight="fill" /> Dica</p>
              <p className="text-sm text-foreground/80 leading-relaxed">Adicionar fotos e descrição detalhada ajuda os profissionais a darem orçamentos mais precisos.</p>
            </section>

            <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Como funciona</p>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-2"><span className="font-extrabold text-primary">1.</span> Descreves o pedido</li>
                <li className="flex gap-2"><span className="font-extrabold text-primary">2.</span> Profissionais aceitam</li>
                <li className="flex gap-2"><span className="font-extrabold text-primary">3.</span> Escolhes e contratas</li>
              </ol>
            </section>
          </aside>
        </form>
      </main>
    </div>
  );
};

export { RequestCreate };
