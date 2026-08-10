import type { ReactNode } from "react";

import Sidebar from "@/components/shell/Sidebar";
import Header from "@/components/shell/Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div
      className="
        min-h-screen
        bg-[color:var(--background)]
        text-[color:var(--text)]
      "
    >
      <Sidebar />

      <div className="ml-0 lg:ml-[308px]">
        <Header />

        <main className="px-4 pb-8 pt-[120px] sm:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}