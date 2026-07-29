import {
  ShoppingCart,
  PackagePlus,
  UserPlus,
  Truck,
  Building2,
  BarChart3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "New Sale",
    icon: ShoppingCart,
    color: "bg-blue-100 text-blue-600",
    path: "/sales",
  },
  {
    title: "Add Product",
    icon: PackagePlus,
    color: "bg-purple-100 text-purple-600",
    path: "/products",
  },
  {
    title: "New Customer",
    icon: UserPlus,
    color: "bg-green-100 text-green-600",
    path: "/customers",
  },
  {
    title: "Purchase Stock",
    icon: Truck,
    color: "bg-orange-100 text-orange-600",
    path: "/purchases",
  },
  {
    title: "New Supplier",
    icon: Building2,
    color: "bg-pink-100 text-pink-600",
    path: "/suppliers",
  },
  {
    title: "Reports",
    icon: BarChart3,
    color: "bg-cyan-100 text-cyan-600",
    path: "/reports",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm transition-colors duration-300">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[color:var(--text)]">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
          Frequently used actions for faster workflow.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              onClick={() => navigate(action.path)}
              className="
                group
                flex
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-[color:var(--border)]
                bg-[color:var(--surface)]
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-500
                hover:shadow-xl
                hover:shadow-blue-500/10
              "
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
              >
                <Icon size={26} />
              </div>

              <span className="text-center text-sm font-semibold text-[color:var(--text)] transition-colors duration-300 group-hover:text-blue-600">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}