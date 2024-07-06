'use client'
import { IUser } from '@/types'
import { Button, Divider } from '@nextui-org/react'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import { PersonData, UserData, UserRoles } from './sections'

interface IProps {
  user?: IUser
}

export const FrmUserEditor = (props: IProps) => {
  const { user } = props

  const methods = useForm<IUser>({
    defaultValues: {
      email: user?.email || '',
      role: user?.role || [],
    },
  })

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <header>
            <h2>Crear nuevo usuario</h2>
            <p className="text-gray-500 text-sm">
              Ingrese los datos del usuario que desea crear. Los campos marcados
              con * son obligatorios.
            </p>
          </header>
          <Divider />
          <main>
            <UserData />
            <PersonData />
            <UserRoles />
          </main>
          <footer>
            <Button>Cancelar</Button>
            <Button>Guardar</Button>
          </footer>
        </form>
      </FormProvider>
    </>
  )
}
