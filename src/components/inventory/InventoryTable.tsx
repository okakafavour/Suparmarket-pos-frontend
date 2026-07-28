import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import StockBadge from "./StockBadge";

const products = [
  {
    id: 1,
    image: "🥤",
    name: "Coca Cola 50cl",
    sku: "COL-001",
    category: "Beverages",
    price: "$2.50",
    quantity: 125,
  },
  {
    id: 2,
    image: "🥛",
    name: "Peak Milk",
    sku: "PMK-002",
    category: "Dairy",
    price: "$5.00",
    quantity: 7,
  },
  {
    id: 3,
    image: "🍞",
    name: "Bread",
    sku: "BRD-004",
    category: "Bakery",
    price: "$1.25",
    quantity: 0,
  },
  {
    id: 4,
    image: "🍪",
    name: "Cookies",
    sku: "CK-110",
    category: "Snacks",
    price: "$3.80",
    quantity: 84,
  },
];

export default function InventoryTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr className="text-left">
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Product
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                SKU
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Category
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Price
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Quantity
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-slate-100 transition hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                      {product.image}
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {product.name}
                      </h4>

                      <p className="text-sm text-slate-500">
                        Product Item
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 font-medium">
                  {product.sku}
                </td>

                <td className="px-6 py-4">
                  {product.category}
                </td>

                <td className="px-6 py-4 font-semibold">
                  {product.price}
                </td>

                <td className="px-6 py-4">
                  {product.quantity}
                </td>

                <td className="px-6 py-4">
                  <StockBadge quantity={product.quantity} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button className="rounded-xl p-2 transition hover:bg-blue-100">
                      <Eye size={18} />
                    </button>

                    <button className="rounded-xl p-2 transition hover:bg-amber-100">
                      <Pencil size={18} />
                    </button>

                    <button className="rounded-xl p-2 transition hover:bg-red-100">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}