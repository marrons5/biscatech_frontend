import { Bell, MapPin } from "lucide-react";
import { Logo } from "./logo";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container max-w-md flex items-center justify-between h-16">
        <Logo />
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 h-9 rounded-full bg-secondary text-xs font-semibold text-secondary-foreground hover:bg-accent transition-colors">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Luanda
          </button>
          <button className="relative h-10 w-10 rounded-full bg-secondary hover:bg-accent transition-colors flex items-center justify-center">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </button>
        </div>
      </div>
    </header>
  );
};
