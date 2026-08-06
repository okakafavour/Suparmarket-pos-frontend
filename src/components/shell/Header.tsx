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
  Sun,
  User,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  
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
    <header className="fixed left-0 right-0 top-5 z-40 ml-80 mr-5 flex h-20 items-center justify-between rounded-[24px] border border-[var(--border)] bg-[color:var(--surface)]/80 px-8 shadow-xl backdrop-blur-xl transition-all duration-300">

      {/* Left */}

      <div className="flex items-center gap-5">

        <button className="rounded-xl p-3 transition hover:bg-[color:var(--surface-hover)] lg:hidden">
          <Menu size={22} />
        </button>

        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
          />

          <input
            type="text"
            placeholder="Search products, customers, suppliers..."
            className="
              h-12
              w-[390px]
              rounded-2xl
              border
              border-[var(--border)]
              bg-[color:var(--background)]
              pl-11
              pr-4
              text-sm
              text-[color:var(--text)]
              outline-none
              transition-all
              duration-300
              placeholder:text-[color:var(--text-muted)]
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-500/10
            "
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        {/* Date */}

        <div className="hidden items-center gap-3 rounded-2xl bg-[color:var(--background)] px-4 py-3 xl:flex">

          <CalendarDays
            size={18}
            className="text-blue-600"
          />

          <span className="text-sm font-medium text-[color:var(--text)]">
            {today}
          </span>

        </div>

        {/* Theme */}

        <button
          onClick={toggleTheme}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--background)] transition-all duration-300 hover:scale-105 hover:bg-[color:var(--surface-hover)]"
        >
          {theme === "dark" ? (
            <Sun
              size={19}
              className="text-yellow-400"
            />
          ) : (
            <Moon
              size={19}
              className="text-slate-600"
            />
          )}
        </button>

        {/* Notifications */}

        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--background)] transition-all duration-300 hover:scale-105 hover:bg-[color:var(--surface-hover)]">

          <Bell
            size={19}
            className="text-[color:var(--text)]"
          />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />

        </button>

        {/* Profile */}

        <div className="relative">

          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[color:var(--surface)] px-3 py-2 transition-all duration-300 hover:shadow-xl"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white shadow-lg">

              {initials}

            </div>

            <div className="hidden text-left lg:block">

              <h4 className="font-semibold text-[color:var(--text)]">
                {fullName}
              </h4>

              <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                {role}
              </p>

            </div>

            <ChevronDown
              size={18}
              className={`text-[color:var(--text-muted)] transition-transform duration-300 ${
                openMenu ? "rotate-180" : ""
              }`}
            />

          </button>

          {openMenu && (

            <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-3xl border border-[var(--border)] bg-[color:var(--surface)] shadow-2xl">

              <div className="border-b border-[var(--border)] p-5">

                <h3 className="font-semibold text-[color:var(--text)]">
                  {fullName}
                </h3>

                <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                  {user?.email}
                </p>

              </div>

              <button className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-[color:var(--surface-hover)]">

                <User size={18} />

                My Profile

              </button>

              <button className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-[color:var(--surface-hover)]">

                <Settings size={18} />

                Settings

              </button>

              <button
                onClick={toggleTheme}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-[color:var(--surface-hover)]"
              >

                {theme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}

                {theme === "dark"
                  ? "Light Mode"
                  : "Dark Mode"}

              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 border-t border-[var(--border)] px-5 py-4 text-left text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
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