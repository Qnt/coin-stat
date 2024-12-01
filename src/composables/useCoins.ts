import type { ApiResponse, Coin } from '@/types'
import useFetch from './useFetch'
import { computed } from 'vue'

export function useCoins(url: string) {
  const fetchResult = useFetch<ApiResponse>(url)

  const normalizedData = computed(() => {
    if (!fetchResult.data.value?.data) {
      return null
    }
    return fetchResult.data.value?.data.map((coin) => {
      const normalizedCoin = { ...coin }

      for (const [key, value] of Object.entries(normalizedCoin) as [keyof Coin, unknown][]) {
        if (typeof value === 'string' && !isNaN(parseFloat(value))) {
          ;(normalizedCoin[key] as unknown) = parseFloat(value)
        }
      }

      return normalizedCoin as Coin
    })
  })

  return {
    ...fetchResult,
    data: normalizedData,
  }
}
