import { Node } from '@/types'
import { Monitor, Wifi, WifiOff, Activity } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface NodesCardProps {
  nodes: Node[]
}

const nodeTypeIcons: Record<Node['type'], typeof Monitor> = {
  gateway: Monitor,
  linux: Monitor,
  macos: Monitor,
  windows: Monitor,
  docker: Activity,
  remote: Wifi
}

const statusColors = {
  online: 'text-emerald-400',
  offline: 'text-red-400',
  busy: 'text-amber-400'
}

export function NodesCard({ nodes }: NodesCardProps) {
  const onlineCount = nodes.filter(n => n.status === 'online').length
  const busyCount = nodes.filter(n => n.status === 'busy').length

  return (
    <div className="bg-clawdi-card rounded-xl border border-clawdi-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-clawdi-info/10 rounded-lg">
            <Wifi className="w-6 h-6 text-clawdi-info" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-clawdi-text">Connected Nodes</h2>
            <p className="text-sm text-clawdi-muted">
              {onlineCount} online • {busyCount} busy
            </p>
          </div>
        </div>
        <span className="text-2xl font-bold text-clawdi-text">{nodes.length}</span>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {nodes.map(node => {
          const Icon = nodeTypeIcons[node.type]
          return (
            <div 
              key={node.id}
              className="flex items-center justify-between p-3 bg-clawdi-bg/50 rounded-lg hover:bg-clawdi-bg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-clawdi-muted" />
                <div>
                  <p className="font-medium text-clawdi-text">{node.name}</p>
                  <p className="text-xs text-clawdi-muted font-mono">{node.id}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`flex items-center gap-1 text-sm font-medium ${statusColors[node.status]}`}>
                  {node.status === 'offline' ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
                  <span className="capitalize">{node.status}</span>
                </div>
                <p className="text-xs text-clawdi-muted">
                  {formatDistanceToNow(new Date(node.lastSeen), { addSuffix: true })}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
