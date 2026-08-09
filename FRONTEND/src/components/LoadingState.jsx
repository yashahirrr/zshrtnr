import Card from './ui/Card'

export default function LoadingState({ rows = 4 }) {
  return (
    <div className="space-y-4 animate-fade-in" aria-label="Loading" role="status">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-5">
            <div className="skeleton h-3 w-20 mb-3" />
            <div className="skeleton h-7 w-16" />
          </Card>
        ))}
      </div>
      <Card className="overflow-hidden">
        <div className="p-4 space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="skeleton h-4 flex-1" />
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-4 w-12" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export function Spinner({ className = 'h-5 w-5' }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
