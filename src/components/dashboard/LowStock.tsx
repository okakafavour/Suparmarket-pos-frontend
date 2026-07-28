import { AlertTriangle } from "lucide-react";

const products = [
  {
    name: "Coca Cola 50cl",
    stock: 4,
  },
  {
    name: "Peak Milk",
    stock: 2,
  },
  {
    name: "Golden Penny Spaghetti",
    stock: 5,
  },
  {
    name: "Bournvita",
    stock: 3,
  },
];

export default function LowStock() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <AlertTriangle className="text-orange-500" />

        <h2 className="text-xl font-bold">
          Low Stock
        </h2>

      </div>

      <div className="space-y-4">

        {products.map((item) => (

          <div
            key={item.name}
            className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
          >

            <div>

              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p className="text-sm text-slate-500">
                Remaining Stock
              </p>

            </div>

            <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
              {item.stock} Left
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}