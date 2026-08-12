import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { label, error, hint, icon: Icon, rightElement, className = '', id, ...props },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full h-11 rounded-lg border border-border bg-card text-foreground
            placeholder:text-muted-foreground
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary
            disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon ? 'pl-10' : 'pl-4'}
            ${rightElement ? 'pr-10' : 'pr-4'}
            ${error ? 'border-destructive focus:ring-destructive/30 focus:border-destructive' : ''}
            ${className}
          `}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-muted">{hint}</p>
      )}
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-destructive" role="alert">{error}</p>
      )}
    </div>
  )
})

export default Input
