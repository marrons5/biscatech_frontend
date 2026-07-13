import { useEffect, useState } from "react";
import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { ChartAreaAxes } from "@/components/custom/areaChart";
import { ChartBarLabel } from "@/components/custom/barChart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components";
import { walletService, type WalletSummary, type Transaction } from "@/services/walletService";

function ProBalance() {
  const [summary, setSummary] = useState<WalletSummary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [walletRes, txRes] = await Promise.all([
          walletService.getSummary(),
          walletService.listTransactions(),
        ]);
        if (walletRes.data.success) setSummary(walletRes.data.data);
        if (txRes?.data?.success) setTransactions(txRes.data.data);
      } catch {
        toast.error("Erro ao carregar saldo.");
      } finally { setLoading(false); }
    })();
  }, []);

  const balance = summary?.balance ?? 0;
  const potential = summary?.potentialEarnings ?? 0;
  const total = summary?.totalEarnings ?? 0;
  const jobs = summary?.monthlyJobs ?? 0;
  const commission = summary?.commission ?? 0;

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <section className="grid grid-cols-10 gap-10 px-10">
      <main className="col-span-10 lg:col-span-7 flex flex-col gap-10">
        <ChartAreaAxes />
        <ChartBarLabel />

        {transactions.length > 0 && (
          <Card className="rounded-2xl border border-slate-200 shadow-sm p-5!">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Histórico de transacções</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {transactions.map((tx) => (
                  <li key={tx.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${tx.type === "earning" ? "bg-success-soft text-success" : "bg-danger-soft text-danger"}`}>
                        {tx.type === "earning" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-ink">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString("pt-AO")}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${tx.type === "earning" ? "text-success" : "text-danger"}`}>
                      {tx.type === "earning" ? "+" : "-"}{Number(tx.amount).toLocaleString()} Kz
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </main>

      <aside className="col-span-10 lg:col-span-3">
        <Card className="bg-primary-gradient flex flex-col gap-5 p-5! rounded-xl">
          <Card className="bg-card rounded-2xl border border-slate-200 shadow-sm p-5! *:p-0">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Saldo Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div><span className="text-primary text-2xl font-bold">{balance.toLocaleString()} Kz</span></div>
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
                <span className="font-bold">{potential.toLocaleString()} Kz</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ganhos totais</span>
                <span className="font-bold">{total.toLocaleString()} Kz</span>
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
                <span className="font-bold">{jobs}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total bruto</span>
                <span className="font-bold">{total.toLocaleString()} Kz</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Comissão</span>
                <span className="font-bold">-{commission.toLocaleString()} Kz</span>
              </div>
            </CardContent>
          </Card>
        </Card>
      </aside>
    </section>
  );
}

export { ProBalance };
