import {
  LayoutDashboard,
  Boxes,
  Package,
  ShoppingCart,
  Users,
  Truck,
  ClipboardList,
  CreditCard,
  BarChart3,
  Shield,
  Settings,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

type UserRole = "admin" | "manager" | "cashier";

interface MenuItem {
  title: string;
  icon: typeof LayoutDashboard;
  path: string;
  roles: UserRole[];
}

const menu: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    roles: ["admin", "manager", "cashier"],
  },

  {
    title: "Inventory",
    icon: Boxes,
    path: "/inventory",
    roles: ["admin", "manager"],
  },

  {
    title: "Products",
    icon: Package,
    path: "/products",
    roles: ["admin", "manager", "cashier"],
  },

  {
    title: "Sales",
    icon: ShoppingCart,
    path: "/sales",
    roles: ["admin", "manager", "cashier"],
  },

  {
    title: "Customers",
    icon: Users,
    path: "/customers",
    roles: ["admin", "manager", "cashier"],
  },

  {
    title: "Suppliers",
    icon: Truck,
    path: "/suppliers",
    roles: ["admin", "manager"],
  },

  {
    title: "Purchases",
    icon: ClipboardList,
    path: "/purchases",
    roles: ["admin", "manager"],
  },

  {
    title: "Payments",
    icon: CreditCard,
    path: "/payments",
    roles: ["admin", "manager", "cashier"],
  },

  {
    title: "Reports",
    icon: BarChart3,
    path: "/reports",
    roles: ["admin", "manager"],
  },

  {
    title: "Users",
    icon: Shield,
    path: "/users",
    roles: ["admin"],
  },

  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
    roles: ["admin", "manager"],
  },
];

export default function Sidebar() {
  const { user } = useAuth();

  /*
   * Normalize the role coming from the backend.
   *
   * Example:
   * "Admin" -> "admin"
   * "MANAGER" -> "manager"
   * "Cashier" -> "cashier"
   */
  const rawRole = user?.role?.toLowerCase();

  const userRole: UserRole =
    rawRole === "admin" ||
    rawRole === "manager" ||
    rawRole === "cashier"
      ? rawRole
      : "cashier";

  /*
   * Only show menu items allowed for the
   * currently logged-in user's role.
   */
  const visibleMenu = menu.filter((item) =>
    item.roles.includes(userRole)
  );

  /*
   * User initials for the bottom profile card.
   */
  const initials = `${user?.first_name?.[0] ?? ""}${
    user?.last_name?.[0] ?? ""
  }`.toUpperCase();

  /*
   * Friendly role name for display.
   */
  const roleLabel =
    userRole.charAt(0).toUpperCase() +
    userRole.slice(1);

  return (
    <aside
      className="
        fixed
        left-5
        top-5
        z-40
        hidden
        h-[calc(100vh-2.5rem)]
        w-[235px]
        flex-col
        overflow-hidden
        rounded-[28px]
        border
        border-[color:var(--border)]
        bg-[color:var(--surface)]
        text-[color:var(--text)]
        shadow-sm
        lg:flex
      "
    >
      {/* =====================================================
          LOGO
      ====================================================== */}

      <div className="shrink-0 px-5 pt-5">
        <Logo />
      </div>

      {/* =====================================================
          NAVIGATION
          
          Only this section scrolls.
          The logo and bottom user card remain fixed.
          
          The scrollbar is intentionally subtle so it does
          not look like a large visible scrollbar.
      ====================================================== */}

      <nav
        className="
          mt-8
          min-h-0
          flex-1
          space-y-1.5
          overflow-y-auto
          px-4
          pb-3
          pr-2

          [scrollbar-width:thin]
          [scrollbar-color:transparent_transparent]
          hover:[scrollbar-color:var(--border)_transparent]

          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-transparent
          hover:[&::-webkit-scrollbar-thumb]:bg-[color:var(--border)]
        "
      >
        {visibleMenu.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            icon={item.icon}
            path={item.path}
          />
        ))}
      </nav>

      {/* =====================================================
          USER PROFILE CARD

          This stays at the bottom and never scrolls away.
      ====================================================== */}

      <div
        className="
          shrink-0
          px-4
          pb-4
          pt-2
        "
      >
        <div
          className="
            rounded-3xl
            border
            border-[color:var(--border)]
            bg-[color:var(--background)]
            p-3
            transition-all
            duration-200
          "
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-600
                to-indigo-600
                text-sm
                font-bold
                text-white
                shadow-lg
              "
            >
              {initials || "A"}
            </div>

            {/* Name + Role */}

            <div className="min-w-0 flex-1">
              <h4
                className="
                  truncate
                  text-sm
                  font-semibold
                  text-[color:var(--text)]
                "
              >
                {user
                  ? `${user.first_name} ${user.last_name}`
                  : "Administrator"}
              </h4>

              <p
                className="
                  mt-0.5
                  truncate
                  text-xs
                  capitalize
                  text-[color:var(--text-muted)]
                "
              >
                {roleLabel}
              </p>
            </div>

            {/* Online indicator */}

            <span
              className="
                h-2.5
                w-2.5
                shrink-0
                rounded-full
                bg-emerald-500
                ring-4
                ring-emerald-500/10
              "
            />
          </div>
        </div>
      </div>
    </aside>
  );
}