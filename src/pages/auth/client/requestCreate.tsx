import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, Card } from "@/components/custom/primitives";
import { Wrench, Zap, Paintbrush, Sparkles, Snowflake, Upload, MapPin, Calendar, Zap as Emergency, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { catalogService } from "@/services/catalogService";
import { serviceRequestService } from "@/services/serviceRequestService";

const iconMap: Record<string, any> = {
  Canalização: Wrench, Electricidade: Zap, Climatização: Snowflake,
  Construção: Paintbrush, Limpeza: Sparkles, "Mecânica & Electrónicos": Wrench,
};

const steps = ["Categoria", "Detalhes", "Localização", "Agenda", "Revisão"];

const RequestCreate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [cats, setCats] = useState<{ icon: any; label: string }[]>([]);
  const [cat, setCat] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [reference, setReference] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadCat, setLoadCat] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await catalogService.list();
        const data = res as any;
        if (data?.data?.success) {
          const catsData = data.data.data.categories as { id: string; name: string; slug: string; description: string | null }[] | undefined;
          if (catsData?.length) {
            setCats(catsData.map(c => ({
              label: c.name,
              icon: iconMap[c.name] ?? Wrench,
            })));
          }
        }
      } catch {
        /* empty */
      }
      setLoadCat(false);
    })();
  }, []);

  const canContinue = () => {
    switch (step) {
      case 0: return !!cat;
      case 1: return description.trim().length >= 10;
      case 2: return location.trim().length >= 3;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  const submit = async () => {
    if (!cat) return;
    setLoading(true);
    try {
      const payload: any = {
        title: cat,
        description,
        location,
        date: urgent ? new Date().toISOString() : date ? new Date(date).toISOString() : new Date().toISOString(),
        type: urgent ? "emergency" : "repair",
        isCustom: true,
      };
      if (budget) payload.customerBudget = Number(budget.replace(/[^0-9]/g, ""));
      const res = await serviceRequestService.create(payload);
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
    <>
      <PageHeader
        title="Novo pedido"
        subtitle="Descreve o que precisas e encontramos o profissional certo."
      />

      <div className="mb-8 flex items-center gap-2 overflow-x-auto">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition",
              i < step ? "bg-success text-success-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={cn("hidden text-sm font-medium sm:inline", i === step ? "text-ink" : "text-muted-foreground")}>{s}</span>
            {i < steps.length - 1 && <div className="h-px w-6 bg-border sm:w-10" />}
          </div>
        ))}
      </div>

      <Card>
        {step === 0 && (
          <>
            <h2 className="text-lg font-semibold text-ink">Que serviço precisas?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Escolhe a categoria mais próxima do teu problema.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {loadCat ? (
                <p className="col-span-3 text-sm text-muted-foreground">A carregar categorias...</p>
              ) : cats.map((c) => (
                <button key={c.label} type="button" onClick={() => setCat(c.label)} className={cn("flex flex-col items-start gap-4 rounded-xl border p-4 text-left transition", cat === c.label ? "border-primary bg-primary-soft" : "border-border hover:border-primary/40 hover:bg-muted/40")}>
                  <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", cat === c.label ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary")}>
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-ink">{c.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold text-ink">Descreve o problema</h2>
            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Descrição</span>
                <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ex: Torneira da cozinha a pingar continuamente..." className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
                <p className="mt-1 text-xs text-muted-foreground">{description.length}/10 caracteres mínimos</p>
              </label>
              <div>
                <span className="mb-1.5 block text-sm font-medium text-ink">Fotos (opcional)</span>
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3].map((i) => (
                    <button key={i} type="button" className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-muted/40 text-xs text-muted-foreground transition hover:border-primary hover:text-primary">
                      <Upload className="h-4 w-4" /> Adicionar
                    </button>
                  ))}
                </div>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Orçamento estimado (Kz)</span>
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Ex: 20.000" className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
              </label>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold text-ink">Onde é o serviço?</h2>
            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Morada</span>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Rua, número, bairro..." className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
                </div>
              </label>
              <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" /> Mapa (placeholder)
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Referência (opcional)</span>
                <input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Ex: Próximo ao Kero" className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary" />
              </label>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-lg font-semibold text-ink">Quando precisas?</h2>
            <div className="mt-6 space-y-4">
              <button type="button" onClick={() => setUrgent(!urgent)} className={cn("flex w-full items-center gap-3 rounded-xl border p-4 text-left transition", urgent ? "border-danger bg-danger-soft" : "border-border hover:border-danger/40")}>
                <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", urgent ? "bg-danger text-danger-foreground" : "bg-danger-soft text-danger")}>
                  <Emergency className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-medium text-ink">Emergência</p>
                  <p className="text-xs text-muted-foreground">Preciso de alguém agora — resposta em minutos.</p>
                </div>
                <span className={cn("h-5 w-5 rounded-full border-2", urgent ? "border-danger bg-danger" : "border-border")}>
                  {urgent && <Check className="h-4 w-4 text-white" />}
                </span>
              </button>
              {!urgent && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink">Data</span>
                    <div className="relative">
                      <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm outline-none focus:border-primary" />
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink">Hora</span>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary" />
                  </label>
                </div>
              )}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-lg font-semibold text-ink">Revê o teu pedido</h2>
            <div className="mt-6 space-y-3 rounded-xl border border-border bg-muted/30 p-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Categoria</span><span className="font-medium text-ink">{cat ?? "—"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Descrição</span><span className="font-medium text-ink max-w-[60%] text-right">{description}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Urgência</span><span className="font-medium text-ink">{urgent ? "Emergência" : "Agendado"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Morada</span><span className="font-medium text-ink">{location}</span></div>
              {budget && <div className="flex justify-between"><span className="text-muted-foreground">Orçamento</span><span className="font-medium text-ink">≈ {Number(budget).toLocaleString()} Kz</span></div>}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Ao submeter, profissionais próximos irão receber o teu pedido.</p>
          </>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="inline-flex items-center gap-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-ink transition hover:border-ink disabled:opacity-40">
            <ChevronLeft className="h-4 w-4" /> Voltar
          </button>
          {step < steps.length - 1 ? (
            <button type="button" onClick={() => setStep(step + 1)} disabled={!canContinue()} className="inline-flex items-center gap-1 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0">
              Continuar <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button type="button" onClick={submit} disabled={loading} className="inline-flex items-center gap-1 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50">
              {loading ? "A enviar..." : "Submeter pedido"}
            </button>
          )}
        </div>
      </Card>
    </>
  );
};

export { RequestCreate };
