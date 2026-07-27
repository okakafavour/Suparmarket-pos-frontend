import { useId } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export default function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  className,
}: CheckboxProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-center gap-3 select-none",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
    >
      <button
        id={id}
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-200",
          checked
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-slate-300 bg-white hover:border-blue-400"
        )}
      >
        <Check
          size={14}
          className={cn(
            "transition-transform duration-200",
            checked ? "scale-100" : "scale-0"
          )}
        />
      </button>

      {label && (
        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>
      )}
    </label>
  );
}