import { Input, Textarea } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const InfoGeneral = () => {
  const { control } = useFormContext()
  return (
    <>
      <section className="grid grid-cols-1 gap-4">
        <h1 className="text-lg">Información general</h1>
        <Controller
          control={control}
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
            />
          )}
        />

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
                value={value}
                onValueChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="startTime"
            render={({ field: { onChange, value } }) => (
              <Input
                aria-label="Hora de inicio"
                label="Hora de inicio"
                labelPlacement="outside"
                radius="sm"
                type="time"
                value={value}
                onValueChange={onChange}
              />
            )}
          />
          <Controller
            aria-label="Hora de finalización"
            control={control}
            name="endTime"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Hora de finalización"
                labelPlacement="outside"
                radius="sm"
                type="time"
                value={value}
                onValueChange={onChange}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Textarea
              aria-label="Descripción del evento"
              label="Descripción"
              labelPlacement="outside"
              radius="sm"
              placeholder="Descripción del evento"
              value={value}
              onValueChange={onChange}
            />
          )}
        />
      </section>
    </>
  )
}
