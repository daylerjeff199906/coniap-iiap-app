'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { ModalAction } from '@/components'
import { updateRowInformation } from '@/api'
import { toast } from 'react-toastify'
import { ListComimte } from './ListComite'
import { IPersonComite } from '@/types'

interface IProps {
  typeComite: string
  list?: IPersonComite[]
}

interface IListData {
  list: IPersonComite[]
}

export const FrmComiteEditor = (props: IProps) => {
  const { typeComite, list } = props
  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IListData>({
    defaultValues: {
      list,
    },
  })

  const isDirty = methods.formState.isDirty

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IListData> = async (
    data: IListData
  ) => {
    setOpen(false)
    setLoading(true)

    const res = await updateRowInformation('1', `${typeComite}`, data.list)

    if (res) {
      toast.success('Cambios guardados correctamente')
    } else {
      toast.error('Error al guardar los cambios')
    }
    setLoading(false)
  }

  return (
    <>
      <FormProvider {...methods}>
        <main className="">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <main className="w-full">
              <ListComimte />
            </main>
            <footer className="flex items-center gap-2 justify-end sticky bottom-0 bg-white p-4 border-t border-gray-100">
              <Button
                
                size="sm"
                onClick={() => methods.reset()}
              >
                Cancelar
              </Button>
              <Button variant="default" type="submit" size="sm" className="button-dark" disabled={loading} >
                Guardar
              </Button>
            </footer>
          </form>
        </main>
      </FormProvider>
      <ModalAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Guardar los cambios"
        message="¿Estás seguro de guardar los cambios?"
        onClick={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
