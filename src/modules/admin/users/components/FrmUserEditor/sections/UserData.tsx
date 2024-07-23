'use client'
import { IUserCreate } from '@/types'
import { Input } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

export const UserData = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<IUserCreate>()

  return (
    <>
      <section className="flex flex-col gap-3">
        <Controller
          control={control}
          name="userName"
          rules={{ required: 'El nombre de usuario es requerido' }}
          render={({ field: { value, onChange } }) => (
            <Input
              aria-label="userName"
              value={value}
              onValueChange={onChange}
              label="Nombre de usuario"
              placeholder="Ejemplo: johndoe"
              radius="sm"
              variant="bordered"
              labelPlacement="outside"
              isInvalid={errors.userName !== undefined}
              errorMessage={errors.userName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'El correo es requerido',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'El correo no es válido',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              aria-label="Correo"
              value={value}
              onValueChange={onChange}
              label="Correo electrónico"
              placeholder="Ejemplo: correo@gamil.com"
              radius="sm"
              variant="bordered"
              labelPlacement="outside"
              isInvalid={errors.email !== undefined}
              errorMessage={errors.email?.message}
              description="El correo electrónico debe ser válido, se enviará un mensaje para confirmar la creación de la cuenta."
              isDisabled={watch('id') !== undefined}
            />
          )}
        />
        {!watch('id') && (
          <>
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'La contraseña es requerida',
                minLength: {
                  value: 8,
                  message: 'La contraseña debe tener al menos 8 caracteres',
                },
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  aria-label="password"
                  value={value}
                  onValueChange={onChange}
                  label="Password"
                  placeholder="********"
                  radius="sm"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password_confirmation"
              rules={{
                required: 'La confirmación de la contraseña es requerida',
                validate: (value) =>
                  value === watch('password') || 'Las contraseñas no coinciden',
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  aria-label="password_confirmation"
                  value={value}
                  onValueChange={onChange}
                  label="Confirmar password"
                  placeholder="********"
                  radius="sm"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errors.password_confirmation !== undefined}
                  errorMessage={errors.password_confirmation?.message}
                />
              )}
            />
          </>
        )}
      </section>
    </>
  )
}
