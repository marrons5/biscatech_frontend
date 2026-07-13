import { PageHeader, Card } from "@/components/custom/primitives";
import { Wrench, Zap, Paintbrush, Hammer, Sparkles, Snowflake, Camera, Wifi, Home, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { adminService, type AdminCategory } from "@/services/adminService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const iconMap: Record<string, any> = { Canalizador: Wrench, Eletricista: Zap, Pintor: Paintbrush, Pedreiro: Hammer, Limpeza: Sparkles, AC: Snowflake, CCTV: Camera, Internet: Wifi, Electrodomésticos: Home };

export default function AdminCategories() {
  const [cats, setCats] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const load = async () => {
    try {
      const res = await adminService.listCategories();
      if (res.data.success) setCats(res.data.data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => { setName(""); setSlug(""); setDescription(""); };

  const create = async () => {
    if (!name.trim() || !slug.trim()) {
      toast.error("Nome e slug são obrigatórios.");
      return;
    }
    setSaving(true);
    try {
      const res = await adminService.createCategory({
        name: name.trim(),
        slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
        description: description.trim() || undefined,
      });
      if (res.data.success) {
        toast.success("Categoria criada!");
        setOpen(false);
        resetForm();
        setLoading(true);
        await load();
      }
    } catch {
      toast.error("Erro ao criar categoria.");
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
      <PageHeader title="Categorias" subtitle="Gere as categorias de serviço." action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"><PlusCircle className="h-4 w-4" /> Nova categoria</button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nova categoria</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); create(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cat-name">Nome</Label>
                <Input id="cat-name" value={name} onChange={(e) => autoSlug(e.target.value)} placeholder="Ex: Canalizador" className="rounded-xl h-11" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat-slug">Slug</Label>
                <Input id="cat-slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Ex: canalizador" className="rounded-xl h-11 text-muted-foreground" required />
                <p className="text-xs text-muted-foreground">Identificador único usado nas URLs.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat-desc">Descrição (opcional)</Label>
                <Textarea id="cat-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Breve descrição da categoria..." className="rounded-xl resize-none" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="rounded-xl">Cancelar</Button>
                </DialogClose>
                <Button type="submit" disabled={saving} className="rounded-xl">
                  {saving ? "A criar..." : "Criar categoria"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      } />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => {
          const Icon = iconMap[c.name] ?? Wrench;
          return (
            <Card key={c.id} className="card-hover">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                <div className="flex-1"><p className="font-medium text-ink">{c.name}</p><p className="text-xs text-muted-foreground">{c.services?.length ?? 0} serviços</p></div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
