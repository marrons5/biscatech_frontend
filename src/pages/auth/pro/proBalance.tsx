import React from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ChartAreaAxes } from "@/components/custom/areaChart";
import { ChartBarLabel } from "@/components/custom/barChart";

function ProBalance() {
  return (
    <React.Fragment>
      <section className="grid grid-cols-10 gap-6 max-w-7xl px-6 lg:px-10 pb-10 ">
        {/* Left 7/10 */}
        <main className="flex flex-col col-span-10 lg:col-span-7 space-y-6">
          <ChartAreaAxes/>

          <ChartBarLabel />
        </main>

        {/* Right 3/10 */}
        <aside className="col-span-10 lg:col-span-3 space-y-6">
          <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Saldo Atual
            </p>
            <p className="text-4xl font-extrabold text-primary mt-2">
              42.000 Kz
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Disponível para levantamento
            </p>
            <Button variant="default" size="lg" className="w-full mt-5">
              <Wallet size={18} /> Levantar Fundo
            </Button>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Por Levantar
            </p>
            <p className="text-2xl font-extrabold text-slate-500 mt-2">
              5.000 Kz
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Trabalhos em andamento
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Resumo do Mês
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trabalhos</span>
                <span className="font-bold">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total bruto</span>
                <span className="font-bold">287.000 Kz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Comissão</span>
                <span className="font-bold">- 28.700 Kz</span>
              </div>
            </div>
          </section>
        </aside>
      </section>
    </React.Fragment>
  );
}

export { ProBalance };
