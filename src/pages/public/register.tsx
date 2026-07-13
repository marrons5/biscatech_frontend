import { Link, useNavigate } from "react-router-dom";
import { AuthShell, PrimaryButton } from "@/components/custom/authShell";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authService } from "@/services/authService";
import { setPendingEmail } from "@/utils/auth/session";
import { toast } from "sonner";

const registerSchema = z.object({
  nome: z.string().min(2, "O nome é obrigatório"),
  apelido: z.string().min(2, "O apelido é obrigatório"),
  email: z.string().email("Insere um e-mail válido"),
  telefone: z.string().min(7, "Insere um telefone válido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  async function submit({ nome, apelido, email, telefone, password }: RegisterForm) {
    setLoading(true);
    try {
      const name = `${nome} ${apelido}`;
      const payload = { name, email, phone: `+244${telefone.replace(/^\+244/, "")}`, password };
      const response = await authService.register(payload);

      if (!response.data.success) {
        const msg = (response.data as any).error ?? "Erro ao criar conta";
        throw new Error(msg);
      }

      setPendingEmail(email);
      toast.success("Conta criada! Verifica o teu email.");
      navigate("/verify", { replace: true });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro ao criar conta. Tenta novamente.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Cria a tua conta"
      subtitle="Leva menos de 2 minutos. Sem cartão de crédito."
      footer={<>J&aacute; tens conta? <Link to="/auth/login" className="font-medium text-primary hover:underline">Entrar</Link></>}
    >
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Nome</span>
            <input
              {...form.register("nome")}
              placeholder="Ana"
              className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
            {form.formState.errors.nome && <p className="mt-1 text-xs text-destructive">{form.formState.errors.nome.message}</p>}
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Apelido</span>
            <input
              {...form.register("apelido")}
              placeholder="Domingos"
              className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
            {form.formState.errors.apelido && <p className="mt-1 text-xs text-destructive">{form.formState.errors.apelido.message}</p>}
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
          <input
            {...form.register("email")}
            type="email"
            placeholder="tu@exemplo.com"
            className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
          {form.formState.errors.email && <p className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</p>}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Telemóvel</span>
          <input
            {...form.register("telefone")}
            type="tel"
            placeholder="+244 923 000 000"
            className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
          {form.formState.errors.telefone && <p className="mt-1 text-xs text-destructive">{form.formState.errors.telefone.message}</p>}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Palavra-passe</span>
          <input
            {...form.register("password")}
            type="password"
            placeholder="Mín. 8 caracteres"
            className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
          {form.formState.errors.password && <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>}
        </label>

        <PrimaryButton type="submit" className={loading ? "opacity-70" : ""}>
          {loading ? "A criar conta…" : "Criar conta"}
        </PrimaryButton>

        <p className="text-center text-xs text-muted-foreground">
          Ao continuar aceitas os <a href="#" className="underline">Termos</a> e <a href="#" className="underline">Privacidade</a>.
        </p>
      </form>
    </AuthShell>
  );
};

export { Register };
