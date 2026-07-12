import { 
  HouseIcon, 
  BriefcaseIcon, 
  UserIcon, 
  ClipboardTextIcon, 
  WalletIcon, 
  SignOutIcon,
  GearIcon,
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
  SidebarMenuItem
} from "@/components/ui/sidebar";

import { useSidebar } from "../ui";
// import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const clientSidebarItems = [
  { to: "/client/dashboard", label: "Início", icon: HouseIcon },
  { to: "/client/history", label: "Histórico", icon: BriefcaseIcon },
  { to: "/client/settings", label: "Definições", icon: GearIcon },
];

const proSidebarItems = [
  { to: "/pro/dashboard", label: "Início", icon: ClipboardTextIcon },
  { to: "/pro/history", label: "Histórico", icon: BriefcaseIcon },
  { to: "/pro/balance", label: "Balanço", icon: WalletIcon },
  { to: "/pro/settings", label: "Definições", icon: UserIcon },
];

const mockUser = {
  name: "João Mateus",
  initials: "JM",
  phone: "+244 923 000 000",
  role: "cliente",
};



// type ClientSidebarList = {
//   listItem:
// }

// type SidebarItem = {
//   listItem: string;
//   to: string;
//   // icon: IconUserKey;
// }

export const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  
  const sidebarItems = mockUser.role === "pro" ? proSidebarItems : clientSidebarItems;
  
  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" className="border-r border-slate-200 rounded-e-4xl bg-white">
        <SidebarHeader className="px-3 py-4">
          <div className={cn("flex items-center", collapsed && "justify-center")}>
            {/* <Logo showText={!collapsed} /> */}
            BiscaTech
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400 font-medium tracking-wider text-xs">
              {mockUser.role === "pro" ? "Prestador de Serviço BiscaTech" : "Cliente BiscaTech"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild tooltip={item.label}>
                      <NavLink
                        to={item.to}
                        end={item.to === "/client/dashboard" || item.to === "/pro"}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 text-sm font-medium transition-all rounded-md px-3 py-2",
                            isActive
                              ? "bg-primary/10 text-primary font-bold"
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
            <div className="flex items-center gap-3 rounded-xl bg-background border border-slate-100 p-3 mb-2 shadow-sm">
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