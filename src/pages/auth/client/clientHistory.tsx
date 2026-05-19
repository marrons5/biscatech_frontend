import { Link } from "react-router-dom";
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
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components";

type JobStatus = "pending" | "in_progress" | "completed" | "cancelled";

interface Job {
  id: string;
  service: string;
  icon: typeof WrenchIcon;
  pro?: string;
  date: string;
  location: string;
  price: string;
  status: JobStatus;
}

const jobs: Job[] = [
  { id: "1", service: "Canalizador", icon: WrenchIcon,    pro: "João Mateus",  date: "Hoje, 14:30", location: "Talatona, Luanda", price: "8.500 Kz",  status: "in_progress" },
  { id: "2", service: "Eletricista", icon: LightningIcon, pro: "Aline Costa",  date: "Ontem",        location: "Miramar",          price: "12.000 Kz", status: "completed" },
  { id: "4", service: "Eletricista", icon: LightningIcon, pro: "Pedro Cunha",  date: "8 Abr",        location: "Ingombota",        price: "6.500 Kz",  status: "completed" },
  { id: "5", service: "Canalizador", icon: WrenchIcon,    pro: "—",            date: "2 Abr",        location: "Viana",            price: "4.500 Kz",  status: "cancelled" },
];

const statusConfig: Record<JobStatus, { label: string; icon: typeof ClockIcon; variant: string }> = {
  pending:     { label: "Pendente",   icon: ClockIcon,         variant: "orange" },
  in_progress: { label: "Em curso",   icon: CircleNotchIcon,   variant: "green" },
  completed:   { label: "Concluído",  icon: CheckCircleIcon,   variant: "green" },
  cancelled:   { label: "Cancelado",  icon: XCircleIcon,       variant: "red"},
};

const StatusBadge = ({ status }: { status: JobStatus }) => {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <Badge variant={"green"}>
      <Icon weight="bold" className={cn("h-3 w-3", status === "in_progress" && "animate-spin")} />
      {cfg.label}
    </Badge>
  );
};

const stats = [
  { label: "Aceites",   value: 5, tone: "text-primary" },
  { label: "Ignoradas", value: 0, tone: "text-muted-foreground" },
  { label: "Canceladas",value: 1, tone: "text-destructive" },
  { label: "Concluídas",value: 4, tone: "text-success" },
];

const ClientHistory = () => {
  const active = jobs.find((j) => j.status === "in_progress");

  return (
    <main className="w-full grid grid-cols-10 gap-10 px-10">
          <section className="col-span-10 lg:col-span-7 space-y-4">
            {jobs.map((j) => {
              const Icon = j.icon;
              return (
                <Link
                  key={j.id}
                  to={`/app/request/${j.id}`}
                  className="block rounded-2xl bg-card border border-border/60 shadow-sm p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon weight="duotone" className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-bold text-foreground">{j.service}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            com <span className="font-semibold text-foreground">{j.pro}</span>
                          </p>
                        </div>
                        <StatusBadge status={j.status} />
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><ClockIcon className="h-3.5 w-3.5" />{j.date}</span>
                        <span className="inline-flex items-center gap-1 truncate"><MapPinIcon className="h-3.5 w-3.5" />{j.location}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Valor</p>
                      <p className="text-base font-extrabold text-foreground">{j.price}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </section>

          <section className="grid grid-rows-3 col-span-10 lg:col-span-3 space-y-6">
            {active && (
              <Card className="rounded-2xl bg-primary-gradient row-span-1 shadow-sm p-5">
                <CardHeader className="flex items-center gap-1">
                  <span className="size-2 rounded-full bg-primary-foreground animate-pulse"/>
                  <CardTitle className="text-primary-foreground">Pedido ativo</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-primary-foreground font-bold mt-3">{active.service}</h3>
                  <p className="text-xs text-primary-foreground mt-1">com {active.pro} • {active.location}</p>
                  <Link to={`/app/request/${active.id}`} className="text-primary-foreground mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                    Ver detalhes <ArrowRightIcon className="h-4 w-4" />
                  </Link>  
                </CardContent>
              </Card>
            )}

            <Card className="rounded-2xl bg-card border row-span-2 border-border/60 shadow-sm p-5">
              <CardHeader className="flex items-center gap-2 mb-4">
                <ChartBarIcon weight="duotone" className="h-5 w-5 text-primary" />
                <CardTitle className="font-bold text-foreground">Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                    <span className={cn("text-lg font-extrabold", s.tone)}>{s.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
    </main>
  );
};

export { ClientHistory };
