'use client'
import { useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export const useFilterFromUrl = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const getParams = (nameParams: string, defaultValue: string) => {
    const value = searchParams.get(nameParams)
    return value || defaultValue
  }

  const updateFilter = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (name === 'page') {
        params.set(name, value)
      } else {
        params.delete('page')
        if (value === '') {
          params.delete(name)
        } else {
          params.set(name, value)
        }
      }

      const queryString = params.toString()
      router.push(`${pathname}?${queryString}`)
    },
    [searchParams, router, pathname]
  )

  return {
    getParams,
    updateFilter,
  }
}
