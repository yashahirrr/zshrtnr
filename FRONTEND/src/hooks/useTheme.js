import { useEffect, useState } from 'react'

const STORAGE_KEY = 'url-shortener-theme'

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem(STORAGE_KEY) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme, isDark: theme === 'dark' }
}
