import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2 ", className)}>
      <div className="relative">
        <div className="h-9 w-9 rounded-full bg-primary-gradient shadow-glow flex items-center justify-center">
          <span className="text-white font-extrabold text-lg leading-none">
            BT
          </span>
        </div>
        <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
      </div>
      {showText && (
        <span className="font-extrabold text-xl tracking-tight text-foreground">
          BiscaTech
        </span>
      )}
    </div>
  );
};
