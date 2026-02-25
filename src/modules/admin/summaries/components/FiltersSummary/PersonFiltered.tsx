/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { usePersons } from '@/hooks/admin'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IPerson } from '@/types'
import { IconSearch, IconTrash, IconUserSearch } from '@tabler/icons-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface IFilterProps {
  onValueChange: (value: string) => void
}

export const PersonFiltered = (props: IFilterProps) => {
  const { getPersons, persons, loading } = usePersons()
  const { onValueChange } = props
  const [query, setQuery] = useState('')
  const [personSelected, setPersonSelected] = useState<IPerson | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getPersons({
      column: 'surname',
      isNot: 'participant',
      query: query,
      isPagination: true,
      params: {
        page: 1,
        limit: 10,
      },
    })
  }, [query])

  const dataPersons = persons?.data || []

  const handlePerson = (person: IPerson) => {
    setPersonSelected(person)
    onValueChange(person.id as string)
    setOpen(false)
  }

  const handleClear = () => {
    setPersonSelected(null)
    onValueChange('')
  }

  return (
    <div className="flex gap-2 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={loading}
            className="w-full justify-start text-left font-normal h-10 px-3 truncate"
          >
            {personSelected ? (
              <div className="flex flex-col items-start overflow-hidden leading-tight">
                <span className="text-sm font-bold truncate w-full">
                  {personSelected.name} {personSelected.surName}
                </span>
                <span className="text-[10px] text-muted-foreground truncate w-full">
                  {personSelected.email}
                </span>
              </div>
            ) : (
              <span className="text-muted-foreground flex items-center gap-2">
                <IconUserSearch size={18} stroke={1.5} />
                <span className="truncate">Filtrar por persona</span>
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 shadow-2xl rounded-2xl border-2" align="start">
          <div className="p-4 border-b bg-muted/20">
            <div className="relative">
              <IconSearch className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" stroke={2.5} />
              <Input
                placeholder="Buscar por apellido..."
                className="pl-9 h-9 rounded-xl border-muted-foreground/20 focus-visible:ring-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="h-80">
            <div className="p-2 space-y-1">
              {dataPersons.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <IconUserSearch size={40} stroke={1} className="mx-auto text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground font-medium">No se encontraron resultados</p>
                </div>
              ) : (
                dataPersons.map((person) => (
                  <button
                    key={String(person?.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-xl transition-all flex flex-col gap-0.5",
                      personSelected?.id === person.id ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-accent group"
                    )}
                    onClick={() => handlePerson(person)}
                  >
                    <span className="text-sm font-bold leading-none">{person.name} {person.surName}</span>
                    <span className={cn(
                      "text-[11px] leading-none",
                      personSelected?.id === person.id ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>
                      {person.email}
                    </span>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {personSelected && (
        <Button
          size="icon"
          variant="destructive"
          onClick={handleClear}
          className="shrink-0 h-10 w-10 rounded-xl shadow-lg shadow-destructive/20 hover:scale-105 transition-transform"
        >
          <IconTrash size={18} stroke={2} />
        </Button>
      )}
    </div>
  )
}
