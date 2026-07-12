import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon, GoogleLogoIcon, EyeIcon, EyeSlashIcon, UserIcon, WrenchIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

import background from "@/assets/images/auth_background_left.png";

type Role = "client" | "pro";

const loginSchema = z.object({
  email: z.string().email("Verifica o seu email."),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres")
});
type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("client");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  function submit() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(role === "client" ? "/client/dashboard" : "/pro/dashboard");
    }, 1500);
  }

  return (
    <div 
      className="bg-primary/65 bg-cover bg-no-repeat h-svh w-full flex items-center justify-end py-5 md:px-4 px-2"
      style={{ backgroundImage: `url(${background})`, backgroundBlendMode: "color-burn" }}
    >
      <div className="bg-card border border-border/30 shadow-2xl rounded-3xl p-8 lg:p-10 md:w-2/6 w-full animate-in fade-in zoom-in-95 duration-500">
        
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Bem-vindo de volta
        </h1>
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Aceda à sua conta para continuares.
        </p>

        {/* Abas de Role usando as cores do index.css */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-muted rounded-full mb-6">
          {[
            { id: "client" as Role, icon: UserIcon, label: "Cliente" },
            { id: "pro" as Role, icon: WrenchIcon, label: "Profissional" },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={cn(
                "h-10 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 transition-all duration-300 ease-in-out cursor-pointer",
                role === r.id
                  ? "bg-card text-primary shadow-sm scale-100"
                  : "text-neutral hover:text-foreground hover:bg-muted-foreground/10 scale-95 hover:scale-100"
              )}
            >
              <r.icon size={18} weight={role === r.id ? "bold" : "regular"} />
              {r.label}
            </button>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full gap-2.5 rounded-2xl border-2 border-border/40 py-5 text-foreground bg-background hover:bg-muted transition-all duration-200"
        >
          <GoogleLogoIcon size={20} weight="bold" />
          Continuar com Google
        </Button>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-border/30" />
          <span className="text-[11px] text-muted-foreground font-bold tracking-wider">
            OU COM E-MAIL
          </span>
          <div className="flex-1 h-px bg-border/30" />
        </div>

        <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
          <FieldGroup className="space-y-1.5">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email-login" className="text-foreground font-semibold">E-mail</FieldLabel>
                  <Input
                    {...field}
                    id="email-login"
                    type="email"
                    placeholder="ex: joao@email.com"
                    className="h-12 rounded-xl border-border focus:border-primary focus:ring-ring/20 transition-all duration-200 bg-background"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password-login" className="text-foreground font-semibold flex justify-between">
                    <span>Palavra-passe</span>
                    <Link to="/auth/forgot-password" className="text-xs font-bold text-primary hover:underline transition-all">
                      Esqueceste-te?
                    </Link>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="password-login"
                      type={showPwd ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-12 rounded-xl pr-10 border-border focus:border-primary focus:ring-ring/20 transition-all duration-200 bg-background"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral hover:text-primary transition-colors cursor-pointer"
                    >
                      {showPwd ? <EyeIcon size={20} /> : <EyeSlashIcon size={20} />}
                    </button>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            disabled={loading}
            className="w-full text-primary-foreground bg-primary hover:bg-primary/90 rounded-2xl h-14 text-lg font-bold shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] mt-2"
          >
            {loading ? <span className="animate-pulse">A entrar…</span> : <>Entrar <ArrowRightIcon size={18} weight="bold" /></>}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Ainda não tens conta?{" "}
          <Link to="/auth/register" className="font-bold text-primary hover:underline transition-all">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
};

export { Login };