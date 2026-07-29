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

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Inventory",
    icon: Boxes,
    path: "/inventory",
  },
  {
    title: "Products",
    icon: Package,
    path: "/products",
  },
  {
    title: "Sales",
    icon: ShoppingCart,
    path: "/sales",
  },
  {
    title: "Customers",
    icon: Users,
    path: "/customers",
  },
  {
    title: "Suppliers",
    icon: Truck,
    path: "/suppliers",
  },
  {
    title: "Purchases",
    icon: ClipboardList,
    path: "/purchases",
  },
  {
    title: "Payments",
    icon: CreditCard,
    path: "/payments",
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
  {
    title: "Users",
    icon: Shield,
    path: "/users",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  const { user } = useAuth();

  const initials = `${user?.first_name?.[0] ?? ""}${
    user?.last_name?.[0] ?? ""
  }`.toUpperCase();

  return (
    <aside className="fixed inset-y-5 left-5 hidden w-72 lg:block">
      <div
        className="
          flex
          h-full
          flex-col
          rounded-[32px]
          border
          border-[color:var(--border)]
          bg-[color:var(--surface)]
          p-7
          shadow-[var(--shadow-lg)]
          transition-all
          duration-300
        "
      >
        <Logo />

        <nav className="mt-10 flex-1 space-y-2">
          {menu.map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              path={item.path}
            />
          ))}
        </nav>

        <div
          className="
            mt-8
            rounded-3xl
            border
            border-[color:var(--border)]
            bg-[color:var(--background)]
            p-4
            transition-all
          "
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="truncate font-semibold text-[color:var(--text)]">
                {user?.first_name} {user?.last_name}
              </h4>

              <p className="truncate text-sm capitalize text-[color:var(--text-muted)]">
                {user?.role}
              </p>
            </div>

            <span className="h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
          </div>
        </div>
      </div>
    </aside>
  );
}