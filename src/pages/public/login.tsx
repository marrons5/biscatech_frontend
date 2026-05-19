import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wrench,
  ArrowRight,
  GoogleLogo,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";
import { Logo } from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({
        name: "Maria Silva",
        phone: "+244 923 456 789",
        initials: "MS",
        role: "client",
      });
      toast("Bem-vinda de volta!");
      navigate("/app");
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 grid lg:grid-cols-2">
      {/* Left — brand panel */}
      <aside className="relative hidden lg:flex bg-gradient-hero text-primary-foreground overflow-hidden p-12">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-primary-deep/40 blur-3xl" />
        <div className="relative z-10 flex flex-col w-full">
          <Logo />
          <div className="my-auto">
            <Wrench
              size={200}
              weight="duotone"
              className="opacity-90 -ml-6 drop-shadow-2xl text-white"
            />
            <h2 className="text-5xl font-extrabold text-white leading-tight mt-6 max-w-md">
              Resolve qualquer biscate. Em minutos.
            </h2>
            <p className="text-base opacity-90 mt-4 max-w-md text-white">
              A plataforma que conecta-te aos melhores profissionais de Luanda.
            </p>
          </div>
          <p className="text-xs opacity-70 text-white">
            © Nema 2026 · Luanda, Angola
          </p>
        </div>
      </aside>

      {/* Right — form */}
      <section className="flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo />
          </div>
          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 lg:p-10">
            <h1 className="text-3xl font-extrabold tracking-tight">Entrar</h1>
            <p className="text-sm text-zinc-400 mt-2">
              Bem-vindo de volta à Nema.
            </p>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full mt-6 gap-2.5 rounded-4xl border-2  py-5 bg-zinc-400/10">
              <GoogleLogo size={20} weight="bold" /> Continuar com Google
            </Button>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] text-zinc-400 font-semibold">
                OU COM E-MAIL
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@exemplo.com"
                  className="h-12 rounded-2xl border-2  py-5"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Palavra-passe</Label>
                  <Link
                    to="#"
                    className="text-[11px] font-semibold text-primary hover:underline text-blue-400">
                    Esqueceste-te?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPwd ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-12 pr-10 py-5 rounded-2xl border-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPwd ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                variant="hero"
                disabled={loading}
                className="w-full p-6 text-white rounded-4xl text-lg">
                {loading ? (
                  "A entrar…"
                ) : (
                  <>
                    Entrar <ArrowRight size={18} weight="bold" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Ainda não tens conta?{" "}
              <Link
                to="/registro"
                className="font-bold text-primary hover:underline">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export  {Login};
