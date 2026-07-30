import clsx from "clsx";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  error?: string;
}

export default function FormSelect({
  label,
  value,
  onChange,
  options,
  error,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "w-full rounded-xl border bg-white px-4 py-3 outline-none transition",
          "border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100",
          "dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900/30",
          error && "border-red-500"
        )}
      >
        <option value="">Select...</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}