import { useStatusData } from '@/hooks/useStatusData'
import { GatewayCard } from '@/components/GatewayCard'
import { NodesCard } from '@/components/NodesCard'
import { SubagentsCard } from '@/components/SubagentsCard'
import { ActivityCard } from '@/components/ActivityCard'
import { PermanentAgents } from '@/components/PermanentAgents'
import { Shell, Loader2, AlertCircle } from 'lucide-react'

function App() {
  const { data, loading, error, lastUpdated, refetch } = useStatusData()

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-clawdi-bg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-clawdi-primary animate-spin mx-auto mb-4" />
          <p className="text-clawdi-muted">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-clawdi-bg flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-clawdi-error mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-clawdi-text mb-2">Failed to load data</h2>
          <p className="text-clawdi-muted mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-clawdi-primary text-white rounded-lg hover:bg-clawdi-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-clawdi-bg">
      {/* Header */}
      <header className="border-b border-clawdi-border bg-clawdi-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-clawdi-primary to-purple-500 rounded-xl">
                <Shell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-clawdi-text">Clawdi Status</h1>
                <p className="text-sm text-clawdi-muted">OpenClaw System Dashboard</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-clawdi-muted">Dashboard v{data.systemInfo.dashboardVersion}</p>
              <p className="text-xs text-clawdi-muted">Auto-refresh: 30s</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Core Permanent Agents - Featured Section */}
        <div className="mb-6">
          <PermanentAgents agents={data.permanentAgents} />
        </div>

        {/* System Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GatewayCard 
            gateway={data.gateway} 
            lastUpdated={lastUpdated}
            onRefresh={refetch}
          />
          <NodesCard nodes={data.nodes} />
          <SubagentsCard subagents={data.subagents} />
          <ActivityCard activities={data.recentActivity} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-clawdi-border mt-12">
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
