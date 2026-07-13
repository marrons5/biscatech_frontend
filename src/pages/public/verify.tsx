import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthShell, PrimaryButton } from "@/components/custom/authShell";
import { useEffect, useRef, useState, useContext } from "react";
import { authService } from "@/services/authService";
import { AuthContext } from "@/context/authContext";
import { setAuthToken, setRefreshToken, getPendingEmail, clearPendingEmail } from "@/utils/auth/session";
import { toast } from "sonner";

const LEN = 6;

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") ?? "verify";
  const { login: setAuthUser } = useContext(AuthContext)!;
  const [code, setCode] = useState<string[]>(Array(LEN).fill(""));
  const [seconds, setSeconds] = useState(45);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = d;
    setCode(next);
    if (d && i < LEN - 1) inputs.current[i + 1]?.focus();
  };

  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0)
      inputs.current[i - 1]?.focus();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.some((c) => !c)) return;

    const email = getPendingEmail();
    if (!email) {
      toast.error("Email não encontrado. Regista-te novamente.");
      navigate("/auth/register", { replace: true });
      return;
    }

    if (mode === "reset") {
      navigate(`/auth/reset-password?email=${encodeURIComponent(email)}&code=${code.join("")}`, { replace: true });
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verify({ email, code: code.join("") });
      if (!response.data.success) {
        throw new Error((response.data as any).error ?? "Código inválido");
      }
      const { token, refreshToken, user } = response.data.data;
      setAuthToken(token);
      setRefreshToken(refreshToken);
      setAuthUser({ id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, initials: user.initials });
      clearPendingEmail();
      toast.success("Conta verificada com sucesso!");
      const dashboard = user.role === "provider" ? "/pro/dashboard" : "/client/dashboard";
      navigate(dashboard, { replace: true });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Código inválido ou expirado.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const title = mode === "reset" ? "Redefinir password" : "Verifica o teu email";
  const subtitle = mode === "reset"
    ? "Introduz o código de 6 dígitos enviado para o teu email"
    : "Envi&aacute;mos um c&oacute;digo de 6 d&iacute;gitos para o teu email.";

  return (
    <AuthShell
      title={title}
      subtitle={subtitle}
      footer={<>Não recebeste? <button onClick={() => setSeconds(45)} className="font-medium text-primary hover:underline">Reenviar {seconds > 0 && `em ${seconds}s`}</button></>}
    >
      <form onSubmit={submit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {Array.from({ length: LEN }).map((_, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              inputMode="numeric"
              maxLength={1}
              value={code[i]}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              className="h-14 w-full rounded-xl border border-border bg-card text-center text-2xl font-semibold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          ))}
        </div>
        <PrimaryButton type="submit" className={loading ? "opacity-70" : ""}>
          {loading ? "A verificar…" : "Verificar"}
        </PrimaryButton>
        <Link to="/auth/register" className="block text-center text-sm text-muted-foreground hover:text-ink">← Voltar</Link>
      </form>
    </AuthShell>
  );
};

export { Verify };
