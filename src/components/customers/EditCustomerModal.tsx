import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useUpdateCustomer } from "@/queries/useUpdateCustomer";

import type { Customer } from "@/types/customers";

interface Props {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
}

export default function EditCustomerModal({
  open,
  customer,
  onClose,
}: Props) {
  const updateCustomer = useUpdateCustomer();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!customer) return;

    setFirstName(customer.first_name);
    setLastName(customer.last_name);
    setEmail(customer.email);
    setPhone(customer.phone);
    setAddress(customer.address);
    setIsActive(customer.is_active);
  }, [customer]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !customer) return null;

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!customer) return;

  try {
    await updateCustomer.mutateAsync({
      id: customer.id,
      payload: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        is_active: isActive,
      },
    });

    onClose();
  } catch (err) {
    console.error(err);
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
          w-full
          max-w-2xl
          -translate-x-1/2
          -translate-y-1/2
          overflow-hidden
          rounded-[30px]
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
              Edit Customer
            </h2>

            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              Update customer information.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-[color:var(--surface-hover)]"
          >
            <X size={22} />
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="space-y-5 p-8">

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="First Name"
                value={firstName}
                onChange={setFirstName}
              />

              <Input
                label="Last Name"
                value={lastName}
                onChange={setLastName}
              />

            </div>

            <Input
              label="Email"
              value={email}
              onChange={setEmail}
            />

            <Input
              label="Phone"
              value={phone}
              onChange={setPhone}
            />

            <div>

              <label className="mb-2 block font-medium">
                Address
              </label>

              <textarea
                rows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[color:var(--border)]
                  bg-[color:var(--background)]
                  px-4
                  py-3
                  outline-none
                  focus:border-blue-500
                "
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Status
              </label>

              <select
                value={isActive ? "true" : "false"}
                onChange={(e) =>
                  setIsActive(e.target.value === "true")
                }
                className="
                  h-12
                  w-full
                  rounded-2xl
                  border
                  border-[color:var(--border)]
                  bg-[color:var(--background)]
                  px-4
                "
              >
                <option value="true">
                  Active
                </option>

                <option value="false">
                  Inactive
                </option>

              </select>

            </div>

          </div>

          <div className="flex justify-end gap-4 border-t border-[color:var(--border)] px-8 py-6">

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-2xl
                border
                border-[color:var(--border)]
                px-6
                py-3
                font-semibold
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateCustomer.isPending}
              className="
                rounded-2xl
                bg-blue-600
                px-6
                py-3
                font-semibold
                text-white
                hover:bg-blue-700
              "
            >
              {updateCustomer.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>
    </>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-2 block font-medium">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-12
          w-full
          rounded-2xl
          border
          border-[color:var(--border)]
          bg-[color:var(--background)]
          px-4
          outline-none
          focus:border-blue-500
        "
      />

    </div>
  );
}