import DashboardLayout from "@/layouts/DashboardLayout";

import ProductsHeader from "@/components/products/ProductsHeader";
import ProductsStats from "@/components/products/ProductsStats";
import ProductsToolbar from "@/components/products/ProductsToolbar";
import ProductGrid from "@/components/products/ProductGrid";

export default function Products() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ProductsHeader />

        <ProductsStats />

        <ProductsToolbar />

        <ProductGrid />
      </div>
    </DashboardLayout>
  );
}