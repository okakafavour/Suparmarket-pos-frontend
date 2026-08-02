import { useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import ProductsHeader from "@/components/products/ProductsHeader";
import ProductsStats from "@/components/products/ProductsStats";
import ProductsToolbar from "@/components/products/ProductsToolbar";
import ProductGrid from "@/components/products/ProductGrid";
import AddProductModal from "@/components/products/AddProductModal";

import type { Product } from "@/types/product";
import { exportProducts } from "@/utils/exportProducts";

export default function Products() {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [sort, setSort] = useState("latest");

  const [view, setView] = useState<"grid" | "list">("grid");

  const [addProductOpen, setAddProductOpen] =
    useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  function handleAddProduct() {
    setAddProductOpen(true);
  }

  function handleCloseModal() {
    setAddProductOpen(false);
  }

  function handleExport() {
    exportProducts(products);
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <ProductsHeader />

        <ProductsStats />

        <ProductsToolbar
          search={search}
          onSearch={setSearch}
          category={category}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
          view={view}
          onViewChange={setView}
          onAddProduct={handleAddProduct}
          onExport={handleExport}
        />

        <ProductGrid
          search={search}
          category={category}
          sort={sort}
          view={view}
          onProductsLoaded={setProducts}
        />

        <AddProductModal
          open={addProductOpen}
          onClose={handleCloseModal}
        />

      </div>
    </DashboardLayout>
  );
}