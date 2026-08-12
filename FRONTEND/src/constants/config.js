export const SHORT_URL_BASE = import.meta.env.VITE_SHORT_URL_BASE || 'http://localhost:3000'

export const getShortUrl = (slug) => `${SHORT_URL_BASE}/${slug}`

