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
  X,
  AlertTriangle,
  Package,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [openMenu, setOpenMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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

    return `${user.first_name?.[0] ?? ""}${
      user.last_name?.[0] ?? ""
    }`.toUpperCase();
  }, [user]);

  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : "Administrator";

  const role = user?.role
    ? user.role.charAt(0).toUpperCase() +
      user.role.slice(1)
    : "Administrator";

  // =========================
  // LOGOUT
  // =========================
  function handleLogout() {
    setOpenMenu(false);
    setNotificationsOpen(false);

    logout();

    navigate("/login", {
      replace: true,
    });
  }

  // =========================
  // PROFILE
  // =========================
  function handleProfile() {
    setOpenMenu(false);
    setNotificationsOpen(false);

    navigate("/profile");
  }

  // =========================
  // SETTINGS
  // =========================
  function handleSettings() {
    setOpenMenu(false);
    setNotificationsOpen(false);

    navigate("/settings");
  }

  // =========================
  // NOTIFICATIONS
  // =========================
  function handleNotifications() {
    setNotificationsOpen((previous) => !previous);

    setOpenMenu(false);
  }

  // =========================
  // MOBILE MENU
  // =========================
  function handleMobileMenu() {
    // Your mobile sidebar can be connected here later.
    console.log("Mobile menu clicked");
  }

  return (
    <header className="flex h-20 items-center justify-between border-b border-[var(--border)] bg-[color:var(--surface)] px-4 sm:px-6 lg:px-8">
      {/* =====================================================
          LEFT SIDE
      ====================================================== */}
      <div className="flex items-center gap-5">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={handleMobileMenu}
          aria-label="Open navigation menu"
          className="rounded-xl p-3 transition hover:bg-[color:var(--surface-hover)] lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
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

      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}
      <div className="flex items-center gap-3">
        {/* =================================================
            DATE
        ================================================== */}
        <div className="hidden items-center gap-3 rounded-2xl bg-[color:var(--background)] px-4 py-3 xl:flex">
          <CalendarDays
            size={18}
            className="text-blue-600"
          />

          <span className="text-sm font-medium text-[color:var(--text)]">
            {today}
          </span>
        </div>

        {/* =================================================
            THEME BUTTON
        ================================================== */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-[color:var(--background)]
            transition-all
            duration-300
            hover:scale-105
            hover:bg-[color:var(--surface-hover)]
          "
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

        {/* =================================================
            NOTIFICATIONS
        ================================================== */}
        <div className="relative">
          <button
            type="button"
            onClick={handleNotifications}
            aria-label="Notifications"
            className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-[color:var(--background)]
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[color:var(--surface-hover)]
            "
          >
            <Bell
              size={19}
              className="text-[color:var(--text)]"
            />

            {/* Unread indicator */}
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          {/* Notifications dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-3xl border border-[var(--border)] bg-[color:var(--surface)] shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                <div>
                  <h3 className="font-semibold text-[color:var(--text)]">
                    Notifications
                  </h3>

                  <p className="mt-1 text-xs text-[color:var(--text-muted)]">
                    Recent system alerts
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setNotificationsOpen(false)
                  }
                  aria-label="Close notifications"
                  className="rounded-lg p-1.5 transition hover:bg-[color:var(--surface-hover)]"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Inventory alert */}
              <div className="border-b border-[var(--border)] px-5 py-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400">
                    <AlertTriangle size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[color:var(--text)]">
                      Inventory alert
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[color:var(--text-muted)]">
                      Some products may be
                      running low on stock.
                    </p>
                  </div>
                </div>
              </div>

              {/* Inventory management */}
              <div className="border-b border-[var(--border)] px-5 py-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    <Package size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[color:var(--text)]">
                      Inventory management
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[color:var(--text-muted)]">
                      Review your inventory
                      regularly to keep
                      products available.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen(false);
                  navigate("/inventory");
                }}
                className="
                  w-full
                  px-5
                  py-4
                  text-center
                  text-sm
                  font-semibold
                  text-blue-600
                  transition
                  hover:bg-[color:var(--surface-hover)]
                  dark:text-blue-400
                "
              >
                View Inventory
              </button>
            </div>
          )}
        </div>

        {/* =================================================
            PROFILE MENU
        ================================================== */}
        <div className="relative">
          {/* Profile button */}
          <button
            type="button"
            onClick={() => {
              setOpenMenu((previous) => !previous);
              setNotificationsOpen(false);
            }}
            aria-label="Open profile menu"
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-[var(--border)]
              bg-[color:var(--surface)]
              px-3
              py-2
              transition-all
              duration-300
              hover:shadow-xl
            "
          >
            {/* Avatar */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white shadow-lg">
              {initials}
            </div>

            {/* Name + role */}
            <div className="hidden text-left lg:block">
              <h4 className="font-semibold text-[color:var(--text)]">
                {fullName}
              </h4>

              <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                {role}
              </p>
            </div>

            {/* Arrow */}
            <ChevronDown
              size={18}
              className={`text-[color:var(--text-muted)] transition-transform duration-300 ${
                openMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile dropdown */}
          {openMenu && (
            <div className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-3xl border border-[var(--border)] bg-[color:var(--surface)] shadow-2xl">
              {/* ==========================================
                  USER INFORMATION
              =========================================== */}
              <div className="border-b border-[var(--border)] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white">
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-[color:var(--text)]">
                      {fullName}
                    </h3>

                    <p className="mt-1 truncate text-sm text-[color:var(--text-muted)]">
                      {user?.email || "No email"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ==========================================
                  MY PROFILE
              =========================================== */}
              <button
                type="button"
                onClick={handleProfile}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-4
                  text-left
                  transition
                  hover:bg-[color:var(--surface-hover)]
                "
              >
                <User size={18} />

                <span>My Profile</span>
              </button>

              {/* ==========================================
                  SETTINGS
              =========================================== */}
              <button
                type="button"
                onClick={handleSettings}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-4
                  text-left
                  transition
                  hover:bg-[color:var(--surface-hover)]
                "
              >
                <Settings
                  size={18}
                  className="text-[color:var(--text-muted)]"
                />

                <span>Settings</span>
              </button>

              {/* ==========================================
                  THEME
              =========================================== */}
              <button
                type="button"
                onClick={toggleTheme}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-4
                  text-left
                  transition
                  hover:bg-[color:var(--surface-hover)]
                "
              >
                {theme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}

                <span>
                  {theme === "dark"
                    ? "Light Mode"
                    : "Dark Mode"}
                </span>
              </button>

              {/* ==========================================
                  LOGOUT
              =========================================== */}
              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  border-t
                  border-[var(--border)]
                  px-5
                  py-4
                  text-left
                  text-red-500
                  transition
                  hover:bg-red-50
                  dark:hover:bg-red-950/30
                "
              >
                <LogOut size={18} />

                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}