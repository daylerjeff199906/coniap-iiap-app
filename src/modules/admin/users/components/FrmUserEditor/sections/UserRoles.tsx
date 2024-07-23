'use client'
import { IUserCreate } from '@/types'
import { Checkbox, CheckboxGroup } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

const roles = [
  { value: 'admin', label: 'Administrador' },
  { value: 'revisor', label: 'Revisor' },
  { value: 'speaker', label: 'Ponente' },
]

export const UserRoles = () => {
  const methods = useFormContext<IUserCreate>()
  return (
    <>
      <section className="flex flex-col gap-1">
        <Controller
          control={methods.control}
          name="role"
          rules={{
            validate: (value) => {
              if (value?.length === 0) {
                return 'Debes asignar al menos un rol'
              }
              return true
            },
          }}
          render={({ field: { value, onChange } }) => (
            <CheckboxGroup
              aria-label="Roles"
              description="Selecciona los roles que deseas asignar. Si no seleccionas ninguno, el usuario no tendrá acceso a la plataforma."
              label="Asignar roles (Opcional)"
              orientation="horizontal"
              value={value || []}
              onValueChange={(value) => {
                onChange(value)
                if (!value.includes('revisor')) {
                  methods.setValue('topics', undefined)
                }
              }}
              isInvalid={methods.formState.errors.role !== undefined}
              errorMessage={methods.formState.errors.role?.message}
            >
              {roles.map((role) => (
                <Checkbox
                  key={role.value}
                  value={role.value}
                >
                  {role.label}
                </Checkbox>
              ))}
            </CheckboxGroup>
          )}
        />
      </section>
    </>
  )
}
