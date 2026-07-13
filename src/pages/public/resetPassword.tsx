import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthShell, PrimaryButton } from "@/components/custom/authShell";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authService } from "@/services/authService";
import { toast } from "sonner";

const resetSchema = z.object({
  password: z.string().min(8, "Mínimo 8 caracteres"),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As passwords não coincidem",
  path: ["confirmPassword"],
});

type ResetForm = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const code = searchParams.get("code") ?? "";
  const [loading, setLoading] = useState(false);

  const form = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  });

  async function submit({ password }: ResetForm) {
    setLoading(true);
    try {
      const response = await authService.resetPassword({ email, code, password });
      if (!response.data.success) {
        throw new Error((response.data as any).error ?? "Falha ao redefinir");
      }
      toast.success("Password actualizada com sucesso!");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      toast.error("Código inválido ou expirado. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Nova palavra-passe"
      subtitle="Escolhe uma palavra-passe segura, mínimo 8 caracteres."
      footer={<Link to="/auth/login" className="text-muted-foreground hover:text-ink">← Voltar</Link>}
    >
      <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Nova palavra-passe</span>
          <input
            {...form.register("password")}
            type="password"
            placeholder="••••••••"
            className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
          {form.formState.errors.password && <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Confirmar palavra-passe</span>
          <input
            {...form.register("confirmPassword")}
            type="password"
            placeholder="••••••••"
            className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
          {form.formState.errors.confirmPassword && <p className="mt-1 text-xs text-destructive">{form.formState.errors.confirmPassword.message}</p>}
        </label>
        <PrimaryButton type="submit" className={loading ? "opacity-70" : ""}>
          {loading ? "A guardar…" : "Guardar palavra-passe"}
        </PrimaryButton>
      </form>
    </AuthShell>
  );
};

export { ResetPassword };
