import { Link2, MousePointerClick, TrendingUp, Activity } from 'lucide-react'
import UrlShortener from '../components/UrlShortener'
import UrlTable from '../components/UrlTable'
import { useUrlStats } from '../hooks/useUrlStats'
import StatsCard from '../components/StatsCard'
import LoadingState from '../components/LoadingState'

const DashboardPage = () => {
  const stats = useUrlStats()

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted">
          Manage your shortened links and track their performance.
        </p>
      </div>

      {/* Stats */}
      {stats.isLoading ? (
        <LoadingState rows={3} />
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              label="Total Links"
              value={stats.totalLinks.toLocaleString()}
              icon={Link2}
            />
            <StatsCard
              label="Total Clicks"
              value={stats.totalClicks.toLocaleString()}
              icon={MousePointerClick}
            />
            <StatsCard
              label="Active Links"
              value={stats.activeLinks.toLocaleString()}
              icon={Activity}
            />
            <StatsCard
              label="Avg. Clicks"
              value={stats.avgClicks}
              icon={TrendingUp}
              trend="Per link"
            />
          </div>

          {/* Shorten form */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Create a new link</h2>
            <UrlShortener compact />
          </div>

          {/* URL table */}
          <UrlTable />
        </>
      )}
    </div>
  )
}

export default DashboardPage
