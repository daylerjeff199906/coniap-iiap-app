'use client '
import { ContactData, PersonData } from './sections'
import { useForm, FormProvider } from 'react-hook-form'
import { IPerson } from '@/types'
import { Button } from '@nextui-org/react'

interface IFrmProfileProps {
  person: IPerson
}

export const FrmProfile = () => {
  const methods = useForm<IPerson>()

  return (
    <>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-6 max-w-2xl">
          <PersonData />
          <ContactData />

          <footer className="pt-4">
            <div className="flex items-center gap-3 justify-end">
              <Button
                color="primary"
                // isDisabled={loading}
                // isLoading={loading}
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
