import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  Sparkles,
  Wind,
  ShieldCheck,
  Clock,
  Star,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicNav } from "@/components/custom/publicNav";
import { PublicFooter } from "@/components/custom/publicFooter";

const services = [
  { icon: Wrench, label: "Canalizador" },
  { icon: Zap, label: "Eletricista" },
  { icon: Paintbrush, label: "Pintor" },
  { icon: Hammer, label: "Pedreiro" },
  { icon: Sparkles, label: "Limpeza" },
  { icon: Wind, label: "AC / Refr." },
];

const steps = [
  {
    n: "1",
    title: "Diz o que precisas",
    desc: "Descreve o serviço em segundos.",
  },
  {
    n: "2",
    title: "Encontramos um profissional",
    desc: "Aceitamos o pedido em minutos.",
  },
  { n: "3", title: "Resolvido", desc: "Acompanha em tempo real e avalia." },
];

const trust = [
  { icon: ShieldCheck, label: "Profissionais verificados" },
  { icon: Clock, label: "Resposta em minutos" },
  { icon: Star, label: "4.9 / 5 média" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/15 blur-3xl animate-float-slow" />
        <div className="px-12 relative pt-12 pb-16 md:pt-20 md:pb-24 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-400/10 text-blue-400 text-xs  mb-4 b">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              ACTIVO EM LUANDA
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance">
              Precisas de ajuda?
              <br />
              <span className="title-gradient  ">
                Encontra um profissional
              </span>{" "}
              em minutos.
            </h1>
            <p className="mt-5 text-lg text-zinc-400 max-w-lg">
              Canalizadores, electricistas e mais — perto de ti, verificados e
              prontos para resolver.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="bg-blue-950 text-white p-5 rounded-4xl">
                <Link to="/auth/register">
                  Pedir ajuda <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-4xl p-5">
                <Link to="/profissionais">Tornar-se profissional</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {trust.map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-2 text-xs  text-zinc-400">
                  <t.icon className="h-4 w-4 text-blue-400" /> {t.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto">
            <div className="absolute inset-0 bg-white rounded-[3rem] blur-3xl opacity-30" />
            <div className="relative w-[280px] md:w-[320px] aspect-[9/19] rounded-[3rem] bg-card border-[10px] border-black shadow-float overflow-hidden">
              <div className="bg-gradient-hero p-5 text-primary-foreground">
                <p className="text-xs opacity-90 text-white">Pedido em curso</p>
                <p className="font-bold text-white">Canalizador · Talatona</p>
                <div className="mt-4 flex items-center gap-3 bg-white/15 backdrop-blur rounded-2xl p-3">
                  <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center font-extrabold">
                    <span className="text-white">JM</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-white">João Mateus</p>
                    <p className="text-[11px] opacity-85 inline-flex items-center gap-1 text-white ">
                      <MapPin className="h-3 w-3 text-white" /> 1,2 km
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold text-white">
                    A caminho
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-zinc-400/10">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-bold ">4.9</span>
                  <span className="text-xs text-muted-foreground ">
                    · 142 serviços
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-2xl p-4 border-2 border-zinc-300 ">
                    <Phone className="h-3.5 w-3.5" /> Ligar
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-2xl bg-green-500 text-white p-4">
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </Button>
                </div>
                <div className="rounded-2xl bg-accent p-3 bg-slate-400/20">
                  <p className="text-[11px] font-bold text-accent-foreground uppercase tracking-wider text-blue-900">
                    Status
                  </p>
                  <p className="text-sm font-bold text-foreground mt-1">
                    Em andamento
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="px-12 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Serviços que resolvem o teu dia
          </h2>
          <p className="text-muted-foreground mt-2">
            Escolhe e pede em segundos.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {services.map((s) => (
            <Link
              key={s.label}
              to="/auth/register"
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-card border border-border/60 shadow-card hover:border-blue-400 hover:shadow-soft hover:-translate-y-1 transition-all">
              <div className="h-12 w-12 rounded-full  bg-accent flex items-center justify-center bg-blue-400/10 group-hover:bg-blue-400 group-hover:text-white  transition-colors">
                <s.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <span className="font-bold text-sm">{s.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/40 py-16 border-y border-border/60">
        <div className="px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Como funciona
            </h2>
            <p className="text-muted-foreground mt-2">
              Sem complicações. Em 3 passos.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((s) => (
              <div
                key={s.n}
                className="relative p-6 rounded-3xl bg-card border border-border/60 shadow-card">
                <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-extrabold shadow-glow text-lg text-white">
                  {s.n}
                </div>
                <h3 className="mt-4 font-bold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro CTA */}
      <section className="px-12 py-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-hero p-10 md:p-14 shadow-glow text-primary-foreground">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary-deep/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs text-white font-bold mb-3">
              ÉS PROFISSIONAL?
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
              Cresce o teu negócio com a nema.
            </h2>
            <p className="mt-3 text-lg opacity-90 max-w-md text-white">
              Recebe pedidos perto de ti. Sem mensalidade. Pagas apenas quando
              ganhas.
            </p>
            <Button
              asChild
              className="mt-6 bg-white text-foreground hover:bg-secondary p-6 rounded-4xl">
              <Link to="/auth/register">
                Quero ser profissional <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export { Home };
