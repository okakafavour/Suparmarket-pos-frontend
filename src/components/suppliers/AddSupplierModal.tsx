import { useEffect, useState } from "react";
import {
X,
Truck,
Loader2,
} from "lucide-react";

import { useCreateSupplier } from "@/queries/useSupplier";

import SupplierForm from "./SupplierForm";

import type {
CreateSupplierPayload,
} from "@/types/suppliers";

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
const createSupplier =
useCreateSupplier();

const [form, setForm] =
useState<CreateSupplierPayload>(
initialForm
);

// =====================================
// FORM CHANGE HANDLER
// =====================================

function handleChange(
field: keyof CreateSupplierPayload,
value: string
) {
setForm((prev) => ({
...prev,
[field]: value,
}));
}

// =====================================
// CLOSE MODAL
// =====================================

function handleClose() {
if (createSupplier.isPending) return;


setForm(initialForm);

onClose();

}

// =====================================
// ESC KEY + BODY SCROLL
// =====================================

useEffect(() => {
function handleKeyDown(
event: KeyboardEvent
) {
if (event.key === "Escape") {
handleClose();
}
}


if (open) {
  document.body.style.overflow =
    "hidden";

  document.addEventListener(
    "keydown",
    handleKeyDown
  );
}

return () => {
  document.body.style.overflow =
    "";

  document.removeEventListener(
    "keydown",
    handleKeyDown
  );
};


}, [open]);

// =====================================
// SUBMIT
// =====================================

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  console.log("SUBMIT CLICKED");
  console.log("SUPPLIER FORM:", form);

  try {
    const result = await createSupplier.mutateAsync(
      form
    );

    console.log(
      "SUPPLIER CREATED SUCCESSFULLY:",
      result
    );

    setForm(initialForm);

    onClose();
  } catch (err) {
    console.error(
      "CREATE SUPPLIER ERROR:",
      err
    );
  }
}

// =====================================
// DON'T RENDER WHEN CLOSED
// =====================================

if (!open) return null;

return (
<>
{/* =================================
OVERLAY
================================= */}

```
  <div
    onClick={handleClose}
    className="
      fixed
      inset-0
      z-50
      bg-black/50
      backdrop-blur-sm
    "
  />

  {/* =================================
      MODAL
  ================================= */}

  <div
    className="
      fixed
      left-1/2
      top-1/2
      z-[60]
      w-[calc(100%-2rem)]
      max-w-4xl
      -translate-x-1/2
      -translate-y-1/2
      overflow-hidden
      rounded-[34px]
      border
      border-[color:var(--border)]
      bg-[color:var(--surface)]
      shadow-2xl
    "
  >

    {/* =================================
        HEADER
    ================================= */}

    <div
      className="
        flex
        items-center
        justify-between
        border-b
        border-[color:var(--border)]
        px-6
        py-5
        sm:px-8
        sm:py-6
      "
    >

      <div className="flex items-center gap-4 sm:gap-5">

        {/* Icon */}

        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-blue-600
            to-indigo-600
            text-white
            shadow-lg
            shadow-blue-500/20
            sm:h-16
            sm:w-16
            sm:rounded-3xl
          "
        >
          <Truck size={28} />
        </div>

        {/* Title */}

        <div>

          <h2
            className="
              text-xl
              font-bold
              text-[color:var(--text)]
              sm:text-3xl
            "
          >
            Add Supplier
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-[color:var(--text-muted)]
            "
          >
            Add a new supplier to your
            supermarket.
          </p>

        </div>

      </div>

      {/* Close Button */}

      <button
        type="button"
        onClick={handleClose}
        disabled={
          createSupplier.isPending
        }
        className="
          rounded-2xl
          p-3
          transition
          hover:bg-[color:var(--surface-hover)]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <X size={22} />
      </button>

    </div>

    {/* =================================
        FORM
    ================================= */}

    <form
      onSubmit={handleSubmit}
    >

      {/* =================================
          SCROLLABLE CONTENT
      ================================= */}

      <div
        className="
          max-h-[65vh]
          overflow-y-auto
          p-6
          sm:p-8
        "
      >

        {/* Form Header */}

        <div className="mb-8">

          <h3
            className="
              text-lg
              font-bold
              text-[color:var(--text)]
            "
          >
            Supplier Information
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-[color:var(--text-muted)]
            "
          >
            Enter the supplier's contact
            and location details.
          </p>

        </div>

        {/* =================================
            SUPPLIER FORM
        ================================= */}

        <SupplierForm
          values={form}
          onChange={handleChange}
          disabled={
            createSupplier.isPending
          }
        />

      </div>

      {/* =================================
          FOOTER
      ================================= */}

      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-[color:var(--border)]
          px-6
          py-5
          sm:flex-row
          sm:items-center
          sm:justify-end
          sm:px-8
          sm:py-6
        "
      >

        {/* Cancel */}

        <button
          type="button"
          onClick={handleClose}
          disabled={
            createSupplier.isPending
          }
          className="
            h-12
            rounded-2xl
            border
            border-[color:var(--border)]
            px-6
            font-semibold
            text-[color:var(--text)]
            transition
            hover:bg-[color:var(--surface-hover)]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Cancel
        </button>

        {/* Submit */}

        <button
          type="submit"
          disabled={
            createSupplier.isPending
          }
          className="
            flex
            h-12
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-blue-600
            px-7
            font-semibold
            text-white
            shadow-lg
            shadow-blue-600/20
            transition
            hover:bg-blue-700
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >

          {createSupplier.isPending && (

            <Loader2
              size={18}
              className="
                animate-spin
              "
            />

          )}

          {createSupplier.isPending
            ? "Saving Supplier..."
            : "Add Supplier"}

        </button>

      </div>

    </form>

  </div>
</>
);
}
