export default function LoadingPayments() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-[color:var(--border)] text-left">
              {[
                "Invoice",
                "Reference",
                "Amount",
                "Method",
                "Status",
                "Date",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[color:var(--border)]">
            {Array.from({ length: 6 }).map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-5">
                  <div className="h-4 w-32 animate-pulse rounded bg-[color:var(--surface-hover)]" />
                  <div className="mt-2 h-3 w-20 animate-pulse rounded bg-[color:var(--surface-hover)]" />
                </td>

                <td className="px-6 py-5">
                  <div className="h-4 w-28 animate-pulse rounded bg-[color:var(--surface-hover)]" />
                </td>

                <td className="px-6 py-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-[color:var(--surface-hover)]" />
                </td>

                <td className="px-6 py-5">
                  <div className="h-7 w-20 animate-pulse rounded-full bg-[color:var(--surface-hover)]" />
                </td>

                <td className="px-6 py-5">
                  <div className="h-7 w-16 animate-pulse rounded-full bg-[color:var(--surface-hover)]" />
                </td>

                <td className="px-6 py-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-[color:var(--surface-hover)]" />
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <div className="h-9 w-14 animate-pulse rounded-xl bg-[color:var(--surface-hover)]" />
                    <div className="h-9 w-16 animate-pulse rounded-xl bg-[color:var(--surface-hover)]" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}