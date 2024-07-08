'use client'
import { useState } from 'react'
import { IUser, IUserCreate } from '@/types'
import { Button } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { PersonData, UserData, UserRoles } from './sections'
import { HeaderSection } from '@/modules/core'

import { useUsers } from '@/hooks/admin'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { ModalAction } from '@/components'
interface IProps {
  user?: IUser
}

export const FrmUserEditor = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = props

  const methods = useForm<IUserCreate>({
    defaultValues: {
      email: user?.email || '',
      role: user?.role || [],
    },
  })

  const onSubmit = () => {
    setIsModalOpen(true)
  }

  const handleSubmit: SubmitHandler<IUserCreate> = async (
    data: IUserCreate
  ) => {
    const auth = getAuth()
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data?.password || ''
      )
      console && console.log(userCredential)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-3"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <HeaderSection
            title="Usuario"
            subtitle="Información del usuario"
          />
          <main className="flex flex-col gap-3">
            <UserData />
            <PersonData />
            <UserRoles />
          </main>
          <footer className="flex justify-end gap-2 mt-4">
            <Button radius="sm">Cancelar</Button>
            <Button
              radius="sm"
              className="button-dark"
              type="submit"
            >
              Guardar
            </Button>
          </footer>
        </form>
      </FormProvider>
      <ModalAction
        isOpen={isModalOpen}
        title="Usuario"
        message="¿Estás seguro de guardar los cambios?"
        setOpen={setIsModalOpen}
        onPress={() => methods.handleSubmit(handleSubmit)()}
      />
    </>
  )
}
