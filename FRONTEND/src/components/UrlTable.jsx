import { useState, useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Copy, ExternalLink, MoreHorizontal, Check, MousePointerClick,
} from 'lucide-react'
import { getAllUserUrls } from '../api/user.api'
import { getShortUrl } from '../constants/config'
import Card from './ui/Card'
import Badge from './ui/Badge'
import Button from './ui/Button'
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

function ActionMenu({ url, onCopy, copied }) {
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
        <div className="absolute right-0 top-full mt-1 z-20 w-44 rounded-lg border border-border bg-card shadow-lg py-1 animate-scale-in origin-top-right">
          <button
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
            onClick={() => { onCopy(shortLink, url._id); setOpen(false) }}
          >
            {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy link'}
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
        </div>
      )}
    </div>
  )
}

function UrlRow({ url, copiedId, onCopy }) {
  const shortLink = getShortUrl(url.short_url)
  const isCopied = copiedId === url._id

  return (
    <tr className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
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
        <p className="text-xs text-muted truncate max-w-[180px] md:hidden mt-0.5" title={url.full_url}>
          {url.full_url}
        </p>
      </td>
      <td className="px-4 py-3.5 hidden sm:table-cell">
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
            className="h-8 w-8 hidden sm:inline-flex"
            onClick={() => onCopy(shortLink, url._id)}
            aria-label="Copy link"
          >
            {isCopied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
          </Button>
          <ActionMenu url={url} onCopy={onCopy} copied={isCopied} />
        </div>
      </td>
    </tr>
  )
}

export default function UrlTable() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  })

  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (link, id) => {
    navigator.clipboard.writeText(link)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (isLoading) return <LoadingState />

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
        Error loading your URLs: {error.message}
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

  const sorted = [...urls].reverse()

  return (
    <Card className="overflow-hidden animate-fade-in">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Your Links</h2>
          <p className="text-sm text-muted">{urls.length} link{urls.length !== 1 ? 's' : ''} total</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="border-b border-border bg-accent/30">
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden md:table-cell">
                Original URL
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Short URL
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider hidden sm:table-cell">
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
            {sorted.map((url) => (
              <UrlRow key={url._id} url={url} copiedId={copiedId} onCopy={handleCopy} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
