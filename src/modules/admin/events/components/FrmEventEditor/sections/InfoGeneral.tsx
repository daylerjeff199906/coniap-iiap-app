import { IEvent } from '@/types'
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

const typeSala = [
  {
    label: 'Sala 1',
    value: 1,
  },
  {
    label: 'Sala 2',
    value: 2,
  },
]

export const InfoGeneral = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IEvent>()

  return (
    <>
      <section className="grid grid-cols-1 gap-4">
        <div>
          <Controller
            control={control}
            name="sala"
            render={({ field: { onChange, value } }) => (
              <Select
                aria-label="Tipo de sala"
                label="Tipo de sala"
                labelPlacement="outside"
                radius="sm"
                placeholder="Tipo de sala"
                value={String(value) || ''}
                description="(Opcional) En caso de pertenecer a una sala de zoom en específico"
                onChange={(e) => onChange(e.target.value)}
              >
                {typeSala.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
      </section>
    </>
  )
}
