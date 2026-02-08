# 🦞 Clawdi Status

A modern React dashboard for monitoring OpenClaw subagents, gateway status, and system activity.

![Dashboard Preview](https://via.placeholder.com/800x400/0f172a/3b82f6?text=Clawdi+Status)

## Features

- 🎨 **Modern UI** - Built with React, TypeScript, and Tailwind CSS
- 📊 **Real-time Monitoring** - Gateway status, CPU/memory usage, uptime
- 📡 **Node Management** - View all connected nodes and their capabilities
- 🤖 **Subagent Overview** - Track all subagents with filtering by status
- 📋 **Activity Log** - Recent tasks with completion status and timing
- 🔄 **Auto-refresh** - Data updates every 30 seconds
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🌙 **Dark Theme** - Easy on the eyes

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **date-fns** - Date formatting

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/minicarlo/clawdi-status.git
cd clawdi-status

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Data Source

Currently uses sample data from `src/data/sampleData.ts`. To connect to a real API:

1. Update `src/hooks/useStatusData.ts`:

```typescript
const fetchData = useCallback(async () => {
  const response = await fetch('/api/status')
  const result = await response.json()
  setData(result)
}, [])
```

2. Implement your backend to serve status data matching the types in `src/types/index.ts`

## Deployment

### GitHub Pages

1. Update `vite.config.ts` with your base URL:

```typescript
export default defineConfig({
  base: '/clawdi-status/',
  // ...
})
```

2. Enable GitHub Pages in repository settings
3. Set source to GitHub Actions
4. Push to trigger deployment

### Vercel / Netlify

1. Connect your repository
2. Build command: `npm run build`
3. Output directory: `dist`

## Project Structure

```
src/
├── components/        # React components
│   ├── GatewayCard.tsx
│   ├── NodesCard.tsx
│   ├── SubagentsCard.tsx
│   └── ActivityCard.tsx
├── hooks/            # Custom hooks
│   └── useStatusData.ts
├── types/            # TypeScript types
│   └── index.ts
├── data/             # Sample data
│   └── sampleData.ts
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Customization

### Colors

Edit the Tailwind config in `tailwind.config.js`:

```javascript
colors: {
  clawdi: {
    bg: '#0f172a',
    card: '#1e293b',
    primary: '#3b82f6',
    // ...
  }
}
```

### Refresh Interval

Change in `src/hooks/useStatusData.ts`:

```typescript
const REFRESH_INTERVAL = 30000 // 30 seconds
```

## API Schema

The dashboard expects data in this format:

```typescript
interface SystemStatus {
  gateway: {
    status: 'online' | 'offline' | 'degraded'
    version: string
    uptime: number
    activeSessions: number
    cpuUsage?: number
    memoryUsage?: number
  }
  nodes: Array<{
    id: string
    name: string
    type: 'gateway' | 'linux' | 'macos' | 'windows' | 'docker' | 'remote'
    status: 'online' | 'offline' | 'busy'
    lastSeen: string
    capabilities?: string[]
  }>
  subagents: Array<{
    id: string
    name: string
    type: string
    status: 'running' | 'idle' | 'error' | 'starting'
    taskCount: number
    lastActivity: string | null
    description: string
    currentTask?: string
    errorMessage?: string
  }>
  recentActivity: Array<{
    id: string
    subagent: string
    subagentId: string
    description: string
    status: 'completed' | 'failed' | 'in-progress'
    timestamp: string
    duration?: number
    error?: string
  }>
}
```

## Contributing

Contributions welcome! Please open an issue or pull request.

## License

MIT License - feel free to modify and distribute!

---

Built with ❤️ for the OpenClaw ecosystem
