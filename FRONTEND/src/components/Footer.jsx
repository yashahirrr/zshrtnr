import { Link } from '@tanstack/react-router'
import { Link2, ExternalLink } from 'lucide-react'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Sign In', to: '/auth' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold text-foreground">zShrtnr</span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Create short, memorable links in seconds and track how they perform.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Product</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Connect</h4>
            <a
              href="https://github.com/yashahirrr/zshrtnr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} zShrtnr. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Built with React, Vite &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
