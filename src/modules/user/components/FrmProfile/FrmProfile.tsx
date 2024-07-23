'use client'
import { ContactData, PersonData } from './sections'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { IPerson, IUserCreated } from '@/types'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import { usePersons } from '@/hooks/admin'
import { updateUser } from '@/api'
import { useAuth } from '../..'
import { useAuthContext } from '@/provider'
import { toast } from 'react-toastify'

interface IFrmProfileProps {
  person: IPerson
}

export const FrmProfile = (props: IFrmProfileProps) => {
  const { person } = props
  const router = useRouter()
  const { myPerson, getUser } = useAuth()
  const { user } = useAuthContext()

  const { updatePersonData, addPerson, loading } = usePersons()

  const methods = useForm<IPerson>({
    defaultValues: person,
  })

  const onSubmit: SubmitHandler<IPerson> = async (data: IPerson) => {
    if (data?.id) {
      const res = await updatePersonData(String(myPerson?.id), data)
      if (res.message) {
        return null
      } else {
        router.push('/dashboard/profile')
        const dataDefault: IPerson = res as unknown as IPerson
        methods.reset(dataDefault)
        getUser()
      }
    } else {
      const res = await addPerson(data)
      if (res) {
        const dataDefault: IPerson = res as unknown as IPerson

        const userUpdate: IUserCreated = {
          id: String(user?.id),
          email: user?.email as string,
          photo: user?.photo as string,
          role: user?.role as string[],
          userName: user?.userName as string,
          emailVerified: user?.emailVerified as boolean,
          topics: user?.topics as string[],
          person: dataDefault?.id ? Number(dataDefault.id) : null,
        }

        const newUser = updateUser(userUpdate)

        if (!newUser) {
          return null
        } else {
          toast.success(
            'Perfil actualizado correctamente, cierra sesión y vuelve a ingresar para ver los cambios',
            {
              autoClose: false,
            }
          )
        }

        methods.reset(dataDefault)
        getUser()
        handleCancel()
      } else {
        return null
      }
    }
  }

  const handleCancel = () => {
    router.push('/dashboard')
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-6 max-w-2xl"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <PersonData />
          <ContactData />

          <footer className="pt-4">
            <div className="flex items-center gap-3 justify-end">
              <Button
                color="primary"
                isDisabled={loading}
                isLoading={loading}
                type="submit"
              >
                Guardar cambios
              </Button>
              <Button onPress={handleCancel}>Cancelar</Button>
            </div>
          </footer>
        </form>
      </FormProvider>
    </>
  )
}
