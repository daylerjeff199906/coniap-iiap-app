import { useState } from 'react'
import { fetchCountries } from '@/api'
import { ICountry } from '@/types'

export function useCountries() {
  const [loading, setLoading] = useState<boolean>(false)
  const [countries, setCountries] = useState<ICountry[] | null>(null)

  const getCountries = async (query: string) => {
    setLoading(true)
    const data = await fetchCountries({ query })
      .then((res) => res.json())
      .catch((err) => [])
    setCountries(data)
    // add new promise
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  return {
    getCountries,
    countries,
    loading,
  }
}
