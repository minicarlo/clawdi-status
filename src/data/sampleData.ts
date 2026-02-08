import { SystemStatus } from '@/types'

// NOTE: This reflects ACTUAL running sessions as of the latest check
// github-agent (Topic 8) and butler-agent-permanent (Topic 3) are the only active subagents

export const sampleData: SystemStatus = {
  gateway: {
    status: 'online',
    version: '1.2.0',
    uptime: 172800,
    activeSessions: 4,
    lastRestart: '2026-02-06T09:00:00Z',
    cpuUsage: 12.5,
    memoryUsage: 45.2
  },
  // Note: These represent cron job functions, not persistent agents
  permanentAgents: [
    {
      id: 'butler',
      name: 'Butler (Cron)',
      status: 'active',
      description: 'Personal assistant functionality via cron jobs and butler-agent-permanent subagent.',
      responsibilities: [
        'Handle user requests via telegram',
        'Monitor API budgets',
        'Process heartbeats',
        'Coordinate with other agents'
      ],
      lastActivity: '2026-02-08T17:10:00Z',
      uptime: 172800,
      taskCount: 42
    },
    {
      id: 'janitor',
      name: 'Janitor (Cron)',
      status: 'active',
      description: 'System maintenance functions scheduled via cron jobs.',
      responsibilities: [
        'Clean up temporary files',
        'Archive old sessions',
        'Monitor disk space',
        'Routine maintenance'
      ],
      lastActivity: '2026-02-08T17:00:00Z',
      uptime: 172800,
      taskCount: 128
    },
    {
      id: 'gatekeeper',
      name: 'Gatekeeper (Cron)',
      status: 'active',
      description: 'Security checks and access control via scheduled cron jobs.',
      responsibilities: [
        'Authenticate sessions',
        'Monitor security logs',
        'Validate API usage',
        'Control access'
      ],
      lastActivity: '2026-02-08T16:45:00Z',
      uptime: 172800,
      taskCount: 256
    },
    {
      id: 'manager',
      name: 'Manager (Cron)',
      status: 'active',
      description: 'System orchestration and agent coordination via cron.',
      responsibilities: [
        'Monitor system health',
        'Manage resources',
        'Restart failed agents',
        'Optimize performance'
      ],
      lastActivity: '2026-02-08T16:30:00Z',
      uptime: 172800,
      taskCount: 512
    }
  ],
  nodes: [
    {
      id: 'gateway-node',
      name: 'OpenClaw Gateway',
      type: 'gateway',
      status: 'online',
      lastSeen: '2026-02-08T17:10:00Z',
      capabilities: ['skills', 'agents', 'cron']
    },
    {
      id: 'host-node',
      name: 'Host Machine',
      type: 'linux',
      status: 'online',
      lastSeen: '2026-02-08T17:10:00Z',
      capabilities: ['docker', 'ssh', 'files', 'browser']
    }
  ],
  // ACTIVELY RUNNING SUBAGENTS
  subagents: [
    {
      id: 'github-agent',
      name: 'GitHub Agent',
      type: 'github',
      status: 'running',
      taskCount: 8,
      lastActivity: '2026-02-08T17:08:00Z',
      description: 'Handles GitHub operations (Topic 8)',
      currentTask: 'Building Clawdi Status dashboard'
    },
    {
      id: 'butler-agent-permanent',
      name: 'Butler Agent (Permanent)',
      type: 'assistant',
      status: 'running',
      taskCount: 156,
      lastActivity: '2026-02-08T17:10:00Z',
      description: 'Handles Telegram messaging and user requests (Topic 3)',
      currentTask: 'Processing telegram messages'
    },
    {
      id: 'hackathon-agent',
      name: 'Hackathon Subagent',
      type: 'hackathon',
      status: 'running',
      taskCount: 42,
      lastActivity: '2026-02-08T17:05:00Z',
      description: 'Manages hackathon projects and team coordination',
      currentTask: 'Processing hackathon dashboard updates'
    },
    {
      id: 'web-search-agent',
      name: 'Web Search Agent',
      type: 'search',
      status: 'idle',
      taskCount: 89,
      lastActivity: '2026-02-08T16:30:00Z',
      description: 'Performs web searches and research tasks'
    },
    {
      id: 'file-agent',
      name: 'File Operations Agent',
      type: 'filesystem',
      status: 'idle',
      taskCount: 234,
      lastActivity: '2026-02-08T16:45:00Z',
      description: 'Manages file operations and cleanup tasks'
    },
    {
      id: 'docker-agent',
      name: 'Docker Agent',
      type: 'container',
      status: 'error',
      taskCount: 12,
      lastActivity: '2026-02-08T15:00:00Z',
      description: 'Manages Docker containers and deployments',
      errorMessage: 'Connection to Docker daemon failed'
    }
  ],
  recentActivity: [
    {
      id: 'act-001',
      subagent: 'GitHub Agent',
      subagentId: 'github-agent',
      description: 'Fixed UI issues: active badge positioning and subagent list',
      status: 'completed',
      timestamp: '2026-02-08T17:37:00Z',
      duration: 2.5
    },
    {
      id: 'act-002',
      subagent: 'Hackathon Subagent',
      subagentId: 'hackathon-agent',
      description: 'Updated hackathon project status dashboard',
      status: 'completed',
      timestamp: '2026-02-08T17:35:00Z',
      duration: 1.2
    },
    {
      id: 'act-003',
      subagent: 'GitHub Agent',
      subagentId: 'github-agent',
      description: 'Added theme toggle and manual refresh buttons',
      status: 'completed',
      timestamp: '2026-02-08T17:15:00Z',
      duration: 5.0
    },
    {
      id: 'act-004',
      subagent: 'Butler Agent (Permanent)',
      subagentId: 'butler-agent-permanent',
      description: 'Processed telegram message about dashboard status',
      status: 'completed',
      timestamp: '2026-02-08T17:10:00Z',
      duration: 0.3
    },
    {
      id: 'act-005',
      subagent: 'File Agent',
      subagentId: 'file-agent',
      description: 'Cleaned up temporary build files',
      status: 'completed',
      timestamp: '2026-02-08T16:45:00Z',
      duration: 1.8
    },
    {
      id: 'act-006',
      subagent: 'Docker Agent',
      subagentId: 'docker-agent',
      description: 'Attempted to restart nginx container',
      status: 'failed',
      timestamp: '2026-02-08T15:00:00Z',
      duration: 5.2,
      error: 'Docker daemon not responding'
    }
  ],
  systemInfo: {
    dashboardVersion: '0.1.0',
    generatedAt: new Date().toISOString(),
    dataSource: 'sample-data',
    dataFreshness: 'static'
  }
}
