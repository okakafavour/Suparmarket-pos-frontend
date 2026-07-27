import {
  Bell,
  Search,
  Menu,
} from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 border-b bg-white flex items-center justify-between px-8">

      <div className="flex items-center gap-4">

        <button className="lg:hidden">
          <Menu />
        </button>

        <div className="relative">

          <Search
            className="absolute left-4 top-3 text-slate-400"
            size={18}
          />

          <input
            placeholder="Search products..."
            className="w-80 rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
          />

        </div>

      </div>

      <div className="flex items-center gap-5">

        <button className="relative">

          <Bell />

          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500" />

        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
            A
          </div>

          <div>

            <h4 className="font-semibold">
              Administrator
            </h4>

            <p className="text-sm text-slate-500">
              Full Access
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}