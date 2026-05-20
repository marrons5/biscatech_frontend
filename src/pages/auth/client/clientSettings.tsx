// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useNavigate } from "react-router-dom";
import {
  PhoneIcon,
  SignOutIcon,
  TrashIcon,
  HouseIcon,
  MapPinIcon,
  EnvelopeIcon,
  PlusIcon,
  UserIcon,
} from "@phosphor-icons/react";
// import { PageHeader } from "@/components/nema/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components";
// import { useAuth } from "@/context/AuthContext";
// import { toast } from "@/hooks/use-toast";

// const profileSchema = z.object({
//   name: z.string().trim().min(2, "Mínimo 2 caracteres").max(60),
//   email: z.string().trim().email("Email inválido").max(120),
//   phone: z.string().trim().min(9, "Telefone inválido").max(20),
// });

// type ProfileForm = z.infer<typeof profileSchema>;

// interface Address { id: string; label: string; full: string; }

const ClientSettings = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileForm>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       name: user?.name ?? "",
//       email: "",
//       phone: user?.phone ?? "",
//     },
//   });

//   const [addresses, setAddresses] = useState<Address[]>([
//     { id: "1", label: "Casa", full: "Rua Comandante Gika 12, Maianga, Luanda" },
//     { id: "2", label: "Trabalho", full: "Edifício Escom, Talatona, Luanda" },
//   ]);
//   const [newAddr, setNewAddr] = useState("");

//   const onSubmit = (data: ProfileForm) => {
//     toast({ title: "Definições atualizadas", description: `Olá, ${data.name}` });
//   };

//   const addAddress = () => {
//     if (!newAddr.trim()) return;
//     setAddresses((a) => [...a, { id: Date.now().toString(), label: "Outro", full: newAddr.trim() }]);
//     setNewAddr("");
//   };

//   const removeAddress = (id: string) => setAddresses((a) => a.filter((x) => x.id !== id));

//   const handleLogout = () => { logout(); navigate("/", { replace: true }); };

  return (
    <main className="bg-background w-full px-6 lg:px-8 pt-8">
        {/* <PageHeader title="Definições de Conta" subtitle="Atualize os seus dados e endereços" /> */}

        <div className="grid grid-cols-10 gap-6 w-full">
          {/* MAIN — 7/10 */}
          <section className="col-span-10 lg:col-span-7 space-y-6">
            {/* Dados Pessoais */}
            <form className="rounded-2xl bg-card border border-border/60 shadow-sm p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-6">
                <UserIcon weight="duotone" className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-lg">Dados Pessoais</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name"/>
                  {/* {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>} */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" />
                  {/* {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>} */}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email"/>
                  {/* {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>} */}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit">Guardar alterações</Button>
              </div>
            </form>

            {/* Endereços */}
            <section className="rounded-2xl bg-card border border-border/60 shadow-sm p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-6">
                <MapPinIcon weight="duotone" className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-lg">Endereços Guardados</h2>
              </div>

              <ul className="space-y-3">
                  <li  className="flex items-start gap-3 p-4 rounded-xl border border-border/60 bg-background">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <HouseIcon weight="duotone" className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm"></p>
                      <p className="text-xs text-muted-foreground"></p>
                    </div>
                    <Button className="h-9 w-9 rounded-lg hover:bg-destructive/10 text-destructive flex items-center justify-center" aria-label="Remover">
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </li>
              </ul>

              <div className="mt-5 flex gap-2">
                <Input placeholder="Adicionar novo endereço…" />
                <Button>
                  <PlusIcon className="h-4 w-4" /> Adicionar
                </Button>
              </div>
            </section>

            <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive">
              <SignOutIcon className="h-4 w-4" /> Terminar sessão
            </Button>
          </section>

          {/* SIDE — 3/10 */}
          <section className="grid grid-rows-3 col-span-10 lg:col-span-3 space-y-6">
            <Card className="relative overflow-hidden row-span-1 rounded-2xl bg-primary-gradient shadow-sm text-primary-foreground p-6 text-center">
              <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-white/15 blur-2xl" />
              <div className="relative">
                <div className="mx-auto h-20 w-20 rounded-full bg-white/20 backdrop-blur border-2 border-white/30 flex items-center justify-center text-3xl font-extrabold">
                  EF
                </div>
                <h2 className="mt-4 text-xl font-extrabold">Enzo Fernández</h2>
              </div>
            </Card>

            <Card className="rounded-2xl bg-card border row-span-1 border-border/60 shadow-sm p-5 *:p-0">
                <CardHeader>
                    <CardTitle>Dados de Contacto</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <EnvelopeIcon size={18} className="text-primary mt-0.5" />
                            <div className="min-w-0">
                                <p className="text-[11px] uppercase font-bold text-muted-foreground">Email</p>
                                <p className="font-semibold truncate">celso@nema.app</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                        <PhoneIcon size={18} className="text-primary mt-0.5" />
                        <div>
                            <p className="text-[11px] uppercase font-bold text-muted-foreground">Telefone</p>
                            <p className="font-semibold">+244 923 456 789</p>
                        </div>
                        </li>
                        <li className="flex items-start gap-3">
                        <MapPinIcon size={18} className="text-primary mt-0.5" />
                        <div>
                            <p className="text-[11px] uppercase font-bold text-muted-foreground">Endereço</p>
                            <p className="font-semibold">Talatona, Luanda</p>
                        </div>
                        </li>
                    </ul>
                </CardContent>
            </Card>
          </section>
        </div>
    </main>
  );
};

export {ClientSettings};
