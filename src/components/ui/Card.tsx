import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200 bg-white p-6",
        "shadow-sm transition-all duration-300",
        hover &&
          "hover:-translate-y-1 hover:shadow-xl hover:border-blue-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}