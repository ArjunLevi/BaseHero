import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        // The main industrial button
        default: 
          "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] border-none clip-path-polygon",
        // Skewed "terminal" style button
        cyber: 
          "relative bg-white text-black hover:bg-indigo-500 hover:text-white transform skew-x-[-12deg] border-none font-black",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.4)]",
        // Outline with a neon glow effect
        outline:
          "border-2 border-white/10 bg-transparent text-white hover:bg-white/5 hover:border-indigo-500/50 hover:text-indigo-400",
        secondary:
          "bg-[#1c1c21] text-gray-300 border border-white/5 hover:bg-[#25252b] hover:text-white",
        ghost: 
          "text-gray-400 hover:text-white hover:bg-white/5",
        link: 
          "text-indigo-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-9 px-4 text-[10px]",
        lg: "h-14 px-10 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // If it's the 'cyber' variant, we want to ensure the text inside is un-skewed
    const content = variant === 'cyber' ? (
      <span className="block skew-x-[12deg]">{props.children}</span>
    ) : props.children;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {asChild ? props.children : content}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }