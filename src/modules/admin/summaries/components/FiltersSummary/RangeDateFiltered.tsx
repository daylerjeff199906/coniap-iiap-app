'use client'
import { useState } from 'react'
import { Button, DateRangePicker } from '@nextui-org/react'
import { parseDate } from '@internationalized/date'
import { IconTrash } from '@tabler/icons-react'
const getInitialDates = () => {
  const today = new Date()
  const startOfYear = new Date(today.getFullYear(), 0, 1)

  return {
    start: parseDate(startOfYear.toISOString().split('T')[0]),
    end: parseDate(today.toISOString().split('T')[0]),
  }
}

export const RangeDateFiltered = () => {
  const [value, setValue] = useState(getInitialDates())

  const isFiltering = value !== getInitialDates()

  return (
    <div className="flex items-center gap-2">
      <DateRangePicker
        aria-label="Filter by date"
        radius="sm"
        visibleMonths={2}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
      {isFiltering && (
        <Button
          isIconOnly
          radius="sm"
          variant="bordered"
          onPress={() => setValue(getInitialDates())}
        >
          <IconTrash size={20} />
        </Button>
      )}
    </div>
  )
}
