import {
  useEffect,
  useState,
} from "react";

import {
  X,
  Save,
  UserRound,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";

import type { User } from "@/types/user";

import type {
  UpdateProfilePayload,
} from "@/services/user.service";

interface Props {
  user: User;
  saving: boolean;
  onSave: (
    payload: UpdateProfilePayload
  ) => Promise<void>;
  onClose: () => void;
}

export default function ProfileEditForm({
  user,
  saving,
  onSave,
  onClose,
}: Props) {
  const [firstName, setFirstName] =
    useState(user.first_name);

  const [lastName, setLastName] =
    useState(user.last_name);

  const [email, setEmail] =
    useState(user.email);

  const [phone, setPhone] =
    useState(user.phone ?? "");

  const [formError, setFormError] =
    useState("");

  useEffect(() => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    setPhone(user.phone ?? "");
  }, [user]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setFormError("");

    if (!firstName.trim()) {
      setFormError(
        "First name is required."
      );
      return;
    }

    if (!lastName.trim()) {
      setFormError(
        "Last name is required."
      );
      return;
    }

    if (!email.trim()) {
      setFormError(
        "Email address is required."
      );
      return;
    }

    try {
      await onSave({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
    } catch (error) {
      console.error(
        "Failed to save profile:",
        error
      );

      setFormError(
        "Failed to update your profile. Please try again."
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !saving
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-[var(--border)] bg-[color:var(--surface)] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-[color:var(--text)]">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              Update your personal information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[color:var(--text-muted)] transition hover:bg-[color:var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6"
        >
          {formError && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/20 dark:text-red-400">
              {formError}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">

            {/* First Name */}
            <div>
              <label
                htmlFor="profile-first-name"
                className="mb-2 block text-sm font-semibold text-[color:var(--text)]"
              >
                First Name
              </label>

              <div className="relative">
                <UserRound
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
                />

                <input
                  id="profile-first-name"
                  type="text"
                  value={firstName}
                  onChange={(event) =>
                    setFirstName(
                      event.target.value
                    )
                  }
                  disabled={saving}
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[color:var(--background)] pl-11 pr-4 text-sm text-[color:var(--text)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="profile-last-name"
                className="mb-2 block text-sm font-semibold text-[color:var(--text)]"
              >
                Last Name
              </label>

              <div className="relative">
                <UserRound
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
                />

                <input
                  id="profile-last-name"
                  type="text"
                  value={lastName}
                  onChange={(event) =>
                    setLastName(
                      event.target.value
                    )
                  }
                  disabled={saving}
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[color:var(--background)] pl-11 pr-4 text-sm text-[color:var(--text)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label
                htmlFor="profile-email"
                className="mb-2 block text-sm font-semibold text-[color:var(--text)]"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
                />

                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  disabled={saving}
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[color:var(--background)] pl-11 pr-4 text-sm text-[color:var(--text)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="sm:col-span-2">
              <label
                htmlFor="profile-phone"
                className="mb-2 block text-sm font-semibold text-[color:var(--text)]"
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]"
                />

                <input
                  id="profile-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(
                      event.target.value
                    )
                  }
                  disabled={saving}
                  placeholder="08012345678"
                  className="h-12 w-full rounded-xl border border-[var(--border)] bg-[color:var(--background)] pl-11 pr-4 text-sm text-[color:var(--text)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[color:var(--text)] transition hover:bg-[color:var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />

                  Save Changes
                </>
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}