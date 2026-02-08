import { SystemStatus } from '@/types'
import { 
  Server, 
  Activity, 
  Cpu,
  Clock,
  Users,
  RefreshCw 
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface GatewayCardProps {
  gateway: SystemStatus['gateway']
  lastUpdated: Date | null
  onRefresh: () => void
}

export function GatewayCard({ gateway, lastUpdated, onRefresh }: GatewayCardProps) {
  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-red-500',
    degraded: 'bg-amber-500'
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    
    if (days > 0) return `${days}d ${hours}h ${mins}m`
    if (hours > 0) return `${hours}h ${mins}m`
    return `${mins}m`
  }

  return (
    <div className="bg-clawdi-card rounded-xl border border-clawdi-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-clawdi-primary/10 rounded-lg">
            <Server className="w-6 h-6 text-clawdi-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-clawdi-text">Gateway Status</h2>
            <p className="text-sm text-clawdi-muted">OpenClaw Gateway</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${statusColors[gateway.status]} animate-pulse`} />
          <span className="text-sm font-medium capitalize">{gateway.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-clawdi-bg/50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-clawdi-muted text-sm mb-1">
            <Clock className="w-4 h-4" />
            <span>Uptime</span>
          </div>
          <p className="text-xl font-semibold text-clawdi-text">{formatUptime(gateway.uptime)}</p>
        </div>
        
        <div className="bg-clawdi-bg/50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-clawdi-muted text-sm mb-1">
            <Users className="w-4 h-4" />
            <span>Sessions</span>
          </div>
          <p className="text-xl font-semibold text-clawdi-text">{gateway.activeSessions}</p>
        </div>

        {gateway.cpuUsage !== undefined && (
          <div className="bg-clawdi-bg/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-clawdi-muted text-sm mb-1">
              <Cpu className="w-4 h-4" />
              <span>CPU</span>
            </div>
            <p className="text-xl font-semibold text-clawdi-text">{gateway.cpuUsage.toFixed(1)}%</p>
          </div>
        )}

        {gateway.memoryUsage !== undefined && (
          <div className="bg-clawdi-bg/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-clawdi-muted text-sm mb-1">
              <Activity className="w-4 h-4" />
              <span>Memory</span>
            </div>
            <p className="text-xl font-semibold text-clawdi-text">{gateway.memoryUsage.toFixed(1)}%</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-clawdi-border">
        <p className="text-sm text-clawdi-muted">
          Version: <span className="text-clawdi-text font-mono">{gateway.version}</span>
        </p>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs text-clawdi-muted">
              Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
            </span>
          )}
          <button
            onClick={onRefresh}
            className="p-2 hover:bg-clawdi-border rounded-lg transition-colors"
            title="Refresh now"
          >
            <RefreshCw className="w-4 h-4 text-clawdi-muted" />
          </button>
        </div>
      </div>
    </div>
  )
}
