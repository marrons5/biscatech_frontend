import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, Menu, X, LayoutDashboard, PlusCircle, ClipboardList, Settings, Wallet, History, Star, User, MapPin, LifeBuoy, TrendingUp, Clock, LogOut, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentType } from "react";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

type NavItem = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string | number;
};

const clientNav: NavItem[] = [
  { to: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/client/requests", label: "Meus pedidos", icon: ClipboardList },
  { to: "/client/request/create", label: "Novo pedido", icon: PlusCircle },

  { to: "/client/notifications", label: "Notificações", icon: Bell },
  { to: "/client/reviews", label: "Avaliações", icon: Star },
  { to: "/client/profile", label: "Perfil", icon: User },
  { to: "/client/addresses", label: "Endereços", icon: MapPin },

  { to: "/client/become-provider", label: "Torna-te Pro", icon: BadgeCheck },
  { to: "/client/support", label: "Suporte", icon: LifeBuoy },
];

const proNav: NavItem[] = [
  { to: "/pro/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/pro/jobs", label: "Disponíveis", icon: PlusCircle },
  { to: "/pro/services", label: "Serviços", icon: ClipboardList },
  { to: "/pro/history", label: "Histórico", icon: History },
  { to: "/pro/earnings", label: "Ganhos", icon: Wallet },
  { to: "/pro/stats", label: "Estatísticas", icon: TrendingUp },

  { to: "/pro/notifications", label: "Notificações", icon: Bell },
  { to: "/pro/profile", label: "Perfil", icon: User },
  { to: "/pro/availability", label: "Disponibilidade", icon: Clock },
  { to: "/pro/settings", label: "Definições", icon: Settings },
  { to: "/pro/support", label: "Suporte", icon: LifeBuoy },
];

function PrivateAppLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };
  const role = user?.role ?? "customer";
  const nav = role === "provider" ? proNav : clientNav;
  const brandLabel = role === "provider" ? "BiscaTech Pro" : "BiscaTech";
  const brandSub = role === "provider" ? "Profissional" : "Cliente";
  const brandAccent = role === "provider" ? "#10B981" : "#2563EB";

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-card lg:flex lg:flex-col">
        <SidebarInner brand={{ label: brandLabel, sub: brandSub, accent: brandAccent }} nav={nav} pathname={pathname} user={user} onLogout={handleLogout} />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-semibold">Menu</span>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-muted" aria-label="Fechar menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarInner brand={{ label: brandLabel, sub: brandSub, accent: brandAccent }} nav={nav} pathname={pathname} user={user} onLogout={handleLogout} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 hover:bg-muted lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Pesquisar..."
              className="h-10 w-full rounded-full border border-border bg-muted/50 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:bg-card"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative rounded-full border border-border bg-card p-2.5 transition hover:border-primary/40" aria-label="Notificações">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger ring-2 ring-card" />
            </button>
            <div className="flex items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {user?.initials ?? "?"}
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold leading-none text-ink">{user?.name ?? ""}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{user?.phone ?? ""}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarInner({
  brand,
  nav,
  pathname,
  user,
  onLogout,
}: {
  brand: { label: string; sub: string; accent: string };
  nav: NavItem[];
  pathname: string;
  user: { name?: string; initials?: string } | null;
  onLogout: () => void;
}) {
  return (
    <>
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold text-white"
          style={{ backgroundColor: brand.accent }}
        >
          BT
        </span>
        <div>
          <p className="text-sm font-semibold leading-none text-ink">{brand.label}</p>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{brand.sub}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {nav.map((item) => {
          const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                  : "text-muted-foreground hover:bg-muted hover:text-ink"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              {item.badge != null && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    active ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {user?.initials ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{user?.name ?? ""}</p>
          </div>
          <button onClick={onLogout} className="rounded-lg p-1.5 text-muted-foreground hover:bg-danger/10 hover:text-danger transition" title="Terminar sessão">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}

export { PrivateAppLayout };
