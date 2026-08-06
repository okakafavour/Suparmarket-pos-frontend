import type { CreateSupplierPayload } from "@/types/suppliers";

interface Props {
  values: CreateSupplierPayload;

  onChange: (
    field: keyof CreateSupplierPayload,
    value: string
  ) => void;

  disabled?: boolean;
}

export default function SupplierForm({
  values,
  onChange,
  disabled = false,
}: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2">

      <input
        placeholder="Supplier Name"
        value={values.name}
        disabled={disabled}
        onChange={(e) =>
          onChange("name", e.target.value)
        }
        className="input"
      />

      <input
        placeholder="Contact Person"
        value={values.contact_person}
        disabled={disabled}
        onChange={(e) =>
          onChange("contact_person", e.target.value)
        }
        className="input"
      />

      <input
        type="email"
        placeholder="Email"
        value={values.email}
        disabled={disabled}
        onChange={(e) =>
          onChange("email", e.target.value)
        }
        className="input"
      />

      <input
        placeholder="Phone"
        value={values.phone}
        disabled={disabled}
        onChange={(e) =>
          onChange("phone", e.target.value)
        }
        className="input"
      />

      <input
        placeholder="City"
        value={values.city}
        disabled={disabled}
        onChange={(e) =>
          onChange("city", e.target.value)
        }
        className="input"
      />

      <input
        placeholder="State"
        value={values.state}
        disabled={disabled}
        onChange={(e) =>
          onChange("state", e.target.value)
        }
        className="input"
      />

      <input
        placeholder="Country"
        value={values.country}
        disabled={disabled}
        onChange={(e) =>
          onChange("country", e.target.value)
        }
        className="input md:col-span-2"
      />

      <textarea
        rows={4}
        placeholder="Address"
        value={values.address}
        disabled={disabled}
        onChange={(e) =>
          onChange("address", e.target.value)
        }
        className="input md:col-span-2"
      />

    </div>
  );
}