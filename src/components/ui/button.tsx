import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "metallic-shine text-carbon-black hover:shadow-glow shadow-md hover:shadow-lg rounded-sm electric-pulse",
        hero: "metallic-shine text-carbon-black hover:shadow-glow rounded-sm font-bold uppercase tracking-wide text-base px-8 py-6 transform hover:scale-105 electric-pulse",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground rounded-sm electric-pulse",
        ghost: "bg-transparent text-foreground hover:bg-muted rounded-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg rounded-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-sm electric-pulse",
        accent: "metallic-shine text-carbon-black hover:shadow-glow rounded-sm font-bold electric-pulse",
        glass: "bg-background-glass backdrop-blur-md border border-border text-foreground hover:bg-muted rounded-sm electric-pulse",
        link: "text-primary underline-offset-4 hover:underline bg-transparent p-0",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-14 px-10 py-4 text-base",
        xl: "h-16 px-12 py-5 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
