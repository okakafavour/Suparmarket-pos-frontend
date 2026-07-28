import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  title: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
}

export default function SidebarItem({
  title,
  icon: Icon,
  active = false,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />

      <span className="font-medium">{title}</span>
    </button>
  );
}