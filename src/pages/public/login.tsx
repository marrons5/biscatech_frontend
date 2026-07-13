import { Link, useNavigate, Navigate } from "react-router-dom";
import { AuthShell, PrimaryButton } from "@/components/custom/authShell";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authService } from "@/services/authService";
import { AuthContext } from "@/context/authContext";
import { setAuthToken, setRefreshToken } from "@/utils/auth/session";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Insere um e-mail válido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});
type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { user, login: setAuthUser } = useContext(AuthContext)!;
  const [loading, setLoading] = useState(false);

  if (user) {
    const dashboard = user.role === "provider" ? "/pro/dashboard" : "/client/dashboard";
    return <Navigate to={dashboard} replace />;
  }

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  async function submit({ email, password }: LoginForm) {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });

      if (!response.data.success) {
        const msg = (response.data as any).error ?? "Falha ao entrar";
        throw new Error(msg);
      }

      const { token, refreshToken, user } = response.data.data;
      setAuthToken(token);
      setRefreshToken(refreshToken);
      setAuthUser({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        initials: user.initials,
      });

      const dashboard = user.role === "provider" ? "/pro/dashboard" : "/client/dashboard";
      navigate(dashboard, { replace: true });
      toast.success("Sessão iniciada com sucesso!");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Email ou palavra-passe inválidos.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Bem-vindo de volta"
      subtitle="Entra na tua conta para gerir pedidos e mensagens."
      footer={<>Ainda não tens conta? <Link to="/auth/register" className="font-medium text-primary hover:underline">Criar conta</Link></>}
    >
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
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
          <span className="mb-1.5 block text-sm font-medium text-ink">Palavra-passe</span>
          <input
            {...form.register("password")}
            type="password"
            placeholder="••••••••"
            className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
          {form.formState.errors.password && <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>}
        </label>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="h-4 w-4 rounded border-border text-primary" />
            Manter sessão iniciada
          </label>
          <Link to="/auth/forgot-password" className="font-medium text-primary hover:underline">Esqueci-me</Link>
        </div>

        <PrimaryButton type="submit" className={loading ? "opacity-70" : ""}>
          {loading ? "A entrar…" : "Entrar"}
        </PrimaryButton>

        <div className="relative py-2 text-center">
          <span className="absolute left-0 top-1/2 h-px w-full bg-border" />
          <span className="relative bg-background px-3 text-xs uppercase tracking-widest text-muted-foreground">ou</span>
        </div>

        <button type="button" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-medium text-ink transition hover:border-primary/40 hover:shadow-sm">
          Continuar com Google
        </button>
      </form>
    </AuthShell>
  );
};

export { Login };
