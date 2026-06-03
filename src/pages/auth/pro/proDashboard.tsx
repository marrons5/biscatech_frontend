import { useCallback, useMemo, useState } from "react";

import {
  WrenchIcon,
  MapPinIcon,
  CalendarBlankIcon,
  CurrencyCircleDollarIcon,
  BellSlashIcon,
} from "@phosphor-icons/react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type BadgeVariant = "blue" | "green" | "orange" | "red";
type BackgroundColorVariant = "bg-primary" | "bg-success" | "bg-warning" | "bg-destructive";
type BackgroundGradientVariant = "bg-primary-gradient" | "bg-success-gradient" | "bg-warning-gradient" | "bg-destructive-gradient";
type TextColorVariant = "text-primary" | "text-success" | "text-warning" | "text-destructive";
type BorderColorVariant = "border-primary" | "border-success" | "border-warning" | "border-destructive";

type CardTheme = {
  badgeVariant: BadgeVariant;
  backgroundColorVariant: BackgroundColorVariant;
  backgroundGradientVariant: BackgroundGradientVariant;
  textColorVariant: TextColorVariant;
  borderColorVariant: BorderColorVariant
};

const selectCardTheme = (serviceType: string): CardTheme | undefined => {
  switch (serviceType) {
    case "repair":
      return {
        badgeVariant: "blue",
        backgroundColorVariant: "bg-primary",
        backgroundGradientVariant: "bg-primary-gradient",
        textColorVariant: "text-primary",
        borderColorVariant: "border-primary"
      };
    case "installation":
      return {
        badgeVariant: "green",
        backgroundColorVariant: "bg-success",
        backgroundGradientVariant: "bg-success-gradient",
        textColorVariant: "text-success",
        borderColorVariant: "border-success"
      };
    case "maintenance":
      return {
        badgeVariant: "orange",
        backgroundColorVariant: "bg-warning",
        backgroundGradientVariant: "bg-warning-gradient",
        textColorVariant: "text-warning",
        borderColorVariant: "border-warning"
      };
    case "emergency":
      return {
        badgeVariant: "red",
        backgroundColorVariant: "bg-destructive",
        backgroundGradientVariant: "bg-destructive-gradient",
        textColorVariant: "text-destructive",
        borderColorVariant: "border-destructive"
      };
    default: return undefined;
  }
};

const serviceRequestsData = [
  {
    serviceTitle: "Fuga de Água Grave",
    location: "Talatona",
    date: "21/05/2026",
    proposedValue: "12.000 Kz",
    type: { key: "emergency", label: "Emergência" },
    serviceDescription:
      "O cano principal do lava-loiça rebentou e está a inundar a cozinha rapidamente. É necessário fechar a segurança e substituir a tubagem danificada com urgência.",
  },
  {
    serviceTitle: "Instalação de Sanita",
    location: "Miramar",
    date: "22/05/2026",
    proposedValue: "5.000 Kz",
    type: { key: "installation", label: "Instalação" },
    serviceDescription:
      "Substituição de uma sanita antiga por um modelo novo com sistema de descarga dupla. O local já tem as furações prontas, apenas necessita de fixação e vedação.",
  },
  {
    serviceTitle: "Troca de Torneira",
    location: "Maianga",
    date: "23/05/2026",
    proposedValue: "10.000 Kz",
    type: { key: "repair", label: "Reparo" },
    serviceDescription:
      "A torneira do misturador da casa de banho está a pingar continuamente, mesmo estando totalmente fechada. Necessito da troca dos manípulos ou substituição total da peça.",
  },
  {
    serviceTitle: "Manutenção de Esgoto",
    location: "Ingombota",
    date: "25/05/2026",
    proposedValue: "7.500 Kz",
    type: { key: "maintenance", label: "Manutenção" },
    serviceDescription:
      "A caixa de visita do esgoto no quintal está a deitar água cinzenta para fora e apresenta forte mau cheiro. É preciso fazer uma desobstrução e limpeza preventiva.",
  },
  {
    serviceTitle: "Curto-Circuito no Quadro",
    location: "Viana",
    date: "21/05/2026",
    proposedValue: "15.000 Kz",
    type: { key: "emergency", label: "Emergência" },
    serviceDescription:
      "O disjuntor principal do quadro elétrico dispara imediatamente sempre que o aparelho de ar condicionado é ligado. Cheira a queimado perto dos cabos de alimentação.",
  },
  {
    serviceTitle: "Montagem de Ar Condicionado",
    location: "Centralidade do Kilamba",
    date: "24/05/2026",
    proposedValue: "25.000 Kz",
    type: { key: "installation", label: "Instalação" },
    serviceDescription:
      "Instalação completa de um aparelho Split de 12.000 BTUs na sala de estar. Requer furação da parede de betão para a passagem da tubagem de cobre e fixação do compressor externo.",
  },
  {
    serviceTitle: "Reparação de Gerador Caseiro",
    location: "Cacuaco",
    date: "26/05/2026",
    proposedValue: "35.000 Kz",
    type: { key: "repair", label: "Reparo" },
    serviceDescription:
      "Gerador a gasolina de 5.5 KVA não arranca de forma nenhuma. Já mudei a vela de ignição, mas continua a falhar e deita um fumo muito escuro pelo escape quando tenta dar partida.",
  },
  {
    serviceTitle: "Limpeza Preventiva de AC",
    location: "Belas",
    date: "27/05/2026",
    proposedValue: "18.000 Kz",
    type: { key: "maintenance", label: "Manutenção" },
    serviceDescription:
      "Manutenção de rotina em dois aparelhos de ar condicionado. O serviço inclui a lavagem completa dos filtros de poeira, higienização das turbinas internas e verificação/reposição do gás refrigerante.",
  },
];

const tabsOptionsData = [
  { key: "all", label: "Todos"},
  { key: "repair", label: "Reparo" },
  { key: "installation", label: "Instalação" },
  { key: "maintenance", label: "Manutenção" },
  { key: "emergency", label: "Emergência" }
];

function ProDashboard() {
  const [available, setAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [serviceTypeTabs, setServiceTypeTabs] = useState(serviceRequestsData);

  const filteredServiceTypes = useCallback((serviceTypeKey: string) => {
    setActiveTab(serviceTypeKey);
    if (serviceTypeKey === "all") {
      setServiceTypeTabs(serviceRequestsData);
    } else {
      setServiceTypeTabs(
        serviceRequestsData.filter((item) => item.type.key === serviceTypeKey),
      );
    }
  }, []);

  const tabsOptions = useMemo(() => 
    tabsOptionsData.map((tab, index) => (
      <TabsTrigger
        key={index}
        value={tab.key}
        className="text-xs font-semibold rounded-lg"
        onClick={() => filteredServiceTypes(tab.key)}
      >
        {tab.label}
      </TabsTrigger>
    )),
    [filteredServiceTypes]
  );

  const serviceRequests = useMemo(() => 
    serviceTypeTabs.map((serviceRequest, index) => {
      const cardTheme = selectCardTheme(serviceRequest.type.key);
      return (
        <Card
          key={index}
          className={`${cardTheme?.backgroundColorVariant}/10 bg-card rounded-2xl p-5! *:p-0`}
        >
          <CardHeader className="flex justify-between">
            <CardTitle>{serviceRequest.serviceTitle}</CardTitle>
            <Badge
              variant={cardTheme?.badgeVariant}
              className="capitalize"
            >
              {serviceRequest.type.label}
            </Badge>
          </CardHeader>

          <CardContent className="flex justify-between items-center">
            <div className="flex flex-col justify-between">
              <div className="flex items-center gap-1">
                <MapPinIcon
                  weight="fill"
                  className={`${cardTheme?.textColorVariant} size-4`}
                />
                <span className="text-sm">
                  {serviceRequest.location}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarBlankIcon
                  weight="fill"
                  className={`${cardTheme?.textColorVariant} size-4`}
                />
                <span className="text-sm">{serviceRequest.date}</span>
              </div>
            </div>

            <div>
              <div className={`${cardTheme?.backgroundGradientVariant} rounded-2xl py-2 px-4`}>
                <span className="text-primary-foreground text-lg font-bold">
                  {serviceRequest.proposedValue}
                </span>          
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between items-center border-none">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className={`${cardTheme?.backgroundColorVariant}/15 ${cardTheme?.textColorVariant} text-xs p-4 rounded-2xl border-slate-300 w-[47.5%]`}
                  variant={"outline"}
                  size="sm"
                >
                  Ver detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl p-0 border-none shadow-2xl overflow-hidden">
                <div className="overflow-y-auto max-h-[85vh] p-6 space-y-5">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-[#091B3D] tracking-tight leading-tight">
                      {serviceRequest.serviceTitle}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-square bg-slate-100 rounded-xl border border-slate-200/60 flex items-center justify-center text-[10px] text-slate-400 font-bold overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200"
                          alt="Leak 1"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="aspect-square bg-slate-100 rounded-xl border border-slate-200/60 flex items-center justify-center text-[10px] text-slate-400 font-bold overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1595467796065-c4a74eb60091?auto=format&fit=crop&q=80&w=200"
                          alt="Leak 2"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="aspect-square border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-[10px] text-slate-400 font-medium bg-background/50">
                        +1 Foto
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-[#F8FAFC] p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-sm shadow-sm">
                        CS
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#091B3D]">
                          Carlos Silva
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-[#848D9E]">
                            Maianga, Luanda
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-success/10 text-success border-none text-[9px] font-black px-2 py-0.5">
                      VERIFICADO
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white border border-slate-100 rounded-xl flex flex-col gap-0.5">
                      <span className="text-[9px] font-black text-[#848D9E] uppercase tracking-widest">
                        Localização
                      </span>
                      <p className="text-xs font-bold text-[#091B3D] truncate">
                        {serviceRequest.location}
                      </p>
                    </div>
                    <div className="p-3 bg-white border border-slate-100 rounded-xl flex flex-col gap-0.5">
                      <span className="text-[9px] font-black text-[#848D9E] uppercase tracking-widest">
                        Data Desejada
                      </span>
                      <p className="text-xs font-bold text-[#091B3D]">
                        {serviceRequest.date}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black text-[#848D9E] uppercase tracking-widest ml-1">
                      Detalhes do Pedido
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed bg-background/50 p-4 rounded-xl border border-slate-100">
                      {serviceRequest.serviceDescription}
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-background/80 border-t border-slate-100 flex gap-3">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="flex-1 py-6 rounded-xl text-slate-500 border-slate-200 font-bold hover:bg-white"
                    >
                      Ignorar
                    </Button>
                  </DialogClose>
                  <Button className="flex-1 bg-primary py-6 rounded-xl font-black text-white shadow-lg shadow-primary/20 hover:bg-primary/90">
                    Aceitar Serviço
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button className={`${cardTheme?.backgroundGradientVariant} text-primary-foreground text-xs p-4 rounded-2xl border-none border-${cardTheme?.borderColorVariant} w-[47.5%]`}>Aceitar</Button>
          </CardFooter>
        </Card>
      );
    }), 
    [serviceTypeTabs]
  );

  return (
    <section className="grid grid-cols-10 gap-10 px-10 w-full">
      <main className="col-span-7">
        {!available ? (
          <Card className="bg-card text-center p-20 rounded-2xl border border-dashed">
            <CardContent className="flex flex-col">
              <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <BellSlashIcon
                  className="h-8 w-8 text-slate-400"
                  weight="regular"
                />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">
                  Estás indisponível
                </p>
                <p className="text-sm text-slate-500 mt-2 max-w-[240px] mx-auto">
                  Ativa a tua disponibilidade no cartão acima para começares a
                  receber pedidos na tua zona.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} className="flex flex-col gap-7.5 w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Pedidos na zona
              </h2>

              <TabsList className="grid grid-cols-5 bg-slate-200/60 p-1 rounded-xl">
                {tabsOptions}
              </TabsList>
            </div>

            <div className="grid grid-cols-2 gap-2.5 w-full mt-4">
              {serviceRequests.length > 0 ? (
                serviceRequests
              ) : (
                <p className="text-sm text-slate-500 col-span-2 text-center py-10">
                  Nenhum pedido encontrado para esta categoria.
                </p>
              )}
            </div>
          </Tabs>
        )}
      </main>
      
      <aside className="col-span-3 flex flex-col gap-5">
        <Card
          className={cn(
            "relative overflow-hidden rounded-3xl p-5 transition-all bg-primary-gradient text-primary-foreground shadow-glow w-full",
            available
              ? "bg-primary-gradient text-primary-foreground"
              : "bg-white text-slate-500 border border-slate-200",
          )}
        >
          <CardContent className="p-5 flex items-center gap-4">
            <span className={cn("relative flex h-3.5 w-3.5 shrink-0")}>
              {available && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              )}
              <span
                className={cn(
                  "relative inline-flex rounded-full h-3.5 w-3.5",
                  available ? "bg-white" : "bg-slate-300",
                )}
              />
            </span>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider opacity-90">
                {available ? "Estás disponível" : "Indisponível"}
              </p>
              <p
                className={cn(
                  "font-bold text-sm",
                  available ? "text-white" : "text-slate-900",
                )}
              >
                {available ? "A receber novos pedidos" : "Não recebes pedidos"}
              </p>
            </div>

            <Switch
              checked={available}
              onCheckedChange={setAvailable}
              className={available ? "data-[state=checked]:bg-white/30" : ""}
            />
          </CardContent>
        </Card>

        <Card className={cn("rounded-lg p-5 *:p-0")}>
          <CardHeader>
            <div className="flex gap-2.5">
              <Badge
                className={cn(
                  "bg-primary/20 text-primary text-2xl rounded-sm p-0 aspect-square",
                )}
              >
                <CurrencyCircleDollarIcon />
              </Badge>
              <CardTitle>Ganhos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-sm font-bold">30.000,00kz</span>
          </CardContent>
        </Card>

        <Card className={cn("rounded-lg p-5 *:p-0")}>
          <CardHeader>
            <div className="flex gap-2.5">
              <Badge
                className={cn(
                  "bg-primary/20 text-primary text-2xl rounded-sm p-0 aspect-square",
                )}
              >
                <WrenchIcon />
              </Badge>
              <CardTitle>Serviços Prestados</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-sm font-bold">8</span>
          </CardContent>
        </Card>
      </aside>
    </section>
  );
}

export { ProDashboard };