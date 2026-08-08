import {
  Settings as SettingsIcon,
  Store,
} from "lucide-react";

export default function SettingsHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          <SettingsIcon size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[color:var(--text)]">
            Settings
          </h1>

          <p className="mt-1 text-sm text-[color:var(--text-muted)]">
            Manage your store information, preferences, and system settings.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-[color:var(--text-muted)]">
        <Store size={17} />
        <span>Store Configuration</span>
      </div>
    </div>
  );
}