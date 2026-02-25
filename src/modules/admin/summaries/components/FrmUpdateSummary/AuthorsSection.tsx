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
  })

  const handleAddAuthor = () => {
    append(author)
    setAuthor('')
  }
  return (
    <section className="w-full">
      <div className="w-full flex flex-col gap-2">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-sm">Autores</h1>
            <p className="text-xs">Agrega los autores del resumen (opcional)</p>
          </div>
        </header>
        <section className="flex gap-1">
          <Input
            
            variant="outline"
            placeholder="Nombre del autor"
            value={author}
            onValueChange={(value) => {
              setAuthor(value)
            }}
          />
          <Button
            type="button"
            onClick={handleAddAuthor}
            
            startContent={
              <div>
                <IconPlus
                  size={16}
                  className="text-gray-600"
                />
              </div>
            }
          >
            Agregar
          </Button>
        </section>
        <div className="mt-1">
          <Controller
            control={control}
            name="authors"
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center mb-2 gap-1 "
                  >
                    <Input
                      type="text"
                      
                      placeholder="Nombre del autor"
                      value={(value && value[index]) || ''}
                      onValueChange={(e) => {
                        onChange([
                          ...(value?.slice(0, index) || []),
                          e,
                          ...(value?.slice(index + 1) || []),
                        ])
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      
                      startContent={
                        <div>
                          <IconTrash size={16} />
                        </div>
                      }
                      variant="destructive"
                    >
                      Quitar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  )
}
