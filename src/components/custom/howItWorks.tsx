const steps = [
  {
    n: "1",
    title: "Descreve o problema",
    desc: "Diz-nos o que precisas em segundos.",
  },
  {
    n: "2",
    title: "Recebe propostas",
    desc: "Profissionais perto de ti respondem.",
  },
  { n: "3", title: "Avalia o serviço", desc: "Ajuda a comunidade a crescer." },
];

export const HowItWorks = () => {
  return (
    <section className="container max-w-md py-6">
      <div className="flex items-end justify-between mb-3">
        <h2 className="text-lg font-bold text-foreground">Como funciona</h2>
        <span className="text-xs font-semibold text-primary">3 passos</span>
      </div>

      <div className="space-y-2.5">
        {steps.map((s) => (
          <div
            key={s.n}
            className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/60 shadow-card">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-hero flex items-center justify-center text-primary-foreground font-extrabold shadow-glow">
              {s.n}
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};