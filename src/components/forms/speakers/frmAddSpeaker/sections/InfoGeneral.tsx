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
        <h1 className="">Información general</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            control={control}
            rules={{
              required: 'Este campo es requerido',
            }}
            name="fullName"
            render={({ field: { onChange, value } }) => (
              <Input
                aria-label="Nombre del ponente"
                label="Nombres"
                labelPlacement="outside"
                radius="sm"
                placeholder="Nombre del ponente"
                value={value}
                onValueChange={onChange}
                isInvalid={errors.fullName !== undefined}
                errorMessage={errors.fullname?.message as string}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: 'Este campo es requerido',
            }}
            name="surname"
            render={({ field: { onChange, value } }) => (
              <Input
                aria-label="Apellidos del ponente"
                label="Apellidos"
                labelPlacement="outside"
                radius="sm"
                placeholder="Apellidos del ponente"
                value={value}
                onValueChange={onChange}
                isInvalid={errors.surName !== undefined}
                errorMessage={errors.surName?.message as string}
              />
            )}
          />
        </div>

        <div className="flex gap-3">
          <Controller
            control={control}
            rules={{
              required: 'Este campo es requerido',
            }}
            name="levelStudy"
            render={({ field: { onChange, value } }) => (
              <Input
                aria-label="Grado académico"
                label="Grado académico"
                labelPlacement="outside"
                radius="sm"
                value={value}
                onValueChange={onChange}
                isInvalid={errors.levelStudy !== undefined}
                errorMessage={errors.levelStudy?.message as string}
              />
            )}
          />
          <Controller
            control={control}
            name="institution"
            rules={{
              required: 'Este campo es requerido',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                aria-label="Institución"
                label="Institución"
                labelPlacement="outside"
                radius="sm"
                value={value}
                onValueChange={onChange}
                isInvalid={errors.institution !== undefined}
                errorMessage={errors.institution?.message as string}
              />
            )}
          />
          <Controller
            control={control}
            name="job"
            rules={{
              required: 'Este campo es requerido',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Puesto"
                labelPlacement="outside"
                radius="sm"
                value={value}
                onValueChange={onChange}
                isInvalid={errors.job !== undefined}
                errorMessage={errors.job?.message as string}
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
              label="Descripción"
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
