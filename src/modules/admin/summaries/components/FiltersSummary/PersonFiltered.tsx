/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { usePersons } from '@/hooks/admin'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IPerson } from '@/types'
import { IconSearch, IconTrash } from '@tabler/icons-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface IFilter {
  onValueChange: (value: string) => void
}

export const PersonFiltered = (props: IFilter) => {
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

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" disabled={loading} className="w-full justify-start text-left font-normal" > {personSelected ? ( <div className="flex flex-col items-start overflow-hidden"> <span className="text-sm font-bold truncate"> {personSelected.name} {personSelected.surName} </span> <span className="text-[10px] text-muted-foreground truncate"> {personSelected.email} </span> </div> ) : ( <span className="text-muted-foreground flex items-center gap-2">
  <IconSearch size={16} />
  Filtrar por persona
              </span>
            )}
</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <div className="p-3 border-b">
            <div className="relative">
              <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por apellido..."
                className="pl-8 h-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="h-72">
            <div className="p-1">
              {dataPersons.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No se encontraron resultados
                </div>
              ) : (
                dataPersons.map((person) => (
                  <button
                    key={String(person?.id)}
                    className={cn(
                      "w-full text-left p-2 rounded-md hover:bg-accent transition-colors flex flex-col gap-1",
                      personSelected?.id === person.id && "bg-accent"
                    )}
                    onClick={() => handlePerson(person)}
                  >
                    <span className="text-sm font-semibold">{person.name} {person.surName}</span>
                    <span className="text-xs text-muted-foreground">{person.email}</span>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {personSelected && (
        <Button size="icon" variant="destructive" onClick={() => { setPersonSelected(null) onValueChange('') }} className="shrink-0">
  <IconTrash size={18} />
  
</Button>
      )}
    </div>
  )
}
