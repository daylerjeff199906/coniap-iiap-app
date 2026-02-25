'use client'
import * as React from 'react'
import { format, startOfYear } from 'date-fns'
import { Calendar as CalendarIcon, Trash2 } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export const RangeDateFiltered = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfYear(new Date()),
    to: new Date(),
  })

  const resetDates = () => {
    setDate({
      from: startOfYear(new Date()),
      to: new Date(),
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal h-10 gap-2",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <span className="truncate">
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </span>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Seleccionar fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        onClick={resetDates}
        title="Limpiar fechas"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
