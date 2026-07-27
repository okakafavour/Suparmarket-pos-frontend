import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex h-14 items-center rounded-2xl border bg-white px-4 transition-all duration-300",
            "focus-within:border-blue-500",
            "focus-within:ring-4 focus-within:ring-blue-100",
            error ? "border-red-500" : "border-slate-200"
          )}
        >
          {leftIcon && (
            <span className="mr-3 text-slate-400">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            className={cn(
              "h-full w-full bg-transparent text-slate-900 outline-none",
              "placeholder:text-slate-400",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="ml-3 text-slate-400">
              {rightIcon}
            </span>
          )}
        </div>

        {error ? (
          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        ) : helperText ? (
          <p className="mt-2 text-sm text-slate-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;