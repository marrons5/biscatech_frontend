import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
}

export const PageHeader = ({
  title,
  subtitle,
  back = false,
  right,
}: PageHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 mb-6 lg:mb-8">
      {back && (
        <button
          onClick={() => navigate(-1)}
          className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-accent active:scale-95 transition-all border border-border/60"
          aria-label="Voltar">
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground truncate mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {right}
    </div>
  );
};
