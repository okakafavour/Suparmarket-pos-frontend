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
    <div className="h-screen overflow-hidden bg-slate-100">

      <Sidebar />

      <div className="lg:ml-80">

        <Header />

        <main className="h-screen overflow-y-auto pt-28">

          <div className="px-6 pb-8">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}