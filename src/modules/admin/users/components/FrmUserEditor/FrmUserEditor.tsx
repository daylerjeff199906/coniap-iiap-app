'use client'
import { useState } from 'react'
import { IError, IUser, IUserCreate } from '@/types'
import { Button } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { PersonData, TopicsData, UserData, UserRoles } from './sections'
import { HeaderSection } from '@/modules/core'

import { ModalAction } from '@/components'
import { getErrors, registerAndSendEmailVerification } from '@/auth'
import { toast } from 'sonner'
import { createUser, updateUser } from '@/api'
import { useRouter } from 'next/navigation'
interface IProps {
  user?: IUser
}

export const FrmUserEditor = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = props
  const router = useRouter()

  const methods = useForm<IUserCreate>({
    defaultValues: {
      id: user?.id,
      userName: user?.userName || '',
      email: user?.email || '',
      role: user?.role || [],
      topics: user?.topics || [],
    },
  })
  // console.log('user', user)

  const onSubmit = () => {
    setIsModalOpen(true)
  }

  const handleSubmit: SubmitHandler<IUserCreate> = async (
    data: IUserCreate
  ) => {
    setIsModalOpen(false)
    setIsLoading(true)
    try {
      if (data?.id) {
        await updateUser({
          id: data.id,
          userName: data.userName,
          email: data.email,
          role: data.role,
          topics: data.topics || null,
          person: null,
          photo: '',
          emailVerified: true,
        })
        toast.success('Usuario actualizado')
        router.push('/admin/users')
      } else {
        const userCredential = await registerAndSendEmailVerification({
          email: data.email,
          password: data.password || '123456789',
        })
        if (typeof userCredential === 'string') {
          toast.error(userCredential as string)
        } else {
          await createUser({
            email: data.email,
            person: null,
            role: data.role,
            userName: data.userName,
            photo: '',
            emailVerified: userCredential.emailVerified,
          })
          toast.success('Usuario creado')
          router.push('/admin/users')
        }
      }
    } catch (error) {
      toast.error(getErrors(error as IError))
    }
    setIsLoading(false)
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
            <TopicsData />
          </main>
          <footer className="flex justify-end gap-2 mt-4">
            <Button
              radius="sm"
              onPress={() => router.push('/admin/users')}
            >
              Cancelar
            </Button>
            <Button
              radius="sm"
              className="button-dark"
              type="submit"
              isLoading={isLoading}
              isDisabled={isLoading}
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
