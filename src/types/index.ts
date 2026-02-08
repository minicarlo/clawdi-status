export interface GatewayStatus {
  status: 'online' | 'offline' | 'degraded'
  version: string
  uptime: number
  activeSessions: number
  lastRestart: string
  cpuUsage?: number
  memoryUsage?: number
}

export interface Node {
  id: string
  name: string
  type: 'gateway' | 'linux' | 'macos' | 'windows' | 'docker' | 'remote'
  status: 'online' | 'offline' | 'busy'
  lastSeen: string
  capabilities?: string[]
}

export interface Subagent {
  id: string
  name: string
  type: string
  status: 'running' | 'idle' | 'error' | 'starting'
  taskCount: number
  lastActivity: string | null
  description: string
  currentTask?: string
  errorMessage?: string
}

export interface Activity {
  id: string
  subagent: string
  subagentId: string
  description: string
  status: 'completed' | 'failed' | 'in-progress'
  timestamp: string
  duration?: number
  error?: string
}

export interface PermanentAgent {
  id: string
  name: string
  status: 'active' | 'idle' | 'error'
  description: string
  responsibilities: string[]
  lastActivity: string
  uptime: number
  taskCount: number
}

export interface SystemStatus {
  gateway: GatewayStatus
  nodes: Node[]
  permanentAgents: PermanentAgent[]
  subagents: Subagent[]
  recentActivity: Activity[]
  systemInfo: {
    dashboardVersion: string
    generatedAt: string
  }
}
