import type { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function FormTextarea({
  label,
  error,
  className,
  ...props
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <textarea
        {...props}
        className={clsx(
          "min-h-28 w-full rounded-xl border bg-white px-4 py-3 outline-none transition",
          "border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100",
          "dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900/30",
          error && "border-red-500",
          className
        )}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}