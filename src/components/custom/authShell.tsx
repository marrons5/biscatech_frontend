import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, Star } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-between px-6 py-10 md:px-16">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            BT
          </span>
          <span className="text-lg font-semibold tracking-tight text-ink">BiscaTech</span>
        </Link>

        <div className="mx-auto w-full max-w-md py-10">
          <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-muted-foreground">{footer}</div>}
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} BiscaTech &middot; Feito em Luanda
        </p>
      </div>

      <div
        className="relative hidden overflow-hidden lg:block"
        style={{ backgroundColor: "#0F172A" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 20% 20%, color-mix(in oklab, #2563EB 60%, transparent), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, color-mix(in oklab, #10B981 40%, transparent), transparent 60%)",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-16 text-white">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Nova plataforma &middot; Angola
          </div>
          <div className="max-w-md">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight">
              A rede de servi&ccedil;os t&eacute;cnicos mais confi&aacute;vel de Luanda.
            </h2>
            <p className="mt-4 text-white/70">
              Encontra ou torna-te profissional em minutos. Sem taxas escondidas, com avalia&ccedil;&otilde;es reais.
            </p>
            <div className="mt-10 space-y-3 text-sm">
              {[
                { icon: ShieldCheck, text: "Profissionais 100% verificados" },
                { icon: Star, text: "M&eacute;dia 4,9 em 12 mil avalia&ccedil;&otilde;es" },
                { icon: Sparkles, text: "Resposta em 24 min em m&eacute;dia" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/85">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 text-white">
            {[
              ["1.500+", "profissionais"],
              ["24 min", "resposta m&eacute;dia"],
              ["4,9 / 5", "avalia&ccedil;&atilde;o"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-semibold">{n}</p>
                <p className="mt-1 text-xs text-white/60">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function InputField({
  label,
  hint,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label: string;
  hint?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
      {hint && <span className="mt-1.5 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export function PrimaryButton({
  children,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 ${className}`}
    >
      {children}
    </button>
  );
}
