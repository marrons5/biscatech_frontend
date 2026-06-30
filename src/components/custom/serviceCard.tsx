import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  label: string;
  count?: string;
  featured?: boolean;
  onClick?: () => void;
}

export const ServiceCard = ({
  icon: Icon,
  label,
  count,
  featured,
  onClick,
}: ServiceCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-start gap-3 p-4 rounded-2xl text-left transition-all duration-300 active:scale-[0.97]",
        featured
          ? "bg-primary-gradient text-primary-foreground shadow-glow hover:shadow-float hover:-translate-y-1"
          : "bg-card border border-border/60 shadow-card hover:border-primary/30 hover:shadow-soft hover:-translate-y-0.5",
      )}>
      <div
        className={cn(
          "h-11 w-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
          featured ? "bg-white/20 backdrop-blur" : "bg-accent",
        )}>
        <Icon
          className={cn(
            "h-5 w-5",
            featured ? "text-primary-foreground" : "text-primary",
          )}
        />
      </div>
      <div>
        <div
          className={cn(
            "font-bold text-sm leading-tight",
            featured ? "text-primary-foreground" : "text-foreground",
          )}>
          {label}
        </div>
        {count && (
          <div
            className={cn(
              "text-[11px] font-medium mt-0.5",
              featured ? "text-primary-foreground/80" : "text-muted-foreground",
            )}>
            {count}
          </div>
        )}
      </div>
    </button>
  );
};
