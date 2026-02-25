'use client'
import { useState } from 'react'
import { ISummary } from '@/types'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconTrash, IconPlus } from '@tabler/icons-react'

export const AuthorsSection = () => {
  const [author, setAuthor] = useState('')
  const { control } = useFormContext<ISummary>()

  const { fields, append, remove } = useFieldArray({
    name: 'authors',
    control
  })

  const handleAddAuthor = () => {
    if (author.trim()) {
      append(author.trim())
      setAuthor('')
    }
  }

  return (
    <section className="w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Autores | Co-autores</h1>
        <p className="text-xs text-muted-foreground">Agrega los co-autores del resumen (opcional)</p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Nombre completo del autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleAddAuthor}
          variant="secondary"
          className="gap-2 font-bold"
        >
          <IconPlus size={18} />
          Agregar
        </Button>
      </div>

      <div className="space-y-2 mt-4">
        <Controller
          control={control}
          name="authors"
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col gap-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-2 p-1 bg-muted/20 border rounded-lg group"
                >
                  <Input
                    type="text"
                    placeholder="Nombre del autor"
                    value={(value && value[index]) || ''}
                    onChange={(e) => {
                      const newValue = [...(value || [])];
                      newValue[index] = e.target.value;
                      onChange(newValue);
                    }}
                    className="h-8 text-sm bg-transparent border-none shadow-none focus-visible:ring-0"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => remove(index)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <IconTrash size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        />
      </div>
    </section>
  )
}
