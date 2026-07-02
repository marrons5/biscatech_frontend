import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, GoogleLogoIcon, EyeIcon, EyeSlashIcon,  } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
    <div className="h-svh w-full  flex items-center justify-end py-5 md:px-4 px-2">
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 lg:p-10 md:w-2/6 w-full">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full mt-6 gap-2.5 rounded-4xl border-2 py-5 bg-neutral/12.5">
          <GoogleLogoIcon size={20} weight="bold" />
          Continuar com Google
        </Button>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-neutral/25" />
          <span className="text-[11px] text-muted-foreground font-semibold">
            OU COM E-MAIL
          </span>
          <div className="flex-1 h-px bg-neutral/25" />
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                        to="/auth/forgot-password"
                        className="text-[11px] font-semibold  hover:underline text-primary">
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
                      {showPwd ? (
                        <EyeSlashIcon size={18} />
                      ) : (
                        <EyeIcon size={18} />
                      )}
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
            disabled={loading}
            className="bg-primary w-full p-6 text-white rounded-4xl text-lg">
            {loading ? (
              "A entrar…"
            ) : (
              <>
                Entrar <ArrowRightIcon size={18} weight="bold" />
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
    </div>
  );
};

export { Login };
