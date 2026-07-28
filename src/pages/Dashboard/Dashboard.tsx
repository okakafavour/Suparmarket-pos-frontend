import DashboardLayout from "@/layouts/DashboardLayout";

import Greeting from "@/components/dashboard/Greeting";
import KPISection from "@/components/dashboard/KPISection";
import QuickActions from "@/components/dashboard/QuickActions";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentSales from "@/components/dashboard/RecentSales";
import LowStock from "@/components/dashboard/LowStock";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Greeting */}
        <Greeting />

        {/* KPI Cards */}
        <KPISection />

        {/* Quick Actions */}
        <QuickActions />

        {/* Revenue + Recent Sales */}
        <div className="grid gap-8 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>

          <RecentSales />
        </div>

        {/* Low Stock + Activity */}
        <div className="grid gap-8 xl:grid-cols-2">
          <LowStock />

          <ActivityTimeline />
        </div>
      </div>
    </DashboardLayout>
  );
}