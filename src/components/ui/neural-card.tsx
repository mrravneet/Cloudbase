import * as React from "react";
import { cn } from "@/lib/utils";

export interface NeuralCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "neural" | "morphic" | "quantum";
  animated?: boolean;
}

const NeuralCard = React.forwardRef<HTMLDivElement, NeuralCardProps>(
  ({ className, variant = "glass", animated = false, children, ...props }, ref) => {
    const baseClasses = "relative rounded-lg overflow-hidden transition-all duration-500";
    
    const variantClasses = {
      glass: "glass-card hover:shadow-[var(--shadow-depth)]",
      neural: "neural-glow bg-gradient-to-br from-card to-card/50 border border-primary/20",
      morphic: "bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 hover:border-primary/30",
      quantum: "neural-border bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl"
    };

    const animatedClasses = animated ? "animate-float hover:animate-neural-pulse" : "";

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          animatedClasses,
          className
        )}
        {...props}
      >
        {children}
        {variant === "morphic" && (
          <div className="absolute inset-0 opacity-20 animate-wave">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform translate-x-full" />
          </div>
        )}
      </div>
    );
  }
);

NeuralCard.displayName = "NeuralCard";

export { NeuralCard };