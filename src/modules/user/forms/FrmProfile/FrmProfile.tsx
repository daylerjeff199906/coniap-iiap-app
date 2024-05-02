'use client '
import { ContactData, PersonData } from './sections'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { IPerson } from '@/types'
import { Button } from '@nextui-org/react'

import { usePersons } from '@/hooks/admin'
import { useAuth } from '../..'

interface IFrmProfileProps {
  person: IPerson
}

export const FrmProfile = () => {
  const { myPerson } = useAuth()
  const { updatePersonData, loading } = usePersons()

  const methods = useForm<IPerson>({
    defaultValues: myPerson || {},
  })

  const onSubmit: SubmitHandler<IPerson> = async (data: IPerson) => {
    const res = await updatePersonData(String(myPerson?.id), data)
    if (res.message) {
      return null
    } else {
      methods.reset()
    }
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
              <Button>Cancelar</Button>
            </div>
          </footer>
        </form>
      </FormProvider>
    </>
  )
}
