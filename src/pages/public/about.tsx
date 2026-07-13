import { ShieldCheck, Sparkles, Star } from "lucide-react";
import { PublicFooter } from "@/components/custom/publicFooter";

const About = () => {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 text-center px-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Sobre a Biscatech
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink">
          Servi&ccedil;os locais, sem fric&ccedil;&atilde;o.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
          A Biscatech nasceu para ligar quem precisa de ajuda a quem sabe resolver &mdash; r&aacute;pido, perto e com confian&ccedil;a.
        </p>
      </section>

      <section className="max-w-[1280px] mx-auto px-[40px] pb-16 grid md:grid-cols-3 gap-6">
        {[
          { icon: ShieldCheck, title: "Profissionais verificados", desc: "Todos os profissionais passam por um processo de verificação de identidade." },
          { icon: Star, title: "Avaliações reais", desc: "Média de 4,9 em mais de 12 mil avaliações de clientes reais." },
          { icon: Sparkles, title: "Resposta rápida", desc: "Tempo médio de resposta de 24 minutos para pedidos urgentes." },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-card p-6 card-hover">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary mb-4">
              <f.icon className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-semibold text-ink">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>
      <PublicFooter />
    </div>
  );
};

export { About };
