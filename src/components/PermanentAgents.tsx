import { PermanentAgent } from '@/types'
import { 
  User, 
  Sparkles, 
  Shield, 
  Settings,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import clsx from 'clsx'

interface PermanentAgentsProps {
  agents: PermanentAgent[]
}

const agentIcons: Record<string, typeof User> = {
  butler: User,
  janitor: Sparkles,
  gatekeeper: Shield,
  manager: Settings
}

const agentColors: Record<string, { bg: string; icon: string; border: string; glow: string }> = {
  butler: { 
    bg: 'bg-purple-500/10', 
    icon: 'text-purple-400',
    border: 'border-purple-500/30',
    glow: 'shadow-purple-500/20'
  },
  janitor: { 
    bg: 'bg-emerald-500/10', 
    icon: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20'
  },
  gatekeeper: { 
    bg: 'bg-amber-500/10', 
    icon: 'text-amber-400',
    border: 'border-amber-500/30',
    glow: 'shadow-amber-500/20'
  },
  manager: { 
    bg: 'bg-blue-500/10', 
    icon: 'text-blue-400',
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/20'
  }
}

const statusConfig = {
  active: { icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-400/20', label: 'Active' },
  idle: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/20', label: 'Idle' },
  error: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/20', label: 'Error' }
}

export function PermanentAgents({ agents }: PermanentAgentsProps) {
  const allActive = agents.every(a => a.status === 'active')
  const totalTasks = agents.reduce((sum, a) => sum + a.taskCount, 0)

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
  }

  return (
    <div className="bg-gradient-to-br from-clawdi-card to-clawdi-bg rounded-2xl border-2 border-clawdi-primary/30 p-6 lg:col-span-2 shadow-lg shadow-clawdi-primary/10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-clawdi-border">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={clsx(
              "p-3 rounded-xl bg-gradient-to-br from-clawdi-primary to-purple-600",
              allActive && "animate-pulse"
            )}>
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            {allActive && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-clawdi-card animate-ping" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-clawdi-text">Core Functions (Cron)</h2>
            <p className="text-sm text-clawdi-muted">
              Scheduled maintenance and coordination tasks
            </p>
            <p className="text-xs text-clawdi-muted/70 mt-1">
              {allActive 
                ? `All ${agents.length} cron jobs healthy` 
                : `${agents.filter(a => a.status !== 'active').length} job(s) need attention`
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="text-right">
            <p className="text-clawdi-muted">Total Tasks</p>
            <p className="text-2xl font-bold text-clawdi-text">{totalTasks.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-clawdi-muted">Status</p>
            <div className="flex items-center gap-2">
              <span className={clsx(
                "w-3 h-3 rounded-full",
                allActive ? "bg-emerald-400" : "bg-amber-400"
              )} />
              <span className={clsx(
                "font-medium",
                allActive ? "text-emerald-400" : "text-amber-400"
              )}>
                {allActive ? 'All Active' : 'Check Status'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {agents.map(agent => {
          const Icon = agentIcons[agent.id] || User
          const colors = agentColors[agent.id] || agentColors.manager
          const status = statusConfig[agent.status]
          const StatusIcon = status.icon

          return (
            <div 
              key={agent.id}
              className={clsx(
                "rounded-xl border-2 p-4 transition-all hover:scale-[1.02]",
                colors.bg,
                colors.border,
                "shadow-lg",
                colors.glow,
                agent.status === 'active' && "ring-2 ring-emerald-400/50"
              )}
            >
              {/* Agent Header with Status Badge inline */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={clsx(
                    "p-2 rounded-lg",
                    colors.bg
                  )}>
                    <Icon className={clsx("w-6 h-6", colors.icon)} />
                  </div>
                  <div>
                    <h3 className="font-bold text-clawdi-text text-lg">{agent.name}</h3>
                    <p className="text-xs text-clawdi-muted font-mono">{agent.id}</p>
                  </div>
                </div>
                {/* Status Badge - positioned inline at top right */}
                <div className={clsx(
                  "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 flex-shrink-0 ml-2",
                  status.bg,
                  status.color
                )}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-clawdi-muted mb-4 line-clamp-2">
                {agent.description}
              </p>

              {/* Responsibilities */}
              <div className="space-y-1.5 mb-4">
                <p className="text-xs font-medium text-clawdi-text uppercase tracking-wide">Responsibilities</p>
                <ul className="space-y-1">
                  {agent.responsibilities.slice(0, 3).map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-clawdi-muted">
                      <Play className="w-3 h-3 mt-0.5 flex-shrink-0 text-clawdi-primary" />
                      <span className="line-clamp-1">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-clawdi-border/50">
                <div>
                  <p className="text-xs text-clawdi-muted">Uptime</p>
                  <p className="text-sm font-medium text-clawdi-text">{formatUptime(agent.uptime)}</p>
                </div>
                <div>
                  <p className="text-xs text-clawdi-muted">Tasks</p>
                  <p className="text-sm font-medium text-clawdi-text">{agent.taskCount.toLocaleString()}</p>
                </div>
              </div>

              {/* Last Activity */}
              <p className="text-xs text-clawdi-muted mt-3 pt-2 border-t border-clawdi-border/30">
                Last active {formatDistanceToNow(new Date(agent.lastActivity), { addSuffix: true })}
              </p>
            </div>
          )
        })}
      </div>

      {/* Health Indicator */}
      <div className="mt-6 pt-4 border-t border-clawdi-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="text-clawdi-muted">
            System health: <span className="text-emerald-400 font-medium">Excellent</span>
          </span>
        </div>
        <p className="text-xs text-clawdi-muted">
          These 4 core agents are essential for Clawdi operation
        </p>
      </div>
    </div>
  )
}
