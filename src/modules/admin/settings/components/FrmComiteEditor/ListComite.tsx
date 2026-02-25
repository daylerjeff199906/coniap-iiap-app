'use client'
import { useState } from 'react'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconTrash, IconPlus, IconGripVertical } from '@tabler/icons-react'
import { IPersonComite } from '@/types'
import { cn } from '@/lib/utils'

interface IListData {
  list: IPersonComite[]
}

export const ListComimte = () => {
  const [personal, setPersonal] = useState<string>('')
  const { control, setValue } = useFormContext<IListData>()
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'list',
  })

  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  const handleAddAuthor = () => {
    if (personal.trim()) {
      append({ order: fields.length + 1, name: personal.trim() })
      setPersonal('')
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragEnter = (index: number) => {
    if (draggedItem === null || draggedItem === index) return
    move(draggedItem, index)
    setDraggedItem(index)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    updateOrder()
  }

  const updateOrder = () => {
    const updatedList = fields.map((field, index) => ({
      order: index + 1,
      name: field.name,
    }))
    setValue('list', updatedList)
  }

  return (
    <section className="w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Miembros del Comité</h2>
        <p className="text-xs text-muted-foreground">Agrega y organiza los miembros del comité (puedes arrastrar para reordenar)</p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Nombre del miembro"
          value={personal}
          onChange={(e) => setPersonal(e.target.value)}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleAddAuthor}
          className="gap-2 font-bold px-6"
        >
          <IconPlus size={18} />
          Agregar
        </Button>
      </div>

      <div className="mt-4 border rounded-xl overflow-hidden bg-muted/10">
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          <Controller
            control={control}
            name="list"
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                {fields.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground text-sm">
                    No hay miembros agregados aún.
                  </div>
                ) : (
                  fields.map((field, index) => (
                    <div
                      key={field.id}
                      className={cn(
                        "flex items-center gap-2 p-2 bg-background border rounded-lg shadow-sm transition-all",
                        draggedItem === index ? "opacity-50 ring-2 ring-primary" : "hover:border-primary/50"
                      )}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragEnter={() => handleDragEnter(index)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground transition-colors">
                        <IconGripVertical size={20} />
                      </div>

                      <div className="flex-1">
                        <Input
                          type="text"
                          className="h-9 bg-transparent border-none shadow-none focus-visible:ring-0 font-medium"
                          value={value?.[index]?.name || ''}
                          onChange={(e) => {
                            const newValue = [...(value || [])]
                            newValue[index] = { ...newValue[index], name: e.target.value }
                            onChange(newValue)
                          }}
                        />
                      </div>

                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => remove(index)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <IconTrash size={16} />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  )
}
