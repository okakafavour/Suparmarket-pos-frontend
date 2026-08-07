export default function LoadingReports() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl bg-[color:var(--surface-hover)]"
          />
        ))}
      </div>

      <div className="h-24 animate-pulse rounded-3xl bg-[color:var(--surface-hover)]" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-80 animate-pulse rounded-3xl bg-[color:var(--surface-hover)]" />
        <div className="h-80 animate-pulse rounded-3xl bg-[color:var(--surface-hover)]" />
      </div>
    </div>
  );
}