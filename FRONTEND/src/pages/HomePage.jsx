import { createElement } from 'react'
import { Zap, ArrowRight, BarChart3, Shield, Sparkles } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import UrlShortener from '../components/UrlShortener'

const features = [
  {
    icon: Zap,
    title: 'Instant shortening',
    description: 'Paste any URL and get a short link in under a second.',
  },
  {
    icon: BarChart3,
    title: 'Click tracking',
    description: 'Monitor how your links perform with real-time click counts.',
  },
  {
    icon: Shield,
    title: 'Secure & reliable',
    description: 'Your links are always available when you need them.',
  },
]

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
        {createElement(icon, { className: 'h-5 w-5', 'aria-hidden': true })}
      </div>
      <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </div>
  )
}

const HomePage = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative gradient-hero">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <Badge variant="primary" className="mb-6 px-3 py-1">
              <Sparkles className="h-3 w-3" />
              Fast. Simple. Powerful.
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Turn long URLs into{' '}
              <span className="text-primary">short, shareable links</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              Create short, memorable links in seconds and track how they perform.
            </p>
          </div>

          {/* URL Shortener — primary focus */}
          <div className="animate-slide-up">
            <UrlShortener />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Everything you need to share smarter
            </h2>
            <p className="text-muted max-w-lg mx-auto">
              A focused tool that does one thing exceptionally well.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/auth">
              <Button variant="secondary" size="lg">
                Create a free account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-xs text-muted mt-3">
              Sign up to save links, use custom slugs, and access your dashboard.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
