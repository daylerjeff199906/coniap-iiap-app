'use client'
import { Input } from '@/components/ui/input'
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
          
          variant="outline"
          value={date}
          onValueChange={handleDate}
        />
      </div>
    </>
  )
}
