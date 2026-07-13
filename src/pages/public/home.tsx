import { Link } from "react-router-dom";
import { PublicFooter } from "@/components/custom/publicFooter";
import { ArrowRight, Wrench, Zap, Paintbrush, Hammer, Sparkles, Wind, ShieldCheck, Star, MapPin, Phone, MessageCircle, ChevronRight, TrendingUp } from "lucide-react";

const services = [
  { icon: Wrench, label: "Canalizador" },
  { icon: Zap, label: "Eletricista" },
  { icon: Paintbrush, label: "Pintor" },
  { icon: Hammer, label: "Pedreiro" },
  { icon: Sparkles, label: "Limpeza" },
  { icon: Wind, label: "AC / Refr." },
];

const steps = [
  { n: "1", title: "Diz o que precisas", desc: "Descreve o serviço em segundos através da nossa app simples." },
  { n: "2", title: "Encontramos um profissional", desc: "Aceitamos o teu pedido e conectamos-te ao melhor técnico disponível." },
  { n: "3", title: "Resolvido", desc: "Acompanha em tempo real, avalia o serviço e faz o pagamento seguro." },
];

const trust = [
  { icon: ShieldCheck, label: "Profissionais verificados" },
  { icon: Star, label: "4.9 / 5 média" },
  { icon: Sparkles, label: "Resposta em minutos" },
];

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-[40px] pt-[64px] pb-12 flex flex-col md:flex-row items-center gap-[24px]">
        <div className="w-full md:w-1/2 flex flex-col items-start gap-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Activo em Luanda
          </div>

          <h1 className="text-[48px] leading-[56px] tracking-[-0.02em] font-semibold text-ink max-w-xl">
            Precisas de ajuda? Encontra um profissional em minutos.
          </h1>

          <p className="text-[18px] leading-[28px] text-muted-foreground max-w-lg">
            Canalizadores, electricistas e mais &mdash; perto de ti, verificados e prontos para resolver os teus problemas t&eacute;cnicos com precis&atilde;o e rapidez.
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              to="/auth/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
            >
              Pedir ajuda <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
            <Link
              to="/profissionais"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 text-sm font-medium text-ink transition hover:border-primary/40 hover:shadow-sm"
            >
              Tornar-se profissional
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-4">
            {trust.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <t.icon className="h-4 w-4 text-primary" />
                {t.label}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 relative h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-ink/5 to-transparent rounded-[48px] -rotate-2" />
          <div className="relative z-10 w-[320px] mx-auto h-[600px] bg-card rounded-[40px] border-[8px] border-ink shadow-2xl overflow-hidden flex flex-col">
            <div className="h-6 w-1/3 bg-ink mx-auto mt-2 rounded-full" />
            <div className="p-6 flex-1 flex flex-col gap-4">
              <div className="bg-primary-soft p-4 rounded-2xl border border-primary/20">
                <span className="text-[10px] uppercase text-primary font-bold tracking-widest">Pedido em curso</span>
                <h4 className="text-[20px] leading-[28px] font-semibold text-ink mt-1">Canalizador &bull; Talatona</h4>
                <div className="mt-4 flex items-center gap-3 bg-card p-3 rounded-xl shadow-sm border border-border">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-ink font-bold">JM</div>
                  <div className="flex-1">
                    <p className="text-[14px] leading-5 font-semibold tracking-[0.01em] text-ink">Jo&atilde;o Mateus</p>
                    <p className="text-[12px] leading-4 text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> 1,2 km
                    </p>
                  </div>
                  <span className="bg-success-soft text-success text-[10px] font-bold px-2 py-1 rounded-full">A caminho</span>
                </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-bold text-[14px] leading-5 text-ink">4.9</span>
                  <span className="text-muted-foreground text-[12px] ml-1">&middot; 142 serviços</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-muted py-3 rounded-xl text-ink text-[14px] leading-5 font-semibold tracking-[0.01em] flex items-center justify-center gap-2 transition hover:bg-border">
                  <Phone className="h-4 w-4" /> Ligar
                </button>
                <button className="flex-1 bg-success text-success-foreground py-3 rounded-xl text-[14px] leading-5 font-semibold tracking-[0.01em] flex items-center justify-center gap-2 transition hover:opacity-90">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </button>
              </div>

              <div className="mt-4 bg-muted p-4 rounded-2xl border border-border">
                <p className="text-[10px] uppercase text-muted-foreground font-bold">Status</p>
                <p className="font-bold text-[14px] leading-5 text-ink mt-1">Em andamento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-card py-[64px] border-y border-border">
        <div className="max-w-[1280px] mx-auto px-[40px]">
          <div className="text-center mb-12">
            <h2 className="text-[32px] leading-[40px] font-semibold text-ink mb-2">
              Servi&ccedil;os que resolvem o teu dia
            </h2>
            <p className="text-[16px] leading-6 text-muted-foreground">
              Escolhe e pede em segundos.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[24px]">
            {services.map((s) => (
              <Link
                key={s.label}
                to="/auth/register"
                className="group bg-card border border-border p-8 rounded-xl transition-all card-hover flex flex-col items-center gap-4 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary-soft flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <s.icon className="h-8 w-8" />
                </div>
                <span className="text-[14px] leading-5 font-semibold tracking-[0.01em] text-ink">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-[64px]">
        <div className="max-w-[1280px] mx-auto px-[40px]">
          <div className="text-center mb-16">
            <h2 className="text-[32px] leading-[40px] font-semibold text-ink mb-2">
              Como funciona
            </h2>
            <p className="text-[16px] leading-6 text-muted-foreground">
              Sem complica&ccedil;&otilde;es. Em 3 passos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent -z-0" />
            {steps.map((s) => (
              <div key={s.n} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-[24px] leading-8 mb-6 shadow-xl">
                  {s.n}
                </div>
                <h3 className="text-[24px] leading-8 font-semibold text-ink mb-2">{s.title}</h3>
                <p className="text-[16px] leading-6 text-muted-foreground max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro CTA */}
      <section className="max-w-[1280px] mx-auto px-[40px] pb-[64px]">
        <div className="bg-ink rounded-[32px] overflow-hidden relative p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
          <div className="relative z-10 flex-1 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white backdrop-blur mb-6">
              <Sparkles className="h-3.5 w-3.5" /> &Eacute;s Profissional?
            </span>
            <h2 className="text-[48px] leading-[56px] tracking-[-0.02em] font-semibold text-white mb-6">
              Cresce o teu neg&oacute;cio com a Biscatech.
            </h2>
            <p className="text-[18px] leading-[28px] text-white/70 mb-10">
              Recebe pedidos perto de ti. Sem mensalidade ou custos fixos. Pagas apenas uma pequena comiss&atilde;o sobre o que ganhas.
            </p>
            <Link
              to="/auth/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 text-sm font-medium text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Quero ser profissional <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="relative z-10 w-full md:w-auto">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 max-w-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white text-[20px] leading-[28px] font-semibold">Aumenta ganhos</h4>
                  <p className="text-white/70 text-[16px] leading-6">Mais de 500+ pedidos mensais.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-3/4 rounded-full" />
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/2 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
};

export { Home };
