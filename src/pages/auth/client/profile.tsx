import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import {
  User,
  Envelope,
  Phone,
  MapPin,
  Plus,
  Trash,
  Headset,
  WhatsappLogo,
  CalendarBlank,
  SignOut,
  House,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/custom/pageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const profileSchema = z.object({
  name: z.string().trim().min(2, "Mínimo 2 caracteres").max(60),
  email: z.string().trim().email("Email inválido").max(120),
  phone: z.string().trim().min(9, "Telefone inválido").max(20),
});

type ProfileForm = z.infer<typeof profileSchema>;

interface Address {
  id: string;
  label: string;
  full: string;
}

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: "",
      phone: user?.phone ?? "",
    },
  });

  const [addresses, setAddresses] = useState<Address[]>([
    { id: "1", label: "Casa", full: "Rua Comandante Gika 12, Maianga, Luanda" },
    { id: "2", label: "Trabalho", full: "Edifício Escom, Talatona, Luanda" },
  ]);
  const [newAddr, setNewAddr] = useState("");

  const onSubmit = (data: ProfileForm) => {
    toast("Definições atualizadas",{
     
      description: `Olá, ${data.name}`,
    });
  };

  const addAddress = () => {
    if (!newAddr.trim()) return;
    setAddresses((a) => [
      ...a,
      { id: Date.now().toString(), label: "Outro", full: newAddr.trim() },
    ]);
    setNewAddr("");
  };

  const removeAddress = (id: string) =>
    setAddresses((a) => a.filter((x) => x.id !== id));

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <main className="container max-w-7xl px-6 lg:px-8 pt-8">
        <PageHeader
          title="Definições de Conta"
          subtitle="Atualize os seus dados e endereços"
        />

        <div className="grid grid-cols-10 gap-6">
          {/* MAIN — 7/10 */}
          <div className="col-span-10 lg:col-span-7 space-y-6">
            {/* Dados Pessoais */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl bg-card border border-border/60 shadow-sm p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-6">
                <User weight="duotone" className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-lg">Dados Pessoais</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && (
                    <p className="text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" {...register("phone")} />
                  {errors.phone && (
                    <p className="text-xs text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email && (
                    <p className="text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  Guardar alterações
                </Button>
              </div>
            </form>

            {/* Endereços */}
            <section className="rounded-2xl bg-card border border-border/60 shadow-sm p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-6">
                <MapPin weight="duotone" className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-lg">Endereços Guardados</h2>
              </div>

              <ul className="space-y-3">
                {addresses.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-start gap-3 p-4 rounded-xl border border-border/60 bg-background">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <House weight="duotone" className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{a.label}</p>
                      <p className="text-xs text-muted-foreground">{a.full}</p>
                    </div>
                    <button
                      onClick={() => removeAddress(a.id)}
                      className="h-9 w-9 rounded-lg hover:bg-destructive/10 text-destructive flex items-center justify-center"
                      aria-label="Remover">
                      <Trash className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex gap-2">
                <Input
                  placeholder="Adicionar novo endereço…"
                  value={newAddr}
                  onChange={(e) => setNewAddr(e.target.value)}
                />
                <Button type="button" variant="outline" onClick={addAddress}>
                  <Plus className="h-4 w-4" /> Adicionar
                </Button>
              </div>
            </section>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive">
              <SignOut className="h-4 w-4" /> Terminar sessão
            </Button>
          </div>

          {/* SIDE — 3/10 */}
          <aside className="col-span-10 lg:col-span-3 space-y-6">
            {/* Perfil card */}
            <div className="rounded-2xl bg-card border border-border/60 shadow-sm p-6 text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary-deep flex items-center justify-center text-2xl font-extrabold text-primary-foreground">
                {user?.initials ?? "MS"}
              </div>
              <h3 className="font-bold text-lg mt-4">
                {user?.name ?? "Maria Silva"}
              </h3>
              <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-1">
                <Envelope className="h-3 w-3" /> {"maria@email.com"}
              </p>
              <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <CalendarBlank
                  weight="duotone"
                  className="h-4 w-4 text-primary"
                />
                Membro desde Mar 2025
              </div>
            </div>

            {/* Suporte */}
            <div className="rounded-2xl bg-card border border-border/60 shadow-sm p-6">
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Headset weight="duotone" className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-foreground">Suporte BiscaTech</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Precisa de ajuda? A nossa equipa responde em minutos.
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href="tel:+244923000000"
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary">
                  <Phone weight="duotone" className="h-4 w-4 text-primary" />{" "}
                  +244 923 000 000
                </a>
                <a
                  href="https://wa.me/244923000000"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary">
                  <WhatsappLogo
                    weight="duotone"
                    className="h-4 w-4 text-primary"
                  />{" "}
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export  {Profile};
