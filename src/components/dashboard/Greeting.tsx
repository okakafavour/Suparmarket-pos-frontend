import { CalendarDays } from "lucide-react";

export default function Greeting() {
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

  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <p className="text-blue-600 font-semibold">
          {greeting} 👋
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Dashboard Overview
        </h1>

        <p className="mt-3 max-w-xl text-slate-500">
          Monitor inventory, sales, customers and reports from one
          powerful dashboard.
        </p>

      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

        <CalendarDays className="h-5 w-5 text-blue-600" />

        <div>

          <p className="text-xs uppercase tracking-wide text-slate-400">
            Today
          </p>

          <p className="font-semibold">
            {today}
          </p>

        </div>

      </div>

    </section>
  );
}