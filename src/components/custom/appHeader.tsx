import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation()
  // const navigate = useNavigate();
  // const [headerChangeBg, setHeaderChangeBg] = useState(false);
  // const [openProfileDrawer, setOpenProfileDrawer] = useState(false);
  // const { state } = useSidebar();
  // const isSidebarOpen = state === "expanded";

  // // Efeito de Scroll para o fundo do Header
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setHeaderChangeBg(window.scrollY > 0);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;
  console.log(location.pathname)

  const selectPageHeader = () => {
    switch(location.pathname){
      case "/client/dashboard": return {title: "Dashboard", description: "Então brada, algum pânico?"};
      case "/client/history": return {title: "Histórico", description: "Então brada, algum pânico?"};
      case "/client/settings": return {title: "Definições", description: "Então brada, algum pânico?"};
      case "/client/request/create": return {title: "Solicitar Serviço", description: "Descreve o teu problema."};

    }
  };

  return (
    <React.Fragment>
      <header className="bg-background flex justify-between items-center pt-5 px-10 backdrop-blur-xl w-full">
            <div className="flex flex-col gap-1">
              <h1 className="text-foreground text-3xl font-bold">{selectPageHeader()?.title}</h1>
              <h2 className="text-muted-foreground text-lg">{selectPageHeader()?.description}</h2>
            </div>

            <div className="bg-primary-foreground rounded-full ring-1 ring-[#091B3D]/20 shadow-md flex items-center gap-2.5 p-2">
              <Button className="bg-primary-gradient text-primary-foreground border-none hidden sm:inline-flex items-center gap-1.5 px-3 h-10 rounded-full text-xs font-semibold hover:bg-background transition-colors">
                <MapPinIcon className="size-4" />
                <span className="">Luanda</span>
              </Button>
              <Drawer direction="right">
                  <DrawerTrigger asChild>
                    <Button className="bg-primary-gradient text-primary-foreground border-none rounded-full flex justify-center relative p-0 items-center w-10 h-10">
                      <BellIcon className="size-4 " />
                      <span className="absolute top-3 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
                    </Button>

                  </DrawerTrigger>            
                  <DrawerContent className="border-none p-0 right-0 left-auto w-[300px] sm:w-[400px] w-500 h-screen rounded-none ">
                    <DrawerHeader className="bg-primary/10 p-6 flex flex-row justify-between items-center w-full">
                      <div className="flex items-center gap-3">
                        <DrawerTitle className="text-foreground text-lg font-bold">
                          Notificações
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
                  {/* <div className="flex items-center gap-2"> */}
                      <div className="bg-primary-gradient rounded-full flex justify-center items-center w-10 aspect-square hover:bg-primary-foreground hover:text-primary-gradient">
                        <span className="text-primary-foreground text-base font-bold">
                          EF
                        </span>
                      </div>

                      {/* <div className="lg:flex flex-col hidden leading-tight capitalize">
                        <span className="text-sm font-bold">Enzo Fernández</span>
                        <span className="text-xs text-muted-foreground">Cliente</span>
                      </div> */}
                  {/* </div> */}
                </DrawerTrigger>
                <DrawerContent className="bg-popover border-none rounded-none">
                  <DrawerHeader className="p-6 flex flex-row justify-between items-center">
                    <DrawerTitle className="font-bold text-lg text-foreground">A Minha Conta</DrawerTitle>
                    <DrawerClose className="text-muted-foreground hover:text-foreground">
                      <XIcon className="size-5" weight="bold" />
                    </DrawerClose>
                  </DrawerHeader>
                  
                  <div className="flex flex-col px-5">
                    <div className="bg-primary-gradient rounded-2xl flex flex-col items-center justify-center gap-4 py-8 px-4">

                      <div>
                        <div className="bg-background flex justify-center items-center p-5 aspect-square rounded-full shadow-sm">
                          <span className="text-foreground text-3xl font-bold">
                            {mockUser.initials}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="block text-lg font-bold text-primary-foreground">
                          {mockUser.name}
                        </span>
                        <span className="block text-sm text-primary-foreground">
                          {mockUser.email}
                        </span>
                      </div>

                      <Badge variant="light">
                        {mockUser.role}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col py-2">
                        <Link
                          to="/client/settings"
                          // onClick={() => {
                            //   setOpenProfileDrawer(false);
                            //   navigate("/client/profile"); // Ajustado para as tuas rotas
                            // }}
                            >
                          <DrawerClose className="text-sm font-medium flex items-center gap-4 py-4 px-6 hover:bg-muted transition-colors text-foreground w-full">
                            <UserGearIcon className="size-5 text-muted-foreground" weight="regular" />
                            <span>Editar Perfil</span>
                          </DrawerClose>
                        </Link>
                      
                      <Link
                        to="/"
                        // onClick={() => setOpenProfileDrawer(false)}
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