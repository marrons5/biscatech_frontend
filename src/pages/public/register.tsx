import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User as UserIcon,
  Wrench,
  ArrowRight,
  GoogleLogo,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";

import { Logo } from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

type Role = "client" | "pro";

const registerSchema = z.object({
  name: z.string().min(3, "O nome deve conter no mínimo 3 caracteres"),

  email: z.string().email("Verifica o seu email."),

  phone: z
    .string()
    .min(9, "Número inválido")
    .max(9, "Número inválido")
    .regex(/^[0-9]+$/, "Digite apenas números"),

  password: z
    .string()
    .min(8, "A senha deve conter no mínimo 8 caracteres")
    .regex(/[0-9]/, "A senha deve conter um número")
    .regex(/[a-zA-Z]/, "A senha deve conter letras")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter um caractere especial"),

  accept: z.boolean().refine((value) => value === true, {
    message: "Precisas aceitar os termos.",
  }),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState<Role>("client");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    
  });

  function submit(data: RegisterForm) {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const initials =
        data.name
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((n) => n[0].toUpperCase())
          .join("") || "U";

      login({
        name: data.name || (role === "pro" ? "João Mateus" : "Maria Silva"),

        phone: `+244 ${data.phone}`,
        initials,
        role,
      });

      toast("Conta criada!", {
        description: "Bem-vindo à Nema.",
      });

      navigate(role === "pro" ? "/pro" : "/app");
    }, 700);
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 grid lg:grid-cols-2">
      <aside className="relative hidden lg:flex bg-gradient-hero text-primary-foreground overflow-hidden p-12">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-primary-deep/40 blur-3xl" />

        <div className="relative z-10 flex flex-col w-full">
          <Logo />

          <div className="my-auto">
            <Wrench
              size={200}
              weight="duotone"
              className="opacity-90 -ml-6 drop-shadow-2xl text-white"
            />

            <h2 className="text-5xl font-extrabold text-white leading-tight mt-6 max-w-md">
              Resolve qualquer biscate. Em minutos.
            </h2>

            <p className="text-base opacity-90 mt-4 max-w-md text-white">
              A plataforma que conecta-te aos melhores profissionais de Luanda.
            </p>
          </div>

          <p className="text-xs opacity-70 text-white">
            © Nema 2026 · Luanda, Angola
          </p>
        </div>
      </aside>

      <section className="flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo />
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 lg:p-10">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Criar conta
            </h1>

            <p className="text-sm text-muted-foreground mt-2">
              Como queres usar a Nema?
            </p>

            {/* Role tabs */}
            <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-slate-100 rounded-4xl">
              {[
                {
                  id: "client" as Role,
                  icon: UserIcon,
                  label: "Cliente",
                },
                {
                  id: "pro" as Role,
                  icon: Wrench,
                  label: "Profissional",
                },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={cn(
                    "h-10 rounded-4xl text-sm font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer",
                    role === r.id
                      ? "bg-white text-primary shadow-sm text-blue-400"
                      : "text-zinc-400",
                  )}>
                  <r.icon size={16} weight="bold" />
                  {r.label}
                </button>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full mt-5 gap-2.5 rounded-4xl border-2 py-5 bg-zinc-400/10 cursor-pointer">
              <GoogleLogo size={20} weight="bold" />
              Continuar com Google
            </Button>

            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />

              <span className="text-[11px] text-muted-foreground font-semibold">
                OU
              </span>

              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
              <FieldGroup className="space-y-1.5">
                {/* NAME */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">Nome completo</FieldLabel>

                      <Input
                        {...field}
                        id="name"
                        placeholder="O teu nome"
                        className="h-11 border-2 py-5 rounded-2xl bg-zinc-400/10"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* EMAIL */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">E-mail</FieldLabel>

                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="tu@exemplo.com"
                        className="h-11 border-2 py-5 rounded-2xl bg-zinc-400/10"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* PHONE */}
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="phone">Telefone</FieldLabel>

                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                          🇦🇴 +244
                        </span>

                        <Input
                          {...field}
                          id="phone"
                          type="tel"
                          inputMode="numeric"
                          placeholder="923456789"
                          className="h-11 pl-20 border-2 py-5 rounded-2xl bg-zinc-400/10"
                        />
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* PASSWORD */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password">Palavra-passe</FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          id="password"
                          type={showPwd ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-11 border-2 py-5 rounded-2xl bg-zinc-400/10"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPwd((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2">
                          {showPwd ? <EyeSlash size={18} /> : <Eye size={18} />}
                        </button>
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* ACCEPT */}
                <Controller
                  name="accept"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <label className="flex items-start gap-2 pt-1 cursor-pointer">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-primary"
                        />

                        <span className="text-xs text-muted-foreground">
                          Aceito os{" "}
                          <Link
                            to="#"
                            className="font-bold text-primary hover:underline">
                            termos
                          </Link>{" "}
                          e a{" "}
                          <Link
                            to="#"
                            className="font-bold text-primary hover:underline">
                            política de privacidade
                          </Link>
                          .
                        </span>
                      </label>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={loading}
                className="w-full text-white rounded-4xl text-lg p-6 cursor-pointer">
                {loading ? (
                  "A criar conta…"
                ) : (
                  <>
                    Criar conta <ArrowRight size={18} weight="bold" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Já tens conta?{" "}
              <Link
                to="/login"
                className="font-bold text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export { Register };
