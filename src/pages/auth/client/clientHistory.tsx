import React, { useMemo, useState, useEffect } from "react";
import { MapPinIcon, ClockIcon, CheckCircleIcon, XCircleIcon, ChartBarIcon, StarIcon, WarningCircleIcon, DropIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { serviceRequestService, type IServiceRequest } from "@/services/serviceRequestService";

type OrderStatus = "pending" | "accepted" | "concluded" | "cancelled" | "expired";

interface ServiceRequest {
  id: string;
  service: string;
  icon: React.ElementType;
  description: string;
  date: string;
  location: string;
  price: string;
  status: OrderStatus;
  pro?: { name: string; avatar: string; rating: string };
}

const getStatusConfig = (status: OrderStatus) => {
  switch (status) {
    case "accepted": return { label: "Em Andamento", baseColor: "text-primary", hoverWash: "group-hover:bg-primary", hoverText: "group-hover:text-primary", icon: ClockIcon };
    case "concluded": return { label: "Concluído", baseColor: "text-success", hoverWash: "group-hover:bg-success/5", hoverText: "group-hover:text-success", icon: CheckCircleIcon };
    case "cancelled": return { label: "Cancelado", baseColor: "text-destructive", hoverWash: "group-hover:bg-destructive/5", hoverText: "group-hover:text-destructive", icon: XCircleIcon };
    case "expired": return { label: "Expirado", baseColor: "text-warning", hoverWash: "group-hover:bg-warning/5", hoverText: "group-hover:text-warning", icon: WarningCircleIcon };
    default: return { label: "Pendente", baseColor: "text-foreground", hoverWash: "group-hover:bg-foreground/5", hoverText: "group-hover:text-foreground", icon: CircleNotchIcon };
  }
};

function toLocalStatus(s: string): OrderStatus {
  if (["pending", "created", "searching_provider"].includes(s)) return "pending";
  if (["accepted", "provider_accepted", "customer_confirmed"].includes(s)) return "accepted";
  if (s === "in_progress") return "accepted";
  if (s === "completed") return "concluded";
  return "cancelled";
}

const ClientHistory = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [rows, setRows] = useState<IServiceRequest[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await serviceRequestService.list();
        if (res.data.success) setRows(res.data.data);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  const serviceRequestsData: ServiceRequest[] = useMemo(() => rows.map((r) => ({
    id: r.id,
    service: r.title,
    icon: DropIcon,
    description: r.description,
    date: new Date(r.date).toLocaleDateString("pt-AO"),
    location: r.location,
    price: r.price ? `${Number(r.price).toLocaleString()} Kz` : "—",
    status: toLocalStatus(r.status),
  })), [rows]);

  const filteredRequests = useMemo(() => {
    if (activeTab === "all") return serviceRequestsData;
    if (activeTab === "active") return serviceRequestsData.filter((r) => r.status === "accepted" || r.status === "pending");
    if (activeTab === "history") return serviceRequestsData.filter((r) => ["concluded", "cancelled", "expired"].includes(r.status));
    return [];
  }, [activeTab, serviceRequestsData]);

  const stats = [
    { label: "Em Andamento", value: serviceRequestsData.filter((r) => r.status === "accepted").length },
    { label: "Concluídos", value: serviceRequestsData.filter((r) => r.status === "concluded").length },
    { label: "Cancelados", value: serviceRequestsData.filter((r) => r.status === "cancelled").length },
  ];

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-10 gap-10 px-4 lg:px-10 pb-8 bg-background min-h-svh">
      <main className="col-span-1 lg:col-span-7">
        <div className="flex flex-wrap gap-4 justify-center py-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex justify-center">
            <TabsList className="bg-transparent h-auto p-0 flex flex-wrap gap-4 border-none">
              {[
                { id: "all", label: "Todos os Pedidos" },
                { id: "active", label: "Ativos" },
                { id: "history", label: "Histórico" },
              ].map((t) => (
                <TabsTrigger
                  key={t.id}
                  value={t.id}
                  className={cn("rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 outline-none border-none", activeTab === t.id ? "neu-pressed text-primary" : "neu-flat text-muted-foreground hover:text-foreground")}
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {loading ? (
          <p className="text-center text-sm text-muted-foreground py-8">A carregar...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {filteredRequests.map((req, index) => {
              const config = getStatusConfig(req.status);
              return (
                <Dialog key={req.id}>
                  <DialogTrigger asChild>
                    <button className={cn("group relative flex flex-col items-start gap-4 p-8 rounded-[2rem] neu-flat active:neu-pressed transition-all duration-300 text-left overflow-hidden animate-in fade-in slide-in-from-bottom-4", config.hoverWash)} style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}>
                      <div className="flex items-start justify-between w-full">
                        <div className={cn("h-14 w-14 rounded-full flex items-center justify-center neu-pressed transition-colors duration-300", config.baseColor)}><req.icon weight="duotone" className="h-7 w-7" /></div>
                        <div className={cn("px-4 py-1.5 font-bold text-[10px] uppercase tracking-wider rounded-full neu-pressed transition-colors duration-300", config.baseColor)}>{config.label}</div>
                      </div>
                      <div className="mt-2 w-full">
                        <h3 className={cn("font-extrabold text-foreground text-lg leading-tight transition-colors duration-300", config.hoverText)}>{req.service}</h3>
                        <p className={cn("text-sm font-semibold text-muted-foreground mt-2 flex items-center gap-1.5 transition-colors duration-300", config.hoverText)}><MapPinIcon className="h-4 w-4" weight="fill" /> {req.location}</p>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[450px] bg-background rounded-[2rem] p-8 border-none neu-flat overflow-hidden">
                    <div className="flex flex-col items-center justify-center text-center pb-6 border-b border-border/20">
                      <div className={cn("h-16 w-16 rounded-full flex items-center justify-center neu-pressed mb-4", config.baseColor)}><req.icon weight="duotone" className="h-8 w-8" /></div>
                      <h3 className="font-extrabold text-2xl text-foreground mb-2">{req.service}</h3>
                      <div className={cn("px-4 py-1 text-xs uppercase font-bold rounded-full neu-pressed", config.baseColor)}>{config.label}</div>
                    </div>
                    <div className="space-y-4 py-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 neu-pressed rounded-2xl flex flex-col items-center text-center"><span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Agendado</span><p className="text-sm font-bold text-foreground mt-1">{req.date}</p></div>
                        <div className="p-4 neu-pressed rounded-2xl flex flex-col items-center text-center"><span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Preço</span><p className="text-sm font-bold text-foreground mt-1">{req.price}</p></div>
                      </div>
                      <div className="p-4 neu-pressed rounded-2xl text-center"><span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Localização</span><p className="text-sm font-bold text-foreground mt-1">{req.location}</p></div>
                      <div className="p-4 neu-pressed rounded-2xl text-center"><span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Descrição</span><p className="text-sm text-foreground/80 mt-1">{req.description}</p></div>
                    </div>
                    <div className="flex gap-4">
                      <DialogClose asChild><button className="flex-1 rounded-full neu-flat text-muted-foreground font-bold h-14 hover:text-foreground transition-all">Voltar</button></DialogClose>
                      {req.status === "concluded" && <button className="flex-1 neu-flat rounded-full bg-success! text-primary-foreground font-bold h-14 active:neu-pressed transition-all flex items-center justify-center gap-2"><StarIcon weight="fill" size={18} /> Avaliar</button>}
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        )}
      </main>

      <aside className="col-span-1 lg:col-span-3 space-y-8">
        <div className="rounded-[2rem] neu-flat p-8 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full neu-pressed text-primary flex items-center justify-center mb-6"><ChartBarIcon weight="duotone" className="h-8 w-8" /></div>
          <h3 className="font-extrabold text-foreground text-xl mb-6">Resumo Geral</h3>
          <div className="w-full space-y-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex justify-between items-center neu-pressed p-4 rounded-2xl"><span className="text-sm font-semibold text-muted-foreground">{stat.label}</span><span className="text-lg font-black text-foreground">{stat.value}</span></div>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
};

export { ClientHistory };
