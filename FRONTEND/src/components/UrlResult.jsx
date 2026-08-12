import { useState } from 'react'
import { Check, Copy, ExternalLink, AlertCircle } from 'lucide-react'
import Card, { CardContent } from './ui/Card.jsx'
import Button from './ui/Button.jsx'

export default function UrlResult({ shortUrl, originalUrl }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard may be unavailable */
    }
  }

  return (
    <Card className="gradient-border animate-scale-in overflow-hidden">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
            <Check className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Your shortened URL</p>
            <p className="text-xs text-muted">Ready to share</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2 rounded-lg border border-border bg-accent/50 px-4 py-3 min-w-0">
            <span className="text-sm font-medium text-primary truncate">{shortUrl}</span>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              onClick={handleCopy}
              variant={copied ? 'primary' : 'secondary'}
              className={copied ? 'bg-success hover:bg-success text-white' : ''}
              aria-label={copied ? 'Copied to clipboard' : 'Copy shortened URL'}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open shortened URL"
              onClick={() => window.open(shortUrl, '_blank', 'noopener,noreferrer')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {originalUrl && (
          <div className="rounded-lg bg-accent/50 border border-border px-4 py-3">
            <p className="text-xs font-medium text-muted mb-1">Original URL</p>
            <p className="text-sm text-foreground truncate" title={originalUrl}>
              {originalUrl}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function UrlError({ message }) {
  return (
    <div
      className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 animate-slide-up"
      role="alert"
    >
      <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="text-sm font-medium text-destructive">We couldn't shorten this URL.</p>
        <p className="text-sm text-muted mt-0.5">{message || 'Please check the URL and try again.'}</p>
      </div>
    </div>
  )
}
