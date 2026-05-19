import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Wrench,
  Lightning,
  PaintRoller,
  Hammer,
  Sparkle,
  Wind,
  MapPin,
  Calendar,
  Camera,
  ArrowRight,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/custom/pageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const services = [
  { label: "Canalizador", icon: Wrench, est: "5.000 – 15.000 Kz" },
  { label: "Eletricista", icon: Lightning, est: "6.000 – 18.000 Kz" },
  { label: "Pintor", icon: PaintRoller, est: "8.000 – 25.000 Kz" },
  { label: "Pedreiro", icon: Hammer, est: "10.000 – 30.000 Kz" },
  { label: "Limpeza", icon: Sparkle, est: "4.000 – 10.000 Kz" },
  { label: "AC / Refr.", icon: Wind, est: "12.000 – 20.000 Kz" },
];

const RequestCreate = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { service?: string } };
  const [service, setService] = useState<string>(
    state?.service ?? "Canalizador",
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Talatona, Luanda");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const current = services.find((s) => s.label === service)!;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast("Pedido enviado!", {
        description: "À procura de profissionais perto de ti.",
      });
      navigate("/app/request/1", { replace: true });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <main className="container max-w-7xl px-6 lg:px-8 pt-8">
        <PageHeader
          title="Pedir Biscate"
          subtitle="Descreve o teu problema"
          back
        />

        <form onSubmit={submit} className="grid grid-cols-10 gap-6">
          {/* Left 7/10 */}
          <div className="col-span-10 lg:col-span-7 space-y-6">
            <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 space-y-5">
              <div>
                <Label className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                  Categoria
                </Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {services.map((s) => {
                    const selected = service === s.label;
                    return (
                      <button
                        type="button"
                        key={s.label}
                        onClick={() => setService(s.label)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                          selected
                            ? "border-primary bg-blue-50"
                            : "border-slate-200 bg-white hover:border-primary/30",
                        )}>
                        <s.icon
                          size={24}
                          weight={selected ? "fill" : "regular"}
                          className={
                            selected ? "text-primary" : "text-slate-500"
                          }
                        />
                        <span className="text-xs font-bold">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="title">Título do Pedido</Label>
                <Input
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Cano roto na cozinha"
                  className="h-11"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="desc">Descreve o teu problema</Label>
                <Textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Conta os detalhes para receberes melhores orçamentos…"
                  maxLength={300}
                  className="min-h-[120px] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="loc">Localização</Label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                      weight="fill"
                    />
                    <Input
                      id="loc"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="h-11 pl-9"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="date">Data</Label>
                  <div className="relative">
                    <Calendar
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="h-11 pl-9"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-dashed">
                <Camera size={18} weight="bold" /> Anexar Foto do Problema
              </Button>

              <Button
                type="submit"
                
                size="lg"
                disabled={loading}
                className="w-full">
                {loading ? (
                  "A enviar…"
                ) : (
                  <>
                    Pedir Biscate <ArrowRight size={18} weight="bold" />
                  </>
                )}
              </Button>
            </section>
          </div>

          {/* Right 3/10 */}
          <aside className="col-span-10 lg:col-span-3 space-y-6">
            <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Estimativa
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                Orçamento estimado:
              </p>
              <p className="text-xl font-extrabold text-primary mt-1">
                {current.est}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                para a categoria{" "}
                <span className="font-bold text-foreground">
                  {current.label}
                </span>
              </p>
            </section>

            <section className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-2">
                💡 Dica
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Adicionar fotos e descrição detalhada ajuda os profissionais a
                darem orçamentos mais precisos.
              </p>
            </section>

            <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Como funciona
              </p>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="font-extrabold text-primary">1.</span>{" "}
                  Descreves o pedido
                </li>
                <li className="flex gap-2">
                  <span className="font-extrabold text-primary">2.</span>{" "}
                  Profissionais respondem
                </li>
                <li className="flex gap-2">
                  <span className="font-extrabold text-primary">3.</span>{" "}
                  Escolhes e contratas
                </li>
              </ol>
            </section>
          </aside>
        </form>
      </main>
    </div>
  );
};

export  {RequestCreate};
