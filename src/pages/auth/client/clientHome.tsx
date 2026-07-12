import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  // WrenchIcon,
  LightningIcon,
  DropIcon,
  PaintRollerIcon,
  HammerIcon,
  FanIcon,
  ShieldCheckIcon,
  InfoIcon,
  // ArrowRight,
  BroomIcon
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const services = [
  { label: "Desentupir lavatório ou canos", icon: DropIcon, category: "reparos", price: "A partir de 5.000 Kz" },
  { label: "Reparar curto-circuito", icon: LightningIcon, category: "emergencia", price: "Urgente" },
  { label: "Instalar Ar Condicionado", icon: FanIcon, category: "instalacoes", price: "A partir de 15.000 Kz" },
  { label: "Pintura de paredes (Interior)", icon: PaintRollerIcon, category: "reparos", price: "Sob consulta" },
  { label: "Montagem de móveis", icon: HammerIcon, category: "instalacoes", price: "A partir de 8.000 Kz" },
  { label: "Fuga de água urgente", icon: DropIcon, category: "emergencia", price: "Urgente" },
  { label: "Limpeza de fossa séptica", icon: BroomIcon, category: "manutencao", price: "A partir de 25.000 Kz" },
  { label: "Manutenção preventiva AC", icon: FanIcon, category: "manutencao", price: "A partir de 10.000 Kz" },
];

const tabs = [
  { id: "todos", label: "Todos" },
  { id: "reparos", label: "Reparos" },
  { id: "instalacoes", label: "Instalações" },
  { id: "manutencao", label: "Manutenção" },
  { id: "emergencia", label: "Emergência" },
];

// O Neumorfismo exige tons suaves. A cor identifica a categoria nos ícones.
const getCategoryColor = (category: string) => {
  switch (category) {
    case "reparos": return "text-primary";
    case "instalacoes": return "text-success";
    case "manutencao": return "text-warning";
    case "emergencia": return "text-destructive";
    default: return "text-foreground";
  }
};

function ClientHome() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("todos");
  
  const filtered = tab === "todos" ? services : services.filter((s) => s.category === tab);

  return (
    <main className="w-full grid grid-cols-1 lg:grid-cols-10 gap-10 px-4 lg:px-10 py-8 bg-background min-h-svh">
      
      <section className="col-span-1 lg:col-span-7 space-y-10">
        
        {/* CABEÇALHO E PESQUISA NEUMÓRFICA */}
        <div className="bg-primary-gradient flex flex-col items-center justify-center p-8 rounded-[2rem] neu-flat animate-in fade-in zoom-in-95 duration-700">
          <h2 className="text-primary-foreground text-3xl lg:text-4xl font-extrabold text-foreground text-center">
            Que serviço precisas hoje?
          </h2>
          <p className="text-primary-foreground text-sm mt-3 font-medium text-center">
            Profissionais verificados a poucos minutos de ti.
          </p>
          
          {/* Input com estado 'Pressed' (sombra interior) para sensação tátil */}
          <div className="mt-8 w-full max-w-2xl relative group flex items-center neu-pressed rounded-2xl p-2">
            <MagnifyingGlassIcon className="absolute left-6 h-6 w-6 text-neutral" />
            <input
              type="text"
              placeholder="Procurar desentupimento, montagem, limpeza…"
              onFocus={() => navigate("/client/request/create")}
              className="w-full h-12 pl-14 pr-4 bg-transparent border-none outline-none text-foreground font-medium placeholder:text-neutral/70"
            />
          </div>
        </div>

        {/* TABS NEUMÓRFICAS */}
        <div className="flex flex-wrap gap-4 justify-center py-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              // Tab ativa afunda (neu-pressed), Tab inativa sobressai (neu-flat)
              className={cn(
                " rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 outline-none",
                tab === t.id 
                  ? "neu-pressed text-primary" 
                  : "neu-flat text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* GRELHA DE SERVIÇOS (CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 pt-4">
          {filtered.map((s, index) => {
            const iconColor = getCategoryColor(s.category);

            return (
              <button
                key={s.label}
                onClick={() => navigate("/client/request/create", { state: { service: s.label } })}
                // Os botões afundam fisicamente (active:neu-pressed) ao serem clicados
                className="group flex flex-col items-center justify-center gap-4 p-8 rounded-[2rem] neu-flat active:neu-pressed transition-all duration-300 text-center animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
              >
                {/* Ícone com sombra interna para contraste tátil */}
                <div className={cn("h-16 w-16 rounded-full flex items-center justify-center neu-pressed transition-colors duration-300", iconColor)}>
                  <s.icon weight="duotone" className="h-8 w-8" />
                </div>
                
                <div className="mt-2">
                  <p className="font-extrabold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
                    {s.label}
                  </p>
                  <p className="text-sm font-semibold text-muted-foreground mt-2">
                    {s.price}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* BARRA LATERAL (WIDGETS NEUMÓRFICOS) */}
      <aside className="col-span-1 lg:col-span-3 space-y-8">
        <div className="rounded-[2rem] neu-flat p-8 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full neu-pressed text-success flex items-center justify-center mb-6">
            <ShieldCheckIcon weight="duotone" className="h-8 w-8" />
          </div>
          <h3 className="font-extrabold text-foreground text-xl">Segurança</h3>
          <p className="text-sm text-muted-foreground mt-3 font-medium">
            Confirme a identidade do profissional. Todos os Pros possuem o BI verificado pela nossa equipa.
          </p>
        </div>

        <div className="rounded-[2rem] neu-flat p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="h-16 w-16 rounded-full neu-pressed text-primary flex items-center justify-center mb-4">
              <InfoIcon weight="duotone" className="h-8 w-8" />
            </div>
            <h3 className="font-extrabold text-foreground text-xl">Como funciona</h3>
          </div>
          
          <ol className="text-sm text-muted-foreground mt-4 space-y-4 font-medium">
            <li className="flex items-center gap-4">
              <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full neu-pressed text-primary font-bold">1</span>
              Escolhe o serviço
            </li>
            <li className="flex items-center gap-4">
              <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full neu-pressed text-primary font-bold">2</span>
              Descreve e agenda
            </li>
            <li className="flex items-center gap-4">
              <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full neu-pressed text-primary font-bold">3</span>
              Recebe o Pro
            </li>
          </ol>
        </div>
      </aside>

    </main>
  );
}

export { ClientHome };