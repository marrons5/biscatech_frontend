import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Bell, Search, Menu, X, LayoutDashboard, Users, ShieldCheck, ClipboardList, FolderTree, Star, AlertOctagon, LifeBuoy, BarChart3, Settings, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentType } from "react";

type NavItem = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string | number;
};

const adminNav: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/users", label: "Utilizadores", icon: Users },
  { to: "/admin/providers", label: "Profissionais", icon: ShieldCheck, badge: 12 },
  { to: "/admin/requests", label: "Pedidos", icon: ClipboardList },
  { to: "/admin/categories", label: "Categorias", icon: FolderTree },
  { to: "/admin/services", label: "Serviços", icon: Briefcase },
  { to: "/admin/reviews", label: "Avaliações", icon: Star },
  { to: "/admin/complaints", label: "Reclamações", icon: AlertOctagon, badge: 4 },
  { to: "/admin/tickets", label: "Tickets", icon: LifeBuoy },
  { to: "/admin/reports", label: "Relatórios", icon: BarChart3 },
  { to: "/admin/settings", label: "Definições", icon: Settings },
];

function AdminAppLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-card lg:flex lg:flex-col">
        <SidebarInner nav={adminNav} pathname={pathname} />
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
            <SidebarInner nav={adminNav} pathname={pathname} />
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
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">BT</div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold leading-none text-ink">Equipa BT</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">Administrador</p>
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
  nav,
  pathname,
}: {
  nav: NavItem[];
  pathname: string;
}) {
  return (
    <>
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#0F172A" }}>
          BT
        </span>
        <div>
          <p className="text-sm font-semibold leading-none text-ink">BiscaTech</p>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">Admin</p>
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
    </>
  );
}

export { AdminAppLayout };
