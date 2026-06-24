export default function Loading() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="h-10 w-60 bg-muted rounded animate-pulse" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-40 bg-card border rounded-xl animate-pulse" />
        <div className="h-40 bg-card border rounded-xl animate-pulse" />
      </div>
    </div>
  )
}
