import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GoogleLogo, Eye, EyeSlash } from "@phosphor-icons/react";
import { Logo } from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Wrench } from "lucide-react";
const loginSchema = z.object({
  email: z.string().email("Verifica o seu email."),
  password: z
    .string()
    .min(8, "A senha deve conter no mínimo 8 caracteres")
    .regex(/[0-9]/, "A senha deve conter um número")
    .regex(/[a-zA-Z]/, "A senha deve conter letras")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter um caractere especial"),
});
type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  function handleSubmit(data: LoginForm) {
    setLoading(true);
    console.log(data);
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 grid lg:grid-cols-2">
      {/* Left */}
      <aside className="relative hidden lg:flex bg-gradient-hero text-primary-foreground overflow-hidden p-12">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-primary-deep/40 blur-3xl" />
        <div className="relative z-10 flex flex-col w-full">
          <Logo />
          <div className="my-auto">
            <Wrench
              size={200}
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

      {/* Right */}
      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full mt-6 gap-2.5 rounded-4xl border-2 py-5 bg-zinc-400/10">
            <GoogleLogo size={20} weight="bold" />
            Continuar com Google
          </Button>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] text-zinc-400 font-semibold">
              OU COM E-MAIL
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4">
            <FieldGroup className="space-y-1.5">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email-login" className="text-sm ">
                      E-mail{" "}
                    </FieldLabel>
                    <Input
                      {...field}
                      id="email-login"
                      type="email"
                      placeholder="tu@exemplo.com"
                      className="h-12 rounded-2xl border-2 py-5"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="password-login"
                      className="text-sm flex justify-between">
                      <span>Palavra-passe</span>

                      <span>
                        <Link
                          to="#"
                          className="text-[11px] font-semibold  hover:underline text-blue-400">
                          Esqueceste-te?
                        </Link>
                      </span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="password-login"
                        type="password"
                        placeholder="••••••••"
                        className="h-12 rounded-2xl border-2 py-5"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPwd ? <EyeSlash size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
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
              disabled={loading}
              className="w-full p-6 text-white rounded-4xl text-lg">
              {loading ? (
                "A entrar…"
              ) : (
                <>
                  Entrar <ArrowRight size={18} weight="bold" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Ainda não tens conta?{" "}
            <Link
              to="/auth/register"
              className="font-bold text-primary hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export { Login };
