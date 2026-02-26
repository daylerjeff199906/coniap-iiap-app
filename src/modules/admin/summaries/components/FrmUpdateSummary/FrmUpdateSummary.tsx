/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useRouter } from 'next/navigation'
import { ISummary } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import { MultimediaSection } from './multimediaSection'
import { useSummaries, useFiles } from '@/hooks/admin'
import { LoadingPages } from '@/components'
import { TopicSection } from './TopicSection'
import { SpeakerSection } from './speakerSection'
import { PreviewDoc } from './PreviewDoc'
import { AuthorsSection } from './AuthorsSection'
import { HeaderSection } from '@/modules/core'
import { IconDeviceFloppy, IconX } from '@tabler/icons-react'
import { toast } from 'react-toastify'

interface IProps {
  summary?: ISummary
}

export const FrmUpdateSummary = (props: IProps) => {
  const { summary } = props
  const { updateDataSummary, createDataSummary, loading } = useSummaries()
  const { uploadImage, loading: loadingFile, deleteImage } = useFiles()

  const router = useRouter()

  const methods = useForm<ISummary>({
    defaultValues: summary,
  })

  const { isDirty } = methods.formState

  const handleFormSubmit: SubmitHandler<ISummary> = async (data: ISummary) => {
    const { file, person, topic, isNotification, ...rest } = data
    let newData: ISummary
    const fileIsArray = Array.isArray(file)

    try {
      if (summary?.id) {
        if (file?.length > 0 && fileIsArray) {
          const fileUp = file as unknown as File[]
          if (summary?.file) {
            await deleteImage(summary?.file)
          }
          const url = await uploadImage('files', fileUp[0])
          newData = { ...rest, file: url }
        } else {
          newData = { ...rest, file: summary?.file }
        }
        await updateDataSummary(summary?.id, newData)
        toast.success('Resumen actualizado exitosamente')
        handleCancel()
      } else {
        if (file?.length > 0) {
          const fileUp = file as unknown as File[]
          const url = await uploadImage('files', fileUp[0])
          newData = { ...rest, file: url, isActived: false, isApproved: false }
        } else {
          newData = { ...rest, file: '', isActived: false, isApproved: false }
        }
        const res = await createDataSummary(newData)
        if (res) {
          toast.success('Resumen creado exitosamente')
          handleCancel()
        }
      }
    } catch (error) {
      toast.error('Error al procesar el resumen')
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      <HeaderSection
        title={summary?.id ? 'Actualizar Resumen' : 'Nuevo Resumen'}
        subtitle={summary?.id ? `Editando propuesta: ${summary?.title}` : 'Completa el formulario para enviar una nueva propuesta de resumen'}
        showBackButton
        hrefBack="#"
      />

      <FormProvider {...methods}>
        <main className="flex flex-col lg:flex-row gap-6">
          <section className="w-full lg:max-w-xl shrink-0">
            <div className="bg-card border rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 space-y-8 h-full max-h-[calc(100vh-14rem)] overflow-y-auto custom-scrollbar">
                {loadingFile && (
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-xl animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <h2 className="text-sm font-bold text-primary uppercase tracking-tighter italic">
                      {summary?.id ? 'Actualizando' : 'Guardando'} Propuesta...
                    </h2>
                  </div>
                )}

                <form
                  onSubmit={methods.handleSubmit(handleFormSubmit)}
                  className="flex flex-col gap-8"
                >
                  <TopicSection loading={loading || loadingFile} />

                  <div className="space-y-4">
                    <Controller
                      name="title"
                      control={methods.control}
                      rules={{ required: 'El título es un campo obligatorio' }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="..."
                          className="rounded-xl"
                          disabled={loading || loadingFile}
                        />
                      )}
                    />
                  </div>

                  <SpeakerSection loading={loading || loadingFile} />
                  <AuthorsSection />
                  <MultimediaSection loading={loading || loadingFile} />

                  <div className="pt-6 border-t flex items-center justify-between sticky bottom-0 bg-card z-10">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleCancel}
                      className="font-bold text-muted-foreground gap-2"
                    >
                      <IconX size={18} />
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="gap-2 font-black px-8 rounded-xl shadow-lg hover:scale-105 transition-transform"
                    >
                      <IconDeviceFloppy size={20} />
                      {summary?.id ? 'Actualizar' : 'Guardar'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          <article className="flex-1 min-h-[600px]">
            <PreviewDoc />
          </article>
        </main>
      </FormProvider>
      <LoadingPages isOpen={loading || loadingFile} />
    </div>
  )
}
