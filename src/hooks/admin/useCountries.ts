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
      .then((res) => res)
      .catch((err) => err)
    setCountries(data)
    setLoading(false)
  }

  return {
    getCountries,
    countries,
    loading,
  }
}
