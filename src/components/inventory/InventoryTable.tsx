import { useState, useEffect } from "react";
import { Package } from "lucide-react";

import { useProducts } from "@/queries/useProducts";
import type { Product } from "@/types/product";

import InventoryTableRow from "./InventoryTableRow";
import LoadingInventory from "./LoadingInventory";
import EmptyInventory from "./EmptyInventory";
import ProductDrawer from "./ProductDrawer";
import InventoryPagination from "./InventoryPagination";
import EditProductModal from "./EditProductModal";
import DeleteProductDialog from "./DeleteProductDialog";

interface Props {
  page: number;
  limit: number;
  search: string;
  category: string;
  status: string;
  onPageChange: (page: number) => void;
}

export default function InventoryTable({
  page,
  limit,
  search,
  category,
  status,
  onPageChange,
}: Props) {
  const {
    data,
    isLoading,
    isError,
  } = useProducts({
    page,
    limit,
    search,
    category,
    status,
  });

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [editingProduct, setEditingProduct] =
  useState<Product | null>(null);

const [deletingProduct, setDeletingProduct] =
  useState<Product | null>(null);

  // Prevent invalid page after filtering
  useEffect(() => {
    if (
      data?.pagination &&
      page > data.pagination.total_pages &&
      data.pagination.total_pages > 0
    ) {
      onPageChange(data.pagination.total_pages);
    }
  }, [data, page, onPageChange]);

  if (isLoading) {
    return <LoadingInventory />;
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-950/20">
        <Package className="mx-auto mb-4 h-12 w-12 text-red-500" />

        <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
          Failed to load products
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  const products = data?.products ?? [];
  const totalPages = data?.pagination?.total_pages ?? 1;
const totalProducts = data?.pagination?.total ?? products.length;

  if (!products.length) {
    return <EmptyInventory />;
  }

  function handleView(product: Product) {
    setSelectedProduct(product);
  }

  function handleEdit(product: Product) {
  setEditingProduct(product);
}

function handleDelete(product: Product) {
  setDeletingProduct(product);
}



  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  SKU
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Supplier
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Selling Price
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Stock
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <InventoryTableRow
                  key={product.ID}
                  product={product}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <>
        <InventoryPagination
          page={page}
          totalPages={totalPages}
          totalProducts={totalProducts}
          onPageChange={onPageChange}
        />

        {selectedProduct && (
          <ProductDrawer
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        <EditProductModal
          open={!!editingProduct}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />

        <DeleteProductDialog
          open={!!deletingProduct}
          product={deletingProduct}
          onClose={() => setDeletingProduct(null)}
        />
      </>
    </>
  );
}