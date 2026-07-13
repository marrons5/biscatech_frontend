import { Link, useNavigate } from "react-router-dom";
import { AuthShell, PrimaryButton } from "@/components/custom/authShell";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authService } from "@/services/authService";
import { setPendingEmail } from "@/utils/auth/session";
import { toast } from "sonner";

const forgotSchema = z.object({
  email: z.string().email("Insere um e-mail válido"),
});
type ForgotForm = z.infer<typeof forgotSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  });

  async function submit({ email }: ForgotForm) {
    setLoading(true);
    try {
      const response = await authService.forgotPassword({ email });
      if (!response.data.success) {
        throw new Error((response.data as any).error ?? "Falha ao recuperar");
      }
      setPendingEmail(email);
      toast.success("Se o email existir, receberás um código de recuperação.");
      navigate("/verify?mode=reset");
    } catch (error) {
      toast.error("Algo correu mal. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Recuperar acesso"
      subtitle="Enviamos-te um link para redefinires a palavra-passe."
      footer={<Link to="/auth/login" className="text-muted-foreground hover:text-ink">← Voltar ao início de sessão</Link>}
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
        <PrimaryButton type="submit" className={loading ? "opacity-70" : ""}>
          {loading ? "A enviar…" : "Enviar link"}
        </PrimaryButton>
      </form>
    </AuthShell>
  );
};

export { ForgotPassword };
