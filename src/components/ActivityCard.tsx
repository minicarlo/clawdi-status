import { useState } from 'react'
import { Activity } from '@/types'
import { 
  ListTodo, 
  CheckCircle2, 
  XCircle, 
  Clock,
  AlertTriangle
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import clsx from 'clsx'

interface ActivityCardProps {
  activities: Activity[]
}

type ActivityFilter = 'all' | 'completed' | 'failed' | 'in-progress'

const statusConfig = {
  completed: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30' },
  failed: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' },
  'in-progress': { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' }
}

export function ActivityCard({ activities }: ActivityCardProps) {
  const [filter, setFilter] = useState<ActivityFilter>('all')

  const stats = {
    total: activities.length,
    completed: activities.filter(a => a.status === 'completed').length,
    failed: activities.filter(a => a.status === 'failed').length,
    inProgress: activities.filter(a => a.status === 'in-progress').length
  }

  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter(a => a.status === filter)

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null
    if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`
    return `${seconds.toFixed(1)}s`
  }

  return (
    <div className="bg-clawdi-card rounded-xl border border-clawdi-border p-6 lg:col-span-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-clawdi-warning/10 rounded-lg">
            <ListTodo className="w-6 h-6 text-clawdi-warning" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-clawdi-text">Recent Activity</h2>
            <p className="text-sm text-clawdi-muted">Last {activities.length} activities</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {([
            { key: 'all', label: 'All', count: stats.total },
            { key: 'completed', label: 'Completed', count: stats.completed },
            { key: 'failed', label: 'Failed', count: stats.failed },
            { key: 'in-progress', label: 'In Progress', count: stats.inProgress }
          ] as const).map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                filter === key
                  ? 'bg-clawdi-primary text-white'
                  : 'bg-clawdi-bg text-clawdi-muted hover:text-clawdi-text'
              )}
            >
              {label}
              <span className="ml-2 text-xs opacity-75">{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredActivities.map(activity => {
          const config = statusConfig[activity.status]
          const StatusIcon = config.icon

          return (
            <div 
              key={activity.id}
              className={clsx(
                'flex items-start gap-4 p-4 rounded-xl border transition-all',
                config.bg,
                config.border,
                'border-l-4'
              )}
            >
              <div className={clsx('mt-0.5', config.color)}>
                <StatusIcon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-clawdi-text">{activity.description}</p>
                  <span className="text-xs text-clawdi-muted whitespace-nowrap">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className="text-clawdi-primary font-medium">
                    {activity.subagent}
                  </span>
                  
                  {activity.duration && (
                    <span className="text-clawdi-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(activity.duration)}
                    </span>
                  )}

                  <span className={clsx(
                    'capitalize',
                    activity.status === 'completed' && 'text-emerald-400',
                    activity.status === 'failed' && 'text-red-400',
                    activity.status === 'in-progress' && 'text-amber-400'
                  )}>
                    {activity.status.replace('-', ' ')}
                  </span>
                </div>

                {activity.error && (
                  <div className="mt-2 flex items-start gap-1 text-xs text-red-400">
                    <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    {activity.error}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <ListTodo className="w-12 h-12 text-clawdi-muted mx-auto mb-3" />
          <p className="text-clawdi-muted">No activities found</p>
        </div>
      )}
    </div>
  )
}
