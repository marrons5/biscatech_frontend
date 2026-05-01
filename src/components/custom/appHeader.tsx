import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BellIcon, 
  SignOutIcon,
  UserGearIcon, 
  XIcon 
} from "@phosphor-icons/react";

// Ajusta o caminho dos componentes consoante a tua pasta (normalmente é "@/components/ui/...")
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Badge,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui"; // Ajusta se necessário
import { SidebarTrigger, useSidebar } from "@/components/ui";

// 1. MOCK DATA: Substituímos o "useLang" por dados diretos e controlados
const mockUser = {
  name: "João Mateus",
  initials: "JM",
  email: "joao.mateus@email.com",
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
      <header
        className={`fixed top-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border p-5 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:w-[calc(100%-16rem)] w-full" : "md:w-[calc(100%-3rem)] w-full"
        } ${headerChangeBg ? "shadow-sm" : ""}`}
      >

        <section className="flex gap-6 md:flex-row md:justify-between md:items-start font-['Inter'] w-full">

          <div className="flex items-center gap-3 sm:gap-6 flex-1">
            <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors" />
          </div>

          <div className="flex items-center gap-5">
            
            {/* DRAWER DE NOTIFICAÇÕES */}
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <button className="relative p-1 text-muted-foreground hover:text-primary transition-colors outline-none">
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0.5 flex size-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex size-2.5 rounded-full bg-primary"></span>
                    </span>
                  )}
                  <BellIcon className="size-6" weight="regular" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="p-0 right-0 left-auto w-[300px] sm:w-[400px] h-screen rounded-none border-l border-border">
                <DrawerHeader className="p-6 border-b border-border flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <BellIcon className="text-primary size-5" weight="fill" />
                    </div>
                    <DrawerTitle className="text-foreground text-lg font-bold">
                      Notificações
                    </DrawerTitle>
                    {unreadCount > 0 && (
                      <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {unreadCount}
                      </Badge>
                    )}
                  </div>
                  <DrawerClose className="text-muted-foreground hover:text-foreground">
                    <XIcon className="size-5" weight="bold" />
                  </DrawerClose>
                </DrawerHeader>
                
                <div className="flex flex-col gap-2 p-4 overflow-y-auto">
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

            {/* BOTÃO E DRAWER DE PERFIL */}
            <button
              className="outline-none"
              onClick={() => setOpenProfileDrawer(true)}
            >
              <div className="bg-primary/10 border border-primary/20 flex items-center justify-center size-9 rounded-xl hover:bg-primary/20 transition-colors">
                <span className="text-primary font-bold text-sm">
                  {mockUser.initials}
                </span>
              </div>
            </button>
          </div>
        </section>
        <div className="relative flex justify-between items-center gap-4 p-4 md:px-6 md:py-4">
          
          {/* LADO ESQUERDO: Botão da Sidebar e Pesquisa */}

          {/* LADO DIREITO: Notificações e Perfil */}
        </div>
      </header>

      {/* DRAWER DO PERFIL (Controlado pelo estado) */}
      <Drawer
        open={openProfileDrawer}
        onOpenChange={setOpenProfileDrawer}
        direction="right"
      >
        <DrawerContent className="p-0 right-0 left-auto w-[300px] sm:w-[350px] h-screen rounded-none border-l border-border">
          <DrawerHeader className="p-6 border-b border-border flex flex-row justify-between items-center">
            <DrawerTitle className="font-bold text-lg text-foreground">A Minha Conta</DrawerTitle>
            <button 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setOpenProfileDrawer(false)}
            >
              <XIcon className="size-5" weight="bold" />
            </button>
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
    </React.Fragment>
  );
}