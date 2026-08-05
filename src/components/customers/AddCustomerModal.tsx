import { useEffect, useState } from "react";
import { X, UserPlus } from "lucide-react";

import { useCreateCustomer } from "@/queries/useCreateCustomer";

export interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddCustomerModal({
  open,
  onClose,
}: Props) {
  const createCustomer = useCreateCustomer();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createCustomer.mutateAsync({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");

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

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-500/20">

              <UserPlus
                size={28}
                className="text-blue-600"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-[color:var(--text)]">
                Add Customer
              </h2>

              <p className="text-sm text-[color:var(--text-muted)]">
                Register a new customer.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-[color:var(--surface-hover)]"
          >
            <X size={22} />
          </button>

        </div>

        {/* Form */}

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
              type="email"
              value={email}
              onChange={setEmail}
            />

            <Input
              label="Phone Number"
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
                  transition
                  focus:border-blue-500
                "
              />

            </div>

          </div>

          {/* Footer */}

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
                hover:bg-[color:var(--surface-hover)]
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createCustomer.isPending}
              className="
                rounded-2xl
                bg-blue-600
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {createCustomer.isPending
                ? "Creating..."
                : "Create Customer"}
            </button>

          </div>

        </form>

      </div>
    </>
  );
}

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: InputProps) {
  return (
    <div>

      <label className="mb-2 block font-medium text-[color:var(--text)]">
        {label}
      </label>

      <input
        type={type}
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
          transition
          focus:border-blue-500
        "
      />

    </div>
  );
}