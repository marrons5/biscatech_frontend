import {
  HouseIcon,
  BriefcaseIcon,
  UserIcon,
  ClipboardTextIcon,
  WalletIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
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
} from "@/components/ui/sidebar";

import { useSidebar } from "../ui";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/context/authContext";
import { authService } from "@/services/authService";
import { getRefreshToken, clearAuthToken } from "@/utils/auth/session";

const clientSidebarItems = [
  { to: "/client/dashboard", label: "Home", icon: HouseIcon },
  { to: "/client/reviews", label: "Reviews", icon: BriefcaseIcon },

];

const proSidebarItems = [
  { to: "/pro/dashboard", label: "Home", icon: ClipboardTextIcon },
  { to: "/pro/history", label: "History", icon: BriefcaseIcon },
  { to: "/pro/balance", label: "Balance", icon: WalletIcon },
  { to: "/pro/settings", label: "Settings", icon: UserIcon },
];

export const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext)!;

  const role = user?.role ?? "customer";
  const sidebarItems = role === "provider" ? proSidebarItems : clientSidebarItems;

  const handleLogout = async () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        await authService.logout({ refreshToken });
      } catch {
        // silently fail
      }
    }
    clearAuthToken();
    logout();
    navigate("/", { replace: true });
  };

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" className="border-r border-slate-200 rounded-e-4xl bg-white">
        <SidebarHeader className="px-3 py-4">
          <div className={cn("flex items-center", collapsed && "justify-center")}>
            BiscaTech
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400 font-medium tracking-wider text-xs">
              {role === "provider" ? "BiscaTech Pro" : "BiscaTech Client"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild tooltip={item.label}>
                      <NavLink
                        to={item.to}
                        end={item.to === "/client/dashboard" || item.to === "/pro/dashboard"}
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
          {!collapsed && user && (
            <div className="flex items-center gap-3 rounded-xl bg-background border border-slate-100 p-3 mb-2 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0 shadow-sm">
                {user.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user.phone}</p>
              </div>
            </div>
          )}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                tooltip="Sign out"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 font-medium py-2"
              >
                <SignOutIcon className="h-5 w-5" weight="bold" />
                <span>Sign out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
};
