import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Calendar, Wallet, Bell } from "lucide-react";
import { PublicFooter } from "@/components/custom/publicFooter";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: TrendingUp,
    title: "Mais clientes",
    desc: "Pedidos da tua zona, todos os dias.",
  },
  {
    icon: Calendar,
    title: "Tu controlas",
    desc: "Aceita só os trabalhos que queres.",
  },
  {
    icon: Wallet,
    title: "Sem mensalidade",
    desc: "Pagas apenas quando ganhas.",
  },
  {
    icon: Bell,
    title: "Notificações em tempo real",
    desc: "Não percas nenhuma oportunidade.",
  },
];

const BePro = () => {
  return (
    <div className="min-h-screen">
    
      <section className="px-12 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold mb-4">
            PARA PROFISSIONAIS
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Cresce o teu negócio com a nema.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Recebe pedidos perto de ti, organiza a tua agenda e ganha mais — sem
            custos fixos.
          </p>
          <Button asChild variant="default" className="mt-7">
            <Link to="/auth/register">
              Começar agora <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="p-6 rounded-3xl bg-card border border-border/60 shadow-card flex gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary-gradient flex items-center justify-center shrink-0 shadow-glow">
                <b.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold">{b.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
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
