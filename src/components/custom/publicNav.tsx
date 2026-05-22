import { Link, NavLink } from "react-router-dom";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Início", end: true },
  { to: "/sobre", label: "Como funciona" },
  { to: "/profissionais", label: "Para profissionais" },
];

export const PublicNav = () => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50 px-12">
      <div className="  flex items-center justify-between h-16">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 rounded-4xl text-sm font-semibold transition-all duration-500",
                  isActive
                    ? "text-blue-400 bg-blue-400/10"
                    : "text-muted-foreground hover:text-foreground",
                )
              }>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex transition-all duration-200 hover:bg-blue-400/10 rounded-4xl p-5">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild className="bg-blue-950 text-white p-5 rounded-4xl">
            <Link to="/auth/register">Criar conta</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
