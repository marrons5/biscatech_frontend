import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border border-transparent px-2 py-1 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        
        blue: "bg-primary/15 text-primary [a]:hover:bg-primary/55 border-primary/25",
        green: "bg-success/15 text-success [a]:hover:bg-success/55 border-success/25",
        orange: "bg-warning/15 text-warning [a]:hover:bg-warning/55 border-warning/25",
        red: "bg-destructive/15 text-destructive [a]:hover:bg-destructive/55 border-destructive/25",
        grey: "bg-neutral/15 text-neutral [a]:hover:bg-neutral/55 border-neutral/25",

        dark: "bg-dark text-white [a]:hover:bg-dark/10 [a]:hover:text-dark",
        light: "bg-background text-foreground",

        secondary:
          "bg-[#F4F4F5] text-[#09090B] rounded-[9999px] [a]:hover:bg-[#F4F4F5]/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)