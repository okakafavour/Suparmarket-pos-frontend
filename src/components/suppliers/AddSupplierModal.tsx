import { useState } from "react";
import { X } from "lucide-react";

import { useCreateSupplier } from "@/queries/useSupplier";

import SupplierForm from "./SupplierForm";

import type { CreateSupplierPayload } from "@/types/suppliers";

interface Props {
  open: boolean;
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

export default function AddSupplierModal({
  open,
  onClose,
}: Props) {
  const createSupplier = useCreateSupplier();

  const [form, setForm] =
    useState<CreateSupplierPayload>(initialForm);

  if (!open) return null;

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

    try {
      await createSupplier.mutateAsync(form);

      setForm(initialForm);

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
            Add Supplier
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
            disabled={createSupplier.isPending}
          />

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
              disabled={createSupplier.isPending}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {createSupplier.isPending
                ? "Saving..."
                : "Save Supplier"}
            </button>

          </div>

        </form>

      </div>
    </>
  );
}