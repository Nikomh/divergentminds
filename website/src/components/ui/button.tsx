import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg",
    "text-sm font-semibold tracking-wide transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft-sm hover:shadow-soft hover:brightness-110",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-muted",
        outline:
          "border border-border bg-transparent hover:bg-muted text-foreground",
        ghost:
          "hover:bg-muted text-foreground",
        accent:
          "bg-accent text-accent-foreground shadow-soft-sm hover:shadow-soft hover:brightness-105",
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto shadow-none",
        destructive:
          "bg-destructive text-destructive-foreground hover:brightness-90",
      },
      size: {
        xs:       "h-7 px-2.5 text-xs rounded-md",
        sm:       "h-8 px-3 text-sm",
        default:  "h-10 px-4",
        lg:       "h-11 px-6 text-base",
        xl:       "h-12 px-8 text-base",
        icon:     "size-10",
        "icon-sm":"size-8",
        "icon-lg":"size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
