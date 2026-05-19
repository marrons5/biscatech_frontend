import { useNavigate, useParams } from "react-router-dom";
import { MapPin, Clock, Wrench, User, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/custom/pageHeader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProJobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const accept = () => {
    toast("Pedido aceite!", {
      description: "Liga ao cliente para combinar detalhes.",
    });
    navigate("/pro");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <main className="container max-w-6xl px-4 lg:px-8 pt-6 lg:pt-10 space-y-4">
        <PageHeader
          title={`Pedido #${id}`}
          subtitle="Detalhes do trabalho"
          back
        />
        <section className="rounded-3xl bg-gradient-hero text-primary-foreground p-5 shadow-glow">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Wrench className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-xs opacity-90">Serviço</p>
              <p className="font-extrabold text-lg">Canalizador</p>
            </div>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-3 py-1 text-xs font-bold">
            <Clock className="h-3.5 w-3.5" /> Há 2 minutos
          </div>
        </section>

        <section className="rounded-3xl bg-card border border-border/60 shadow-card p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 text-primary" /> Localização
            </div>
            <span className="font-semibold text-sm text-right">
              Talatona, Luanda
              <br />
              <span className="text-xs text-muted-foreground">
                1,2 km de ti
              </span>
            </span>
          </div>
          <div className="pt-3 border-t border-border/60">
            <p className="text-xs text-muted-foreground inline-flex items-center gap-2 mb-1">
              <MessageSquare className="h-4 w-4" /> Descrição
            </p>
            <p className="text-sm leading-relaxed">
              Torneira da cozinha está a pingar há 2 dias, parece que precisa de
              uma vedação nova.
            </p>
          </div>
          <div className="pt-3 border-t border-border/60 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Orçamento sugerido</p>
            <p className="text-xl font-extrabold text-primary">
              8.000 – 12.000 Kz
            </p>
          </div>
        </section>

        <section className="rounded-3xl bg-card border border-border/60 shadow-card p-5">
          <p className="text-xs text-muted-foreground inline-flex items-center gap-2 mb-2">
            <User className="h-4 w-4" /> Cliente
          </p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center font-bold">
              M
            </div>
            <div>
              <p className="font-bold text-sm">Maria S.</p>
              <p className="text-[11px] text-muted-foreground">
                Cliente · 4 pedidos
              </p>
            </div>
          </div>
        </section>

        <Button variant="default" size="lg" className="w-full" onClick={accept}>
          Aceitar pedido
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => navigate(-1)}>
          Voltar à lista
        </Button>
      </main>
    </div>
  );
};

export default ProJobDetail;
