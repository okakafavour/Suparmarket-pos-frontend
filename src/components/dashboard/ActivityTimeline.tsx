import {
  ShoppingCart,
  Package,
  Truck,
} from "lucide-react";

const activities = [
  {
    title: "Sale Completed",
    subtitle: "Invoice #2458",
    icon: ShoppingCart,
  },
  {
    title: "Inventory Updated",
    subtitle: "25 items added",
    icon: Package,
  },
  {
    title: "Supplier Delivery",
    subtitle: "Fresh Foods Ltd",
    icon: Truck,
  },
];

export default function ActivityTimeline() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Recent Activity
      </h2>

      <div className="space-y-6">

        {activities.map((activity) => {

          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className="flex items-center gap-4"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">

                <Icon className="text-blue-600" />

              </div>

              <div>

                <h4 className="font-semibold">
                  {activity.title}
                </h4>

                <p className="text-sm text-slate-500">
                  {activity.subtitle}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}