import { PageHeader, Card } from "@/components/custom/primitives";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { proService } from "@/services/proService";

const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const slots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export default function Availability() {
  const [busy, setBusy] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await proService.getAvailability();
        if (res.data.success) {
          const keys = res.data.data
            .filter((s) => !s.isAvailable)
            .map((s) => `${days[s.dayOfWeek]}-${s.startTime}`);
          setBusy(keys);
        }
      } catch { /* ignore */ } finally { setLoading(false); }
    })();
  }, []);

  const toggle = (k: string) => {
    setBusy((prev) => {
      const next = prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k];
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = days.flatMap((day, dayIdx) =>
        slots.map((time) => ({
          dayOfWeek: dayIdx,
          startTime: time,
          endTime: `${String(Number(time.split(":")[0]) + 1).padStart(2, "0")}:00`,
          isAvailable: !busy.includes(`${day}-${time}`),
        })),
      );
      const res = await proService.updateAvailability({ slots: payload });
      if (res.data.success) {
        toast.success("Disponibilidade actualizada!");
      }
    } catch {
      toast.error("Erro ao guardar disponibilidade.");
    } finally { setSaving(false); }
  };

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <>
      <PageHeader
        title="Disponibilidade"
        subtitle="Marca as horas em que estás ocupado."
        action={
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg">
            {saving ? "A guardar..." : "Guardar"}
          </button>
        }
      />
      <Card>
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl bg-muted/40 p-4 text-sm">
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-primary-soft" /> Disponível</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-danger-soft" /> Ocupado</span>
          <span className="ml-auto text-muted-foreground">Toca num horário para alternar</span>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[100px_repeat(12,minmax(0,1fr))] gap-1 text-xs">
              <div />
              {slots.map((s) => <div key={s} className="text-center text-muted-foreground">{s}</div>)}
              {days.map((d) => (
                <div key={d} className="contents">
                  <div className="flex items-center pr-2 text-sm font-medium text-ink">{d}</div>
                  {slots.map((s) => {
                    const k = `${d}-${s}`;
                    const isBusy = busy.includes(k);
                    return (
                      <button key={k} onClick={() => toggle(k)} className={cn("h-9 rounded-md transition", isBusy ? "bg-danger-soft hover:bg-danger/30" : "bg-primary-soft hover:bg-primary/25")} />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
