const variants = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm focus-visible:ring-primary',
  secondary:
    'bg-accent text-accent-foreground hover:bg-border border border-border focus-visible:ring-muted',
  ghost:
    'text-muted hover:text-foreground hover:bg-accent focus-visible:ring-muted',
  destructive:
    'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive',
}

const sizes = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-sm gap-2',
  icon: 'h-9 w-9 p-0',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-medium rounded-lg
        transition-all duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        focus-visible:ring-offset-background
        disabled:opacity-50 disabled:pointer-events-none
        active:scale-[0.98]
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
