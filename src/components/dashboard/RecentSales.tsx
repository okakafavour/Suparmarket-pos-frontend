import {
  ShoppingBag,
} from "lucide-react";

const sales = [
  {
    id: "#INV-2401",
    customer: "John Smith",
    amount: "$248",
  },
  {
    id: "#INV-2402",
    customer: "Sarah James",
    amount: "$182",
  },
  {
    id: "#INV-2403",
    customer: "Michael Lee",
    amount: "$94",
  },
  {
    id: "#INV-2404",
    customer: "Grace Wilson",
    amount: "$521",
  },
];

export default function RecentSales() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Recent Sales
      </h2>

      <div className="space-y-5">

        {sales.map((sale)=>(
          <div
            key={sale.id}
            className="flex items-center justify-between rounded-2xl p-3 transition hover:bg-slate-50"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">

                <ShoppingBag className="text-blue-600"/>

              </div>

              <div>

                <p className="font-semibold">
                  {sale.customer}
                </p>

                <p className="text-sm text-slate-500">
                  {sale.id}
                </p>

              </div>

            </div>

            <h3 className="font-bold">
              {sale.amount}
            </h3>

          </div>
        ))}

      </div>

    </div>
  );
}