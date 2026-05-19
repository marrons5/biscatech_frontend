import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BellIcon, 
  MapPinIcon, 
  SignOutIcon,
  UserGearIcon, 
  XIcon 
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
import { SidebarTrigger, useSidebar } from "@/components/ui";

const mockUser = {
  name: "Enzo Fernández",
  initials: "EF",
  email: "enzofernandez@gmail.com",
  role: "Cliente",
};

const mockNotifications = [
  { id: 1, message: "O canalizador aceitou o seu pedido.", time: "Há 5 min", isRead: false },
  { id: 2, message: "Avalie o serviço de eletricista de ontem.", time: "Há 1 dia", isRead: true },
];

export function AppHeader() {

  const navigate = useNavigate();
  const [headerChangeBg, setHeaderChangeBg] = useState(false);
  const [openProfileDrawer, setOpenProfileDrawer] = useState(false);
  const { state } = useSidebar();
  const isSidebarOpen = state === "expanded";

  // Efeito de Scroll para o fundo do Header
  useEffect(() => {
    const handleScroll = () => {
      setHeaderChangeBg(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <React.Fragment>
      <header className="bg-background flex justify-between items-center gap-3 pt-5 px-10 backdrop-blur-xl">
            <div className="flex flex-col gap-1">
              <h1 className="text-foreground text-3xl font-bold">Dashboard</h1>
              <h2 className="text-muted-foreground text-lg">Então brada, algum pânico?</h2>
            </div>

            <div className="flex gap-2.5">
              <div className="flex gap-2.5">
                <button className="hidden sm:inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-secondary text-xs font-semibold text-secondary-foreground hover:bg-accent transition-colors">
                  <MapPinIcon className="h-3.5 w-3.5 text-primary" />
                  Luanda
                </button>
                <Drawer direction="right">
                  <DrawerTrigger asChild>
                    <Button className="relative h-10 w-10 rounded-full bg-secondary hover:bg-accent transition-colors flex items-center justify-center">
                      <BellIcon className="h-5 w-5 text-foreground" />
                      <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
                    </Button>

                  </DrawerTrigger>            
                  <DrawerContent className="border-none p-0 right-0 left-auto w-[300px] sm:w-[400px] w-500 h-screen rounded-none ">
                    <DrawerHeader className="bg-primary/10 p-6 flex flex-row justify-between items-center w-full">
                      <div className="flex items-center gap-3">
                        <DrawerTitle className="text-foreground text-lg font-bold">
                          Notificações
                        </DrawerTitle>
                        {unreadCount > 0 && (
                          <Badge variant="primary">
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
              </div>
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <div className="hidden md:flex items-center gap-2">
                      <div className="h-9 w-9 rounded-full bg-primary-gradient flex items-center justify-center text-primary-foreground font-bold text-xs">
                        EF
                      </div>
                      <div className="hidden lg:block leading-tight">
                        <p className="text-xs font-bold">Enzo Fernández</p>
                        <p className="text-[10px] text-muted-foreground capitalize">Cliente</p>
                      </div>
                  </div>

                </DrawerTrigger>
                <DrawerContent className="p-0 right-0 left-auto w-[300px] w-full sm:w-[350px] h-screen rounded-none border-l border-border">
                  <DrawerHeader className="p-6 border-b border-border flex flex-row justify-between items-center">
                    <DrawerTitle className="font-bold text-lg text-foreground">A Minha Conta</DrawerTitle>
                    <DrawerClose className="text-muted-foreground hover:text-foreground"
                      onClick={() => setOpenProfileDrawer(false)}
                    >
                      <XIcon className="size-5" weight="bold" />
                    </DrawerClose>
                  </DrawerHeader>
                  
                  <div className="flex flex-col">
                    <div className="flex flex-col items-center justify-center border-b border-border py-8 px-4">
                      <div className="bg-primary text-primary-foreground flex items-center justify-center size-16 rounded-2xl text-xl font-bold mb-3 shadow-sm">
                        {mockUser.initials}
                      </div>
                      <span className="block text-lg font-bold text-foreground">
                        {mockUser.name}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {mockUser.email}
                      </span>
                      <Badge variant="secondary" className="mt-3 bg-secondary text-secondary-foreground">
                        {mockUser.role}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col py-2">
                      <button
                        className="text-sm font-medium flex items-center gap-4 py-4 px-6 hover:bg-muted transition-colors text-foreground"
                        onClick={() => {
                          setOpenProfileDrawer(false);
                          navigate("/client/profile"); // Ajustado para as tuas rotas
                        }}
                      >
                        <UserGearIcon className="size-5 text-muted-foreground" weight="regular" />
                        <span>Editar Perfil</span>
                      </button>
                      
                      <Link
                        to="/"
                        onClick={() => setOpenProfileDrawer(false)}
                        className="text-sm font-bold flex items-center gap-4 py-4 px-6 hover:bg-red-50 transition-colors text-red-500 hover:text-red-600"
                      >
                        <SignOutIcon className="size-5" weight="bold" />
                        <span>Terminar Sessão</span>
                      </Link>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
      </header>
    </React.Fragment>
  );
}