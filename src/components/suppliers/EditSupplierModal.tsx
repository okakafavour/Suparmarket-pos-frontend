import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useUpdateSupplier } from "@/queries/useSupplier";

import SupplierForm from "./SupplierForm";

import type {
  Supplier,
  CreateSupplierPayload,
} from "@/types/suppliers";

interface Props {
  open: boolean;
  supplier: Supplier | null;
  onClose: () => void;
}

const initialForm: CreateSupplierPayload = {
  name: "",
  contact_person: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
};

export default function EditSupplierModal({
  open,
  supplier,
  onClose,
}: Props) {
  const updateSupplier = useUpdateSupplier();

  const [form, setForm] =
    useState<CreateSupplierPayload>(initialForm);

  const [isActive, setIsActive] =
    useState(true);

  useEffect(() => {
    if (!supplier) return;

    setForm({
      name: supplier.name,
      contact_person: supplier.contact_person,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      city: supplier.city,
      state: supplier.state,
      country: supplier.country,
    });

    setIsActive(supplier.is_active);
  }, [supplier]);

  if (!open || !supplier) return null;

  function handleChange(
    field: keyof CreateSupplierPayload,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  if (!supplier) return;

  try {
    await updateSupplier.mutateAsync({
      id: supplier.id,
      payload: {
        ...form,
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
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50"
      />

      <div className="fixed left-1/2 top-1/2 z-[60] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-[30px] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-2xl">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Edit Supplier
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-[color:var(--surface-hover)]"
          >
            <X size={20} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <SupplierForm
            values={form}
            onChange={handleChange}
            disabled={updateSupplier.isPending}
          />

          <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] p-4">

            <input
              id="supplier-active"
              type="checkbox"
              checked={isActive}
              onChange={(e) =>
                setIsActive(e.target.checked)
              }
            />

            <label
              htmlFor="supplier-active"
              className="font-medium"
            >
              Supplier is Active
            </label>

          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[color:var(--border)] px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateSupplier.isPending}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {updateSupplier.isPending
                ? "Saving..."
                : "Update Supplier"}
            </button>

          </div>

        </form>

      </div>
    </>
  );
}