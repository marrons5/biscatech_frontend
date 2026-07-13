import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Início", end: true },
  { to: "/sobre", label: "Como funciona" },
  { to: "/profissionais", label: "Para profissionais" },
];

export const PublicNav = () => {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-[1280px] mx-auto px-[40px] flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            BT
          </span>
          <span className="text-lg font-semibold tracking-tight text-ink">BiscaTech</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors duration-200 pb-1",
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-ink",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/auth/login"
            className="text-sm font-medium text-muted-foreground px-4 py-2 hover:text-ink transition-colors"
          >
            Entrar
          </Link>
          <Link
            to="/auth/register"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
          >
            Criar conta
          </Link>
        </div>
      </nav>
    </header>
  );
};
