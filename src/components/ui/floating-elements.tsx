import * as React from "react";
import { cn } from "@/lib/utils";

interface FloatingElementsProps {
  className?: string;
  count?: number;
}

export const FloatingElements: React.FC<FloatingElementsProps> = ({ 
  className, 
  count = 20 
}) => {
  const elements = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {elements.map((i) => (
        <div
          key={i}
          className={cn(
            "absolute w-2 h-2 rounded-full opacity-20",
            "bg-gradient-to-r from-primary to-accent",
            "animate-float"
          )}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

interface NeuralNetworkProps {
  className?: string;
  nodes?: number;
}

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ 
  className, 
  nodes = 15 
}) => {
  const nodeElements = Array.from({ length: nodes }, (_, i) => i);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none opacity-30", className)}>
      <svg className="w-full h-full">
        {nodeElements.map((i) => {
          const x = (i % 5) * 20 + 10;
          const y = Math.floor(i / 5) * 25 + 10;
          const nextX = ((i + 1) % 5) * 20 + 10;
          const nextY = Math.floor((i + 1) / 5) * 25 + 10;
          
          return (
            <g key={i}>
              <circle
                cx={`${x}%`}
                cy={`${y}%`}
                r="2"
                fill="currentColor"
                className="text-primary animate-neural-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
              {i < nodes - 1 && (
                <line
                  x1={`${x}%`}
                  y1={`${y}%`}
                  x2={`${nextX}%`}
                  y2={`${nextY}%`}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-accent opacity-40 animate-glow"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};