import { PageHeader, Card } from "@/components/custom/primitives";
import { LifeBuoy, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supportService } from "@/services/supportService";

export default function ProSupport() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!subject || !message) {
      toast.error("Preenche o assunto e a mensagem.");
      return;
    }
    setLoading(true);
    try {
      await supportService.createTicket({ subject, message });
      toast.success("Ticket enviado! Responderemos em breve.");
      setSubject("");
      setMessage("");
    } catch {
      toast.error("Erro ao enviar ticket.");
    }
    setLoading(false);
  };

  // I need to add createTicket to supportService. Let me also check if it exists...
  // Actually, the backend support module has POST /tickets, but does the frontend have it?
  // Let me check supportService.ts

  return (
    <>
      <PageHeader title="Suporte profissional" subtitle="Estamos aqui para te ajudar a crescer." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><LifeBuoy className="h-5 w-5" /></span>
          <h3 className="mt-4 text-lg font-semibold text-ink">Contactos</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +244 923 111 111</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> pros@biscatech.co</li>
          </ul>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-ink">Abrir ticket</h3>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Assunto" className="mt-3 w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary" />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Descreve o teu problema..." className="mt-3 w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary" />
          <button onClick={send} disabled={loading} className="mt-3 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">{loading ? "A enviar..." : "Enviar"}</button>
        </Card>
      </div>
    </>
  );
}
