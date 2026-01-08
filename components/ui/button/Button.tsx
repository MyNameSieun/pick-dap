import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-main-400 text-white hover:bg-main-400/80 active:border active:border-main-400 active:bg-bg-light active:text-main-400",
        white:
          "text-icon-default active:border-highlight-deep active:bg-highlight-light active:text-highlight-deep border border-b-2 border-gray-300 bg-bg-light shadow-xs hover:bg-bg-deep hover:text-gray-600 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        none: "text-gray-1000 border border-2 border-gray-300 hover:bg-bg-deep active:text-highlight-deep active:border-highlight-deep",
        ghost:
          "hover:bg-accent text-icon-default hover:text-gray-1000 dark:hover:bg-accent/50",
        link: "text-main-400 underline-offset-4 hover:underline font-medium",
      },
      size: {
        default: "button-md h-12 px-4 py-2 has-[>svg]:px-3",
        xs: "c1 h-8.5 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 w-fit font-medium",
        sm: "button-sm h-9 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "button-lg h-16 px-6 has-[>svg]:px-4 py-7",
        icon: "size-8 rounded-md p-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
