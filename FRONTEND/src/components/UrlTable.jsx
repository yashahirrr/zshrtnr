import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Copy, ExternalLink, MoreHorizontal, Check, MousePointerClick,
  Trash2, Search, BarChart2, X, Calendar, Link as LinkIcon
} from 'lucide-react'
import { getAllUserUrls, deleteUserUrl } from '../api/user.api'
import { getShortUrl } from '../constants/config'
import Card, { CardContent } from './ui/Card'
import Badge from './ui/Badge'
import Button from './ui/Button'
import Input from './ui/Input'
import EmptyState from './EmptyState'
import LoadingState from './LoadingState'

function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function AnalyticsModal({ url, onClose }) {
  if (!url) return null
  const shortLink = getShortUrl(url.short_url)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl animate-scale-in">
        <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BarChart2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Link Analytics</h3>
              <p className="text-xs text-muted">Real-time stats for your short URL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-accent/30 p-4 text-center">
              <p className="text-xs font-medium text-muted mb-1">Total Clicks</p>
              <div className="flex items-center justify-center gap-1.5 text-2xl font-bold text-primary">
                <MousePointerClick className="h-5 w-5" />
                {url.clicks ?? 0}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-accent/30 p-4 text-center">
              <p className="text-xs font-medium text-muted mb-1">Created Date</p>
              <div className="flex items-center justify-center gap-1.5 text-base font-semibold text-foreground mt-1">
                <Calendar className="h-4 w-4 text-muted" />
                {formatDate(url.createdAt)}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-accent/30 p-4 space-y-3">
            <div>
              <p className="text-xs font-medium text-muted mb-1">Shortened URL</p>
              <a
                href={shortLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline flex items-center gap-1.5 break-all"
              >
                <LinkIcon className="h-3.5 w-3.5 shrink-0" />
                {shortLink}
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            </div>

            <div className="pt-2 border-t border-border/50">
              <p className="text-xs font-medium text-muted mb-1">Target URL</p>
              <p className="text-xs text-foreground break-all" title={url.full_url}>
                {url.full_url}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

function ActionMenu({ url, onCopy, copied, onDelete, onAnalytics }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const shortLink = getShortUrl(url.short_url)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        aria-label="Actions"
        aria-expanded={open}
        className="h-8 w-8"
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-20 w-48 rounded-lg border border-border bg-card shadow-lg py-1 animate-scale-in origin-top-right">
          <button
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
            onClick={() => { onCopy(shortLink, url._id); setOpen(false) }}
          >
            {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy link'}
          </button>

          <button
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
            onClick={() => { onAnalytics(url); setOpen(false) }}
          >
            <BarChart2 className="h-4 w-4" />
            View analytics
          </button>

          <a
            href={shortLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
            onClick={() => setOpen(false)}
          >
            <ExternalLink className="h-4 w-4" />
            Open link
          </a>

          <div className="my-1 border-t border-border" />

          <button
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
            onClick={() => { onDelete(url._id); setOpen(false) }}
          >
            <Trash2 className="h-4 w-4" />
            Delete link
          </button>
        </div>
      )}
    </div>
  )
}

export default function UrlTable() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [copiedId, setCopiedId] = useState(null)
  const [analyticsUrl, setAnalyticsUrl] = useState(null)
  const [deleteError, setDeleteError] = useState(null)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUserUrl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
      setDeleteError(null)
    },
    onError: (err) => {
      setDeleteError(err.message || 'Failed to delete URL')
    },
  })

  const handleCopy = (link, id) => {
    navigator.clipboard.writeText(link)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this shortened URL?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) return <LoadingState />

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
        Unable to load your links: {error?.message || 'Server connection error.'}
      </div>
    )
  }

  const urls = data?.urls ?? []

  if (urls.length === 0) {
    return (
      <EmptyState
        title="No shortened links yet"
        description="Create your first short link above and start sharing."
      />
    )
  }

  const filteredUrls = urls.filter((u) => {
    const q = search.toLowerCase().trim()
    if (!q) return true
    return u.short_url.toLowerCase().includes(q) || u.full_url.toLowerCase().includes(q)
  })

  const sorted = [...filteredUrls].reverse()

  return (
    <Card className="overflow-hidden animate-fade-in">
      <AnalyticsModal url={analyticsUrl} onClose={() => setAnalyticsUrl(null)} />

      {/* Header & Search */}
      <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Your Links</h2>
          <p className="text-sm text-muted">{urls.length} link{urls.length !== 1 ? 's' : ''} total</p>
        </div>

        <div className="w-full sm:w-64">
          <Input
            icon={Search}
            placeholder="Search links..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 text-xs"
            aria-label="Filter links"
          />
        </div>
      </div>

      {deleteError && (
        <div className="mx-5 mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-xs text-destructive flex items-center justify-between" role="alert">
          <span>{deleteError}</span>
          <button onClick={() => setDeleteError(null)} className="font-semibold text-xs hover:underline">Dismiss</button>
        </div>
      )}

      {/* Mobile Card View */}
      <div className="block sm:hidden divide-y divide-border">
        {sorted.length === 0 ? (
          <p className="text-sm text-muted text-center py-6">No links match your search.</p>
        ) : (
          sorted.map((url) => {
            const shortLink = getShortUrl(url.short_url)
            const isCopied = copiedId === url._id
            return (
              <div key={url._id} className="p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary hover:underline truncate"
                  >
                    {url.short_url}
                  </a>
                  <Badge variant="primary">
                    <MousePointerClick className="h-3 w-3" />
                    {url.clicks ?? 0}
                  </Badge>
                </div>
                <p className="text-xs text-muted truncate" title={url.full_url}>
                  {url.full_url}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted">{formatDate(url.createdAt)}</span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(shortLink, url._id)}
                    >
                      {isCopied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                      <span className="text-xs">{isCopied ? 'Copied' : 'Copy'}</span>
                    </Button>
                    <ActionMenu
                      url={url}
                      onCopy={handleCopy}
                      copied={isCopied}
                      onDelete={handleDelete}
                      onAnalytics={setAnalyticsUrl}
                    />
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full min-w-[540px]">
          <thead>
            <tr className="border-b border-border bg-accent/30">
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden md:table-cell">
                Original URL
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Short URL
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Clicks
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden lg:table-cell">
                Created
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden lg:table-cell">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-sm text-muted">
                  No links match your search.
                </td>
              </tr>
            ) : (
              sorted.map((url) => {
                const shortLink = getShortUrl(url.short_url)
                const isCopied = copiedId === url._id
                return (
                  <tr key={url._id} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <p className="text-sm text-foreground truncate max-w-[240px]" title={url.full_url}>
                        {url.full_url}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <a
                        href={shortLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline truncate block max-w-[180px]"
                      >
                        {url.short_url}
                      </a>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant="primary">
                        <MousePointerClick className="h-3 w-3" />
                        {url.clicks ?? 0}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-sm text-muted">{formatDate(url.createdAt)}</span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <Badge variant="success">Active</Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopy(shortLink, url._id)}
                          aria-label="Copy link"
                        >
                          {isCopied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                        </Button>
                        <ActionMenu
                          url={url}
                          onCopy={handleCopy}
                          copied={isCopied}
                          onDelete={handleDelete}
                          onAnalytics={setAnalyticsUrl}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
