import { PageHeader, Card } from "@/components/custom/primitives";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { adminService, type AdminCategory } from "@/services/adminService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui";

export default function AdminServices() {
  const [cats, setCats] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<string>("REPAIR");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const load = async () => {
    try {
      const res = await adminService.listCategories();
      if (res.data.success) setCats(res.data.data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setCategoryId(""); setName(""); setSlug(""); setDescription("");
    setType("REPAIR"); setPriceMin(""); setPriceMax(""); setEditingId(null);
  };

  const openCreate = (catId: string) => {
    setCategoryId(catId); setOpen(true); setEditingId(null);
  };

  const save = async () => {
    if (!name.trim() || !slug.trim()) {
      toast.error("Nome e slug são obrigatórios.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        categoryId,
        name: name.trim(),
        slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
        description: description.trim() || undefined,
        type: type as any,
        priceMin: priceMin ? Number(priceMin) : undefined,
        priceMax: priceMax ? Number(priceMax) : undefined,
      };
      const res = editingId
        ? await adminService.updateService(editingId, payload as any)
        : await adminService.createService(payload);
      if (res.data.success) {
        toast.success(editingId ? "Serviço actualizado!" : "Serviço criado!");
        setOpen(false); resetForm(); setLoading(true); await load();
      }
    } catch {
      toast.error("Erro ao guardar serviço.");
    }
    setSaving(false);
  };

  const autoSlug = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  };

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  return (
    <>
      <PageHeader title="Serviços" subtitle="Sub-serviços dentro de cada categoria." />
      {cats.map((cat) => (
        <Card key={cat.id} className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-medium text-ink">{cat.name}</p>
            <button onClick={() => openCreate(cat.id)} className="text-xs font-medium text-primary hover:underline">+ Novo serviço</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.services.length === 0 ? (
              <span className="text-xs text-muted-foreground">Nenhum serviço.</span>
            ) : cat.services.map((s) => (
              <span key={s.id} className="rounded-full bg-muted px-3 py-1 text-xs text-ink">{s.name}</span>
            ))}
          </div>
        </Card>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar serviço" : "Novo serviço"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); save(); }} className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input value={name} onChange={(e) => autoSlug(e.target.value)} placeholder="Ex: Reparação de torneira" className="rounded-xl h-11" required />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="rounded-xl h-11 text-muted-foreground" required />
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="REPAIR">Reparação</SelectItem>
                  <SelectItem value="INSTALLATION">Instalação</SelectItem>
                  <SelectItem value="MAINTENANCE">Manutenção</SelectItem>
                  <SelectItem value="EMERGENCY">Emergência</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Preço mínimo (Kz)</Label>
                <Input type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="rounded-xl h-11" />
              </div>
              <div className="space-y-2">
                <Label>Preço máximo (Kz)</Label>
                <Input type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="rounded-xl h-11" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="rounded-xl">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={saving} className="rounded-xl">
                {saving ? "A guardar..." : (editingId ? "Actualizar" : "Criar serviço")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
