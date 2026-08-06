import type { Product } from "@/types/product";
import type { Supplier } from "@/types/suppliers";
import type { CreatePurchaseItem } from "@/types/purchase";

interface Props {
  suppliers: Supplier[];
  products: Product[];

  supplierId: string;
  setSupplierId: (id: string) => void;

  items: CreatePurchaseItem[];
  setItems: (items: CreatePurchaseItem[]) => void;
}

export default function PurchaseForm({
  suppliers,
  products,
  supplierId,
  setSupplierId,
  items,
  setItems,
}: Props) {
  const updateItem = (
    index: number,
    field: keyof CreatePurchaseItem,
    value: string | number
  ) => {
    const updated = [...items];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        product_id: "",
        quantity: 1,
        unit_cost: 0,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(
      items.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      {/* Supplier */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Supplier
        </label>

        <select
          value={supplierId}
          onChange={(e) =>
            setSupplierId(e.target.value)
          }
          className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-transparent px-4 outline-none"
        >
          <option value="">Select Supplier</option>

          {suppliers.map((supplier) => (
            <option
              key={supplier.id}
              value={supplier.id}
            >
              {supplier.name}
            </option>
          ))}
        </select>
      </div>

      {/* Items */}

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid gap-3 md:grid-cols-4"
          >
            <select
              value={item.product_id}
              onChange={(e) =>
                updateItem(
                  index,
                  "product_id",
                  e.target.value
                )
              }
              className="h-12 rounded-2xl border border-[color:var(--border)] px-3"
            >
              <option value="">
                Select Product
              </option>

              {products.map((product) => (
                <option
                  key={product.ID}
                  value={product.ID}
                >
                  {product.Name}
                </option>
              ))}
            </select>

            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                updateItem(
                  index,
                  "quantity",
                  Number(e.target.value)
                )
              }
              placeholder="Quantity"
              className="h-12 rounded-2xl border border-[color:var(--border)] px-3"
            />

            <input
              type="number"
              min={0}
              value={item.unit_cost}
              onChange={(e) =>
                updateItem(
                  index,
                  "unit_cost",
                  Number(e.target.value)
                )
              }
              placeholder="Unit Cost"
              className="h-12 rounded-2xl border border-[color:var(--border)] px-3"
            />

            <button
              type="button"
              onClick={() =>
                removeItem(index)
              }
              className="rounded-2xl border border-red-300 px-4 text-red-600 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="rounded-xl border border-blue-300 px-5 py-2 text-blue-600 hover:bg-blue-50"
      >
        + Add Item
      </button>
    </div>
  );
}