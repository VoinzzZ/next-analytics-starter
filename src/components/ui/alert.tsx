import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 text-sm",
  {
    variants: {
      variant: {
        default: "bg-white text-zinc-800 border-zinc-200 dark:bg-black dark:text-zinc-100 dark:border-zinc-800",
        destructive:
          "border-red-300 text-red-900 bg-red-50 dark:border-red-800 dark:text-red-50 dark:bg-red-950/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

export const Alert = ({ className, variant, ...props }: AlertProps) => (
  <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
);

export const AlertTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h5 className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
);

export const AlertDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm leading-relaxed text-zinc-600 dark:text-zinc-300", className)} {...props} />
);
