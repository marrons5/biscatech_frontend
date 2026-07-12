import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/custom/logo";

import { cn } from "@/lib/utils";

const LEN = 6;

const Verify = () => {
  const navigate = useNavigate();
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

  const submit = () => {
    /*
    e.preventDefault();
    if (code.some((c) => !c)) return;
    setLoading(true);
    setTimeout(() => {
      // const role = "client";
      // login({
      //   name: "Maria Silva",
      //   phone: "+244 923 456 789",
      //   initials: "MS",
      //   role,
      // });
      toast("Telefone verificado!");
      navigate("/proDashboard", { replace: true });
    }, 600);
    */
  };

  return (
    <div className="h-svh bg-background flex  items-center justify-center ">
      <div className="relative container max-w-md px-6 pt-8 pb-8 bg-white rounded-3xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-glow mb-4">
            <ShieldCheck className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Verifica o teu telefone
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Enviámos um código de 6 dígitos para o seu email
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
            className="w-full p-6  rounded-4xl">
            {loading ? "A verificar…" : "Verificar"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {seconds > 0 ? (
              <>
                Reenviar código em{" "}
                <span className="font-bold text-foreground">{seconds}s</span>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setSeconds(45)}
                className="text-primary font-bold hover:underline">
                Reenviar código
              </button>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export { Verify };
