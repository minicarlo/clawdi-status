import { useState, useEffect, useCallback } from 'react'
import { SystemStatus } from '@/types'
import { sampleData } from '@/data/sampleData'

const REFRESH_INTERVAL = 30000 // 30 seconds

export function useStatusData() {
  const [data, setData] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // In production, replace with actual API endpoint
      // const response = await fetch('/api/status')
      // const result = await response.json()
      
      // For demo, use sample data with slight delay to simulate network
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Simulate some dynamic changes
      const dynamicData = {
        ...sampleData,
        systemInfo: {
          ...sampleData.systemInfo,
          generatedAt: new Date().toISOString()
        }
      }
      
      setData(dynamicData)
      setLastUpdated(new Date())
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
