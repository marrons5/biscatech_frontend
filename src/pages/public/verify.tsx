import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import { AuthContext } from "@/context/authContext";
import { setAuthToken, setRefreshToken, getPendingEmail, clearPendingEmail } from "@/utils/auth/session";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

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
      toast.error("Email not found. Please register again.");
      navigate("/auth/register", { replace: true });
      return;
    }

    // If mode is "reset", navigate to reset-password page with email and code
    if (mode === "reset") {
      navigate(`/auth/reset-password?email=${encodeURIComponent(email)}&code=${code.join("")}`, { replace: true });
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verify({ email, code: code.join("") });

      if (!response.data.success) {
        throw new Error((response.data as any).error ?? `Error ${response.status}`);
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
      clearPendingEmail();

      toast.success("Account verified successfully!");
      const dashboard = user.role === "provider" ? "/pro/dashboard" : "/client/dashboard";
      navigate(dashboard, { replace: true });
    } catch (error) {
      toast.error("Invalid or expired code. Try again.");
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const title = mode === "reset" ? "Reset your password" : "Verify your account";
  const subtitle = mode === "reset"
    ? "Enter the code sent to your email to reset your password"
    : "We sent a 6-digit code to your email";

  return (
    <div className="h-svh bg-background flex items-center justify-center">
      <div className="relative container max-w-md px-6 pt-8 pb-8 bg-white rounded-3xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-glow mb-4">
            <ShieldCheck className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {subtitle}
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-6">
          <div className="flex justify-center gap-2">
            {code.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => onKey(i, e)}
                className={cn(
                  "h-14 w-12 rounded-2xl border-2 text-center text-xl font-extrabold bg-card transition-all",
                  d ? "border-primary shadow-card" : "border-border",
                )}
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={loading || code.some((c) => !c)}
            className="w-full p-6 rounded-4xl">
            {loading ? "Verifying…" : mode === "reset" ? "Reset password" : "Verify"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {seconds > 0 ? (
              <>
                Resend code in{" "}
                <span className="font-bold text-foreground">{seconds}s</span>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setSeconds(45)}
                className="text-primary font-bold hover:underline">
                Resend code
              </button>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export { Verify };
