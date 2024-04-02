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
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                aria-label="Nombre del ponente"
                label="Nombres"
                labelPlacement="outside"
                radius="sm"
                placeholder="Nombre del ponente"
                value={value}
                onValueChange={onChange}
                isInvalid={errors.name !== undefined}
                errorMessage={errors.name?.message as string}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: 'Este campo es requerido',
            }}
            name="surName"
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
            name="location"
            render={({ field: { onChange, value } }) => (
              <Input
                aria-label="localidad"
                label="Localidad"
                labelPlacement="outside"
                placeholder="Perú, Mexico, etc."
                radius="sm"
                value={value}
                onValueChange={onChange}
                isInvalid={errors.location !== undefined}
                errorMessage={errors.location?.message as string}
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
                placeholder="Institución a la que pertenece"
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
                placeholder="Puesto que desempeña"
                radius="sm"
                value={value}
                onValueChange={onChange}
                isInvalid={errors.job !== undefined}
                errorMessage={errors.job?.message as string}
              />
            )}
          />
        </div>
        <div className="">
          <Controller
            control={control}
            rules={{
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'Correo inválido',
              },
            }}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                aria-label="email"
                label="Email"
                labelPlacement="outside"
                placeholder="ejemplo@ejemplo.com"
                radius="sm"
                value={value}
                onValueChange={onChange}
                isInvalid={errors.email !== undefined}
                errorMessage={errors.email?.message as string}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="presentation"
          render={({ field: { onChange, value } }) => (
            <Textarea
              aria-label="Presentación"
              label="Presentación"
              labelPlacement="outside"
              radius="sm"
              placeholder="Presentación del ponente"
              value={value}
              onValueChange={onChange}
            />
          )}
        />
      </section>
    </>
  )
}
