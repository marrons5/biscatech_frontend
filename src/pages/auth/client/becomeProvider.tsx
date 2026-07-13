import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, Card } from "@/components/custom/primitives";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { ArrowRight, FileText, Calendar, MapPin } from "lucide-react";

const BecomeProvider = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    biNumber: "",
    dateOfBirth: "",
    placeOfBirth: "",
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const submit = async () => {
    setLoading(true);
    try {
      const payload: Record<string, string> = {};
      if (form.biNumber) payload.biNumber = form.biNumber;
      if (form.dateOfBirth) payload.dateOfBirth = form.dateOfBirth;
      if (form.placeOfBirth) payload.placeOfBirth = form.placeOfBirth;
      const res = await authService.becomeProvider(payload);
      if (res.data.success) {
        toast.success("Pedido enviado! Aguarda a aprovação do admin.");
        navigate("/client/dashboard", { replace: true });
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
        title="Torna-te profissional"
        subtitle="Preenche os teus dados para começares a receber pedidos de serviço."
      />

      <div className="mb-8 flex items-center gap-2">
        {["Dados pessoais", "Documento", "Revisão"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition ${
              i < step ? "bg-success text-success-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>{i + 1}</div>
            <span className={`hidden text-sm font-medium sm:inline ${i === step ? "text-ink" : "text-muted-foreground"}`}>{s}</span>
            {i < 2 && <div className="h-px w-6 bg-border sm:w-10" />}
          </div>
        ))}
      </div>

      <Card>
        {step === 0 && (
          <>
            <h2 className="text-lg font-semibold text-ink">Dados pessoais</h2>
            <p className="mt-1 text-sm text-muted-foreground">Informações conforme o teu Bilhete de Identidade.</p>
            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink"><Calendar className="h-4 w-4" /> Data de nascimento</span>
                <input type="date" value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink"><MapPin className="h-4 w-4" /> Local de nascimento</span>
                <input value={form.placeOfBirth} onChange={(e) => update("placeOfBirth", e.target.value)} placeholder="Ex: Luanda" className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
              </label>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold text-ink">Documento de identificação</h2>
            <p className="mt-1 text-sm text-muted-foreground">Número do Bilhete de Identidade (BI).</p>
            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink"><FileText className="h-4 w-4" /> N.º do BI</span>
                <input value={form.biNumber} onChange={(e) => update("biNumber", e.target.value)} placeholder="Ex: 001234567LA049" className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
              </label>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold text-ink">Revê os teus dados</h2>
            <div className="mt-6 space-y-3 rounded-xl border border-border bg-muted/30 p-5 text-sm">
              {form.dateOfBirth && <div className="flex justify-between"><span className="text-muted-foreground">Data de nascimento</span><span className="font-medium text-ink">{new Date(form.dateOfBirth).toLocaleDateString("pt-AO")}</span></div>}
              {form.placeOfBirth && <div className="flex justify-between"><span className="text-muted-foreground">Local de nascimento</span><span className="font-medium text-ink">{form.placeOfBirth}</span></div>}
              {form.biNumber && <div className="flex justify-between"><span className="text-muted-foreground">N.º do BI</span><span className="font-medium text-ink">{form.biNumber}</span></div>}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Ao submeter, o teu pedido ficará pendente de aprovação pelo admin.</p>
          </>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="inline-flex items-center gap-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-ink transition hover:border-ink disabled:opacity-40">
            Voltar
          </button>
          {step < 2 ? (
            <button type="button" onClick={() => setStep(step + 1)} className="inline-flex items-center gap-1 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg">
              Continuar <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button type="button" onClick={submit} disabled={loading} className="inline-flex items-center gap-1 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50">
              {loading ? "A enviar..." : "Solicitar aprovação"}
            </button>
          )}
        </div>
      </Card>
    </>
  );
};

export { BecomeProvider };