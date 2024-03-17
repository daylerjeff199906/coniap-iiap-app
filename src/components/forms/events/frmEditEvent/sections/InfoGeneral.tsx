import { Input, Textarea } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const InfoGeneral = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  return (
    <>
      <section className="grid grid-cols-1 gap-4">
        <Controller
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Nombre del evento"
              label="Nombre"
              labelPlacement="outside"
              radius="sm"
              placeholder="Nombre del evento"
              value={value}
              onValueChange={onChange}
              isInvalid={errors.name !== undefined}
              errorMessage={errors.name?.message as string}
            />
          )}
        />

        <div className="flex gap-3">
          <Controller
            control={control}
            rules={{
              required: 'Este campo es requerido',
            }}
            name="date"
            render={({ field: { onChange, value } }) => (
              <Input
                aria-label="Fecha del evento"
                label="Fecha"
                labelPlacement="outside"
                radius="sm"
                type="date"
                value={value}
                onValueChange={onChange}
                isInvalid={errors.date !== undefined}
                errorMessage={errors.date?.message as string}
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
                isInvalid={errors.startTime !== undefined}
                errorMessage={errors.startTime?.message as string}
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
                isInvalid={errors.endTime !== undefined}
                errorMessage={errors.endTime?.message as string}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="shortDescription"
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange, value } }) => (
            <Textarea
              aria-label="Descripción del evento"
              label="Descripción corta"
              labelPlacement="outside"
              radius="sm"
              placeholder="Descripción del evento"
              value={value}
              onValueChange={onChange}
              isInvalid={errors.shortDescription !== undefined}
              errorMessage={errors.shortDescription?.message as string}
            />
          )}
        />
      </section>
    </>
  )
}
