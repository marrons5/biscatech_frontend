import { Link } from "react-router-dom";
import {
  Wrench,
  Lightning,
  Sparkle,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  CircleNotch,
  ArrowRight,
  ChartBar,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/custom/pageHeader";
import { cn } from "@/lib/utils";

type JobStatus = "pending" | "in_progress" | "completed" | "cancelled";

interface Job {
  id: string;
  service: string;
  icon: typeof Wrench;
  pro?: string;
  date: string;
  location: string;
  price: string;
  status: JobStatus;
}

const jobs: Job[] = [
  {
    id: "1",
    service: "Canalizador",
    icon: Wrench,
    pro: "João Mateus",
    date: "Hoje, 14:30",
    location: "Talatona, Luanda",
    price: "8.500 Kz",
    status: "in_progress",
  },
  {
    id: "2",
    service: "Eletricista",
    icon: Lightning,
    pro: "Aline Costa",
    date: "Ontem",
    location: "Miramar",
    price: "12.000 Kz",
    status: "completed",
  },
  {
    id: "3",
    service: "Limpeza",
    icon: Sparkle,
    pro: "Maria Eduarda",
    date: "12 Abr",
    location: "Maianga",
    price: "6.000 Kz",
    status: "completed",
  },
  {
    id: "4",
    service: "Eletricista",
    icon: Lightning,
    pro: "Pedro Cunha",
    date: "8 Abr",
    location: "Ingombota",
    price: "6.500 Kz",
    status: "completed",
  },
  {
    id: "5",
    service: "Canalizador",
    icon: Wrench,
    pro: "—",
    date: "2 Abr",
    location: "Viana",
    price: "4.500 Kz",
    status: "cancelled",
  },
];

const statusConfig: Record<
  JobStatus,
  { label: string; icon: typeof Clock; className: string }
> = {
  pending: {
    label: "Pendente",
    icon: Clock,
    className: "bg-warning/15 text-warning-foreground border-warning/30",
  },
  in_progress: {
    label: "Em curso",
    icon: CircleNotch,
    className: "bg-primary/10 text-primary border-primary/30",
  },
  completed: {
    label: "Concluído",
    icon: CheckCircle,
    className: "bg-success/15 text-success border-success/30",
  },
  cancelled: {
    label: "Cancelado",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

const StatusBadge = ({ status }: { status: JobStatus }) => {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border",
        cfg.className,
      )}>
      <Icon
        weight="bold"
        className={cn("h-3 w-3", status === "in_progress" && "animate-spin")}
      />
      {cfg.label}
    </span>
  );
};

const stats = [
  { label: "Aceites", value: 5, tone: "text-primary" },
  { label: "Ignoradas", value: 0, tone: "text-muted-foreground" },
  { label: "Canceladas", value: 1, tone: "text-destructive" },
  { label: "Concluídas", value: 4, tone: "text-success" },
];

const Orders = () => {
  const active = jobs.find((j) => j.status === "in_progress");

  return (
    <div className="min-h-screen bg-background pb-12">
      <main className="container max-w-7xl px-6 lg:px-8 pt-8">
        <PageHeader
          title="Os Meus Pedidos"
          subtitle="Acompanhe os serviços que solicitou"
        />

        <div className="grid grid-cols-10 gap-6">
          {/* MAIN — 7/10 */}
          <div className="col-span-10 lg:col-span-7 space-y-4">
            {jobs.map((j) => {
              const Icon = j.icon;
              return (
                <Link
                  key={j.id}
                  to={`/app/request/${j.id}`}
                  className="block rounded-2xl bg-card border border-border/60 shadow-sm p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon weight="duotone" className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-bold text-foreground">
                            {j.service}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            com{" "}
                            <span className="font-semibold text-foreground">
                              {j.pro}
                            </span>
                          </p>
                        </div>
                        <StatusBadge status={j.status} />
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {j.date}
                        </span>
                        <span className="inline-flex items-center gap-1 truncate">
                          <MapPin className="h-3.5 w-3.5" />
                          {j.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">
                        Valor
                      </p>
                      <p className="text-base font-extrabold text-foreground">
                        {j.price}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* SIDE — 3/10 */}
          <aside className="col-span-10 lg:col-span-3 space-y-6">
            {active && (
              <div className="rounded-2xl bg-card border-2 border-primary/40 shadow-sm p-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />{" "}
                  Pedido Ativo
                </span>
                <h3 className="font-bold mt-3">{active.service}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  com {active.pro} • {active.location}
                </p>
                <Link
                  to={`/app/request/${active.id}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                  Ver detalhes <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}

            <div className="rounded-2xl bg-card border border-border/60 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <ChartBar weight="duotone" className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground">Resumo</h3>
              </div>
              <div className="space-y-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                    <span className="text-sm text-muted-foreground">
                      {s.label}
                    </span>
                    <span className={cn("text-lg font-extrabold", s.tone)}>
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export {Orders};
