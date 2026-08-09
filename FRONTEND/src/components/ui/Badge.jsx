const variants = {
  default: 'bg-accent text-accent-foreground',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  muted: 'bg-accent text-muted border border-border',
}

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full px-2.5 py-0.5
        text-xs font-medium
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  )
}
