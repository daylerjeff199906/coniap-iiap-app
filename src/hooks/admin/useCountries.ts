'use client'
import { useState } from 'react'
import { fetchCountries, fetchAllCountries } from '@/api'
import { ICountry } from '@/types'

export function useCountries() {
  const [loading, setLoading] = useState<boolean>(false)
  const [countries, setCountries] = useState<ICountry[] | null>(null)
  const [allCountries, setAllCountries] = useState<ICountry[] | null>(null)

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

  const getAllCountries = async () => {
    setLoading(true)
    const data = await fetchAllCountries()
      .then((res) => res.json())
      .catch((err) => [])
    setAllCountries(data)
    setLoading(false)
  }

  return {
    getCountries,
    countries,
    getAllCountries,
    allCountries,
    loading,
  }
}
