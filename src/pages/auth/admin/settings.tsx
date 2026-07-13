import { PageHeader, Card } from "@/components/custom/primitives";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { adminService } from "@/services/adminService";

export default function AdminSettings() {
  const [commission, setCommission] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await adminService.getSettings();
        if (res.data.success) setCommission(String(res.data.data.commissionRate));
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  const save = async () => {
    try {
      const rate = parseInt(commission, 10);
      if (isNaN(rate) || rate < 0 || rate > 100) {
        toast.error("Valor inválido (0-100).");
        return;
      }
      const res = await adminService.updateSettings({ commissionRate: rate } as any);
      if (res.data.success) toast.success("Definições guardadas!");
    } catch {
      toast.error("Erro ao guardar.");
    }
  };

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <>
      <PageHeader title="Definições da plataforma" subtitle="Configurações gerais da BiscaTech." />
      <Card>
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label>Comissão da plataforma (%)</Label>
            <Input type="number" min={0} max={100} value={commission} onChange={(e) => setCommission(e.target.value)} className="rounded-xl" />
            <p className="text-xs text-muted-foreground">Percentagem retida sobre cada transacção concluída.</p>
          </div>
          <Button className="rounded-xl" onClick={save}>Guardar</Button>
        </div>
      </Card>
    </>
  );
}
