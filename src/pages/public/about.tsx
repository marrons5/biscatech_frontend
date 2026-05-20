import { CheckCircle2, ShieldCheck, Zap, Users } from "lucide-react";
import { PublicNav } from "@/components/custom/publicNav";
import { PublicFooter } from "@/components/custom/publicFooter";

const features = [
  {
    icon: Zap,
    title: "Rápido",
    desc: "Recebes propostas em minutos, não dias.",
  },
  {
    icon: ShieldCheck,
    title: "Confiável",
    desc: "Profissionais verificados e avaliados pela comunidade.",
  },
  {
    icon: Users,
    title: "Local",
    desc: "Encontra quem está perto de ti em Luanda.",
  },
  {
    icon: CheckCircle2,
    title: "Simples",
    desc: "Pedes, escolhes, pagas. Sem burocracia.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <section className=" py-16 md:py-24 text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold mb-4">
          SOBRE A NEMA
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Serviços locais, sem fricção.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
          A nema nasceu para ligar quem precisa de ajuda a quem sabe resolver —
          rápido, perto e com confiança.
        </p>
      </section>
      <section className="px-12 pb-16 grid md:grid-cols-2 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="p-6 rounded-3xl bg-card border border-border/60 shadow-card">
            <div className="h-12 w-12 rounded-full bg-blue-400/10 flex items-center justify-center mb-4">
              <f.icon className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold">{f.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
          </div>
        ))}
      </section>
      <PublicFooter />
    </div>
  );
};

export {About};
