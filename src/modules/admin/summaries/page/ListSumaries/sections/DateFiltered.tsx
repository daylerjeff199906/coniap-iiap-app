'use client'
import { useFilterFromUrl } from '@/modules/core'
import { Input } from '@nextui-org/react'

export const DateFiltered = () => {
  const { getParams, updateFilters } = useFilterFromUrl()

  const selectedFile = getParams('date', 'all')

  const handleFile = (value: string) => {
    updateFilters({ date: value, page: '' })
  }

  return (
    <div className="w-40">
      <Input
        aria-label="Filter by date"
        placeholder="Filter by date"
        radius="sm"
        value={selectedFile}
        onValueChange={handleFile}
        type="date"
      />
    </div>
  )
}
