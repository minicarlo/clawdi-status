import { SystemStatus } from '@/types'

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
  permanentAgents: [
    {
      id: 'butler',
      name: 'Butler',
      status: 'active',
      description: 'Personal assistant agent that handles day-to-day tasks, scheduling, and user interactions. Always ready to serve.',
      responsibilities: [
        'Handle user requests and commands',
        'Manage scheduling and reminders',
        'Coordinate between other agents',
        'Maintain user context and preferences'
      ],
      lastActivity: '2026-02-08T14:30:00Z',
      uptime: 172800,
      taskCount: 2847
    },
    {
      id: 'janitor',
      name: 'Janitor',
      status: 'active',
      description: 'System maintenance agent that keeps everything clean, organized, and running smoothly.',
      responsibilities: [
        'Clean up temporary files and logs',
        'Monitor disk space and resources',
        'Archive old data and conversations',
        'Perform routine maintenance tasks'
      ],
      lastActivity: '2026-02-08T14:25:00Z',
      uptime: 172800,
      taskCount: 1523
    },
    {
      id: 'gatekeeper',
      name: 'Gatekeeper',
      status: 'active',
      description: 'Security and access control agent that manages permissions, authentication, and system access.',
      responsibilities: [
        'Authenticate users and agents',
        'Manage API keys and credentials',
        'Monitor for security issues',
        'Control access to sensitive operations'
      ],
      lastActivity: '2026-02-08T14:33:00Z',
      uptime: 172800,
      taskCount: 3892
    },
    {
      id: 'manager',
      name: 'Manager',
      status: 'active',
      description: 'Orchestration agent that coordinates all other agents, manages resources, and ensures system health.',
      responsibilities: [
        'Monitor agent health and status',
        'Allocate resources to agents',
        'Restart failed agents',
        'Optimize system performance'
      ],
      lastActivity: '2026-02-08T14:34:00Z',
      uptime: 172800,
      taskCount: 4211
    }
  ],
  nodes: [
    {
      id: 'gateway-node',
      name: 'OpenClaw Gateway',
      type: 'gateway',
      status: 'online',
      lastSeen: '2026-02-08T09:57:00Z',
      capabilities: ['skills', 'agents', 'cron']
    },
    {
      id: 'node-001',
      name: 'Home Server',
      type: 'linux',
      status: 'online',
      lastSeen: '2026-02-08T09:57:00Z',
      capabilities: ['docker', 'ssh', 'files']
    },
    {
      id: 'node-macbook',
      name: 'MacBook Pro',
      type: 'macos',
      status: 'busy',
      lastSeen: '2026-02-08T09:56:00Z',
      capabilities: ['browser', 'desktop']
    }
  ],
  subagents: [
    {
      id: 'github-agent',
      name: 'GitHub Agent',
      type: 'github',
      status: 'idle',
      taskCount: 156,
      lastActivity: '2026-02-08T09:45:00Z',
      description: 'Handles GitHub operations'
    },
    {
      id: 'web-search-agent',
      name: 'Web Search Agent',
      type: 'search',
      status: 'running',
      taskCount: 342,
      lastActivity: '2026-02-08T09:57:00Z',
      description: 'Performs web searches',
      currentTask: 'Searching for "OpenClaw documentation"'
    },
    {
      id: 'file-agent',
      name: 'File Operations Agent',
      type: 'filesystem',
      status: 'idle',
      taskCount: 512,
      lastActivity: '2026-02-08T09:50:00Z',
      description: 'Manages file operations'
    },
    {
      id: 'notification-agent',
      name: 'Notification Agent',
      type: 'messaging',
      status: 'running',
      taskCount: 1024,
      lastActivity: '2026-02-08T09:57:00Z',
      description: 'Sends notifications and alerts',
      currentTask: 'Processing Telegram messages'
    },
    {
      id: 'docker-agent',
      name: 'Docker Agent',
      type: 'container',
      status: 'error',
      taskCount: 89,
      lastActivity: '2026-02-08T08:30:00Z',
      description: 'Manages Docker containers',
      errorMessage: 'Connection to Docker daemon failed'
    },
    {
      id: 'browser-agent',
      name: 'Browser Control Agent',
      type: 'browser',
      status: 'idle',
      taskCount: 234,
      lastActivity: '2026-02-08T09:40:00Z',
      description: 'Controls web browser automation'
    },
    {
      id: 'telegram-agent',
      name: 'Telegram Agent',
      type: 'messaging',
      status: 'running',
      taskCount: 567,
      lastActivity: '2026-02-08T09:57:00Z',
      description: 'Handles Telegram messaging',
      currentTask: 'Monitoring group chats'
    },
    {
      id: 'hackathon-agent',
      name: 'Hackathon Subagent',
      type: 'hackathon',
      status: 'running',
      taskCount: 42,
      lastActivity: '2026-02-08T17:05:00Z',
      description: 'Manages hackathon projects, tracks submissions, and coordinates team collaboration',
      currentTask: 'Processing hackathon dashboard updates'
    }
  ],
  recentActivity: [
    {
      id: 'act-001',
      subagent: 'Web Search Agent',
      subagentId: 'web-search-agent',
      description: 'Searched for "React dashboard best practices"',
      status: 'completed',
      timestamp: '2026-02-08T09:57:00Z',
      duration: 1.8
    },
    {
      id: 'act-002',
      subagent: 'Notification Agent',
      subagentId: 'notification-agent',
      description: 'Sent heartbeat notification to Telegram',
      status: 'completed',
      timestamp: '2026-02-08T09:57:00Z',
      duration: 0.2
    },
    {
      id: 'act-003',
      subagent: 'GitHub Agent',
      subagentId: 'github-agent',
      description: 'Created repository "clawdi-status"',
      status: 'in-progress',
      timestamp: '2026-02-08T09:56:00Z'
    },
    {
      id: 'act-004',
      subagent: 'File Agent',
      subagentId: 'file-agent',
      description: 'Cleaned up temp files in /tmp',
      status: 'completed',
      timestamp: '2026-02-08T09:50:00Z',
      duration: 2.5
    },
    {
      id: 'act-005',
      subagent: 'Docker Agent',
      subagentId: 'docker-agent',
      description: 'Restart container "nginx-proxy"',
      status: 'failed',
      timestamp: '2026-02-08T08:30:00Z',
      duration: 5.2,
      error: 'Container not found'
    },
    {
      id: 'act-006',
      subagent: 'Browser Agent',
      subagentId: 'browser-agent',
      description: 'Navigated to GitHub and took snapshot',
      status: 'completed',
      timestamp: '2026-02-08T09:40:00Z',
      duration: 4.1
    },
    {
      id: 'act-007',
      subagent: 'Hackathon Subagent',
      subagentId: 'hackathon-agent',
      description: 'Updated hackathon project status dashboard',
      status: 'completed',
      timestamp: '2026-02-08T17:05:00Z',
      duration: 1.2
    }
  ],
  systemInfo: {
    dashboardVersion: '0.1.0',
    generatedAt: '2026-02-08T09:57:00Z'
  }
}
