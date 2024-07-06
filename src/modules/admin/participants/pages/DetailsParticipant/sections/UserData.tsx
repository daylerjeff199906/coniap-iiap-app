/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { IPerson, IUser } from '@/types'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Skeleton,
} from '@nextui-org/react'
import { useUsers } from '@/hooks/admin'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form'

interface IProps {
  data: IPerson
}

const roles = [
  { value: 'admin', label: 'Administrador' },
  { value: 'revisor', label: 'Revisor' },
  { value: 'speaker', label: 'Ponente' },
]

export const UserData = (props: IProps) => {
  const { getUserByEmail, user, loading } = useUsers()
  const { data } = props

  const methods = useForm<IUser>({
    defaultValues: {
      email: user?.email || data.email,
      role: user?.role || [],
    },
  })

  useEffect(() => {
    getUserByEmail(data.email)
  }, [data.email])

  const onSubmit: SubmitHandler<IUser> = (data) => {
    console.log(data)
  }

  return (
    <>
      {loading ? (
        <main className="flex flex-col gap-2">
          <Skeleton className="w-full max-w-96 h-2 rounded-lg" />
          <Skeleton className="w-full h-8 rounded-lg" />
        </main>
      ) : (
        <FormProvider {...methods}>
          <form
            className="border p-4 rounded-lg flex flex-col gap-2"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {user ? (
              <section className="flex items-center gap-4">
                <header>
                  <h4 className="font-bold text-gray-500">Usuario</h4>
                  <p className="text-xs text-gray-500">
                    Información del usuario
                  </p>
                  <p>Usuario registrado: {user?.userName}</p>
                  <p>Correo: {user?.email}</p>
                </header>
                <Divider />
              </section>
            ) : (
              <section className="flex flex-col gap-2 ">
                <header className="flex flex-col gap-1">
                  <h4 className="font-bold mt-4 text-gray-500">
                    Datos de usuario
                  </h4>
                  <p className="text-gray-500 text-sm">
                    No se encontraron datos de usuario, si desea cree un usuario
                    y asigne los roles.
                  </p>
                </header>
              </section>
            )}
            <Divider />
            <main className="flex flex-col gap-2">
              <Controller
                control={methods.control}
                name="role"
                render={({ field: { value, onChange } }) => (
                  <CheckboxGroup
                    aria-label="Roles"
                    description="Selecciona los roles que deseas asignar. Si no seleccionas ninguno, el usuario no tendrá acceso a la plataforma."
                    label="Asignar roles"
                    orientation="horizontal"
                    value={value || []}
                    onValueChange={(value) => onChange(value)}
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
              <footer className="flex items-center justify-end gap-2 w-full">
                <Button radius="sm">Cancelar</Button>
                <Button
                  radius="sm"
                  className="button-dark"
                  type="submit"
                >
                  Crear usuario
                </Button>
              </footer>
            </main>
          </form>
        </FormProvider>
      )}
    </>
  )
}
