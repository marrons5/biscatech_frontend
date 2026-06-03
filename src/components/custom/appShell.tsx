import { type ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, MapPin } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AppSidebar } from "./appSidebar";

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const { user } = useAuth();
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-svh flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          
          <header className="sticky top-0 z-30 h-16 flex items-center gap-3 px-4 lg:px-8 bg-background/85 backdrop-blur-xl border-b border-border/60">
            <SidebarTrigger className="shrink-0" />
            <div className="flex-1" />
            <button className="hidden sm:inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-secondary text-xs font-semibold text-secondary-foreground hover:bg-accent transition-colors">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Luanda
            </button>
            <button className="relative h-10 w-10 rounded-full bg-secondary hover:bg-accent transition-colors flex items-center justify-center">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
            </button>
            {user && (
              <div className="hidden md:flex items-center gap-2 pl-3 ml-1 border-l border-border/60">
                <div className="h-9 w-9 rounded-xl bg-primary-gradient flex items-center justify-center text-primary-foreground font-bold text-xs">
                  {user.initials}
                </div>
                <div className="hidden lg:block leading-tight">
                  <p className="text-xs font-bold">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">
                    {user.role === "pro" ? "Profissional" : "Cliente"}
                  </p>
                </div>
              </div>
            )}
          </header>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
