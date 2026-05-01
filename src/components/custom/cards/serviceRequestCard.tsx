import { Fragment } from "react/jsx-runtime";
import { Card, CardContent, CardTitle } from "@/components/ui";
import type React from "react";

interface ServiceRequestProps{
    icon: React.ReactNode;
    category: string;
    location: string;
    date: string;
    distance: string;
}

export function ServiceRequestCard({icon, title, category, location, date, distance} : ServiceRequestProps) {
  return (
    <Fragment>
      <Card
        key={job.id}
        className="bg-card flex rounded-2xl overflow-hidden hover:border-primary/50 shadow-sm"
      >
        <div><img src={} alt="" /></div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                  job.type === "emergencia"
                    ? "bg-red-100 text-red-600"
                    : "bg-primary/10 text-primary",
                )}
              >
                {job.type === "emergencia" ? (
                  <WarningCircleIcon className="size-5" weight="fill" />
                ) : (
                  <WrenchIcon className="size-5" weight="fill" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 leading-tight">
                  {job.service}
                </h3>
                <p className="text-xs text-slate-500">{job.posted}</p>
              </div>
            </div>
            {job.type === "emergencia" && (
              <Badge variant="destructive" className="bg-red-500 hover:bg-red-600 text-[10px] px-2 py-0.5">
                EMERGÊNCIA
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-2 rounded-md">
            <MapPinIcon className="size-4 text-primary" weight="fill" />
            <span className="font-medium">{location}</span>
            <span className="text-slate-400">&bull;</span>
            <span>{distance}</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold mb-0.5">
                Ganho Estimado
              </p>
              <p className="text-sm font-extrabold text-primary">{job.price}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8 px-3 text-slate-600 border-slate-300"
                onClick={() => navigate(`/pro/job/${job.id}`)}
              >
                Ver
              </Button>
              <Button
                size="sm"
                className="text-xs h-8 px-4 bg-primary hover:bg-primary/90 font-bold"
              >
                Aceitar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
}
