export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`
        rounded-xl border border-border bg-card text-card-foreground shadow-sm
        ${hover ? 'transition-shadow duration-200 hover:shadow-md' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return <div className={`px-6 pt-6 ${className}`}>{children}</div>
}

export function CardContent({ children, className = '' }) {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-semibold tracking-tight ${className}`}>{children}</h3>
}
