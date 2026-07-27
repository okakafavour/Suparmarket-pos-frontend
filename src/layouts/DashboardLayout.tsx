import type { ReactNode } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">

        <Sidebar />

        <main className="flex min-h-screen flex-1 flex-col">

          <Header />

          <section className="flex-1 p-8">
            {children}
          </section>

        </main>

      </div>
    </div>
  );
}