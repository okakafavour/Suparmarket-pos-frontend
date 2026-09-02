import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import DashboardLayout from "@/layouts/DashboardLayout";

import SettingsHeader from "@/components/settings/SettingsHeader";
import StoreSettingsForm from "@/components/settings/StoreSettingsForm";
import ReceiptSettingsForm from "@/components/settings/ReceiptSettingsForm";
import InventorySettingsForm from "@/components/settings/InventorySettingsForm";
import CurrencyManagement from "@/components/settings/CurrencyManagement";

import { updateSettings } from "@/services/settings.service";
import { useSettings } from "@/queries/useSettings";

import type {
  UpdateSettingsPayload,
} from "@/types/settings";

export default function SettingsPage() {
  const {
    data: settings,
    isLoading: loading,
    isError,
    refetch,
  } = useSettings();

  const queryClient = useQueryClient();

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  async function handleSave(
    payload: UpdateSettingsPayload
  ) {
    try {
      setSaving(true);
      setError("");
      setMessage("");

      const updated = await updateSettings(
        payload
      );

      // Update the shared React Query cache
      // immediately after saving.
      queryClient.setQueryData(
        ["settings"],
        updated
      );

      setMessage(
        "Settings updated successfully."
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      console.error(
        "Failed to update settings:",
        err
      );

      setError(
        "Failed to update settings. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * Loading state
   */
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-[color:var(--text-muted)]">
              Loading settings...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /*
   * Error / no settings state
   */
  if (isError || !settings) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 text-center">
            <h2 className="text-xl font-bold">
              Unable to load settings
            </h2>

            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error ||
                "Something went wrong while loading your store settings."}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <SettingsHeader />

        {/* Success message */}
        {message && (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4 dark:border-green-900 dark:bg-green-950/20">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                ✓
              </div>

              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                {message}
              </p>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && !message && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 dark:border-red-900 dark:bg-red-950/20">
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Store Information */}
        <StoreSettingsForm
          settings={settings}
          saving={saving}
          onSave={handleSave}
        />

        {/* Currency Management */}
        <CurrencyManagement />

        {/* Receipt Settings */}
        <ReceiptSettingsForm
          settings={settings}
          saving={saving}
          onSave={handleSave}
        />

        {/* Inventory Settings */}
        <InventorySettingsForm
          settings={settings}
          saving={saving}
          onSave={handleSave}
        />

      </div>
    </DashboardLayout>
  );
}