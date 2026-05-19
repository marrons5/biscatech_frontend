import { Search, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl animate-float-slow" />

      <div className="relative container max-w-md pt-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-bold mb-3">
            <Zap className="h-3 w-3 fill-current" />
            ATIVO EM LUANDA
          </div>

          <h1 className="text-[34px] leading-[1.05] font-extrabold text-foreground tracking-tight text-balance">
            Que serviço
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              precisas hoje?
            </span>
          </h1>

          <p className="mt-3 text-sm text-muted-foreground font-medium leading-relaxed">
            Profissionais de confiança perto de ti, em segundos.
          </p>

          {/* Search */}
          <div className="mt-5 relative group">
            <div className="absolute inset-0 bg-gradient-hero rounded-2xl blur-lg opacity-30 group-focus-within:opacity-50 transition-opacity" />
            <div className="relative flex items-center gap-2 bg-card border border-border rounded-2xl shadow-card pl-4 pr-2 h-14">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Ex: canalizador, eletricista..."
                className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-muted-foreground"
              />
              <Button variant="default" size="sm" className="h-10 px-5">
                Buscar
              </Button>
            </div>
          </div>

          {/* CTA principal */}
          <Button variant="default"  className="w-full mt-4 group">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            Pedir ajuda agora
          </Button>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-muted-foreground font-semibold">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-success" /> Verificados
            </span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>+1.200 profissionais</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>4.9 ★</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
