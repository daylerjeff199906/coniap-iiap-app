'use client'
import { Input } from '@nextui-org/react'
import { useFilterFromUrl } from '@/modules/core'

export const FilterSection = () => {
  const { getParams, updateFilter } = useFilterFromUrl()

  const date = getParams('date', '')

  const handleDate = (value: string) => {
    updateFilter('date', value)
  }

  return (
    <>
      <div className="flex gap-2 w-full max-w-[180px]">
        <Input
          type="date"
          radius="sm"
          variant="bordered"
          value={date}
          onValueChange={handleDate}
        />
      </div>
    </>
  )
}
