export default function StatsCard({ label, value, icon: Icon, trend }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow duration-200 hover:shadow-md animate-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted font-medium">{label}</p>
          <p className="text-2xl font-bold tracking-tight text-foreground mt-1">{value}</p>
          {trend && (
            <p className="text-xs text-muted mt-1">{trend}</p>
          )}
        </div>
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  )
}
