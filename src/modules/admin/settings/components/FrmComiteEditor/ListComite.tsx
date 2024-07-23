'use client'
import { useState } from 'react'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { Button, Input } from '@nextui-org/react'
import { IconTrash, IconPlus } from '@tabler/icons-react'

interface IGeneralData {
  list: string[]
}

export const ListComimte = () => {
  const [personal, setPersonal] = useState('')
  const { control } = useFormContext<IGeneralData>()

  const { fields, append, remove } = useFieldArray({
    name: 'list',
  })

  const handleAddAuthor = () => {
    append(personal)
    setPersonal('')
  }
  return (
    <section className="w-full">
      <div className="w-full flex flex-col gap-2">
        <section className="flex gap-1">
          <Input
            radius="sm"
            variant="bordered"
            placeholder="Nombre del personal de comité"
            value={personal}
            onValueChange={(value) => {
              setPersonal(value)
            }}
          />
          <Button
            type="button"
            onPress={handleAddAuthor}
            radius="sm"
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
            name="list"
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center mb-2 gap-1 "
                  >
                    <Input
                      type="text"
                      radius="sm"
                      placeholder="Nombre del personal de comité"
                      value={(value && value[index]) || ''}
                      size="sm"
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
                      onPress={() => remove(index)}
                      radius="sm"
                      size="sm"
                      startContent={
                        <div>
                          <IconTrash size={16} />
                        </div>
                      }
                      color="danger"
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
