import { useEffect, useState } from "react";
import { Package } from "lucide-react";

import { useProducts } from "@/queries/useProducts";
import type { Product } from "@/types/product";

import ProductCard from "./ProductCard";

import ProductDetailsModal from "@/components/products/ProductDetailsModal";
import EditProductModal from "@/components/inventory/EditProductModal";
import DeleteProductDialog from "@/components/inventory/DeleteProductDialog";
import InventoryPagination from "@/components/inventory/InventoryPagination";
import LoadingInventory from "@/components/inventory/LoadingInventory";
import EmptyInventory from "@/components/inventory/EmptyInventory";

export default function ProductGrid() {
  const [page, setPage] = useState(1);

  const limit = 12;

  const {
    data,
    isLoading,
    isError,
  } = useProducts({
    page,
    limit,
  });

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [deletingProduct, setDeletingProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    if (
      data?.pagination &&
      page > data.pagination.total_pages &&
      data.pagination.total_pages > 0
    ) {
      setPage(data.pagination.total_pages);
    }
  }, [data, page]);

  if (isLoading) {
    return <LoadingInventory />;
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center dark:border-red-800 dark:bg-red-950/20">
        <Package className="mx-auto mb-5 h-12 w-12 text-red-500" />

        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Failed to load products
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Please refresh and try again.
        </p>
      </div>
    );
  }

  const products = data?.products ?? [];
  const totalPages = data?.pagination?.total_pages ?? 1;
  const totalProducts =
    data?.pagination?.total ?? products.length;

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
      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
        "
      >
        {products.map((product) => (
          <ProductCard
            key={product.ID}
            product={product}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <InventoryPagination
        page={page}
        totalPages={totalPages}
        totalProducts={totalProducts}
        onPageChange={setPage}
      />

      {selectedProduct && (
        <ProductDetailsModal
            open={!!selectedProduct}
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onEdit={(product) => {
                setSelectedProduct(null);
                setEditingProduct(product);
            }}
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
  );
}