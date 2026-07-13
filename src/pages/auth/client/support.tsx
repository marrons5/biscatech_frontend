import { PageHeader, Card } from "@/components/custom/primitives";
import { LifeBuoy, MessageCircle, Phone, Mail, ChevronDown } from "lucide-react";

const faqs = [
  { q: "Como cancelo um pedido?", a: "Abre o pedido em 'Meus pedidos' e escolhe 'Cancelar pedido'. Podes cancelar sem custo até o profissional estar a caminho." },
  { q: "O profissional não apareceu, e agora?", a: "Contacta o profissional pelo chat ou telefone. Se não houver resposta, cancela e a nossa equipa activa o processo de compensação." },
  { q: "Como avalio um serviço?", a: "Após a confirmação de conclusão, receberás uma notificação para avaliar. Também podes avaliar em 'Avaliações'." },
  { q: "Os pagamentos são feitos na plataforma?", a: "Não. Combinas o pagamento directamente com o profissional." },
];

export default function Support() {
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
              <input placeholder="Assunto" className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary" />
              <textarea rows={4} placeholder="Descreve o teu problema..." className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary" />
              <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 hover:-translate-y-0.5 transition">Enviar ticket</button>
            </div>
          </div>
        </Card>
        <div className="space-y-6">
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
      </div>
    </>
  );
}
