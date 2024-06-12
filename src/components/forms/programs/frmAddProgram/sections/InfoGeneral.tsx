import { IProgram } from '@/types'
import { Input, Textarea } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const InfoGeneral = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IProgram>()

  return (
    <>
      <section className="grid grid-cols-1 gap-4">
        <h1 className="text-sm font-medium">Información general</h1>
        <Controller
          control={control}
          rules={{
            required: 'Este campo es requerido',
          }}
          name="title"
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="titulo del programa"
              label="Título del programa"
              labelPlacement="outside"
              radius="sm"
              placeholder="Escríbe el título del programa"
              value={value}
              onValueChange={onChange}
              isInvalid={errors.title !== undefined}
              errorMessage={errors.title?.message as string}
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
              label="Descripción del programa"
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
