import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  title: string;
  icon: LucideIcon;
  path: string;
}

export default function SidebarItem({
  title,
  icon: Icon,
  path,
}: SidebarItemProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `
        group
        flex
        items-center
        gap-4
        rounded-2xl
        px-4
        py-3
        transition-all
        duration-300
        ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20"
            : "text-[color:var(--text-muted)] hover:bg-[color:var(--surface-hover)] hover:text-[color:var(--text)]"
        }
      `
      }
    >
      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />

      <span className="font-medium">
        {title}
      </span>
    </NavLink>
  );
}