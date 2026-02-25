/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { ISala } from '@/types'
import { useSalas } from '@/hooks/admin'

import { useRouter } from 'next/navigation'
import { HeaderSection } from '@/modules/core'
import { InfoData, PlatformData } from './sections'
import { toast } from 'react-toastify'

interface IProps {
  dataDefault?: ISala
}

export const FrmRoomEditor = (props: IProps) => {
  const { dataDefault } = props

  const { createRoom, updateRoom, loading } = useSalas()

  const router = useRouter()

  const methods = useForm<ISala>({
    defaultValues: dataDefault,
  })

  const onSubmit: SubmitHandler<ISala> = async (data: ISala) => {
    const res = dataDefault?.id
      ? await updateRoom(dataDefault.id, data)
      : await createRoom(data)

    if (res instanceof Error) {
      toast.error(
        <CustomToast
          title="Error"
          description={res.message}
        />
      )
    } else {
      toast.success(
        <CustomToast
          title="Éxito"
          description={`Sala  ${dataDefault?.id ? 'actualizada' : 'creada'}`}
        />
      )
      router.push('/admin/eventos/salas')
    }
  }

  const title = dataDefault?.id ? 'Editar sala' : 'Agregar sala'
  const description = dataDefault?.id
    ? 'Edita la información de la sala'
    : 'Agrega una nueva sala'

  const handleExit = () => {
    methods.reset()
    router.push('/admin/eventos/salas')
  }

  return (
    <Dialog open onOpenChange={handleExit}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <header className="w-full">
            <HeaderSection
              title={title}
              subtitle={description}
            />
          </header>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <PlatformData />
            <InfoData />
            <footer className="flex gap-3 justify-end pt-4 pb-4">
              <Button
                variant="ghost"
                onClick={handleExit}
              >
                Cancelar
              </Button>
              <Button
                variant="default"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Procesando...' : (dataDefault?.id ? 'Actualizar' : 'Guardar')}
              </Button>
            </footer>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

interface IPropsToast {
  title: string
  description: string
}

const CustomToast = (props: IPropsToast) => {
  const { title, description } = props
  return (
    <div className="flex flex-col">
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  )
}
