import { Store } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/30">
        <Store className="h-7 w-7 text-white" />
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          StockFlow
        </h1>

        <p className="text-sm text-slate-400">
          Smart Retail POS
        </p>
      </div>
    </div>
  );
}