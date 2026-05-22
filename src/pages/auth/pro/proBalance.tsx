import React from "react";
import { Wallet, TrendingUp, ChartBar, WalletIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ChartAreaAxes } from "@/components/custom/areaChart";
import { ChartBarLabel } from "@/components/custom/barChart";

import { Card, CardContent, CardHeader, CardTitle } from "@/components";
import { PageHeader } from "@/components/custom/pageHeader";
// import { PageHeader } from "@/components/nema/PageHeader";

const months = [
  { d: "Jan", v: 180 },
  { d: "Fev", v: 220 },
  { d: "Mar", v: 195 },
  { d: "Abr", v: 287 },
  { d: "Mai", v: 245 },
];
const cats = [
  { d: "Canalização", v: 65 },
  { d: "Inst. Sanitária", v: 30 },
  { d: "Reparações", v: 18 },
];
const Bars = ({
  data,
  suffix = "k",
}: {
  data: { d: string; v: number }[];
  suffix?: string;
}) => {
  const max = Math.max(...data.map((x) => x.v));
  return (
    <div className="flex items-end justify-between gap-3 h-48">
      {data.map((m) => (
        <div key={m.d} className="flex-1 flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold text-muted-foreground">
            {m.v}
            {suffix}
          </span>
          <div
            className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary-glow shadow-sm"
            style={{ height: `${(m.v / max) * 100}%` }}
          />
          <span className="text-xs font-bold text-foreground">{m.d}</span>
        </div>
      ))}
    </div>
  );
};
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
