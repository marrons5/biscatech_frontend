import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BellIcon,
  MapPinIcon,
  SignOutIcon,
  UserGearIcon,
  XIcon,
} from "@phosphor-icons/react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Badge,
  DrawerTrigger,
  DrawerClose,
  Button,
} from "@/components/ui";
import { AuthContext } from "@/context/authContext";
import { authService } from "@/services/authService";
import { getRefreshToken, clearAuthToken } from "@/utils/auth/session";

const mockNotifications = [
  { id: 1, message: "The plumber accepted your request.", time: "5 min ago", isRead: false },
  { id: 2, message: "Rate yesterday's electrician service.", time: "1 day ago", isRead: true },
];

const roleLabel: Record<string, string> = {
  customer: "Customer",
  provider: "Pro",
  admin: "Admin",
};

export function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext)!;

  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  const selectPageHeader = () => {
    switch (location.pathname) {
      case "/client/dashboard": return { title: "Dashboard", description: "What's up?" };
      case "/client/history": return { title: "History", description: "Your past requests" };
      case "/client/settings": return { title: "Settings", description: "Manage your account" };
      case "/client/request/create": return { title: "New Request", description: "Describe your problem" };
      case "/pro/dashboard": return { title: "Dashboard", description: "Available requests" };
      case "/pro/history": return { title: "History", description: "Your completed services" };
      case "/pro/balance": return { title: "Balance", description: "Your earnings" };
      case "/pro/settings": return { title: "Settings", description: "Manage your profile" };
      default: return { title: "", description: "" };
    }
  };

  const pageInfo = selectPageHeader();

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
    <React.Fragment>
      <header className="bg-background flex justify-between items-center pt-5 px-10 backdrop-blur-xl w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-foreground text-3xl font-bold">{pageInfo?.title}</h1>
          <h2 className="text-muted-foreground text-lg">{pageInfo?.description}</h2>
        </div>

        <div className="bg-primary-foreground rounded-full ring-1 ring-[#091B3D]/20 shadow-md flex items-center gap-2.5 p-2">
          <Button className="bg-primary-gradient text-primary-foreground border-none hidden sm:inline-flex items-center gap-1.5 px-3 h-10 rounded-full text-xs font-semibold hover:bg-background transition-colors">
            <MapPinIcon className="size-4" />
            <span className="">Luanda</span>
          </Button>
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button className="bg-primary-gradient text-primary-foreground border-none rounded-full flex justify-center relative p-0 items-center w-10 h-10">
                <BellIcon className="size-4" />
                <span className="absolute top-3 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="border-none p-0 right-0 left-auto w-[300px] sm:w-[400px] h-screen rounded-none">
              <DrawerHeader className="bg-primary/10 p-6 flex flex-row justify-between items-center w-full">
                <div className="flex items-center gap-3">
                  <DrawerTitle className="text-foreground text-lg font-bold">
                    Notifications
                  </DrawerTitle>
                  {unreadCount > 0 && (
                    <Badge variant="blue">
                      {unreadCount}
                    </Badge>
                  )}
                </div>
                <DrawerClose className="text-muted-foreground hover:text-foreground">
                  <XIcon className="size-5" weight="bold" />
                </DrawerClose>
              </DrawerHeader>

              <div className="flex flex-col gap-2 p-4 overflow-y-auto">
                <div className="bg-primary-gradient rounded-xl flex flex-col gap-1.5 p-4 transition-colors">
                  <span className="text-primary-foreground text-sm font-bold">
                    BiscaTech Premium -20%
                  </span>
                  <span className="text-primary-foreground text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`rounded-xl flex flex-col gap-1.5 p-4 transition-colors ${
                      !notification.isRead
                        ? "bg-primary/5 border border-primary/20"
                        : "bg-transparent border border-transparent hover:bg-muted"
                    }`}
                  >
                    <span className={`text-sm ${!notification.isRead ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                      {notification.message}
                    </span>
                    <span className="text-primary text-xs font-bold">
                      {notification.time}
                    </span>
                  </div>
                ))}
              </div>
            </DrawerContent>
          </Drawer>

          <Drawer direction="right">
            <DrawerTrigger asChild>
              <div className="bg-primary-gradient rounded-full flex justify-center items-center w-10 aspect-square hover:bg-primary-foreground hover:text-primary-gradient">
                <span className="text-primary-foreground text-base font-bold">
                  {user?.initials ?? "?"}
                </span>
              </div>
            </DrawerTrigger>
            <DrawerContent className="bg-popover border-none rounded-none">
              <DrawerHeader className="p-6 flex flex-row justify-between items-center">
                <DrawerTitle className="font-bold text-lg text-foreground">My Account</DrawerTitle>
                <DrawerClose className="text-muted-foreground hover:text-foreground">
                  <XIcon className="size-5" weight="bold" />
                </DrawerClose>
              </DrawerHeader>

              <div className="flex flex-col px-5">
                <div className="bg-primary-gradient rounded-2xl flex flex-col items-center justify-center gap-4 py-8 px-4">
                  <div>
                    <div className="bg-background flex justify-center items-center p-5 aspect-square rounded-full shadow-sm">
                      <span className="text-foreground text-3xl font-bold">
                        {user?.initials ?? "?"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="block text-lg font-bold text-primary-foreground">
                      {user?.name ?? ""}
                    </span>
                    <span className="block text-sm text-primary-foreground">
                      {user?.email ?? ""}
                    </span>
                  </div>

                  <Badge variant="light">
                    {user?.role ? roleLabel[user.role] ?? user.role : ""}
                  </Badge>
                </div>

                <div className="flex flex-col py-2">
                  <Link
                    to={`/${user?.role === "provider" ? "pro" : "client"}/settings`}
                  >
                    <DrawerClose className="text-sm font-medium flex items-center gap-4 py-4 px-6 hover:bg-muted transition-colors text-foreground w-full">
                      <UserGearIcon className="size-5 text-muted-foreground" weight="regular" />
                      <span>Edit Profile</span>
                    </DrawerClose>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-sm font-bold flex items-center gap-4 py-4 px-6 hover:bg-red-50 transition-colors text-red-500 hover:text-red-600 text-left w-full"
                  >
                    <SignOutIcon className="size-5" weight="bold" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </header>
    </React.Fragment>
  );
}
