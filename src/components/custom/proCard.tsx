import { Star, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProCardProps {
  name: string;
  service: string;
  rating: number;
  jobs: number;
  distance: string;
  price: string;
  initials: string;
  online?: boolean;
}

export const ProCard = ({
  name,
  service,
  rating,
  jobs,
  distance,
  price,
  initials,
  online,
}: ProCardProps) => {
  return (
    <div className="bg-gradient-card border border-border/60 rounded-2xl p-4 shadow-card hover:shadow-soft transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <div className="h-12 w-12 rounded-2xl bg-primary-gradient flex items-center justify-center text-primary-foreground font-bold">
            {initials}
          </div>
          {online && (
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-success ring-2 ring-card" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-sm text-foreground truncate">
              {name}
            </h3>
            <div className="flex items-center gap-0.5 shrink-0 bg-accent px-2 py-0.5 rounded-full">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="text-xs font-bold text-accent-foreground">
                {rating}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-medium">
            {service} · {jobs} serviços
          </p>

          <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {distance}
            </span>
            <span className="font-semibold text-foreground">{price}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <Button variant="outline" size="sm" className="rounded-xl">
          <Phone className="h-3.5 w-3.5" /> Ligar
        </Button>
        <Button variant="default" size="sm" className="rounded-xl">
          WhatsApp
        </Button>
      </div>
    </div>
  );
};
