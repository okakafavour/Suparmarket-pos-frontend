import { CalendarDays } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

export default function Greeting() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : "Admin";

  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Administrator";

  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="font-semibold text-blue-600">
          {greeting} 👋
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[color:var(--text)]">
          Welcome back, {fullName}
        </h1>

        <p className="mt-3 max-w-xl text-[color:var(--text-secondary)]">
          You are logged in as{" "}
          <span className="font-semibold text-blue-600">
            {role}
          </span>
          . Monitor inventory, sales, customers and reports from one
          powerful dashboard.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-4 shadow-sm transition-colors duration-300">
        <CalendarDays className="h-5 w-5 text-blue-600" />

        <div>
          <p className="text-xs uppercase tracking-wide text-[color:var(--text-secondary)]">
            Today
          </p>

          <p className="font-semibold text-[color:var(--text)]">
            {today}
          </p>
        </div>
      </div>
    </section>
  );
}