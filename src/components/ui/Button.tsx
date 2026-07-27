import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-blue-600 to-blue-500
    text-white
    shadow-lg shadow-blue-500/20
    hover:from-blue-700 hover:to-blue-600
    hover:shadow-xl hover:shadow-blue-500/30
  `,

  secondary: `
    bg-slate-900
    text-white
    hover:bg-slate-800
    shadow-lg shadow-slate-900/10
  `,

  outline: `
    border border-slate-300
    bg-white
    text-slate-700
    hover:border-blue-300
    hover:bg-blue-50
  `,

  ghost: `
    bg-transparent
    text-slate-700
    hover:bg-slate-100
  `,

  danger: `
    bg-red-600
    text-white
    hover:bg-red-700
    shadow-lg shadow-red-500/20
  `,
};

export default function Button({
  variant = "primary",
  loading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-6",
        "font-semibold tracking-wide",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1",
        "active:translate-y-0 active:scale-[0.99]",
        "focus:outline-none focus:ring-4 focus:ring-blue-200",
        "disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        className
      )}
      {...props}
    >
      {loading && (
        <Loader2
          size={18}
          className="animate-spin"
        />
      )}

      {children}
    </button>
  );
}