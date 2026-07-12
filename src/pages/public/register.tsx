import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon, WrenchIcon, ArrowRightIcon, GoogleLogoIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { Button, Input, Checkbox } from "@/components";
import { Field, FieldGroup, FieldLabel } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import background from "@/assets/images/auth_background_right.png";

type Role = "client" | "pro";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("client");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm(); // Integrate Zod here later

  function submit() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(role === "pro" ? "/pro/dashboard" : "/client/dashboard");
    }, 700);
  }

  return (
    <div className="h-svh w-full bg-primary/65 bg-cover bg-no-repeat bg-background flex items-center py-5 md:px-4 px-2"
      style={{ backgroundImage: `url(${background})`, backgroundBlendMode: "color-burn" }}
    >
      <div className="bg-card border border-border/30 shadow-sm rounded-3xl p-8 lg:p-10 h-full overflow-y-auto md:w-2/6 w-full animate-in slide-in-from-right-10 duration-500">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Criar conta</h1>
        <p className="text-sm text-muted-foreground mt-2">Como queres usar o BiscaTech?</p>

        <div className="grid grid-cols-2 gap-2 mt-5 p-1.5 bg-muted rounded-full">
          {[
            { id: "client" as Role, icon: UserIcon, label: "Cliente" },
            { id: "pro" as Role, icon: WrenchIcon, label: "Profissional" },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={cn(
                "h-10 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer",
                role === r.id ? "bg-card text-primary shadow-sm scale-100" : "text-neutral hover:text-foreground hover:bg-muted-foreground/10 scale-95 hover:scale-100"
              )}
            >
              <r.icon size={16} weight={role === r.id ? "bold" : "regular"} />
              {r.label}
            </button>
          ))}
        </div>

        <Button type="button" variant="outline" size="lg" className="w-full mt-5 gap-2.5 rounded-2xl border-2 border-border/40 py-5 bg-background text-foreground hover:bg-muted transition-all duration-200">
          <GoogleLogoIcon size={20} weight="bold" /> Continuar com Google
        </Button>

        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-border/30" />
          <span className="text-[11px] text-muted-foreground font-semibold">OU</span>
          <div className="flex-1 h-px bg-border/30" />
        </div>

        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <FieldGroup className="space-y-1.5">
            <Controller name="name" control={form.control} render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="name" className="text-foreground font-semibold">Nome completo</FieldLabel>
                <Input {...field} id="name" placeholder="O teu nome" className="h-11 border-2 border-border focus:border-primary py-5 rounded-xl bg-background transition-all" />
              </Field>
            )} />

            <Controller name="email" control={form.control} render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="email" className="text-foreground font-semibold">E-mail</FieldLabel>
                <Input {...field} id="email" type="email" placeholder="tu@exemplo.com" className="h-11 border-2 border-border focus:border-primary py-5 rounded-xl bg-background transition-all" />
              </Field>
            )} />

            <Controller name="phone" control={form.control} render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="phone" className="text-foreground font-semibold">Telefone</FieldLabel>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">🇦🇴 +244</span>
                  <Input {...field} id="phone" type="tel" placeholder="923456789" className="h-11 pl-20 border-2 border-border focus:border-primary py-5 rounded-xl bg-background transition-all" />
                </div>
              </Field>
            )} />

            <Controller name="password" control={form.control} render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="password" className="text-foreground font-semibold">Palavra-passe</FieldLabel>
                <div className="relative">
                  <Input {...field} id="password" type={showPwd ? "text" : "password"} placeholder="••••••••" className="h-11 border-2 border-border focus:border-primary py-5 rounded-xl bg-background transition-all" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral hover:text-primary transition-colors">
                    {showPwd ? <EyeIcon size={20} /> : <EyeSlashIcon size={20} />}
                  </button>
                </div>
              </Field>
            )} />

            <Controller name="accept" control={form.control} render={({ field }) => (
              <Field>
                <label className="flex items-start gap-2 pt-2 cursor-pointer">
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
                  <span className="text-xs text-muted-foreground">
                    Aceito os <Link to="#" className="font-bold text-primary hover:underline">termos</Link> e a <Link to="#" className="font-bold text-primary hover:underline">política de privacidade</Link>.
                  </span>
                </label>
              </Field>
            )} />
          </FieldGroup>

          <Button type="submit" size="lg" disabled={loading} className="w-full text-primary-foreground bg-primary hover:bg-primary/90 rounded-2xl h-14 text-lg font-bold shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] mt-2">
            {loading ? <span className="animate-pulse">A criar conta…</span> : <>Criar conta <ArrowRightIcon size={18} weight="bold" /></>}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Já tens conta? <Link to="/auth/login" className="font-bold text-primary hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
};

export { Register };