import React, { useMemo, useState, useEffect } from "react";
import { StarIcon } from "@phosphor-icons/react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components";
import { serviceRequestService, type IServiceRequest } from "@/services/serviceRequestService";
import { proService } from "@/services/proService";

function ProHistory() {
  const [requests, setRequests] = useState<IServiceRequest[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [reqRes, profRes] = await Promise.all([
          serviceRequestService.list({ scope: "assigned" }),
          proService.getProfile(),
        ]);
        if (reqRes.data.success) setRequests(reqRes.data.data.filter((r) => r.status === "completed"));
        if (profRes.data.success) setProfile(profRes.data.data);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  const servicesHistory = useMemo(
    () => requests.map((service) => (
      <Card className="rounded-lg w-full" key={service.id}>
        <CardHeader>
          <CardTitle className="text-base font-semibold">{service.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center [&_span:first-child]:font-medium [&_span:first-child]:text-foreground [&_span:last-child]:text-muted-foreground text-sm">
          <div className="flex flex-col gap-1">
            <div><span>Localização:</span> <span>{service.location}</span></div>
          </div>
          <div className="flex flex-col gap-1">
            <div><span>Tipo:</span> <span>{service.type}</span></div>
            <div><span>Data:</span> <span>{new Date(service.date).toLocaleDateString("pt-AO")}</span></div>
          </div>
        </CardContent>
        <CardFooter className="border-accent! flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div><span className="text-sm font-medium">Concluído</span></div>
          </div>
          <div className="text-sm flex items-center gap-1">
            <div><span className="font-medium">Valor</span></div>
            <div><span className="text-primary">{service.price ? `${Number(service.price).toLocaleString()} Kz` : "—"}</span></div>
          </div>
        </CardFooter>
      </Card>
    )),
    [requests],
  );

  const avgRating = profile?.ratingAverage ? Number(profile.ratingAverage).toFixed(1) : "—";
  const completedCount = profile?.completedServices ?? requests.length;

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <React.Fragment>
      <section className="grid grid-cols-10 gap-10 px-10 w-full h-full">
        <main className="col-span-10 lg:col-span-7 flex flex-col gap-5">
          {servicesHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum histórico de serviços.</p>
          ) : servicesHistory}
        </main>

        <aside className="col-span-10 lg:col-span-3">
          <Card className="bg-primary-gradient flex flex-col gap-5 p-5! *:p-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-primary-foreground text-xl font-bold">Avaliação Geral</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 justify-center items-center">
              <div className="ring ring-primary-foreground rounded-full w-50 aspect-square flex flex-col justify-center items-center">
                <span className="text-white text-5xl font-extrabold text-primary">{avgRating}</span>
                <div className="flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} size={28} weight="fill" className="text-yellow-400" />
                  ))}
                </div>
                <span className="text-white text-xs text-muted-foreground mt-1">{profile?.ratingCount ?? 0} avaliações</span>
              </div>

              <Card className="bg-card rounded-2xl border border-slate-200 shadow-sm p-5! *:p-0 w-full">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Desempenho</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2.5">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">Serviços Completados</span>
                      <span className="font-extrabold">{completedCount}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">Taxa de Aceitação</span>
                      <span className="font-extrabold">{profile?.acceptanceRate ? `${profile.acceptanceRate}%` : "—"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </aside>
      </section>
    </React.Fragment>
  );
}

export { ProHistory };
