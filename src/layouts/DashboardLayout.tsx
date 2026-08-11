import { useState, type ReactNode } from "react";

import Sidebar from "@/components/shell/Sidebar";
import Header from "@/components/shell/Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[color:var(--surface)]">
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="ml-0 lg:ml-[308px]">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="px-4 pb-8 pt-[120px] sm:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}