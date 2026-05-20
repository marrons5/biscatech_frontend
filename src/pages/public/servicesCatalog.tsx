import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon, WrenchIcon, LightningIcon, DropIcon, PlusIcon,
  ArrowRightIcon, PlusCircleIcon, ClockIcon,
  GearIcon, MonitorIcon, SnowflakeIcon, HouseLineIcon,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components";

type Intent = "reparacao" | "manutencao" | "instalacao" | "emergencia";

const intents: { id: Intent; label: string; activeClass: string }[] = [
  { id: "reparacao",  label: "Reparação",   activeClass: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" },
  { id: "manutencao", label: "Manutenção",  activeClass: "data-[state=active]:bg-warning data-[state=active]:text-primary-foreground" },
  { id: "instalacao", label: "Instalação",  activeClass: "data-[state=active]:bg-success data-[state=active]:text-primary-foreground" },
  { id: "emergencia", label: "Emergência",  activeClass: "data-[state=active]:bg-destructive data-[state=active]:text-primary-foreground" },
];

const intentTheme: Record<Intent, { border: string; text: string; bg: string; ring: string }> = {
  reparacao:  { border: "group-hover:border-primary",     text: "group-hover:text-primary",     bg: "group-hover:bg-primary",     ring: "group-hover:bg-primary/10" },
  manutencao: { border: "group-hover:border-warning",     text: "group-hover:text-warning",     bg: "group-hover:bg-warning",     ring: "group-hover:bg-warning/10" },
  instalacao: { border: "group-hover:border-success",     text: "group-hover:text-success",     bg: "group-hover:bg-success",     ring: "group-hover:bg-success/10" },
  emergencia: { border: "group-hover:border-destructive", text: "group-hover:text-destructive", bg: "group-hover:bg-destructive", ring: "group-hover:bg-destructive/10" },
};

const sections = [
  {
    id: "canalizacao", label: "Canalização", icon: DropIcon,
    services: [
      { name: "Desentupimento de canos", desc: "Resolução rápida de bloqueios", price: "8.000 – 15.000 Kz" },
      { name: "Reparação de torneiras",  desc: "Troca e vedação de torneiras",   price: "5.000 – 10.000 Kz" },
      { name: "Instalação de chuveiro",  desc: "Montagem de novo chuveiro",      price: "10.000 – 18.000 Kz" },
      { name: "Detecção de fugas",       desc: "Inspecção e reparo",              price: "12.000 – 20.000 Kz" },
    ],
  },
  {
    id: "eletricidade", label: "Eletricidade", icon: LightningIcon,
    services: [
      { name: "Instalação de tomadas",   desc: "Pontos novos com norma",         price: "6.000 – 12.000 Kz" },
      { name: "Quadro eléctrico",        desc: "Revisão e disjuntores",          price: "15.000 – 30.000 Kz" },
      { name: "Pontos de luz",           desc: "Lustres e candeeiros",            price: "5.000 – 10.000 Kz" },
      { name: "Curto-circuito",          desc: "Diagnóstico e reparo",            price: "10.000 – 20.000 Kz" },
    ],
  },
  {
    id: "mecanica", label: "Mecânica", icon: GearIcon,
    services: [
      { name: "Portões automáticos",     desc: "Reparação e instalação",         price: "20.000 – 40.000 Kz" },
      { name: "Bombas de água",          desc: "Manutenção e troca",              price: "15.000 – 30.000 Kz" },
      { name: "Estores e persianas",     desc: "Reparação mecânica",              price: "8.000 – 15.000 Kz" },
      { name: "Fechaduras",              desc: "Substituição e ajuste",           price: "5.000 – 12.000 Kz" },
    ],
  },
  {
    id: "frio", label: "Frio", icon: SnowflakeIcon,
    services: [
      { name: "Ar condicionado split",   desc: "Instalação completa",             price: "25.000 – 50.000 Kz" },
      { name: "Carga de gás",            desc: "Recarga e teste",                 price: "12.000 – 20.000 Kz" },
      { name: "Manutenção de arca",      desc: "Frigoríficos e congeladores",     price: "10.000 – 18.000 Kz" },
      { name: "Câmaras frigoríficas",    desc: "Serviço industrial",              price: "Sob orçamento" },
    ],
  },
  {
    id: "eletronicos", label: "Eletrónicos", icon: MonitorIcon,
    services: [
      { name: "TV e Home cinema",        desc: "Instalação e configuração",       price: "8.000 – 18.000 Kz" },
      { name: "Antenas e satélite",      desc: "Alinhamento e setup",             price: "10.000 – 20.000 Kz" },
      { name: "Computadores",            desc: "Reparação e formatação",          price: "8.000 – 15.000 Kz" },
      { name: "Câmaras de vigilância",   desc: "CCTV completo",                   price: "25.000 – 60.000 Kz" },
    ],
  },
  {
    id: "construcao", label: "Construção", icon: HouseLineIcon,
    services: [
      { name: "Pintura interior",        desc: "Acabamento profissional",         price: "Sob orçamento" },
      { name: "Alvenaria",               desc: "Pequenas obras e reparos",        price: "Sob orçamento" },
      { name: "Tectos falsos",           desc: "Pladur e isolamento",             price: "Sob orçamento" },
      { name: "Pavimentos",              desc: "Cerâmica e flutuante",            price: "Sob orçamento" },
    ],
  },
];

interface Props {
  embedded?: boolean;
}

const ServicesCatalog = ({ embedded = false }: Props) => {
  const navigate = useNavigate();
  const [intent, setIntent] = useState<Intent>("reparacao");
  const [query, setQuery] = useState("");

  const theme = intentTheme[intent];
  const q = query.trim().toLowerCase();

  const visibleSections = useMemo(() => {
    if (!q) return sections;
    return sections
      .map((s) => ({ ...s, services: s.services.filter((sv) => sv.name.toLowerCase().includes(q)) }))
      .filter((s) => s.services.length > 0);
  }, [q]);

  return (
    <main className={cn("bg-background", !embedded && "min-h-screen")}>
      <div className={cn("mx-auto px-6 lg:px-8", embedded ? "max-w-none" : "max-w-7xl", "py-6")}>
        {/* HEADER ROW — naked over background */}
        <section className="grid grid-cols-10 gap-6 items-center mb-6">
          {/* Left 7/10 */}
          <div className="col-span-10 lg:col-span-7 flex flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Catálogo de Serviços
            </h1>
            <Tabs value={intent} onValueChange={(v) => setIntent(v as Intent)}>
              <TabsList className="bg-card border border-border h-10 p-1 rounded-xl">
                {intents.map((t) => (
                  <TabsTrigger
                    key={t.id}
                    value={t.id}
                    className={cn("rounded-lg px-3 text-xs font-semibold transition-colors", t.activeClass)}
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Right 3/10 */}
          <div className="col-span-10 lg:col-span-3 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar serviços…"
              className="h-10 w-full pl-9 rounded-xl bg-card border-border"
            />
          </div>
        </section>

        {/* SECTIONS */}
        <section className="flex flex-col gap-5">
          {visibleSections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <Card className="rounded-2xl shadow-sm px-5" key={section.id}>
                <div className="flex items-center gap-2 mb-3">
                  <SectionIcon weight="duotone" className="h-5 w-5 text-foreground" />
                  <h2 className="text-base font-bold text-foreground">{section.label}</h2>
                </div>

                <div className="grid grid-cols-10 gap-6 items-stretch">
                  {/* Left 7/10 — services grid 2 cols */}
                  <div className="col-span-10 lg:col-span-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                      {section.services.map((sv) => (
                        <button
                          key={sv.name}
                          onClick={() => navigate("/app/request/create", { state: { service: sv.name, intent } })}
                          className={cn(
                            "group text-left rounded-2xl bg-card border border-border p-4 transition-all",
                            "hover:-translate-y-0.5 hover:shadow-soft",
                            theme.border
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className={cn("font-bold text-foreground transition-colors", theme.text)}>
                                {sv.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">{sv.desc}</p>
                              <p className="text-xs font-semibold text-foreground/70 mt-2 inline-flex items-center gap-1">
                                <ClockIcon className="h-3 w-3" /> {sv.price}
                              </p>
                            </div>
                            <div
                              className={cn(
                                "h-8 w-8 shrink-0 rounded-lg bg-muted text-muted-foreground flex items-center justify-center transition-colors",
                                theme.bg, "group-hover:text-white"
                              )}
                            >
                              <ArrowRightIcon className="h-4 w-4" />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right 3/10 — Custom service */}
                  <div className="col-span-10 lg:col-span-3">
                    <div
                      className="bg-primary-gradient h-full rounded-2xl p-5 flex flex-col justify-between text-white shadow-soft"
                    >
                      <div>
                        <div className="h-10 w-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center mb-3">
                          <PlusCircleIcon weight="duotone" className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="font-bold text-white leading-tight">
                          Serviço Personalizado
                        </h3>
                        <p className="text-xs text-white/80 mt-1.5 leading-relaxed">
                          Precisa de algo específico em {section.label.toLowerCase()}? Descreva o seu pedido e receba um Pro.
                        </p>
                      </div>
                      <Button
                        onClick={() => navigate("/app/request/create", { state: { category: section.label, intent, custom: true } })}
                        className="mt-4 bg-white rounded-sm text-foreground hover:bg-white/90 w-full"
                        >
                        <PlusIcon className="h-4 w-4" /> Solicitar Agora
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}

          {visibleSections.length === 0 && (
            <div className="text-center py-16">
              <WrenchIcon weight="duotone" className="h-14 w-14 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Nenhum serviço encontrado para “{query}”.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export { ServicesCatalog };