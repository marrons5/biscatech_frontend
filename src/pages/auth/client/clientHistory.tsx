import React, { useMemo, useState } from "react";
import {
  WrenchIcon,
  LightningIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CircleNotchIcon,
  ArrowRightIcon,
  ChartBarIcon,
  UserIcon,
  StarIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { 
  Badge, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Dialog, 
  DialogHeader, 
  DialogTitle, 
  DialogContent, 
  DialogClose, 
  DialogFooter
} from "@/components";

type ServiceRequestStatus = "pending" | "accepted" | "concluded" | "cancelled" | "expired";

type BadgeVariants = "blue" | "green" | "red" | "grey" | "dark";

interface BadgeStatus {
  icon: React.ComponentType;
  variant: BadgeVariants;
  label: string;
}

interface ServiceProvider {
  name: string;
  avatar?: string;
  rating: string;
  specialty: string;
}

interface ServiceRequest {
  id: string;
  icon: React.ComponentType;
  serviceProvider: ServiceProvider;
  service: string;
  description: string;
  date: string;
  location: string;
  price: string;
  status: ServiceRequestStatus;
}

function selectStatusBadge(status: string) : BadgeStatus | undefined {
  switch (status) {
    case "pending":
      return {
        icon: ClockIcon,
        variant: "blue",
        label: "Pendente"
      };
    case "accepted":
      return {
        icon: CircleNotchIcon,
        variant: "blue",
        label: "Em curso"
      };
    case "concluded":
      return {
        icon: CheckCircleIcon,
        variant: "green",
        label: "Concluído"
      };
    case "cancelled":
      return {
        icon: XCircleIcon,
        variant: "red",
        label: "Cancelado"
      };
    case "expired":
      return {
        icon: XCircleIcon,
        variant: "dark",
        label: "Expirado"
      };
    default:
      return {
        icon: ClockIcon,
        variant: "grey",
        label: "Pendente"
      };
  }
}

const serviceRequestsData: ServiceRequest[] = [
  {
    id: "1",
    service: "Canalizador",
    icon: WrenchIcon,
    serviceProvider: {
      name: "João Mateus",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100",
      rating: "4.9",
      specialty: "Instalações Hidráulicas & Reparos de Fugas"
    },
    description: "Inundação na cozinha devido à rutura do cano principal por baixo do lava-loiça.",
    date: "Hoje, 14:30",
    location: "Talatona, Luanda",
    price: "8.500 Kz",
    status: "accepted",
  },
  {
    id: "2",
    service: "Eletricista",
    icon: LightningIcon,
    serviceProvider: {
      name: "Aline Costa",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100",
      rating: "4.8",
      specialty: "Manutenção de Quadros Elétricos"
    },
    description: "Curto-circuito intermitente no disjuntor da sala.",
    date: "Ontem",
    location: "Miramar, Luanda",
    price: "12.000 Kz",
    status: "concluded",
  },
  {
    id: "5",
    service: "Canalizador",
    icon: WrenchIcon,
    serviceProvider: {
      name: "A aguardar prestador",
      rating: "0.0",
      specialty: "Nenhum técnico alocado"
    },
    description: "Limpeza preventiva da caixa de esgoto.",
    date: "2 Abr",
    location: "Viana, Luanda",
    price: "4.500 Kz",
    status: "cancelled",
  },
];

const statsData = [
  { key: "accepted", label: "Aceites", value: 5 },
  { key: "concluded", label: "Concluídas", value: 4 },
  { key: "cancelled", label: "Canceladas", value: 1 },
  { key: "expired", label: "Expiradas", value: 0 },
  { key: "pending", label: "Pendentes", value: 0 },
];


const ClientHistory = () => {
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  const activeJob = useMemo(() => serviceRequestsData.find((j) => j.status === "accepted"), []);

  const serviceRequests = useMemo(() => {
    return serviceRequestsData.map((serviceRequest) => {
      const Icon = serviceRequest.icon;
      const badgeStatus = selectStatusBadge(serviceRequest.status);
      const StatusIcon = badgeStatus?.icon;

      return (
        <Card
          key={serviceRequest.id}
          onClick={() => setSelectedRequest(serviceRequest)}
          className="bg-card border border-primary/20 shadow-sm shadow-primary/20 rounded-xl p-5! *:p-0 hover:border-primary/20 hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <CardHeader className="flex justify-between items-center">
            <CardTitle>{serviceRequest.service}</CardTitle>
            <Badge variant={badgeStatus?.variant}>
              <StatusIcon weight="bold" className={cn("h-3 w-3", serviceRequest.status === "accepted" && "animate-spin")} />
              <span>{badgeStatus?.label}</span>
            </Badge>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground"></h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    com <span className="font-semibold text-foreground">{serviceRequest.serviceProvider.name}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><ClockIcon className="h-3.5 w-3.5" />{serviceRequest.date}</span>
                <span className="inline-flex items-center gap-1 truncate"><MapPinIcon className="h-3.5 w-3.5" />{serviceRequest.location}</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Valor</p>
              <p className="text-base font-extrabold text-foreground">{serviceRequest.price}</p>
            </div>
          </CardContent>
        </Card>
      );
    });
  }, []);

  const renderedStats = useMemo(() => {
    return statsData.map((s) => {
      const config = selectStatusBadge(s.key);
      const StatIcon = config?.icon;

      return (
        <Badge
          variant={config?.variant}
          key={s.key}
          className="flex items-center justify-between py-5 px-3 w-full rounded-xl"
        >
          <div className="flex items-center gap-2">
            <StatIcon className="size-4" weight="bold" />
            <span className="text-base font-medium">{s.label}</span>
          </div>

          <span className="text-base font-extrabold">{s.value}</span>
        </Badge>
      );
    });
  }, []);

  return (
    <section className="w-full grid grid-cols-10 gap-10 px-10">
      <main className="col-span-10 lg:col-span-7">
        <div className="flex flex-col gap-2.5">
          {serviceRequests}
        </div>
      </main>

      <aside className="col-span-10 lg:col-span-3 flex flex-col">
        {activeJob && (
          <Card className="rounded-2xl bg-primary-gradient shadow-sm p-5 text-white border-none">
            <CardHeader className="flex flex-row items-center gap-2 p-0 space-y-0">
              <span className="size-2 rounded-full bg-white animate-pulse" />
              <CardTitle className="text-white text-base font-bold">Pedido ativo</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <h3 className="font-bold text-lg">{activeJob.service}</h3>
              <p className="text-xs opacity-90 mt-1">com {activeJob.serviceProvider.name} • {activeJob.location}</p>
              <button
                onClick={() => setSelectedRequest(activeJob)}
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold hover:underline bg-transparent border-none text-white cursor-pointer"
              >
                Ver detalhes <ArrowRightIcon className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
        )}

        <Card className="rounded-2xl bg-card border border-border/60 shadow-sm p-5 flex-1">
          <CardHeader className="flex flex-row items-center gap-2 p-0 space-y-0 mb-4">
            <ChartBarIcon weight="duotone" className="h-5 w-5 text-primary" />
            <CardTitle className="text-foreground text-base font-bold">Resumo Geral</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col gap-2.5">
            {renderedStats}
          </CardContent>
        </Card>
      </aside>

      {/* Dialog Unificado de Detalhes */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        {selectedRequest && (() => {
          const dialogConfig = selectStatusBadge(selectedRequest.status);
          const DialogIcon = dialogConfig?.icon;

          return (
            <DialogContent className="sm:max-w-[550px] bg-white rounded-2xl p-6 border-none shadow-2xl overflow-hidden *:border-0">
              <DialogHeader className="border-b pb-4">
                <div className="flex items-center gap-2.5 w-full">
                  <DialogTitle className="text-2xl font-black text-[#091B3D] tracking-tight">
                    {selectedRequest.service}
                  </DialogTitle>
                  <Badge variant={dialogConfig?.variant} className="flex items-center gap-1 font-bold">
                    <DialogIcon weight="bold" className={cn("h-3 w-3", selectedRequest.status === "accepted" && "animate-spin")} />
                    {dialogConfig?.label}
                  </Badge>
                </div>

              </DialogHeader>

              <Card className="bg-primary-gradient rounded-xl gap-2 p-5 *:p-0">
                <CardContent className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200 border overflow-hidden flex items-center justify-center shrink-0">
                    {selectedRequest.serviceProvider.avatar ? (
                      <img src={selectedRequest.serviceProvider.avatar} alt={selectedRequest.serviceProvider.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="size-6 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-primary-foreground flex flex-col">
                      <span className="text-base font-medium">{selectedRequest.serviceProvider.name}</span>
                      <span className="text-sm">{selectedRequest.serviceProvider.specialty}</span>
                    </div>
                    <div className="text-warning flex items-center gap-1">
                      <StarIcon weight="fill" className="size-3.5"/>
                      <span className="text-sm">{selectedRequest.serviceProvider.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-5 py-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-card border border-muted-foreground/25 flex flex-col gap-1 rounded-xl p-2.5">
                    <span className="text-muted-foreground text-xs font-medium">Data Agendada</span>
                    <span className="text-sm font-bold text-foreground">{selectedRequest.date}</span>
                  </div>
                  <div className="bg-card border border-muted-foreground/25 flex flex-col gap-1 rounded-xl p-2.5">
                    <span className="text-muted-foreground text-xs font-medium">Local da Ocorrência</span>
                    <span className="text-sm font-bold text-foreground">{selectedRequest.location}</span>
                  </div>
                </div>

                  <div className="bg-card border border-muted-foreground/25 flex flex-col gap-1 rounded-xl p-2.5">
                    <span className="text-muted-foreground text-xs font-medium">Preço</span>
                    <span className="text-sm font-bold text-foreground">{selectedRequest.price}</span>
                  </div>

                  <div className="bg-card border border-muted-foreground/25 flex flex-col gap-1 rounded-xl p-2.5">
                    <span className="text-muted-foreground text-xs font-medium">Descrição</span>
                    <span className="text-sm text-foreground">{selectedRequest.description}</span>
                  </div>
              </div>

              <DialogFooter className="pt-4 border-t flex justify-end">
                <DialogClose asChild>
                  <button className="px-5 py-2.5 bg-[#091B3D] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#091B3D]/90 transition-all border-none cursor-pointer">
                    Fechar Janela
                  </button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          );
        })()}
      </Dialog>
    </section>
  );
};

export { ClientHistory };