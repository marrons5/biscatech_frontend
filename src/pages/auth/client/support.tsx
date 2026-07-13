import { PageHeader, Card } from "@/components/custom/primitives";
import { LifeBuoy, MessageCircle, Phone, Mail, ChevronDown, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supportService } from "@/services/supportService";

const faqs = [
  { q: "Como cancelo um pedido?", a: "Abre o pedido em 'Meus pedidos' e escolhe 'Cancelar pedido'. Podes cancelar sem custo até o profissional estar a caminho." },
  { q: "O profissional não apareceu, e agora?", a: "Contacta o profissional pelo chat ou telefone. Se não houver resposta, cancela e a nossa equipa activa o processo de compensação." },
  { q: "Como avalio um serviço?", a: "Após a confirmação de conclusão, receberás uma notificação para avaliar. Também podes avaliar em 'Avaliações'." },
  { q: "Os pagamentos são feitos na plataforma?", a: "Não. Combinas o pagamento directamente com o profissional." },
];

export default function Support() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const [complaintSubject, setComplaintSubject] = useState("");
  const [complaintDesc, setComplaintDesc] = useState("");
  const [sendingComplaint, setSendingComplaint] = useState(false);

  const sendComplaint = async () => {
    if (!complaintSubject.trim() || !complaintDesc.trim()) {
      toast.error("Preenche o assunto e a descrição.");
      return;
    }
    setSendingComplaint(true);
    try {
      await supportService.createComplaint({ subject: complaintSubject.trim(), description: complaintDesc.trim() });
      toast.success("Reclamação registada! A nossa equipa vai analisar.");
      setComplaintSubject("");
      setComplaintDesc("");
    } catch {
      toast.error("Erro ao registar reclamação.");
    }
    setSendingComplaint(false);
  };

  const sendTicket = async () => {
    if (!subject.trim() || !message.trim()) {
      toast.error("Preenche o assunto e a mensagem.");
      return;
    }
    setSending(true);
    try {
      await supportService.createTicket({ subject: subject.trim(), message: message.trim() });
      toast.success("Ticket enviado! Responderemos em até 24h.");
      setSubject("");
      setMessage("");
    } catch {
      toast.error("Erro ao enviar ticket.");
    }
    setSending(false);
  };

  return (
    <>
      <PageHeader title="Suporte" subtitle="A nossa equipa está pronta a ajudar." />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <h2 className="text-lg font-semibold text-ink">Perguntas frequentes</h2>
          <div className="mt-5 space-y-2">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-border p-4 transition hover:border-primary/40">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-6">
            <h3 className="text-base font-semibold text-ink">Abrir ticket</h3>
            <p className="mt-1 text-sm text-muted-foreground">Descreve o teu problema e responderemos em até 24h.</p>
            <div className="mt-4 space-y-3">
              <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Assunto" className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Descreve o teu problema..." className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary" />
              <button onClick={sendTicket} disabled={sending} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 hover:-translate-y-0.5 transition disabled:opacity-50">
                {sending ? "A enviar..." : "Enviar ticket"}
              </button>
            </div>
          </div>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <h3 className="flex items-center gap-2 text-base font-semibold text-ink"><AlertTriangle className="h-5 w-5 text-danger" /> Reclamar de um serviço</h3>
          <p className="mt-1 text-sm text-muted-foreground">Se tiveste um problema com um profissional, regista aqui a tua reclamação.</p>
          <div className="mt-4 space-y-3">
            <input id="complaint-subject" value={complaintSubject} onChange={(e) => setComplaintSubject(e.target.value)} placeholder="Assunto" className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary" />
            <textarea id="complaint-desc" value={complaintDesc} onChange={(e) => setComplaintDesc(e.target.value)} rows={3} placeholder="Descreve o que aconteceu..." className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary" />
            <button onClick={sendComplaint} disabled={sendingComplaint} className="rounded-xl bg-danger px-5 py-2.5 text-sm font-medium text-danger-foreground shadow-sm hover:-translate-y-0.5 transition disabled:opacity-50">
              {sendingComplaint ? "A enviar..." : "Registar reclamação"}
            </button>
          </div>
        </Card>
        <Card>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><LifeBuoy className="h-5 w-5" /></span>
            <h3 className="mt-4 text-base font-semibold text-ink">Contactos directos</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> <span>+244 923 000 000</span></li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> <span>ajuda@biscatech.co</span></li>
              <li className="flex items-center gap-3"><MessageCircle className="h-4 w-4 text-primary" /> <span>Chat 24/7</span></li>
            </ul>
          </Card>
          <Card className="bg-primary text-primary-foreground border-none">
            <h3 className="text-base font-semibold">Emergência?</h3>
            <p className="mt-1 text-sm text-white/80">Serviços urgentes têm resposta prioritária em menos de 10 min.</p>
            <button className="mt-4 w-full rounded-xl bg-white py-2.5 text-sm font-medium text-primary">Pedir emergência</button>
          </Card>
        </div>
    </>
  );
}
