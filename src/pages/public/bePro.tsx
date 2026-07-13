import { Link } from "react-router-dom";
import { TrendingUp, Calendar, Wallet, Bell, ArrowRight, Sparkles } from "lucide-react";
import { PublicFooter } from "@/components/custom/publicFooter";

const benefits = [
  { icon: TrendingUp, title: "Mais clientes", desc: "Pedidos da tua zona, todos os dias." },
  { icon: Calendar, title: "Tu controlas", desc: "Aceita só os trabalhos que queres." },
  { icon: Wallet, title: "Sem mensalidade", desc: "Pagas apenas quando ganhas." },
  { icon: Bell, title: "Notificações em tempo real", desc: "Não percas nenhuma oportunidade." },
];

const BePro = () => {
  return (
    <div className="min-h-screen">
      <section className="max-w-[1280px] mx-auto px-[40px] py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Para Profissionais
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Cresce o teu neg&oacute;cio com a Biscatech.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
            Recebe pedidos perto de ti, organiza a tua agenda e ganha mais &mdash; sem custos fixos.
          </p>
          <Link
            to="/auth/register"
            className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
          >
            Come&ccedil;ar agora <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 card-hover">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-ink">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <PublicFooter />
    </div>
  );
};

export { BePro };
