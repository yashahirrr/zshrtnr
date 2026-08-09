import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

export function useUrlStats() {
  const { data, isLoading } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  })

  const urls = data?.urls ?? []
  const totalClicks = urls.reduce((sum, u) => sum + (u.clicks ?? 0), 0)
  const avgClicks = urls.length ? (totalClicks / urls.length).toFixed(1) : '0'

  return {
    totalLinks: urls.length,
    totalClicks,
    activeLinks: urls.length,
    avgClicks,
    isLoading,
  }
}
