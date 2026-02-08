import { useState, useEffect, useCallback } from 'react'
import { SystemStatus } from '@/types'
import { sampleData } from '@/data/sampleData'

const REFRESH_INTERVAL = 30000 // 30 seconds

// GitHub raw URL for live status data
// This file gets updated by the collect-status.sh cron job
const LIVE_DATA_URL = 'https://raw.githubusercontent.com/minicarlo/clawdi-status/main/status.json'

// Set to false to use sample data (for development)
// Set to true to fetch live data from GitHub
const USE_LIVE_DATA = true

export function useStatusData() {
  const [data, setData] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      if (USE_LIVE_DATA) {
        try {
          // Fetch live data from GitHub raw URL
          // Add cache-busting timestamp
          const response = await fetch(`${LIVE_DATA_URL}?t=${Date.now()}`, {
            headers: {
              'Accept': 'application/json',
            },
          })
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
          
          const result: SystemStatus = await response.json()
          
          // Validate the data has required fields
          if (!result.gateway || !result.subagents) {
            throw new Error('Invalid data format received')
          }
          
          setData(result)
          setLastUpdated(new Date())
        } catch (liveError) {
          console.warn('Failed to fetch live data, falling back to sample:', liveError)
          // Fall back to sample data on error
          setData({
            ...sampleData,
            systemInfo: {
              ...sampleData.systemInfo,
              generatedAt: new Date().toISOString(),
              dataSource: 'sample-data-fallback',
              dataFreshness: 'static'
            }
          })
          setError('Live data unavailable, showing sample data')
          setLastUpdated(new Date())
        }
      } else {
        // Development mode: use sample data
        await new Promise(resolve => setTimeout(resolve, 500))
        setData({
          ...sampleData,
          systemInfo: {
            ...sampleData.systemInfo,
            generatedAt: new Date().toISOString()
          }
        })
        setLastUpdated(new Date())
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    
    const interval = setInterval(fetchData, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchData])

  return { data, loading, error, lastUpdated, refetch: fetchData }
}

/*
 * SETUP INSTRUCTIONS FOR CARLO:
 * 
 * 1. The dashboard now fetches from:
 *    https://raw.githubusercontent.com/minicarlo/clawdi-status/main/status.json
 * 
 * 2. Run the collector script via cron:
 *    */1 * * * * cd /path/to/clawdi-status && ./scripts/collect-status.sh
 * 
 * 3. The script will:
 *    - Collect current system status
 *    - Write to status.json
 *    - Commit and push to GitHub
 * 
 * 4. Dashboard will auto-refresh every 30s to get latest data
 * 
 * 5. To customize what data is collected, edit:
 *    scripts/collect-status.sh
 * 
 * NOTE: GitHub has caching on raw files, so data may be ~1-2 min stale
 * This is acceptable for a status dashboard
 */
