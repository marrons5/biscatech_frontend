import {
  MagnifyingGlassIcon,
  WrenchIcon,
  LightningIcon,
  PaintBrushIcon,
  HammerIcon,
  BroomIcon,
  SnowflakeIcon,
  MapPinIcon,
  ClockIcon,
  CaretRightIcon,
  PlusIcon,
  DropIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";

// Componentes da nossa arquitetura e Shadcn UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// 1. MOCK DE DADOS (Sem dependência de backend)
const mockUser = {
  name: "Maria Silva",
  role: "cliente",
};

const activeJob = {
  id: "1",
  service: "Reparação de Fuga de Água",
  pro: "João Mateus",
  initials: "JM",
  status: "in_progress",
  eta: "Chega em ~12 min",
};

// Dados estruturados para as Tabs
const categoryServices = {
  reparo: [
    { icon: DropIcon, label: "Canalizador" },
    { icon: LightningIcon, label: "Eletricista" },
    { icon: HammerIcon, label: "Pedreiro" },
    { icon: HammerIcon, label: "Pedreiro" },
  ],
  instalacao: [
    { icon: SnowflakeIcon, label: "Ar Condicionado" },
    { icon: LightningIcon, label: "Quadro Elétrico" },
    { icon: WrenchIcon, label: "Eletrodomésticos" },
    { icon: HammerIcon, label: "Pedreiro" },

  ],
  manutencao: [
    { icon: BroomIcon, label: "Limpeza" },
    { icon: PaintBrushIcon, label: "Pintor" },
    { icon: SnowflakeIcon, label: "Filtros AC" },
    { icon: SnowflakeIcon, label: "Filtros AC" },

  ],
  emergencia: [
    { icon: DropIcon, label: "Cano Roto" },
    { icon: LightningIcon, label: "Curto-Circuito" },
    { icon: WarningCircleIcon, label: "Desentupimento" },
    { icon: WarningCircleIcon, label: "Desentupimento" },
  ],
};

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 19) return "Boa tarde";
  return "Boa noite";
};

const ClientDashboard = () => {
  // const navigate = useNavigate();
  const firstName = mockUser.name.split(" ")[0];

  return (
    <section className="bg-slate-50 flex gap-10 p-20 w-full">
      <section className="flex flex-col w-7/10">
        <div>
          <Card className="bg-gradient-to-br rounded-lg from-primary via-primary/80 to-primary/60 w-full">
            <CardHeader className="text-white">
              <span>Resolve agora</span>
              <CardTitle>Que serviço precisas?</CardTitle>
            </CardHeader>
            <CardContent>
              <button
                // onClick={() => navigate("/client/catalog")}
                className="w-full flex items-center gap-3 bg-white border border-slate-200 rounded-2xl h-14 px-4 shadow-sm hover:border-primary/50 transition-all active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <MagnifyingGlassIcon
                  className="size-5 text-primary"
                  weight="bold"
                />
                <span className="text-sm font-medium text-slate-400 flex-1 text-left">
                  Ex: torneira a pingar, luz falhou...
                </span>
                <div className="size-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
                  <PlusIcon className="size-4" weight="bold" />
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
        <div>
          <Tabs defaultValue="reparo" className="flex justify-between w-full">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-500 ">
                Serviços
              </h2>

            <TabsList className="flex bg-transparent p-0 gap-2 mb-4 justify-start sm:justify-between">
              <TabsTrigger
                value="reparo"
                className="rounded-full px-4 py-2 border border-slate-200 bg-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary shadow-sm whitespace-nowrap"
              >
                Reparo
              </TabsTrigger>
              <TabsTrigger
                value="instalacao"
                className="rounded-full px-4 py-2 border border-slate-200 bg-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary shadow-sm whitespace-nowrap"
              >
                Instalação
              </TabsTrigger>
              <TabsTrigger
                value="manutencao"
                className="rounded-full px-4 py-2 border border-slate-200 bg-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary shadow-sm whitespace-nowrap"
              >
                Manutenção
              </TabsTrigger>
              <TabsTrigger
                value="emergencia"
                className="rounded-full px-4 py-2 border border-red-100 bg-destructive/20 text-destructive data-[state=active]:bg-destructive data-[state=active]:text-white data-[state=active]:border-destructive shadow-sm whitespace-nowrap"
              >
                Urgência
              </TabsTrigger>
            </TabsList>
            </div>


            {Object.entries(categoryServices).map(([key, services]) => (
              <TabsContent key={key} value={key} className="mt-0 outline-none">
                <div className="grid grid-cols-4 gap-3">
                  {services.map((s) => (
                    <Card
                      key={s.label}
                      className={cn(
                        "cursor-pointer transition-all active:scale-95 rounded-lg shadow-sm border-slate-200",
                        key === "emergencia"
                          ? "hover:border-red-500"
                          : "hover:border-primary",
                      )}
                      // onClick={() => navigate("/client/catalog", { state: { service: s.label } })}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-4 gap-3">
                        <div
                          className={cn(
                            "size-10 rounded-full flex items-center justify-center",
                            key === "emergencia"
                              ? "bg-red-100 text-red-600"
                              : "bg-primary/10 text-primary",
                          )}
                        >
                          <s.icon className="size-5" weight="fill" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                          {s.label}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}

          </Tabs>
        </div>
        <div>
        <Button
          variant="ghost"
          className="w-full mt-4 text-primary font-bold hover:bg-primary/10"
          // onClick={() => navigate("/client/catalog")}
        >
          Ver todo o catálogo{" "}
          <CaretRightIcon className="ml-1 size-4" weight="bold" />
        </Button>
        </div>
      </section>

      <section className="w-3/10 flex flex-col gap-5">
        <div className="flex flex-col gap-2.5">
        
        </div>

      {activeJob && (
        <section className="mb-8">
              <h2 className="text-sm font-bold mb-3 text-slate-500 uppercase tracking-wider">Pedido Ativo</h2>
              <Card 
                className="relative border border-primary/20 rounded-lg bg-primary/5 hover:border-primary/50 transition-colors shadow-sm cursor-pointer"
                // onClick={() => navigate(`/client/requests/${activeJob.id}`)}
              >
                <CardContent className="p-4">
                  <Badge variant="secondary" className="absolute top-4 right-4 bg-white text-primary border border-primary/20 text-[10px] shadow-sm">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse mr-1.5" />
                    EM ANDAMENTO
                  </Badge>
                  
                  <div className="flex items-center gap-4 pr-24 mb-4">
                    <div className="size-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                      {activeJob.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500 font-medium truncate">{activeJob.service}</p>
                      <p className="font-bold text-slate-900 truncate">{activeJob.pro}</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-primary/10 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <ClockIcon className="size-4 text-primary" weight="fill" /> 
                      {activeJob.eta}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-primary">
                      Acompanhar <CaretRightIcon className="size-4" weight="bold" />
                    </span>
                  </div>
                </CardContent>
              </Card>
        </section>
      )}
      </section>
      


      {/* <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1 w-full font-medium">
        <MapPinIcon className="size-3.5" weight="fill" /> A mostrar serviços em
        Luanda, Belas
      </p> */}
    </section>
  );
};

export { ClientDashboard };
