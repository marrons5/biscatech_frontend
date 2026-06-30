import React from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ChartAreaAxes } from "@/components/custom/areaChart";
import { ChartBarLabel } from "@/components/custom/barChart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components";

function ProBalance() {
  return (
    <React.Fragment>
      <section className="grid grid-cols-10 gap-10 px-10">

        {/* Left 7/10 */}
        <main className="col-span-10 lg:col-span-7 flex flex-col gap-10">
          <ChartAreaAxes/>
          <ChartBarLabel />
        </main>

        {/* Right 3/10 */}
        <aside className="col-span-10 lg:col-span-3">
          <Card className="bg-primary-gradient flex flex-col gap-5 p-5! rounded-xl">

            <Card className="bg-card rounded-2xl border border-slate-200 shadow-sm p-5! *:p-0">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Saldo Atual</CardTitle>
              </CardHeader>

              <CardContent>
                <div><span className="text-primary text-2xl font-bold">42.000 Kz</span></div>
                <div><span className="text-foreground text-sm">Disponível para levantamento</span></div>
              </CardContent>

              <CardFooter className="border-t-0">
                <Button variant="default" size="lg" className="bg-primary-gradient rounded-full w-full">
                  <Wallet size={18} /> 
                  <span>Levantar Fundo</span>
                </Button>
              </CardFooter>
            </Card>

            <Card className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5! *:p-0">
              <CardHeader>
                <CardTitle className="text-basd font-semibold">Ganhos Potenciais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ganhos potenciais</span>
                  <span className="font-bold">230.000 Kz</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ganhos totais</span>
                  <span className="font-bold">87.000 Kz</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5! *:p-0">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Resumo do Mês</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Trabalhos</span>
                  <span className="font-bold">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total bruto</span>
                  <span className="font-bold">287.000 Kz</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Comissão</span>
                  <span className="font-bold">-28.700 Kz</span>
                </div>
              </CardContent>
            </Card>
          </Card>
        </aside>

      </section>
    </React.Fragment>
  );
}

export { ProBalance };
