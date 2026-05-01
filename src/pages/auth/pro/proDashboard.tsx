import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  WrenchIcon, 
  MapPinIcon, 
  BellIcon, 
  WarningCircleIcon,
  CalendarBlankIcon,
  CurrencyCircleDollarIcon,
  CurrencyDollarIcon
} from "@phosphor-icons/react";

// import { BottomNav } from "@/components/custom/BottomNav";
import { Switch } from "@/components/ui/";
import { Button } from "@/components/ui/";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/";
import { cn } from "@/lib/utils";

const feedMock = [
  { id: "f1", service: "Fuga de Água Grave", type: "emergencia", location: "Talatona", distance: "1,2 km", price: "8.000 – 12.000 Kz", posted: "Agora mesmo" },
  { id: "f2", service: "Instalação de Sanita", type: "instalacao", location: "Miramar", distance: "3,4 km", price: "5.000 Kz", posted: "Há 2 min" },
  { id: "f3", service: "Troca de Torneira", type: "reparo", location: "Maianga", distance: "4,8 km", price: "10.000 Kz", posted: "Há 6 min" },
  { id: "f4", service: "Manutenção de Esgoto", type: "manutencao", location: "Ingombota", distance: "6,1 km", price: "7.500 Kz", posted: "Há 12 min" },
];

function ProDashboard () {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(true);

  const getFilteredFeed = (filterType: string) => {
    if (filterType === "recentes") return feedMock;
    return feedMock.filter(job => job.type === filterType);
  };

  return (
    <section className="bg-slate-50 flex gap-10 p-20 w-full">

      <section className="w-7/10">        
        {!available ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white border border-dashed border-slate-300">
            <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <BellIcon className="h-8 w-8 text-slate-400" weight="regular" />
            </div>
            <p className="font-bold text-slate-900 text-lg">Estás offline</p>
            <p className="text-sm text-slate-500 mt-2 max-w-[240px] mx-auto">
              Ativa a tua disponibilidade no cartão acima para começares a receber pedidos na tua zona.
            </p>
          </div>
        ) : (
          <Tabs defaultValue="recentes" className="flex gap-7.5 w-full">
            <div className="flex items-center justify-between ">
              <h2 className="text-lg font-bold text-slate-900">Pedidos na zona</h2>
            
              <TabsList className="grid grid-cols-4 bg-slate-200/60 p-1 rounded-xl">
                <TabsTrigger value="recentes" className="text-xs font-semibold rounded-lg">Novos</TabsTrigger>
                <TabsTrigger value="reparo" className="text-xs font-semibold rounded-lg">Reparo</TabsTrigger>
                <TabsTrigger value="instalacao" className="text-xs font-semibold rounded-lg">Instalação</TabsTrigger>
                <TabsTrigger value="emergencia" className="text-xs font-semibold rounded-lg data-[state=active]:text-red-600">Emergencia</TabsTrigger>
              </TabsList>
            </div>

            {/* Geramos o conteúdo para cada Tab de forma dinâmica */}
            {["recentes", "reparo", "instalacao", "emergencia"].map((tab) => (
              <TabsContent key={tab} value={tab} className="grid grid-cols-2 gap-4">
                {getFilteredFeed(tab).length === 0 ? (
                  <p className="text-center text-slate-500 text-sm py-8">Nenhum pedido nesta categoria.</p>
                ) : (
                  getFilteredFeed(tab).map((job) => (
                    <Card key={job.id} className="bg-card rounded-2xl gap-5 overflow-hidden hover:border-primary/50 shadow-sm p-5 w-full">
                      <CardContent className="p-0 flex flex-col gap-5">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                              job.type === "emergencia" ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"
                            )}>
                              {job.type === "emergencia" ? <WarningCircleIcon className="size-5" weight="fill" /> : <WrenchIcon className="size-5" weight="fill" />}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900 leading-tight">{job.service}</h3>
                              <p className="text-xs text-slate-500">{job.posted}</p>
                            </div>
                          </div>
                          {job.type === "emergencia" && (
                            <Badge variant="destructive" className="bg-destructive/20 hover:bg-destructive hover:text-white rounded-lg text-[10px] px-2 py-0.5">
                              EMERGÊNCIA
                            </Badge>
                          )}
                        </div>

                        <div className="flex justify-between items-center gap-1.5 text-xs text-slate-600 rounded-md w-full">
                          <div className="flex gap-1.5">
                            <MapPinIcon className="size-4 text-primary" weight="fill" />
                            <span className="font-medium">{job.location}</span>
                            <span className="text-slate-400">&bull;</span>
                            <span>A {job.distance} de ti</span>
                          </div>
                          <div className="flex gap-1.5">
                            <CalendarBlankIcon className="size-4 text-primary" weight="fill"/>
                            <span className="font-medium">23/05/2026</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex w-full justify-between border-t px-0">
                            <Button className="text-xs p-4 rounded-full text-slate-600 border-slate-300 w-4/9"
                              variant="outline" 
                              size="sm" 
                              onClick={() => navigate(`/pro/job/${job.id}`)}
                            >
                              Ver detalhes
                            </Button>
                            <Button className="bg-primary text-xs p-4  rounded-full hover:bg-primary/90 font-bold w-4/9"
                              size="sm" 
                            >
                              Aceitar
                            </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </section>
      <section className="w-3/10 flex flex-col gap-5">
        <Card 
          className={cn(
            "relative overflow-hidden rounded-3xl p-5 border-2 transition-all bg-gradient-hero text-primary-foreground border-transparent shadow-glow w-full",
            available ? "bg-primary text-primary-foreground" : "bg-white text-slate-500 border border-slate-200"
          )}
        >
          <CardContent className="p-5 flex items-center gap-4">
            {/* Indicador de Status */}
            <span className={cn("relative flex h-3.5 w-3.5 shrink-0")}>
              {available && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />}
              <span className={cn("relative inline-flex rounded-full h-3.5 w-3.5", available ? "bg-white" : "bg-slate-300")} />
            </span>
            
            <div className="flex-1 min-w-0">
              <p className={cn("text-xs font-bold uppercase tracking-wider opacity-90")}>
                {available ? "Estás disponível" : "Indisponível"}
              </p>
              <p className={cn("font-bold text-sm", available ? "text-white" : "text-slate-900")}>
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
            <Badge className={cn("bg-primary/20 text-primary text-2xl rounded-sm p-0 aspect-square")}><CurrencyCircleDollarIcon/></Badge>
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
            <Badge className={cn("bg-primary/20 text-primary text-2xl rounded-sm p-0 aspect-square")}><WrenchIcon/></Badge>
            <CardTitle>Servicos Prestados</CardTitle>
          </div>
         </CardHeader>
         <CardContent>
          <span className="text-sm font-bold">8</span>
         </CardContent>
        </Card>
      </section>
    </section>
  );
};

export {ProDashboard};