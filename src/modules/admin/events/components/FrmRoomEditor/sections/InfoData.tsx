'use client'
import { ISala } from '@/types'
import { Input, Radio, RadioGroup, cn } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

const optValues = [
  {
    value: 'TRUE',
    label: 'Activo',
    description: 'Sala visíble para el sistema y disponible para eventos',
  },
  {
    value: 'FALSE',
    label: 'Inactivo',
    description: 'Sala no disponible para eventos',
  },
]

export const InfoData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ISala>()

  return (
    <div className="flex flex-col gap-4">
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Nombre de la sala"
            label="Nombre de la sala"
            labelPlacement="outside"
            radius="sm"
            placeholder="Ej: Sala 1"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.name !== undefined}
            errorMessage={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="url"
        rules={{ required: 'Este campo es requerido' }}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Url de la sala"
            label="Url de la sala"
            labelPlacement="outside"
            radius="sm"
            placeholder="Ej: https://meet.google.com/abc-123"
            value={value}
            onValueChange={onChange}
            isInvalid={errors.name !== undefined}
            errorMessage={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="isActived"
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            value={value ? 'TRUE' : 'FALSE'}
            onValueChange={(value) => onChange(value === 'TRUE')}
            size="sm"
            label="Estado de la sala"
          >
            {optValues.map((opt, index) => (
              <Radio
                key={index}
                value={opt.value}
                classNames={{
                  base: cn(
                    'm-0 bg-content1 hover:bg-content2 items-center',
                    'cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent min-w-full',
                    'data-[selected=true]:border-primary'
                  ),
                  label: cn('font-semibold'),
                }}
                description={opt.description}
              >
                {opt.label}
              </Radio>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  )
}
