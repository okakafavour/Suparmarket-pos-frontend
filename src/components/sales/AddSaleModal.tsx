import { useEffect, useMemo, useState } from "react";
import {
  X,
  Search,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";

import { useProducts } from "@/queries/useProducts";
import { useCreateSale } from "@/queries/useCreateSale";
import { useCreatePayment } from "@/queries/usePayments";

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
  maxQuantity: number;
}

const supportedCurrencies = [
  {
    code: "NGN",
    name: "Nigerian Naira",
    symbol: "₦",
  },
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
  },
  {
    code: "KES",
    name: "Kenyan Shilling",
    symbol: "KSh",
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
  },
  {
    code: "ZAR",
    name: "South African Rand",
    symbol: "R",
  },
];

function getCurrencySymbol(currencyCode: string) {
  return (
    supportedCurrencies.find(
      (currency) => currency.code === currencyCode
    )?.symbol ?? currencyCode
  );
}

function formatMoney(
  amount: number,
  currencyCode: string
) {
  const symbol = getCurrencySymbol(currencyCode);

  return `${symbol}${amount.toLocaleString(
    undefined,
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  )}`;
}

export default function AddSaleModal({
  open,
  onClose,
}: Props) {
  const [customerName, setCustomerName] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cash");

  const [paymentCurrency, setPaymentCurrency] =
    useState("NGN");

  const [search, setSearch] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const [tax, setTax] =
    useState(0);

  const [selectedItems, setSelectedItems] =
    useState<SelectedItem[]>([]);

  const createSaleMutation =
    useCreateSale();

  const createPaymentMutation =
    useCreatePayment();

  const { data, isLoading } =
    useProducts({
      page: 1,
      limit: 100,
      search,
    });

  const products =
    data?.products ?? [];

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [open]);

  const subtotal = useMemo(() => {
    return selectedItems.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );
  }, [selectedItems]);

  const safeDiscount =
    Math.min(
      Math.max(
        discount || 0,
        0
      ),
      subtotal
    );

  const safeTax =
    Math.max(
      tax || 0,
      0
    );

  const total =
    Math.max(
      subtotal -
        safeDiscount +
        safeTax,
      0
    );

  function resetForm() {
    setCustomerName("");
    setPaymentMethod("cash");
    setPaymentCurrency("NGN");
    setSearch("");
    setDiscount(0);
    setTax(0);
    setSelectedItems([]);
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function addProduct(
    product: Product
  ) {
    if (product.Quantity <= 0) {
      alert(
        "This product is out of stock."
      );

      return;
    }

    setSelectedItems((prev) => {
      const existing =
        prev.find(
          (item) =>
            item.productId ===
            product.id
        );

      if (existing) {
        if (
          existing.quantity >=
          existing.maxQuantity
        ) {
          alert(
            `Only ${existing.maxQuantity} items are available in stock.`
          );

          return prev;
        }

        return prev.map(
          (item) =>
            item.productId ===
            product.id
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    1,
                }
              : item
        );
      }

      return [
        ...prev,
        {
          productId:
            product.id,
          name:
            product.Name,
          price:
            product.SellingPrice,
          quantity: 1,
          maxQuantity:
            product.Quantity,
        },
      ];
    });
  }

  function increaseQuantity(
    productId: string
  ) {
    setSelectedItems(
      (prev) =>
        prev.map((item) => {
          if (
            item.productId !==
            productId
          ) {
            return item;
          }

          if (
            item.quantity >=
            item.maxQuantity
          ) {
            return item;
          }

          return {
            ...item,
            quantity:
              item.quantity +
              1,
          };
        })
    );
  }

  function decreaseQuantity(
    productId: string
  ) {
    setSelectedItems(
      (prev) =>
        prev.map((item) =>
          item.productId ===
          productId
            ? {
                ...item,
                quantity:
                  Math.max(
                    1,
                    item.quantity -
                      1
                  ),
              }
            : item
        )
    );
  }

  function removeItem(
    productId: string
  ) {
    setSelectedItems(
      (prev) =>
        prev.filter(
          (item) =>
            item.productId !==
            productId
        )
    );
  }

  async function handleCreateSale() {
    if (
      selectedItems.length ===
      0
    ) {
      alert(
        "Please add at least one product."
      );

      return;
    }

    if (total <= 0) {
      alert(
        "The sale total must be greater than zero."
      );

      return;
    }

    try {
      /*
       * STEP 1
       * Create the sale.
       *
       * The backend determines
       * the sale/base currency
       * from the store settings.
       */

      const sale =
        await createSaleMutation.mutateAsync(
          {
            customer_name:
              customerName.trim() ||
              "Walk-in Customer",

            payment_method:
              paymentMethod,

            discount:
              safeDiscount,

            tax:
              safeTax,

            items:
              selectedItems.map(
                (item) => ({
                  product_id:
                    item.productId,

                  quantity:
                    item.quantity,
                })
              ),
          }
        );

      /*
       * STEP 2
       * Create payment.
       *
       * The backend calculates
       * the correct payment amount
       * and exchange rate.
       */

      await createPaymentMutation.mutateAsync(
        {
          sale_id:
            sale.id,

          currency:
            paymentCurrency,

          method:
            paymentMethod,
        }
      );

      /*
       * STEP 3
       * Everything succeeded.
       */

      resetForm();

      onClose();

      alert(
        "Sale completed successfully!"
      );
    } catch (error) {
      console.error(
        "SALE/PAYMENT ERROR:",
        error
      );

      alert(
        "Failed to complete sale. Please try again."
      );
    }
  }

  if (!open) {
    return null;
  }

  const isProcessing =
    createSaleMutation.isPending ||
    createPaymentMutation.isPending;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={handleClose}
        className="
          fixed
          inset-0
          z-50
          bg-black/60
          backdrop-blur-sm
        "
      />

      {/* Modal */}

      <div
        className="
          fixed
          left-1/2
          top-1/2
          z-[60]
          flex
          h-[94vh]
          w-[95vw]
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

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-[color:var(--border)]
            px-6
            py-4
            md:px-8
            md:py-5
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-bold
                text-[color:var(--text)]
                md:text-2xl
              "
            >
              Create New Sale
            </h2>

            <p
              className="
                mt-1
                hidden
                text-sm
                text-[color:var(--text-muted)]
                sm:block
              "
            >
              Add products and complete
              a customer transaction.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="
              rounded-2xl
              p-2.5
              transition
              hover:bg-[color:var(--surface-hover)]
            "
          >
            <X
              size={22}
              className="
                text-[color:var(--text)]
              "
            />
          </button>
        </div>

        {/* Body */}

        <div
          className="
            grid
            min-h-0
            flex-1
            grid-cols-12
            overflow-hidden
          "
        >
          {/* LEFT PANEL */}

          <div
            className="
              col-span-7
              flex
              min-h-0
              flex-col
              border-r
              border-[color:var(--border)]
            "
          >
            {/* Customer */}

            <div
              className="
                shrink-0
                border-b
                border-[color:var(--border)]
                p-4
                md:p-5
              "
            >
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[color:var(--text)]
                "
              >
                Customer Name
              </label>

              <input
                value={
                  customerName
                }
                onChange={(e) =>
                  setCustomerName(
                    e.target.value
                  )
                }
                placeholder="Walk-in Customer"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[color:var(--border)]
                  bg-[color:var(--background)]
                  px-4
                  py-2.5
                  text-[color:var(--text)]
                  outline-none
                  transition
                  focus:border-emerald-500
                "
              />
            </div>

            {/* Search */}

            <div
              className="
                shrink-0
                border-b
                border-[color:var(--border)]
                p-4
                md:p-5
              "
            >
              <div
                className="
                  relative
                "
              >
                <Search
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[color:var(--text-muted)]
                  "
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search products..."
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[color:var(--border)]
                    bg-[color:var(--background)]
                    py-2.5
                    pl-11
                    pr-4
                    text-[color:var(--text)]
                    outline-none
                    transition
                    focus:border-emerald-500
                  "
                />
              </div>
            </div>

            {/* Products */}

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                p-4
                md:p-5
              "
            >
              {isLoading ? (
                <div
                  className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-[color:var(--text-muted)]
                  "
                >
                  Loading products...
                </div>
              ) : products.length ===
                0 ? (
                <div
                  className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-[color:var(--text-muted)]
                  "
                >
                  No products found.
                </div>
              ) : (
                <div
                  className="
                    grid
                    gap-3
                  "
                >
                  {products.map(
                    (
                      product: Product
                    ) => {
                      const outOfStock =
                        product.Quantity <=
                        0;

                      return (
                        <button
                          key={
                            product.id
                          }
                          type="button"
                          disabled={
                            outOfStock
                          }
                          onClick={() =>
                            addProduct(
                              product
                            )
                          }
                          className={`
                            rounded-2xl
                            border
                            border-[color:var(--border)]
                            bg-[color:var(--background)]
                            p-4
                            text-left
                            transition
                            ${
                              outOfStock
                                ? "cursor-not-allowed opacity-50"
                                : "hover:border-emerald-500 hover:shadow-md"
                            }
                          `}
                        >
                          <div
                            className="
                              flex
                              items-center
                              justify-between
                              gap-4
                            "
                          >
                            <div
                              className="
                                min-w-0
                              "
                            >
                              <h3
                                className="
                                  truncate
                                  font-semibold
                                  text-[color:var(--text)]
                                "
                              >
                                {
                                  product.Name
                                }
                              </h3>

                              <p
                                className="
                                  mt-1
                                  text-sm
                                  text-[color:var(--text-muted)]
                                "
                              >
                                SKU:{" "}
                                {
                                  product.SKU
                                }
                              </p>
                            </div>

                            <div
                              className="
                                shrink-0
                                text-right
                              "
                            >
                              <h3
                                className="
                                  font-bold
                                  text-emerald-600
                                "
                              >
                                {formatMoney(
                                  product.SellingPrice,
                                  paymentCurrency
                                )}
                              </h3>

                              <p
                                className="
                                  text-sm
                                  text-[color:var(--text-muted)]
                                "
                              >
                                {outOfStock
                                  ? "Out of stock"
                                  : `Stock ${product.Quantity}`}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}

          <div
            className="
              col-span-5
              flex
              min-h-0
              flex-col
            "
          >
            {/* Cart Header */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-3
                border-b
                border-[color:var(--border)]
                p-4
                md:p-5
              "
            >
              <ShoppingCart
                size={21}
                className="
                  text-emerald-600
                "
              />

              <h2
                className="
                  text-lg
                  font-bold
                  text-[color:var(--text)]
                  md:text-xl
                "
              >
                Shopping Cart
              </h2>

              {selectedItems.length >
                0 && (
                <span
                  className="
                    ml-auto
                    rounded-full
                    bg-emerald-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-emerald-600
                  "
                >
                  {selectedItems.reduce(
                    (
                      sum,
                      item
                    ) =>
                      sum +
                      item.quantity,
                    0
                  )}{" "}
                  items
                </span>
              )}
            </div>

            {/* Cart Items */}

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                p-4
                md:p-5
              "
            >
              {selectedItems.length ===
              0 ? (
                <div
                  className="
                    flex
                    h-full
                    flex-col
                    items-center
                    justify-center
                  "
                >
                  <ShoppingCart
                    size={52}
                    className="
                      text-slate-300
                    "
                  />

                  <h3
                    className="
                      mt-4
                      text-lg
                      font-semibold
                      text-[color:var(--text)]
                    "
                  >
                    Cart is Empty
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-xs
                      text-center
                      text-sm
                      text-[color:var(--text-muted)]
                    "
                  >
                    Select a product
                    from the left to
                    begin this sale.
                  </p>
                </div>
              ) : (
                <div
                  className="
                    space-y-3
                  "
                >
                  {selectedItems.map(
                    (item) => (
                      <div
                        key={
                          item.productId
                        }
                        className="
                          rounded-2xl
                          border
                          border-[color:var(--border)]
                          bg-[color:var(--background)]
                          p-3.5
                        "
                      >
                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-3
                          "
                        >
                          <div
                            className="
                              min-w-0
                            "
                          >
                            <h3
                              className="
                                truncate
                                font-semibold
                                text-[color:var(--text)]
                              "
                            >
                              {
                                item.name
                              }
                            </h3>

                            <p
                              className="
                                mt-1
                                text-sm
                                text-emerald-600
                              "
                            >
                              {formatMoney(
                                item.price,
                                paymentCurrency
                              )}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(
                                item.productId
                              )
                            }
                            className="
                              shrink-0
                              rounded-lg
                              p-1
                              text-red-500
                              transition
                              hover:bg-red-50
                            "
                          >
                            <X
                              size={17}
                            />
                          </button>
                        </div>

                        {/* Quantity Controls */}

                        <div
                          className="
                            mt-3
                            flex
                            items-center
                            justify-between
                          "
                        >
                          <div
                            className="
                              flex
                              items-center
                              gap-2.5
                            "
                          >
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.productId
                                )
                              }
                              className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-[color:var(--border)]
                                text-[color:var(--text)]
                                transition
                                hover:bg-[color:var(--surface-hover)]
                              "
                            >
                              <Minus
                                size={
                                  15
                                }
                              />
                            </button>

                            <span
                              className="
                                w-7
                                text-center
                                text-sm
                                font-bold
                                text-[color:var(--text)]
                              "
                            >
                              {
                                item.quantity
                              }
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  item.productId
                                )
                              }
                              disabled={
                                item.quantity >=
                                item.maxQuantity
                              }
                              className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-[color:var(--border)]
                                text-[color:var(--text)]
                                transition
                                hover:bg-[color:var(--surface-hover)]
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                              "
                            >
                              <Plus
                                size={
                                  15
                                }
                              />
                            </button>
                          </div>

                          <h3
                            className="
                              text-sm
                              font-bold
                              text-emerald-600
                            "
                          >
                            {formatMoney(
                              item.quantity *
                                item.price,
                              paymentCurrency
                            )}
                          </h3>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Summary */}

            <div
              className="
                shrink-0
                space-y-3
                border-t
                border-[color:var(--border)]
                bg-[color:var(--surface)]
                p-4
              "
            >
              {/* Payment Method */}

              <div>
                <label
                  className="
                    mb-1.5
                    block
                    text-xs
                    font-medium
                    text-[color:var(--text)]
                  "
                >
                  Payment Method
                </label>

                <select
                  value={
                    paymentMethod
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target
                        .value as PaymentMethod
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[color:var(--border)]
                    bg-[color:var(--background)]
                    px-3
                    py-2.5
                    text-sm
                    text-[color:var(--text)]
                    outline-none
                    focus:border-emerald-500
                  "
                >
                  <option value="cash">
                    Cash
                  </option>

                  <option value="card">
                    Card
                  </option>

                  <option value="transfer">
                    Transfer
                  </option>

                  <option value="mobile_money">
                    Mobile Money
                  </option>
                </select>
              </div>

              {/* Payment Currency */}

              <div>
                <label
                  className="
                    mb-1.5
                    block
                    text-xs
                    font-medium
                    text-[color:var(--text)]
                  "
                >
                  Payment Currency
                </label>

                <select
                  value={
                    paymentCurrency
                  }
                  onChange={(e) =>
                    setPaymentCurrency(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[color:var(--border)]
                    bg-[color:var(--background)]
                    px-3
                    py-2.5
                    text-sm
                    text-[color:var(--text)]
                    outline-none
                    focus:border-emerald-500
                  "
                >
                  {supportedCurrencies.map(
                    (currency) => (
                      <option
                        key={
                          currency.code
                        }
                        value={
                          currency.code
                        }
                      >
                        {
                          currency.code
                        }{" "}
                        —{" "}
                        {
                          currency.name
                        }{" "}
                        (
                        {
                          currency.symbol
                        }
                        )
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Discount and Tax */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                "
              >
                <div>
                  <label
                    className="
                      mb-1.5
                      block
                      text-xs
                      font-medium
                      text-[color:var(--text)]
                    "
                  >
                    Discount
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      discount
                    }
                    onChange={(e) =>
                      setDiscount(
                        Number(
                          e.target
                            .value
                        )
                      )
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[color:var(--border)]
                      bg-[color:var(--background)]
                      px-3
                      py-2.5
                      text-sm
                      text-[color:var(--text)]
                      outline-none
                      focus:border-emerald-500
                    "
                  />
                </div>

                <div>
                  <label
                    className="
                      mb-1.5
                      block
                      text-xs
                      font-medium
                      text-[color:var(--text)]
                    "
                  >
                    Tax
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={tax}
                    onChange={(e) =>
                      setTax(
                        Number(
                          e.target
                            .value
                        )
                      )
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[color:var(--border)]
                      bg-[color:var(--background)]
                      px-3
                      py-2.5
                      text-sm
                      text-[color:var(--text)]
                      outline-none
                      focus:border-emerald-500
                    "
                  />
                </div>
              </div>

              {/* Totals */}

              <div
                className="
                  space-y-2
                  border-t
                  border-[color:var(--border)]
                  pt-3
                "
              >
                <div
                  className="
                    flex
                    justify-between
                    text-sm
                  "
                >
                  <span
                    className="
                      text-[color:var(--text-muted)]
                    "
                  >
                    Subtotal
                  </span>

                  <strong
                    className="
                      text-[color:var(--text)]
                    "
                  >
                    {formatMoney(
                      subtotal,
                      paymentCurrency
                    )}
                  </strong>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    text-sm
                  "
                >
                  <span
                    className="
                      text-[color:var(--text-muted)]
                    "
                  >
                    Discount
                  </span>

                  <strong
                    className="
                      text-red-500
                    "
                  >
                    -{" "}
                    {formatMoney(
                      safeDiscount,
                      paymentCurrency
                    )}
                  </strong>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    text-sm
                  "
                >
                  <span
                    className="
                      text-[color:var(--text-muted)]
                    "
                  >
                    Tax
                  </span>

                  <strong
                    className="
                      text-[color:var(--text)]
                    "
                  >
                    {formatMoney(
                      safeTax,
                      paymentCurrency
                    )}
                  </strong>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    border-t
                    border-[color:var(--border)]
                    pt-3
                    text-lg
                    font-bold
                  "
                >
                  <span
                    className="
                      text-[color:var(--text)]
                    "
                  >
                    Total
                  </span>

                  <span
                    className="
                      text-emerald-600
                    "
                  >
                    {formatMoney(
                      total,
                      paymentCurrency
                    )}
                  </span>
                </div>
              </div>

              {/* Complete Sale Button */}

              <button
                type="button"
                onClick={
                  handleCreateSale
                }
                disabled={
                  isProcessing ||
                  selectedItems.length ===
                    0
                }
                className="
                  mt-2
                  w-full
                  rounded-xl
                  bg-emerald-600
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-emerald-700
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isProcessing
                  ? "Processing..."
                  : "Complete Sale"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}