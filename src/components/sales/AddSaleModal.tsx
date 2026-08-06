import { useEffect, useMemo, useState } from "react";
import {
  X,
  Search,
  ShoppingCart,
} from "lucide-react";

import { useProducts } from "@/queries/useProducts";
import { useCreateSale } from "@/queries/useCreateSale";

import type { Product } from "@/types/product";

import type {
  PaymentMethod,
} from "@/types/sales";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface SelectedItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export default function AddSaleModal({
  open,
  onClose,
}: Props) {
  const [customerName, setCustomerName] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cash");

  const [search, setSearch] = useState("");

  const [discount, setDiscount] = useState(0);

  const [tax, setTax] = useState(0);

  const createSaleMutation = useCreateSale();

  const [selectedItems, setSelectedItems] = useState<
    SelectedItem[]
  >([]);

  const { data } = useProducts({
    page: 1,
    limit: 100,
    search,
  });

  const products = data?.products ?? [];

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const subtotal = useMemo(() => {
    return selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [selectedItems]);

  const total = subtotal - discount + tax;

  async function handleCreateSale() {
  if (selectedItems.length === 0) {
    alert("Please add at least one product.");
    return;
  }

  try {
    await createSaleMutation.mutateAsync({
      customer_name: customerName,
      payment_method: paymentMethod,
      discount,
      tax,
      items: selectedItems.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity,
      })),
    });

    onClose();
  } catch (error) {
    console.error(error);
    alert("Failed to create sale.");
  }
}

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}

      <div
        className="
          fixed
          left-1/2
          top-1/2
          z-[60]
          flex
          h-[92vh]
          w-full
          max-w-7xl
          -translate-x-1/2
          -translate-y-1/2
          flex-col
          overflow-hidden
          rounded-[32px]
          border
          border-[color:var(--border)]
          bg-[color:var(--surface)]
          shadow-2xl
        "
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b border-[color:var(--border)] px-8 py-6">

          <div>

            <h2 className="text-2xl font-bold text-[color:var(--text)]">
              Create New Sale
            </h2>

            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              Complete a new customer transaction.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-2xl p-3 transition hover:bg-[color:var(--surface-hover)]"
          >
            <X
              size={22}
              className="text-[color:var(--text)]"
            />
          </button>

        </div>

        {/* Body */}

        <div className="grid flex-1 grid-cols-12 overflow-hidden">
            {/* ===========================
    LEFT PANEL
=========================== */}

<div className="col-span-7 flex flex-col border-r border-[color:var(--border)]">

  {/* Customer */}

  <div className="border-b border-[color:var(--border)] p-6">

    <label className="mb-2 block text-sm font-semibold text-[color:var(--text)]">
      Customer Name
    </label>

    <input
      value={customerName}
      onChange={(e) => setCustomerName(e.target.value)}
      placeholder="Walk-in Customer"
      className="
        w-full
        rounded-2xl
        border
        border-[color:var(--border)]
        bg-[color:var(--background)]
        px-4
        py-3
        outline-none
        transition
        focus:border-emerald-500
      "
    />

  </div>

  {/* Search */}

  <div className="border-b border-[color:var(--border)] p-6">

    <div className="relative">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
      />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="
          w-full
          rounded-2xl
          border
          border-[color:var(--border)]
          bg-[color:var(--background)]
          py-3
          pl-11
          pr-4
          outline-none
          transition
          focus:border-emerald-500
        "
      />

    </div>

  </div>

  {/* Product List */}

  <div className="flex-1 overflow-y-auto p-6">

    <div className="grid gap-4">

      {products.map((product: Product) => (

        <button
          key={product.ID}
          type="button"
          onClick={() => {
            const exists = selectedItems.find(
              (item) => item.productId === product.ID
            );

            if (exists) {
              setSelectedItems((prev) =>
                prev.map((item) =>
                  item.productId === product.ID
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                      }
                    : item
                )
              );

              return;
            }

            setSelectedItems((prev) => [
              ...prev,
              {
                productId: product.ID,
                name: product.Name,
                price: product.SellingPrice,
                quantity: 1,
              },
            ]);
          }}
          className="
            rounded-2xl
            border
            border-[color:var(--border)]
            bg-[color:var(--background)]
            p-5
            text-left
            transition
            hover:border-emerald-500
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-semibold text-[color:var(--text)]">
                {product.Name}
              </h3>

              <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                SKU: {product.SKU}
              </p>

            </div>

            <div className="text-right">

              <h3 className="font-bold text-emerald-600">
                ₦{product.SellingPrice.toLocaleString()}
              </h3>

              <p className="text-sm text-[color:var(--text-muted)]">
                Stock {product.Quantity}
              </p>

            </div>

          </div>

        </button>

      ))}

    </div>

  </div>

</div>
{/* ===========================
    RIGHT PANEL
=========================== */}

<div className="col-span-5 flex flex-col">

  {/* Cart Header */}

  <div className="flex items-center gap-3 border-b border-[color:var(--border)] p-6">

    <ShoppingCart
      size={22}
      className="text-emerald-600"
    />

    <h2 className="text-xl font-bold text-[color:var(--text)]">
      Shopping Cart
    </h2>

  </div>

  {/* Cart Items */}

  <div className="flex-1 overflow-y-auto p-6">

    {selectedItems.length === 0 ? (

      <div className="flex h-full flex-col items-center justify-center">

        <ShoppingCart
          size={64}
          className="text-slate-300"
        />

        <h3 className="mt-6 text-xl font-semibold text-[color:var(--text)]">
          Cart is Empty
        </h3>

        <p className="mt-2 text-center text-[color:var(--text-muted)]">
          Select a product from the left to begin this sale.
        </p>

      </div>

    ) : (

      <div className="space-y-4">

        {selectedItems.map((item) => (

          <div
            key={item.productId}
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-4"
          >

            <div className="flex items-start justify-between">

              <div>

                <h3 className="font-semibold text-[color:var(--text)]">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-emerald-600">
                  ₦{item.price.toLocaleString()}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedItems((prev) =>
                    prev.filter(
                      (x) => x.productId !== item.productId
                    )
                  )
                }
                className="text-red-500"
              >
                <X size={18} />
              </button>

            </div>

            <div className="mt-4 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    setSelectedItems((prev) =>
                      prev
                        .map((x) =>
                          x.productId === item.productId
                            ? {
                                ...x,
                                quantity: Math.max(
                                  1,
                                  x.quantity - 1
                                ),
                              }
                            : x
                        )
                    )
                  }
                  className="h-9 w-9 rounded-xl border"
                >
                  -
                </button>

                <span className="w-8 text-center font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    setSelectedItems((prev) =>
                      prev.map((x) =>
                        x.productId === item.productId
                          ? {
                              ...x,
                              quantity: x.quantity + 1,
                            }
                          : x
                      )
                    )
                  }
                  className="h-9 w-9 rounded-xl border"
                >
                  +
                </button>

              </div>

              <h3 className="font-bold text-emerald-600">
                ₦{(
                  item.quantity * item.price
                ).toLocaleString()}
              </h3>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>

  {/* Summary */}

  <div className="border-t border-[color:var(--border)] p-6 space-y-4">

    <div>

      <label className="mb-2 block text-sm font-medium">
        Payment Method
      </label>

      <select
        value={paymentMethod}
        onChange={(e) =>
          setPaymentMethod(
            e.target.value as PaymentMethod
          )
        }
        className="w-full rounded-2xl border px-4 py-3"
      >
        <option value="cash">Cash</option>
        <option value="card">Card</option>
        <option value="transfer">Transfer</option>
        <option value="mobile_money">
          Mobile Money
        </option>
      </select>

    </div>

    <div>

      <label className="mb-2 block text-sm">
        Discount
      </label>

      <input
        type="number"
        value={discount}
        onChange={(e) =>
          setDiscount(Number(e.target.value))
        }
        className="w-full rounded-2xl border px-4 py-3"
      />

    </div>

    <div>

      <label className="mb-2 block text-sm">
        Tax
      </label>

      <input
        type="number"
        value={tax}
        onChange={(e) =>
          setTax(Number(e.target.value))
        }
        className="w-full rounded-2xl border px-4 py-3"
      />

    </div>

    <div className="space-y-3 border-t pt-4">

      <div className="flex justify-between">

        <span>Subtotal</span>

        <strong>
          ₦{subtotal.toLocaleString()}
        </strong>

      </div>

      <div className="flex justify-between">

        <span>Discount</span>

        <strong>
          - ₦{discount.toLocaleString()}
        </strong>

      </div>

      <div className="flex justify-between">

        <span>Tax</span>

        <strong>
          ₦{tax.toLocaleString()}
        </strong>

      </div>

      <div className="flex justify-between border-t pt-4 text-xl font-bold">

        <span>Total</span>

        <span className="text-emerald-600">
          ₦{total.toLocaleString()}
        </span>

      </div>

    </div>

    <button
        onClick={handleCreateSale}
        disabled={createSaleMutation.isPending}
        className="mt-6 w-full rounded-2xl bg-emerald-600 py-4 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
        {createSaleMutation.isPending
            ? "Processing..."
            : "Complete Sale"
        }
    </button>

  </div>

</div>

</div>

</div>

</>
);
}