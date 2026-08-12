import { createElement } from 'react'
import { Link2 } from 'lucide-react'
import Button from './ui/Button.jsx'

export default function EmptyState({
  icon,
  title = 'No shortened links yet',
  description = 'Create your first short link and start sharing.',
  action,
  actionLabel = 'Create Short Link',
}) {
  const IconComponent = icon ?? Link2

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5">
        {createElement(IconComponent, { className: 'h-7 w-7', 'aria-hidden': true })}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action} size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
