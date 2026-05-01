import { 
  HouseIcon, 
  BriefcaseIcon, 
  StarIcon, 
  UserIcon, 
  ClipboardTextIcon, 
  WalletIcon, 
  SignOutIcon 
} from "@phosphor-icons/react";
import { useNavigate, NavLink } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // useSidebar,
} from "@/components/ui/sidebar";

import { useSidebar } from "../ui";
// import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

// As rotas em inglês que definimos juntos!
const clientItems = [
  { to: "/client/dashboard", label: "Início", icon: HouseIcon },
  { to: "/client/requests", label: "Pedidos", icon: BriefcaseIcon },
  { to: "/client/reviews", label: "Avaliações", icon: StarIcon },
  { to: "/client/profile", label: "Perfil", icon: UserIcon },
];

const proItems = [
  { to: "/pro", label: "Agenda", icon: ClipboardTextIcon },
  { to: "/pro/history", label: "Histórico", icon: BriefcaseIcon },
  { to: "/pro/balance", label: "Ganhos", icon: WalletIcon },
  { to: "/pro/evaluations", label: "Avaliações", icon: StarIcon },
  { to: "/pro/profile", label: "Perfil", icon: UserIcon },
];

// O nosso utilizador falso para a apresentação
const mockUser = {
  name: "João Mateus",
  initials: "JM",
  phone: "+244 923 000 000",
  role: "cliente", // Testa mudar para "pro" e vê a magia!
};

export const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  
  const items = mockUser.role === "pro" ? proItems : clientItems;

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" className="border-r border-slate-200 bg-white">
        <SidebarHeader className="px-3 py-4">
          <div className={cn("flex items-center", collapsed && "justify-center")}>
            {/* <Logo showText={!collapsed} /> */}
            NEMMA
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400 font-bold uppercase tracking-wider text-xs">
              {mockUser.role === "pro" ? "Painel do Profissional" : "Painel do Cliente"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild tooltip={item.label}>
                      {/* NavLink nativo do react-router-dom com os estilos condicionados */}
                      <NavLink
                        to={item.to}
                        end={item.to === "/client/dashboard" || item.to === "/pro"}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 text-sm font-medium transition-all rounded-md px-3 py-2",
                            isActive
                              ? "bg-primary/10 text-primary font-bold" // Aqui brilha o teu Azul Safira
                              : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                          )
                        }
                      >
                        <item.icon className="h-5 w-5 shrink-0" weight="regular" />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-3">
          {!collapsed && (
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-100 p-3 mb-2 shadow-sm">
              {/* Removido o bg-gradient-hero alucinado da IA, colocado o bg-primary sólido */}
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0 shadow-sm">
                {mockUser.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{mockUser.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{mockUser.phone}</p>
              </div>
            </div>
          )}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={handleLogout} 
                tooltip="Terminar sessão" 
                className="text-red-500 hover:text-red-600 hover:bg-red-50 font-medium py-2"
              >
                <SignOutIcon className="h-5 w-5" weight="bold" />
                <span>Terminar sessão</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
};