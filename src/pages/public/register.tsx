import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon, GoogleLogoIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { Button, Input, Checkbox } from "@/components";
import { Field, FieldGroup, FieldLabel } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authService } from "@/services/authService";
import { setPendingEmail } from "@/utils/auth/session";
import { toast } from "sonner";
import background from "@/assets/images/auth_background_right.png";

const registerSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório"),
  email: z.string().email("Insere um e-mail válido"),
  phone: z.string().min(7, "Insere um telefone válido"),
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[a-zA-Z]/, "Deve conter letras")
    .regex(/[0-9]/, "Deve conter pelo menos um número"),
  accept: z.boolean().refine((v) => v === true, "Aceita os termos para continuar"),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", phone: "", password: "", accept: false },
  });

  async function submit({ name, email, phone, password }: RegisterForm) {
    setLoading(true);
    try {
      const payload = { name, email, phone: `+244${phone.replace(/^\+244/, "")}`, password };
      const response = await authService.register(payload);

      if (!response.data.success) {
        throw new Error((response.data as any).error ?? "Erro ao criar conta");
      }

      setPendingEmail(email);
      toast.success("Conta criada! Verifica o teu email.", {
        className: "bg-green-500 text-white font-semibold",
      });
      navigate("/verify", { replace: true });
    } catch (error) {
      toast.error("Erro ao criar conta. Tenta novamente.", {
        className: "bg-red-500/10 text-white font-semibold",
      });
      console.error("register error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-svh w-full bg-primary/65 bg-cover bg-no-repeat bg-background flex items-center py-5 md:px-4 px-2"
      style={{ backgroundImage: `url(${background})`, backgroundBlendMode: "color-burn" }}
    >
      <div className="bg-card border border-border/30 shadow-sm rounded-3xl p-8 lg:p-10 h-full overflow-y-auto md:w-2/6 w-full animate-in slide-in-from-right-10 duration-500">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Criar conta</h1>
        <p className="text-sm text-muted-foreground mt-2">Cria a tua conta para começar.</p>

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
            <Field>
              <FieldLabel htmlFor="name" className="text-foreground font-semibold">Nome completo</FieldLabel>
              <Input {...form.register("name")} id="name" placeholder="O teu nome" className="h-11 border-2 border-border focus:border-primary py-5 rounded-xl bg-background transition-all" />
              {form.formState.errors.name && <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>}
            </Field>

            <Field>
              <FieldLabel htmlFor="email" className="text-foreground font-semibold">E-mail</FieldLabel>
              <Input {...form.register("email")} id="email" type="email" placeholder="tu@exemplo.com" className="h-11 border-2 border-border focus:border-primary py-5 rounded-xl bg-background transition-all" />
              {form.formState.errors.email && <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>}
            </Field>

            <Field>
              <FieldLabel htmlFor="phone" className="text-foreground font-semibold">Telefone</FieldLabel>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">🇦🇴 +244</span>
                <Input {...form.register("phone")} id="phone" type="tel" placeholder="923456789" className="h-11 pl-20 border-2 border-border focus:border-primary py-5 rounded-xl bg-background transition-all" />
              </div>
              {form.formState.errors.phone && <p className="text-xs text-destructive mt-1">{form.formState.errors.phone.message}</p>}
            </Field>

            <Field>
              <FieldLabel htmlFor="password" className="text-foreground font-semibold">Palavra-passe</FieldLabel>
              <div className="relative">
                <Input {...form.register("password")} id="password" type={showPwd ? "text" : "password"} placeholder="••••••••" className="h-11 border-2 border-border focus:border-primary py-5 rounded-xl bg-background transition-all" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral hover:text-primary transition-colors">
                  {showPwd ? <EyeIcon size={20} /> : <EyeSlashIcon size={20} />}
                </button>
              </div>
              {form.formState.errors.password && <p className="text-xs text-destructive mt-1">{form.formState.errors.password.message}</p>}
            </Field>

            <Field>
              <label className="flex items-start gap-2 pt-2 cursor-pointer">
                <Checkbox checked={form.watch("accept")} onCheckedChange={(v) => form.setValue("accept", v === true)} className="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
                <span className="text-xs text-muted-foreground">
                  Aceito os <Link to="#" className="font-bold text-primary hover:underline">termos</Link> e a <Link to="#" className="font-bold text-primary hover:underline">política de privacidade</Link>.
                </span>
              </label>
              {form.formState.errors.accept && <p className="text-xs text-destructive mt-1">{form.formState.errors.accept.message}</p>}
            </Field>
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