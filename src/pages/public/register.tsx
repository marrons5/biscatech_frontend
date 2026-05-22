import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User as UserIcon,
  Wrench,
  ArrowRight,
  GoogleLogo,
} from "@phosphor-icons/react";
import { Logo } from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

type Role = "client" | "pro";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<Role>("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accept) {
      toast("Aceita os termos", {
        description: "Precisas de aceitar para continuar.",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const initials =
        name
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((n) => n[0].toUpperCase())
          .join("") || "U";
      login({
        name: name || (role === "pro" ? "João Mateus" : "Maria Silva"),
        phone: `+244 ${phone}`,
        initials,
        role,
      });
      toast("Conta criada!", { description: "Bem-vindo à Nema." });
      navigate(role === "pro" ? "/pro" : "/app");
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 grid lg:grid-cols-2">
      <aside className="relative hidden lg:flex bg-primary-gradient text-primary-foreground overflow-hidden p-12">
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

      <section className="flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo />
          </div>
          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 lg:p-10">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Criar conta
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Como queres usar a Nema?
            </p>

            {/* Role tabs */}
            <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-slate-100 rounded-4xl">
              {[
                { id: "client" as Role, icon: UserIcon, label: "Cliente" },
                { id: "pro" as Role, icon: Wrench, label: "Profissional" },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={cn(
                    "h-10 rounded-4xl text-sm font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer",
                    role === r.id
                      ? "bg-white text-primary shadow-sm text-blue-400"
                      : "text-zinc-400",
                  )}>
                  <r.icon size={16} weight="bold" /> {r.label}
                </button>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full mt-5 gap-2.5 rounded-4xl border-2  py-5 bg-zinc-400/10 cursor-pointer">
              <GoogleLogo size={20} weight="bold" /> Continuar com Google
            </Button>

            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] text-muted-foreground font-semibold">
                OU
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <form onSubmit={submit} className="space-y-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="O teu nome"
                  className="h-11 border-2  py-5 rounded-2xl bg-zinc-400/10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@exemplo.com"
                  className="h-11 border-2  py-5 rounded-2xl bg-zinc-400/10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Telefone</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                    🇦🇴 +244
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="923 456 789"
                    className="h-11 pl-20 border-2  py-5 rounded-2xl bg-zinc-400/10"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Palavra-passe</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="h-11 border-2  py-5 rounded-2xl bg-zinc-400/10"
                />
              </div>

              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-primary"
                />
                <span className="text-xs text-muted-foreground">
                  Aceito os{" "}
                  <Link
                    to="#"
                    className="font-bold text-primary hover:underline">
                    termos
                  </Link>{" "}
                  e a{" "}
                  <Link
                    to="#"
                    className="font-bold text-primary hover:underline">
                    política de privacidade
                  </Link>
                  .
                </span>
              </label>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={loading}
                className="w-full text-white rounded-4xl text-lg p-6 cursor-pointer">
                {loading ? (
                  "A criar conta…"
                ) : (
                  <>
                    Criar conta <ArrowRight size={18} weight="bold" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Já tens conta?{" "}
              <Link
                to="/login"
                className="font-bold text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export { Register };
