import { Download, RefreshCw, Search } from "lucide-react";

import Button from "@/components/ui/Button";

export default function InventoryToolbar() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select className="h-12 rounded-2xl border border-slate-200 bg-white px-4">
            <option>All Categories</option>
            <option>Beverages</option>
            <option>Bakery</option>
            <option>Dairy</option>
            <option>Frozen</option>
          </select>

          <select className="h-12 rounded-2xl border border-slate-200 bg-white px-4">
            <option>All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>

          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}