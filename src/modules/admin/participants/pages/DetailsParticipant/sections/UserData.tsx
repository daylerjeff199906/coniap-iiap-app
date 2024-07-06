/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { IPerson, IUser } from '@/types'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Skeleton,
} from '@nextui-org/react'
import { useUsers } from '@/hooks/admin'
import { createUser, updateUser } from '@/api'
import { registerAndSendEmailVerification } from '@/auth'

import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import { ModalAction } from '@/components'
import { toast } from 'sonner'

interface IProps {
  data: IPerson
}

const password_default = process.env.PASSWORD

const roles = [
  { value: 'admin', label: 'Administrador' },
  { value: 'revisor', label: 'Revisor' },
  { value: 'speaker', label: 'Ponente' },
]

export const UserData = (props: IProps) => {
  const [isOpen, setOpen] = useState(false)
  const [loadSave, setLoadSave] = useState(false)
  const { getUserByEmail, user, loading } = useUsers()
  const { data } = props

  const methods = useForm<IUser>({
    defaultValues: {
      email: user?.email || data.email,
      role: user?.role || [],
    },
  })

  const isDirty = methods.formState.isDirty

  useEffect(() => {
    getUserByEmail(data.email)
  }, [data.email])

  const onSubmit = () => {
    setOpen(true)
  }

  const handleeSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    setOpen(false)
    setLoadSave(true)
    if (user) {
      await updateUser({
        ...user,
        role: data?.role && data.role.length > 0 ? data.role : null,
      })
      toast.success('Usuario actualizado correctamente')
    } else {
      const userCreated = await registerAndSendEmailVerification({
        email: data.email,
        password: password_default ? password_default : 'coniap@2024_',
      })
      if (userCreated) {
        await createUser({
          email: data.email,
          role: data?.role && data.role.length > 0 ? data.role : null,
          userName: data.email.split('@')[0],
          photo: '',
          person: data?.id ? Number(data.id) : null,
        })
        setOpen(false)
        toast.success('Usuario creado correctamente')
      }
      getUserByEmail(data.email)
    }
    setLoadSave(false)
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
                  <div className="flex gap-2 text-sm font-medium">
                    <p>Usuario registrado: {user?.userName}</p>
                    <p>Correo: {user?.email}</p>
                  </div>
                </header>
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
                  <p className="text-gray-500 text-xs">
                    Al crear un usuario, el usuario por defecto sera el correo
                    electronico y la contraseña sera coniap@2024
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
                    label="Asignar roles (Opcional)"
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
                <Button
                  radius="sm"
                  onPress={() => methods.reset()}
                >
                  Cancelar
                </Button>
                <Button
                  radius="sm"
                  className="button-dark"
                  type="submit"
                  isLoading={loadSave}
                  isDisabled={loadSave || !isDirty}
                >
                  Crear usuario
                </Button>
              </footer>
            </main>
          </form>
        </FormProvider>
      )}
      <ModalAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Guardar cambios"
        message="¿Estás seguro de guardar los cambios?"
        onPress={() => methods.handleSubmit(handleeSubmit)()}
      />
    </>
  )
}
