/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from 'react'
import { IPerson, IUser } from '@/types'
import { Button, Checkbox, CheckboxGroup, Divider } from '@nextui-org/react'
import { createUser, updateUser } from '@/api'
import { registerAndSendEmailVerification } from '@/auth'

import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import { ModalAction } from '@/components'
import { toast } from 'react-toastify'

interface IProps {
  user?: IUser | null
  person: IPerson
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
  const { user, person } = props

  const methods = useForm<IUser>({
    defaultValues: {
      email: user?.email,
      role: user?.role,
    },
  })

  const isDirty = methods.formState.isDirty

  const onSubmit = () => {
    setOpen(true)
  }

  const handleeSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    setOpen(false)
    setLoadSave(true)
    if (user?.email) {
      await updateUser({
        id: user.id,
        email: data.email,
        person: data?.id ? Number(data.id) : null,
        photo: user.photo,
        userName: user.userName,
        emailVerified: user.emailVerified,
        topics: user.topics,
        role: data?.role && data.role.length > 0 ? data.role : null,
      })
      toast.success('Usuario actualizado correctamente')
    } else {
      const userCreated = await registerAndSendEmailVerification({
        email: person ? person.email : data.email,
        password: password_default ? password_default : 'coniap@2024_',
      })

      if (typeof userCreated === 'string') {
        toast.error(userCreated)
      } else {
        await createUser({
          email: person?.email,
          role: data?.role && data.role.length > 0 ? data.role : null,
          userName: person?.email,
          photo: person?.image,
          person: person?.id ? Number(person.id) : null,
        })

        toast.success(
          <main className="flex flex-col gap-1">
            <h1 className="font-bold tex-sm">Usuario creado correctamente</h1>
            <p className="tex-xs text-gray-500">
              Se ha creado un usuario. Notifique al usuario que revise su correo
              para activar la cuenta. Su nombre de usuario es su correo, y tiene
              una contraseña predeterminada.
            </p>
          </main>
        )
      }
    }
    setOpen(false)
    setLoadSave(false)
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="border p-4 rounded-lg flex flex-col gap-2"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {user ? (
            <section className="flex items-center gap-4">
              <header>
                <h4 className="font-bold text-gray-500">Usuario</h4>
                <p className="text-xs text-gray-500">Información del usuario</p>
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
                  No se encontraron datos de usuario, si desea cree un usuario y
                  asigne los roles.
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
