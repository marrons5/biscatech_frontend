import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import {
  Envelope,
  Phone,
  MapPin,
  Wrench,
  SignOut,
} from "@phosphor-icons/react";
import { PageHeader } from "@/components/custom/pageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const accountSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(6, "Mínimo 6 caracteres")
    .optional()
    .or(z.literal("")),
});
const serviceSchema = z.object({
  specialty: z.string().min(2, "Indica a especialidade"),
  hourly: z.coerce.number().min(0, "Valor inválido"),
});

type ServiceFormData = z.input<typeof serviceSchema>;
const ProSettings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const accountForm = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: { email: "celso@nema.app", password: "" },
  });
  const serviceForm = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { specialty: "Canalizador", hourly: 2500 },
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <main className="container max-w-7xl px-6 lg:px-8 pt-8">
        <PageHeader title="Definições" subtitle="Gere a tua conta e serviço" />
        <div className="grid grid-cols-10 gap-6">
          {/* Left 7/10 — Forms */}
          <div className="col-span-10 lg:col-span-7 space-y-6">
            <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
              <h3 className="font-extrabold text-lg mb-1">
                Definições da Conta
              </h3>
              <p className="text-xs text-muted-foreground mb-5">
                Atualiza o teu acesso à plataforma
              </p>

              <form
                onSubmit={accountForm.handleSubmit(() =>
                  toast("Conta atualizada"),
                )}
                className="space-y-4">
                <FieldGroup>
                  <Controller
                    control={accountForm.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>E-mail</FieldLabel>

                        <Input type="email" {...field} />

                        <FieldError>{fieldState.error?.message}</FieldError>
                      </Field>
                    )}
                  />

                  <Controller
                    control={accountForm.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Nova Password</FieldLabel>

                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />

                        <FieldDescription>
                          Deixa vazio caso não queiras alterar.
                        </FieldDescription>

                        <FieldError>{fieldState.error?.message}</FieldError>
                      </Field>
                    )}
                  />
                </FieldGroup>

                <Button type="submit" variant="default">
                  Guardar alterações
                </Button>
              </form>
            </section>

            <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
              <h3 className="font-extrabold text-lg mb-1">
                Definições do Serviço
              </h3>
              <p className="text-xs text-muted-foreground mb-5">
                Define a tua especialidade e tarifa
              </p>

              <form
                onSubmit={serviceForm.handleSubmit(() =>
                  toast("Serviço atualizado"),
                )}
                className="space-y-4">
                <FieldGroup>
                  <Controller
                    control={serviceForm.control}
                    name="specialty"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Especialidade</FieldLabel>

                        <Input {...field} />

                        <FieldError>{fieldState.error?.message}</FieldError>
                      </Field>
                    )}
                  />

                  <Controller
                    control={serviceForm.control}
                    name="hourly"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Preço Hora (Kz)</FieldLabel>

                        <Input
                          type="number"
                          value={field.value as number | string}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />

                        <FieldDescription>
                          Valor cobrado por hora de serviço.
                        </FieldDescription>

                        <FieldError>{fieldState.error?.message}</FieldError>
                      </Field>
                    )}
                  />
                </FieldGroup>

                <Button type="submit" variant="default">
                  Guardar alterações
                </Button>
              </form>
            </section>

            <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
              <h3 className="font-extrabold text-lg mb-1">Sessão</h3>
              <p className="text-xs text-muted-foreground mb-5">
                Termina a tua sessão neste dispositivo
              </p>
              <Button
                variant="outline"
                className="text-destructive border-destructive/40 hover:bg-destructive/5"
                onClick={() => {
                  logout();
                  navigate("/", { replace: true });
                }}>
                <SignOut size={18} weight="bold" /> Terminar Sessão
              </Button>
            </section>
          </div>

          {/* Right 3/10 */}
          <aside className="col-span-10 lg:col-span-3 space-y-6">
            <section className="relative overflow-hidden rounded-2xl bg-gradient-hero shadow-sm text-primary-foreground p-6 text-center">
              <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-white/15 blur-2xl" />
              <div className="relative">
                <div className="mx-auto h-20 w-20 rounded-full bg-white/20 backdrop-blur border-2 border-white/30 flex items-center justify-center text-3xl font-extrabold">
                  {user?.initials ?? "CL"}
                </div>
                <h2 className="mt-4 text-xl font-extrabold">
                  {user?.name ?? "Celso"}
                </h2>
                <p className="text-xs opacity-90">Canalizador</p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                  <Wrench size={14} weight="fill" /> Verificado
                </span>
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
              <h3 className="font-extrabold text-base mb-4">
                Dados de Contacto
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Envelope size={18} className="text-primary mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase font-bold text-muted-foreground">
                      Email
                    </p>
                    <p className="font-semibold truncate">celso@nema.app</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase font-bold text-muted-foreground">
                      Telefone
                    </p>
                    <p className="font-semibold">+244 923 456 789</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase font-bold text-muted-foreground">
                      Endereço
                    </p>
                    <p className="font-semibold">Talatona, Luanda</p>
                  </div>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export { ProSettings };
