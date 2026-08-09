import { useState } from 'react'
import { Link2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { createShortUrl } from '../api/shortUrl.api'
import { queryClient } from '../main'
import Input from './ui/Input'
import Button from './ui/Button'
import UrlResult, { UrlError } from './UrlResult'

function isValidUrl(string) {
  try {
    const url = new URL(string)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export default function UrlShortener({ compact = false }) {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState(null)
  const [error, setError] = useState(null)
  const [validationError, setValidationError] = useState(null)
  const [customSlug, setCustomSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e?.preventDefault()

    if (!url.trim()) {
      setValidationError('Please enter a URL')
      return
    }

    if (!isValidUrl(url.trim())) {
      setValidationError('Please enter a valid URL starting with http:// or https://')
      return
    }

    setValidationError(null)
    setError(null)
    setLoading(true)
    setShortUrl(null)

    try {
      const result = await createShortUrl(url.trim(), customSlug)
      setShortUrl(result)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`w-full ${compact ? 'max-w-2xl' : 'max-w-3xl'} mx-auto`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={`flex flex-col ${compact ? 'sm:flex-row' : 'lg:flex-row'} gap-3`}>
          <div className="flex-1">
            <Input
              icon={Link2}
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setValidationError(null)
              }}
              placeholder="Paste your long URL"
              aria-label="URL to shorten"
              error={validationError}
              className="h-12 text-base"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            loading={loading}
            disabled={loading}
            className={`${compact ? 'sm:w-auto' : 'lg:w-auto'} w-full shrink-0 px-8`}
          >
            {loading ? 'Shortening...' : 'Shorten'}
          </Button>
        </div>

        {isAuthenticated && (
          <Input
            label="Custom slug (optional)"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="my-custom-link"
            hint="Only letters, numbers, and hyphens. Leave blank for auto-generated."
          />
        )}
      </form>

      <div className="mt-4 space-y-4">
        {error && <UrlError message={error} />}
        {shortUrl && (
          <UrlResult
            shortUrl={shortUrl}
            originalUrl={url.trim()}
          />
        )}
      </div>
    </div>
  )
}
