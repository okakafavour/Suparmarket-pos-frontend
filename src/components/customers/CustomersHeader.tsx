import { Users } from "lucide-react";

export default function CustomersHeader() {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

      <div className="flex items-center gap-5">

        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100 dark:bg-blue-500/20">

          <Users
            size={30}
            className="text-blue-600"
          />

        </div>

        <div>

          <h1 className="text-4xl font-bold tracking-tight text-[color:var(--text)]">
            Customers
          </h1>

          <p className="mt-2 text-[color:var(--text-muted)]">
            Manage customer profiles, purchase history, loyalty points and contact information.
          </p>

        </div>

      </div>
    </div>
  );
}