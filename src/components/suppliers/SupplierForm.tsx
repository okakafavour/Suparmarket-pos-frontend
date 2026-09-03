import {
User,
Mail,
Phone,
MapPin,
Building2,
Globe,
Map,
} from "lucide-react";

import type {
CreateSupplierPayload,
} from "@/types/suppliers";

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

const inputClassName = `     h-12
    w-full
    rounded-2xl
    border
    border-[color:var(--border)]
    bg-[color:var(--background)]
    px-4
    pl-11
    text-sm
    text-[color:var(--text)]
    outline-none
    transition
    placeholder:text-[color:var(--text-muted)]
    focus:border-blue-500
    focus:ring-4
    focus:ring-blue-500/10
    disabled:cursor-not-allowed
    disabled:opacity-60
  `;

return ( <div className="grid gap-6 md:grid-cols-2">


  {/* ================================
      SUPPLIER NAME
  ================================= */}

  <div>

    <label
      htmlFor="supplier-name"
      className="
        mb-2
        block
        text-sm
        font-semibold
        text-[color:var(--text)]
      "
    >
      Supplier Name
    </label>

    <div className="relative">

      <Building2
        size={18}
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[color:var(--text-muted)]
        "
      />

      <input
        id="supplier-name"
        type="text"
        placeholder="Enter supplier name"
        value={values.name}
        disabled={disabled}
        onChange={(e) =>
          onChange(
            "name",
            e.target.value
          )
        }
        className={inputClassName}
      />

    </div>

  </div>

  {/* ================================
      CONTACT PERSON
  ================================= */}

  <div>

    <label
      htmlFor="contact-person"
      className="
        mb-2
        block
        text-sm
        font-semibold
        text-[color:var(--text)]
      "
    >
      Contact Person
    </label>

    <div className="relative">

      <User
        size={18}
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[color:var(--text-muted)]
        "
      />

      <input
        id="contact-person"
        type="text"
        placeholder="Enter contact person's name"
        value={values.contact_person}
        disabled={disabled}
        onChange={(e) =>
          onChange(
            "contact_person",
            e.target.value
          )
        }
        className={inputClassName}
      />

    </div>

  </div>

  {/* ================================
      EMAIL
  ================================= */}

  <div>

    <label
      htmlFor="supplier-email"
      className="
        mb-2
        block
        text-sm
        font-semibold
        text-[color:var(--text)]
      "
    >
      Email Address
    </label>

    <div className="relative">

      <Mail
        size={18}
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[color:var(--text-muted)]
        "
      />

      <input
        id="supplier-email"
        type="email"
        placeholder="supplier@email.com"
        value={values.email}
        disabled={disabled}
        onChange={(e) =>
          onChange(
            "email",
            e.target.value
          )
        }
        className={inputClassName}
      />

    </div>

  </div>

  {/* ================================
      PHONE
  ================================= */}

  <div>

    <label
      htmlFor="supplier-phone"
      className="
        mb-2
        block
        text-sm
        font-semibold
        text-[color:var(--text)]
      "
    >
      Phone Number
    </label>

    <div className="relative">

      <Phone
        size={18}
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[color:var(--text-muted)]
        "
      />

      <input
        id="supplier-phone"
        type="tel"
        placeholder="Enter phone number"
        value={values.phone}
        disabled={disabled}
        onChange={(e) =>
          onChange(
            "phone",
            e.target.value
          )
        }
        className={inputClassName}
      />

    </div>

  </div>

  {/* ================================
      CITY
  ================================= */}

  <div>

    <label
      htmlFor="supplier-city"
      className="
        mb-2
        block
        text-sm
        font-semibold
        text-[color:var(--text)]
      "
    >
      City
    </label>

    <div className="relative">

      <MapPin
        size={18}
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[color:var(--text-muted)]
        "
      />

      <input
        id="supplier-city"
        type="text"
        placeholder="Enter city"
        value={values.city}
        disabled={disabled}
        onChange={(e) =>
          onChange(
            "city",
            e.target.value
          )
        }
        className={inputClassName}
      />

    </div>

  </div>

  {/* ================================
      STATE
  ================================= */}

  <div>

    <label
      htmlFor="supplier-state"
      className="
        mb-2
        block
        text-sm
        font-semibold
        text-[color:var(--text)]
      "
    >
      State / Region
    </label>

    <div className="relative">

      <Map
        size={18}
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[color:var(--text-muted)]
        "
      />

      <input
        id="supplier-state"
        type="text"
        placeholder="Enter state or region"
        value={values.state}
        disabled={disabled}
        onChange={(e) =>
          onChange(
            "state",
            e.target.value
          )
        }
        className={inputClassName}
      />

    </div>

  </div>

  {/* ================================
      COUNTRY
  ================================= */}

  <div className="md:col-span-2">

    <label
      htmlFor="supplier-country"
      className="
        mb-2
        block
        text-sm
        font-semibold
        text-[color:var(--text)]
      "
    >
      Country
    </label>

    <div className="relative">

      <Globe
        size={18}
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[color:var(--text-muted)]
        "
      />

      <input
        id="supplier-country"
        type="text"
        placeholder="Enter country"
        value={values.country}
        disabled={disabled}
        onChange={(e) =>
          onChange(
            "country",
            e.target.value
          )
        }
        className={inputClassName}
      />

    </div>

  </div>

  {/* ================================
      ADDRESS
  ================================= */}

  <div className="md:col-span-2">

    <label
      htmlFor="supplier-address"
      className="
        mb-2
        block
        text-sm
        font-semibold
        text-[color:var(--text)]
      "
    >
      Address
    </label>

    <div className="relative">

      <MapPin
        size={18}
        className="
          pointer-events-none
          absolute
          left-4
          top-4
          text-[color:var(--text-muted)]
        "
      />

      <textarea
        id="supplier-address"
        rows={4}
        placeholder="Enter supplier address"
        value={values.address}
        disabled={disabled}
        onChange={(e) =>
          onChange(
            "address",
            e.target.value
          )
        }
        className="
          w-full
          resize-none
          rounded-2xl
          border
          border-[color:var(--border)]
          bg-[color:var(--background)]
          py-3
          pl-11
          pr-4
          text-sm
          text-[color:var(--text)]
          outline-none
          transition
          placeholder:text-[color:var(--text-muted)]
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/10
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />

    </div>

  </div>

</div>

);
}
