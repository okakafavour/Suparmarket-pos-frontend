import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  User,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    []
  );

  const initials = useMemo(() => {
    if (!user) return "A";

    return `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase();
  }, [user]);

  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : "Administrator";

  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Administrator";

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
<header className="fixed left-0 right-0 top-5 z-40 ml-80 mr-5 flex h-20 items-center justify-between rounded-[24px] border border-slate-200 bg-white px-8 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-5">

        <button className="rounded-xl p-3 transition hover:bg-slate-100 lg:hidden">
          <Menu size={22} />
        </button>

        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search products, sales, customers..."
            className="h-12 w-[380px] rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Date */}

        <div className="hidden items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 xl:flex">

          <CalendarDays
            size={18}
            className="text-blue-600"
          />

          <span className="text-sm font-medium">
            {today}
          </span>

        </div>

        {/* Theme */}

        <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 transition hover:bg-slate-200">

          <Moon size={18} />

        </button>

        {/* Notifications */}

        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 transition hover:bg-slate-200">

          <Bell size={18} />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500" />

        </button>

        {/* Profile */}

        <div className="relative">

          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition-all hover:border-blue-200 hover:shadow-lg"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white">

              {initials}

            </div>

            <div className="hidden text-left lg:block">

              <h4 className="font-semibold leading-none">
                {fullName}
              </h4>

              <p className="mt-1 text-sm capitalize text-slate-500">
                {role}
              </p>

            </div>

            <ChevronDown
              size={18}
              className={`text-slate-400 transition-transform ${
                openMenu ? "rotate-180" : ""
              }`}
            />

          </button>

          {/* Dropdown */}

          {openMenu && (

            <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

              <div className="border-b border-slate-100 px-5 py-4">

                <h3 className="font-semibold">
                  {fullName}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {user?.email}
                </p>

              </div>

              <button
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-slate-50"
              >

                <User size={18} />

                My Profile

              </button>

              <button
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-slate-50"
              >

                <Settings size={18} />

                Settings

              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 border-t border-slate-100 px-5 py-4 text-left text-red-600 transition hover:bg-red-50"
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}