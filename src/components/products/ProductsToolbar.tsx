import {
  Search,
  Download,
  Grid2X2,
  List,
  Plus,
} from "lucide-react";
import { useCategories } from "@/queries/useCategories";
interface Props {
  search: string;
  onSearch: (value: string) => void;

  category: string;
  onCategoryChange: (value: string) => void;

  sort: string;
  onSortChange: (value: string) => void;

  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;

  onAddProduct: () => void;

  onExport: () => void;
}
export default function ProductsToolbar({
  search,
  onSearch,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  onAddProduct,
  onExport,
}: Props) {
  const { data: categories = [] } = useCategories();

  return (
    <div className="rounded-[30px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">

      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

        {/* Left */}

        <div className="flex flex-1 flex-wrap gap-3">

          {/* Search */}

          <div className="relative min-w-[280px] flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
            />

            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search products..."
              className="
                h-12
                w-full
                rounded-2xl
                border
                border-[color:var(--border)]
                bg-[color:var(--background)]
                pl-11
                pr-4
                text-[color:var(--text)]
                outline-none
                transition
                focus:border-blue-500
              "
            />

          </div>

          {/* Category */}

         <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="
              h-12
              rounded-2xl
              border
              border-[color:var(--border)]
              bg-[color:var(--background)]
              px-4
            "
          >
            <option value="">All Categories</option>

            {categories.map((item: any) => (
              <option
                key={item.ID}
                value={item.ID}
              >
                {item.name}
              </option>
            ))}
          </select>

          {/* Sort */}

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="
              h-12
              rounded-2xl
              border
              border-[color:var(--border)]
              bg-[color:var(--background)]
              px-4
            "
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
          </select>

        </div>

        {/* Right */}

        <div className="flex flex-wrap items-center gap-3">

          {/* Grid/List */}

          <div className="flex overflow-hidden rounded-2xl border border-[color:var(--border)]">

            <button
              onClick={() => onViewChange("grid")}
              className={`flex h-12 w-12 items-center justify-center transition ${
                view === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-[color:var(--surface)]"
              }`}
            >
              <Grid2X2 size={18} />
            </button>

            <button
              onClick={() => onViewChange("list")}
              className={`flex h-12 w-12 items-center justify-center transition ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-[color:var(--surface)]"
              }`}
            >
              <List size={18} />
            </button>

          </div>

          {/* Export */}

          <button
            onClick={onExport}
            className="
              flex
              h-12
              items-center
              gap-2
              rounded-2xl
              border
              border-[color:var(--border)]
              px-5
              hover:bg-[color:var(--surface-hover)]
            "
          >
            <Download size={18} />
            Export
          </button>

          {/* Add */}

          <button
            onClick={onAddProduct}
            className="
              flex
              h-12
              items-center
              gap-2
              rounded-2xl
              bg-blue-600
              px-5
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
          >
            <Plus size={18} />
            Add Product
          </button>

        </div>

      </div>

    </div>
  );
}