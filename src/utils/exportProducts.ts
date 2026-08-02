import type { Product } from "@/types/product";

export function exportProducts(products: Product[]) {
  if (!products.length) return;

  const headers = [
    "Name",
    "SKU",
    "Barcode",
    "Category",
    "Supplier",
    "Cost Price",
    "Selling Price",
    "Quantity",
    "Minimum Stock",
    "Status",
  ];

  const rows = products.map((product) => [
    product.Name,
    product.SKU,
    product.Barcode ?? "",
    product.Category?.name ?? "",
    product.Supplier?.Name ?? "",
    product.CostPrice,
    product.SellingPrice,
    product.Quantity,
    product.MinimumStock,
    product.IsActive ? "Active" : "Inactive",
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((item) => `"${item}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `products-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}