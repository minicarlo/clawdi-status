import { useState, useEffect, useCallback } from 'react'
import { SystemStatus } from '@/types'
import { sampleData } from '@/data/sampleData'

const REFRESH_INTERVAL = 30000 // 30 seconds

// Set this to your real API endpoint when ready
// Option A: Carlo provides a JSON endpoint via cron job
// Option B: Local HTTP server endpoint
// Option C: Static JSON file served via nginx/Apache
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || null

export function useStatusData() {
  const [data, setData] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      if (API_ENDPOINT) {
        // REAL DATA: Fetch from Carlo's endpoint
        // Example: http://your-server:8080/clawdi-status.json
        const response = await fetch(`${API_ENDPOINT}?t=${Date.now()}`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const result: SystemStatus = await response.json()
        
        // Mark as live data
        result.systemInfo = {
          ...result.systemInfo,
          dataSource: 'live-api',
          dataFreshness: 'live'
        }
        
        setData(result)
      } else {
        // SAMPLE DATA: Use static data for demo/development
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const dynamicData: SystemStatus = {
          ...sampleData,
          systemInfo: {
            ...sampleData.systemInfo,
            generatedAt: new Date().toISOString()
          }
        }
        
        setData(dynamicData)
      }
      
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      // Fallback to sample data on error
      setData(sampleData)
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
 * TO WIRE UP REAL DATA (Carlo's setup):
 * 
 * Option A: Cron job dumps JSON to web-accessible location
 * -----------------------------------------------------------------
 * 1. Carlo sets up cron to run: sessions_list > /var/www/clawdi-status.json
 * 2. Serves via nginx/Apache at: http://your-server/clawdi-status.json
 * 3. Set VITE_API_ENDPOINT=http://your-server/clawdi-status.json in .env
 * 
 * Option B: Simple HTTP server
 * -----------------------------------------------------------------
 * 1. Create a simple Express/FastAPI server that returns session status
 * 2. Endpoint: GET /api/status returns SystemStatus JSON
 * 3. Set VITE_API_ENDPOINT=http://localhost:3001/api/status
 * 
 * Option C: Static file + manual update
 * -----------------------------------------------------------------
 * 1. Carlo exports session status periodically to a JSON file
 * 2. Commit/push to repo's public/ folder
 * 3. Fetch from relative path: /clawdi-status.json
 * 
 * The expected JSON format is defined in src/types/index.ts (SystemStatus interface)
 */
