import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Eye,
  CheckCircle,
  Briefcase,
  CurrencyDollar,
} from "@phosphor-icons/react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const feed = [
  {
    id: "f1",
    title: "Cano Roto na Cozinha",
    neighborhood: "Talatona",
    date: "Hoje, 14:00",
    price: "8.000 – 12.000 Kz",
    img: "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=600&h=400&fit=crop",
  },
  {
    id: "f2",
    title: "Torneira a Pingar",
    neighborhood: "Miramar",
    date: "Hoje, 16:30",
    price: "5.000 Kz",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
  },
  {
    id: "f3",
    title: "Instalação de Sanita",
    neighborhood: "Maianga",
    date: "Amanhã, 09:00",
    price: "10.000 – 15.000 Kz",
    img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&h=400&fit=crop",
  },
  {
    id: "f4",
    title: "Esquentador avariado",
    neighborhood: "Ingombota",
    date: "Amanhã, 11:00",
    price: "7.500 Kz",
    img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=400&fit=crop",
  },
];

const ProHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [available, setAvailable] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <main className="container max-w-7xl px-6 lg:px-8 pt-8">
        <div className="mb-8">
          <p className="text-sm text-muted-foreground font-medium">
            Bom trabalho hoje 👷
          </p>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
            Olá, {user?.name?.split(" ")[0] ?? "Celso"}
          </h1>
        </div>

        <div className="grid grid-cols-10 gap-6">
          {/* Left 7/10 — Feed */}
          <div className="col-span-10 lg:col-span-7 space-y-4">
            <h2 className="text-xl font-extrabold">
              Pedidos Recentes na Tua Zona
            </h2>
            {!available ? (
              <div className="text-center py-20 rounded-2xl bg-white border border-dashed border-slate-200">
                <p className="font-extrabold text-lg">Estás indisponível</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Ativa a tua disponibilidade para receber pedidos.
                </p>
              </div>
            ) : (
              feed.map((j) => (
                <article
                  key={j.id}
                  className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex">
                    <div className="w-44 h-40 shrink-0 bg-slate-100">
                      <img
                        src={j.img}
                        alt={j.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-5 flex flex-col">
                      <h3 className="font-extrabold text-lg">{j.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span className="inline-flex items-center gap-1">
                          <MapPin
                            size={14}
                            weight="fill"
                            className="text-primary"
                          />{" "}
                          {j.neighborhood}
                        </span>
                        <span>{j.date}</span>
                      </div>
                      <p className="text-sm font-bold text-primary mt-3">
                        {j.price}
                      </p>
                      <div className="mt-auto pt-4 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/pro/job/${j.id}`)}>
                          <Eye size={16} /> Ver
                        </Button>
                        <Button variant="default" size="sm">
                          <CheckCircle size={16} weight="fill" /> Aceitar
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Right 3/10 */}
          <aside className="col-span-10 lg:col-span-3 space-y-6">
            {/* Status / Switch card */}
            <section
              className={cn(
                "relative overflow-hidden rounded-2xl shadow-sm p-6 transition-all border",
                available
                  ? "bg-gradient-hero text-primary-foreground border-transparent"
                  : "bg-white text-foreground border-slate-200",
              )}>
              {available && (
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
              )}
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p
                    className={cn(
                      "text-xs font-bold uppercase tracking-wider",
                      available ? "opacity-90" : "text-muted-foreground",
                    )}>
                    {available ? "Estás Disponível" : "Indisponível"}
                  </p>
                  <p className="font-extrabold text-lg mt-1 leading-tight">
                    {available
                      ? "A receber novos pedidos"
                      : "Não recebes pedidos"}
                  </p>
                </div>
                <Switch
                  checked={available}
                  onCheckedChange={setAvailable}
                  className={cn(
                    "scale-125",
                    available && "data-[state=checked]:bg-white/30",
                  )}
                />
              </div>
            </section>

            {/* Daily summary */}
            <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Resumo do Dia
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Briefcase
                      size={22}
                      className="text-primary"
                      weight="fill"
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold leading-none">3</p>
                    <p className="text-xs text-muted-foreground">Trabalhos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-green-50 flex items-center justify-center">
                    <CurrencyDollar
                      size={22}
                      className="text-success"
                      weight="fill"
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold leading-none">
                      14.500 Kz
                    </p>
                    <p className="text-xs text-muted-foreground">Ganhos</p>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ProHome;
