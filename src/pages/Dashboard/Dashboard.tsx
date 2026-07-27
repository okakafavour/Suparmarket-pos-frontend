import Greeting from "@/components/dashboard/Greeting";
import RecentSales from "@/components/dashboard/RecentSales";
import SalesChartCard from "@/components/dashboard/SalesChartCard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <Greeting />

        <StatsGrid />

        <div className="grid gap-8 xl:grid-cols-3">

          <div className="xl:col-span-2">
            <SalesChartCard />
          </div>

          <RecentSales />

        </div>

      </div>
    </DashboardLayout>
  );
}