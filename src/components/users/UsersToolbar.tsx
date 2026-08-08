import {
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import type { UserRole } from "@/types/user";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  role: UserRole | "";
  setRole: (value: UserRole | "") => void;

  status: "" | "active" | "inactive";
  setStatus: (
    value: "" | "active" | "inactive"
  ) => void;

  onAddUser: () => void;
}

export default function UsersToolbar({
  search,
  setSearch,
  role,
  setRole,
  status,
  setStatus,
  onAddUser,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}
      <div className="relative w-full lg:max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search users..."
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-[color:var(--border)]
            bg-transparent
            pl-11
            pr-4
            text-sm
            text-[color:var(--text)]
            outline-none
            transition
            placeholder:text-[color:var(--text-muted)]
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-500/10
          "
        />
      </div>

      {/* Filters + Add */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={18}
            className="hidden text-[color:var(--text-muted)] sm:block"
          />

          {/* Role */}
          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value as UserRole | ""
              )
            }
            className="
              h-12
              flex-1
              rounded-2xl
              border
              border-[color:var(--border)]
              bg-[color:var(--surface)]
              px-4
              text-sm
              text-[color:var(--text)]
              outline-none
              focus:border-blue-500
            "
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="cashier">Cashier</option>
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | ""
                  | "active"
                  | "inactive"
              )
            }
            className="
              h-12
              flex-1
              rounded-2xl
              border
              border-[color:var(--border)]
              bg-[color:var(--surface)]
              px-4
              text-sm
              text-[color:var(--text)]
              outline-none
              focus:border-blue-500
            "
          >
            <option value="">
              All Statuses
            </option>
            <option value="active">
              Active
            </option>
            <option value="inactive">
              Inactive
            </option>
          </select>
        </div>

        {/* Add User */}
        <button
          type="button"
          onClick={onAddUser}
          className="
            flex
            h-12
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-blue-600
            px-5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            hover:shadow-lg
            hover:shadow-blue-600/20
            active:scale-[0.98]
          "
        >
          <Plus size={18} />

          Add User
        </button>
      </div>
    </div>
  );
}