import { ShieldCheck } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
        <ShieldCheck className="h-8 w-8 text-white" />
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          TheftGuard
        </h1>

        <p className="text-sm text-blue-100">
          Smart Retail POS
        </p>
      </div>
    </div>
  );
}