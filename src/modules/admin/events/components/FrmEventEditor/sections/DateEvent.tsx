import { IEvent } from '@/types'
import { Input } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const DateEvent = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IEvent>()

  return (
    <>
      <div className="flex gap-3">
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Fecha del evento"
              label="Fecha"
              labelPlacement="outside"
              radius="sm"
              type="date"
              value={String(value) || ''}
              onValueChange={onChange}
              description="(Opcional) Fecha del evento"
            />
          )}
        />
        <Controller
          control={control}
          name="timeStart"
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Hora de inicio"
              label="Hora de inicio"
              labelPlacement="outside"
              radius="sm"
              type="time"
              value={value}
              onValueChange={onChange}
              isInvalid={errors.timeStart !== undefined}
              errorMessage={errors.timeStart?.message as string}
            />
          )}
        />
        <Controller
          aria-label="Hora de finalización"
          control={control}
          name="timeEnd"
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Hora de fin"
              labelPlacement="outside"
              radius="sm"
              type="time"
              value={value}
              onValueChange={onChange}
              isInvalid={errors.timeEnd !== undefined}
              errorMessage={errors.timeEnd?.message as string}
            />
          )}
        />
      </div>
    </>
  )
}
