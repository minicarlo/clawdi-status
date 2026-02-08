import { useState } from 'react'
import { Subagent } from '@/types'
import { 
  Bot, 
  Play, 
  Pause, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import clsx from 'clsx'

interface SubagentsCardProps {
  subagents: Subagent[]
}

type FilterStatus = 'all' | 'running' | 'idle' | 'error'

const statusConfig = {
  running: { icon: Play, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30' },
  idle: { icon: Pause, color: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/30' },
  error: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' },
  starting: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' }
}

export function SubagentsCard({ subagents }: SubagentsCardProps) {
  const [filter, setFilter] = useState<FilterStatus>('all')

  const stats = {
    total: subagents.length,
    running: subagents.filter(s => s.status === 'running').length,
    idle: subagents.filter(s => s.status === 'idle').length,
    error: subagents.filter(s => s.status === 'error').length
  }

  const filteredSubagents = filter === 'all' 
    ? subagents 
    : subagents.filter(s => s.status === filter)

  return (
    <div className="bg-clawdi-card rounded-xl border border-clawdi-border p-6 lg:col-span-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-clawdi-success/10 rounded-lg">
            <Bot className="w-6 h-6 text-clawdi-success" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-clawdi-text">Subagents</h2>
            <p className="text-sm text-clawdi-muted">Active agents and their status</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['all', 'running', 'idle', 'error'] as FilterStatus[]).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                filter === status
                  ? 'bg-clawdi-primary text-white'
                  : 'bg-clawdi-bg text-clawdi-muted hover:text-clawdi-text'
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="ml-2 text-xs opacity-75">
                {status === 'all' ? stats.total : stats[status]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubagents.map(subagent => {
          const config = statusConfig[subagent.status]
          const StatusIcon = config.icon

          return (
            <div 
              key={subagent.id}
              className={clsx(
                'p-4 rounded-xl border transition-all hover:scale-[1.02]',
                config.bg,
                config.border,
                'border-l-4'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-clawdi-text">{subagent.name}</h3>
                  <p className="text-xs text-clawdi-muted font-mono">{subagent.id}</p>
                </div>
                <StatusIcon className={clsx('w-5 h-5', config.color)} />
              </div>

              <p className="text-sm text-clawdi-muted mb-3 line-clamp-2">
                {subagent.description}
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-clawdi-muted">Type</span>
                  <span className="text-clawdi-text font-mono">{subagent.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-clawdi-muted">Tasks</span>
                  <span className="text-clawdi-text">{subagent.taskCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-clawdi-muted">Last Activity</span>
                  <span className="text-clawdi-text">
                    {subagent.lastActivity 
                      ? formatDistanceToNow(new Date(subagent.lastActivity), { addSuffix: true })
                      : 'Never'
                    }
                  </span>
                </div>
              </div>

              {subagent.currentTask && (
                <div className="mt-3 pt-3 border-t border-clawdi-border/50">
                  <p className="text-xs text-clawdi-muted flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    {subagent.currentTask}
                  </p>
                </div>
              )}

              {subagent.errorMessage && (
                <div className="mt-3 pt-3 border-t border-red-400/30">
                  <p className="text-xs text-red-400 flex items-start gap-1">
                    <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    {subagent.errorMessage}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredSubagents.length === 0 && (
        <div className="text-center py-12">
          <Bot className="w-12 h-12 text-clawdi-muted mx-auto mb-3" />
          <p className="text-clawdi-muted">No subagents found</p>
        </div>
      )}
    </div>
  )
}
