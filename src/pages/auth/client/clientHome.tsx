import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon, WrenchIcon, LightningIcon, DropIcon, PaintRollerIcon, HammerIcon,
  FanIcon, ShieldCheckIcon, InfoIcon, ArrowRight } from "@phosphor-icons/react";
// import { PageHeader } from "@/components/nema/PageHeader";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Card } from "@/components";

const services = [
  { label: "Canalizador",     icon:      WrenchIcon,     category: "reparos" },
  { label: "Eletricista",     icon:   LightningIcon,     category: "reparos" },
  { label: "Fossa Séptica",   icon:        DropIcon,     category: "reparos" },
  { label: "Pintor",          icon: PaintRollerIcon,     category: "instalacoes" },
  { label: "Pedreiro",        icon:      HammerIcon,     category: "instalacoes" },
  { label: "Ar Condicionado", icon:       FanIcon,       category: "instalacoes" },
];

const tabs = [
  { id: "todos", label: "Todos" },
  { id: "reparos", label: "Reparos" },
  { id: "instalacoes", label: "Instalações" },
  { id: "emergencia", label: "Emergência" },
];

// const greeting = () => {
//   const h = new Date().getHours();
//   if (h < 12) return "Bom dia";
//   if (h < 19) return "Boa tarde";
//   return "Boa noite";
// };

function ClientHome () {
  // const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("todos");
  // const firstName = user?.name?.split(" ")[0] ?? "Cliente";
  const filtered = tab === "todos" ? services : services.filter((s) => s.category === tab);

  return (
    <main className="w-full grid grid-cols-10 gap-10 px-10">
      <section className="col-span-10 lg:col-span-7 space-y-6">
            {/* Search banner */}
            <div className="relative overflow-hidden rounded-2xl bg-primary-gradient p-8 lg:p-10 shadow-sm text-primary-foreground">
              <div className="absolute -top-16 -right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="relative max-w-2xl">
                <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight">
                  Que serviço precisa hoje?
                </h2>
                <p className="opacity-90 text-sm mt-2">Profissionais verificados a poucos minutos de si.</p>
                <div className="mt-6 relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Procurar canalizador, eletricista, limpeza…"
                    onFocus={() => navigate("/app/request/create")}
                    className="h-14 pl-12 pr-4 rounded-xl bg-background text-foreground border-0 shadow-sm text-base"
                  />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="bg-card border border-border/60 h-11 p-1 rounded-xl">
                {tabs.map((t) => (
                  <TabsTrigger key={t.id} value={t.id} className="rounded-lg px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Service grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filtered.map((s) => (
                <button
                  key={s.label}
                  onClick={() => navigate("/app/request/create", { state: { service: s.label } })}
                  className={cn(
                    "group flex flex-col items-start gap-4 p-5 rounded-2xl bg-card border border-border/60 shadow-sm",
                    "hover:border-primary/40 hover:-translate-y-0.5 transition-all text-left"
                  )}
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <s.icon weight="duotone" className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{s.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 inline-flex items-center gap-1">
                      Solicitar <ArrowRight className="h-3 w-3" />
                    </p>
                  </div>
                </button>
              ))}
            </div>
      </section>
      <section className="grid grid-rows-3 col-span-10 lg:col-span-3 space-y-6 h-full">
            <Card className="rounded-2xl row-span-1 bg-card border border-border/60 shadow-sm p-6">
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <ShieldCheckIcon weight="duotone" className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-foreground">Dicas de Segurança</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                Confirme sempre a identidade do profissional ao chegar. Todos os Nemma Pros têm BI verificado.
              </p>
            </Card>

            <Card className="rounded-2xl row-span-1 bg-card border border-border/60 shadow-sm p-6">
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <InfoIcon weight="duotone" className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-foreground">Como funciona</h3>
              <ol className="text-sm text-muted-foreground leading-relaxed mt-2 space-y-1.5 list-decimal pl-4">
                <li>Escolha o serviço</li>
                <li>Descreva o problema</li>
                <li>Receba um Pro em minutos</li>
              </ol>
            </Card>

            <Card className="rounded-2xl row-span-1 bg-card border border-border/60 shadow-sm p-6">
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <ShieldCheckIcon weight="duotone" className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-foreground">Dicas de Segurança</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                Confirme sempre a identidade do profissional ao chegar. Todos os Nemma Pros têm BI verificado.
              </p>
            </Card>
      </section>
    </main>
  );
};

export {ClientHome};
