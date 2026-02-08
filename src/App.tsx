import { useStatusData } from '@/hooks/useStatusData'
import { useTheme } from '@/hooks/useTheme.tsx'
import { GatewayCard } from '@/components/GatewayCard'
import { NodesCard } from '@/components/NodesCard'
import { SubagentsCard } from '@/components/SubagentsCard'
import { ActivityCard } from '@/components/ActivityCard'
import { PermanentAgents } from '@/components/PermanentAgents'
import { 
  Shell, 
  Loader2, 
  AlertCircle, 
  Database, 
  Wifi, 
  WifiOff, 
  Sun, 
  Moon,
  RefreshCw
} from 'lucide-react'
import { useState, useCallback } from 'react'

// Individual refresh hook for each section
function useSectionRefresh(globalRefetch: () => void) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const refresh = useCallback(async () => {
    setIsRefreshing(true)
    await globalRefetch()
    // Keep spinner for at least 500ms for visual feedback
    setTimeout(() => setIsRefreshing(false), 500)
  }, [globalRefetch])
  
  return { isRefreshing, refresh }
}

function App() {
  const { data, loading, error, lastUpdated, refetch } = useStatusData()
  const { theme, toggleTheme } = useTheme()
  
  // Individual refresh states for each section
  const { isRefreshing: isRefreshingPermanent, refresh: refreshPermanent } = useSectionRefresh(refetch)
  const { isRefreshing: isRefreshingGateway, refresh: refreshGateway } = useSectionRefresh(refetch)
  const { isRefreshing: isRefreshingNodes, refresh: refreshNodes } = useSectionRefresh(refetch)
  const { isRefreshing: isRefreshingSubagents, refresh: refreshSubagents } = useSectionRefresh(refetch)
  const { isRefreshing: isRefreshingActivity, refresh: refreshActivity } = useSectionRefresh(refetch)

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-clawdi-bg flex items-center justify-center transition-theme">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-clawdi-primary animate-spin mx-auto mb-4" />
          <p className="text-clawdi-muted">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-clawdi-bg flex items-center justify-center transition-theme">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-clawdi-error mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-clawdi-text mb-2">Failed to load data</h2>
          <p className="text-clawdi-muted mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-clawdi-primary text-white rounded-lg hover:bg-clawdi-primary/90 transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  // Determine data freshness indicator
  const isLiveData = data.systemInfo.dataFreshness === 'live'
  const isSampleData = data.systemInfo.dataSource === 'sample-data' || !data.systemInfo.dataSource
  const DataIcon = isLiveData ? Wifi : isSampleData ? Database : WifiOff
  const freshnessColor = isLiveData ? 'text-emerald-400' : isSampleData ? 'text-amber-400' : 'text-red-400'
  const freshnessText = isLiveData ? 'Live Data' : isSampleData ? 'Sample Data' : 'Stale Data'

  return (
    <div className="min-h-screen bg-clawdi-bg transition-theme">
      {/* Header */}
      <header className="border-b border-clawdi-border bg-clawdi-card/50 backdrop-blur sticky top-0 z-50 transition-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-clawdi-primary to-purple-500 rounded-xl shadow-lg">
                <Shell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-clawdi-text">Clawdi Status</h1>
                <p className="text-sm text-clawdi-muted">OpenClaw System Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Data Freshness Indicator */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-clawdi-card border border-clawdi-border rounded-lg">
                <DataIcon className={`w-4 h-4 ${freshnessColor}`} />
                <span className={`text-sm font-medium ${freshnessColor}`}>{freshnessText}</span>
                <span className="text-xs text-clawdi-muted ml-2">v{data.systemInfo.dashboardVersion}</span>
              </div>
              
              {/* Global Refresh Button */}
              <button
                onClick={refetch}
                disabled={loading}
                className="p-2 bg-clawdi-card border border-clawdi-border rounded-lg hover:bg-clawdi-border transition-colors disabled:opacity-50"
                title="Refresh all data"
              >
                <RefreshCw className={`w-5 h-5 text-clawdi-text ${loading ? 'animate-spin' : ''}`} />
              </button>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 bg-clawdi-card border border-clawdi-border rounded-lg hover:bg-clawdi-border transition-colors"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-clawdi-primary" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Core Permanent Agents - Featured Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-clawdi-text">Core Functions</h2>
            <button
              onClick={refreshPermanent}
              disabled={isRefreshingPermanent}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-clawdi-card border border-clawdi-border rounded-lg hover:bg-clawdi-border transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshingPermanent ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
          <PermanentAgents agents={data.permanentAgents} />
        </div>

        {/* System Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-clawdi-text">Gateway</h2>
              <button
                onClick={refreshGateway}
                disabled={isRefreshingGateway}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-clawdi-card border border-clawdi-border rounded-lg hover:bg-clawdi-border transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshingGateway ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            <GatewayCard 
              gateway={data.gateway} 
              lastUpdated={lastUpdated}
              onRefresh={refreshGateway}
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-clawdi-text">Nodes</h2>
              <button
                onClick={refreshNodes}
                disabled={isRefreshingNodes}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-clawdi-card border border-clawdi-border rounded-lg hover:bg-clawdi-border transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshingNodes ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            <NodesCard nodes={data.nodes} />
          </div>
          
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-clawdi-text">Subagents</h2>
              <button
                onClick={refreshSubagents}
                disabled={isRefreshingSubagents}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-clawdi-card border border-clawdi-border rounded-lg hover:bg-clawdi-border transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshingSubagents ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            <SubagentsCard subagents={data.subagents} />
          </div>
          
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-clawdi-text">Activity</h2>
              <button
                onClick={refreshActivity}
                disabled={isRefreshingActivity}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-clawdi-card border border-clawdi-border rounded-lg hover:bg-clawdi-border transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshingActivity ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            <ActivityCard activities={data.recentActivity} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-clawdi-border mt-12 bg-clawdi-card/30 transition-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-clawdi-muted">
            <p>© 2026 Clawdi Status Dashboard</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/minicarlo/clawdi-status" className="hover:text-clawdi-text transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-clawdi-text transition-colors">
                Documentation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
