/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useRouter } from 'next/navigation'
import { ISummary } from '@/types'
import { Button, Input } from '@nextui-org/react'
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
import { IconArrowNarrowLeft } from '@tabler/icons-react'

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

  const handleFormSubmit: SubmitHandler<ISummary> = async (data: ISummary) => {
    const { file, person, topic, ...rest } = data
    let newData: ISummary
    const fileIsArray = Array.isArray(file)
    const nameFile = `${person?.surName}-${person?.name}-${
      summary?.title || 'RESUMEN CONIAP 2024'
    }-${new Date().getTime()}`

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
      handleCancel()
    } else {
      if (file?.length > 0) {
        const fileUp = file as unknown as File[]
        const url = await uploadImage('files', fileUp[0])

        newData = { ...rest, file: url, isActived: false, isApproved: false }
      } else {
        newData = { ...rest, file: '', isActived: false, isApproved: false }
      }

      const summary = await createDataSummary(newData)

      if (!summary.message) {
        handleCancel()
      }
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <>
      <FormProvider {...methods}>
        <div className="pb-2">
          <h1 className="text-lg sm:text-2xl font-bold">
            {summary?.id ? 'Actualizar resumen' : 'Nuevo resumen'}
          </h1>
        </div>
        <main className="flex flex-col sm:flex-row gap-2 f-full">
          <section className="w-full max-w-lg border-r h-full max-h-[calc(100vh-11rem)] overflow-y-auto bg-white flex flex-col gap-3 p-2 lg:p-4 border rounded-md">
            <section className="flex justify-start">
              <Button
                radius="sm"
                variant="light"
                onPress={handleCancel}
                startContent={
                  <IconArrowNarrowLeft
                    size={16}
                    className="text-gray-600"
                  />
                }
                className="text-gray-600"
              >
                Regresar
              </Button>
            </section>
            <form
              onSubmit={methods.handleSubmit(handleFormSubmit)}
              className="flex flex-col gap-3"
            >
              {loadingFile && (
                <div className="py-1">
                  <h2 className="text-sm text-gray-500 animate-pulse">
                    {summary?.id ? 'Actualizando resumen' : 'Guardando resumen'}
                  </h2>
                </div>
              )}
              <TopicSection loading={loading || loadingFile} />

              <Controller
                name="title"
                control={methods.control}
                rules={{ required: 'Este campo es requerido' }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    aria-label="Título del resumen"
                    label="Título del tema del resumen"
                    labelPlacement="outside"
                    placeholder="Título"
                    value={value}
                    onChange={onChange}
                    radius="sm"
                    isInvalid={methods.formState.errors?.title !== undefined}
                    errorMessage={methods.formState.errors?.title?.message}
                    isDisabled={loading || loadingFile}
                  />
                )}
              />

              <SpeakerSection loading={loading || loadingFile} />
              <AuthorsSection />
              <MultimediaSection loading={loading || loadingFile} />

              <footer className="pt-4">
                <div className="flex items-center justify-end gap-3">
                  <Button
                    type="submit"
                    radius="sm"
                    color="primary"
                    isLoading={loading || loadingFile}
                    isDisabled={loading || loadingFile}
                    className="button-dark"
                  >
                    {summary?.id ? 'Actualizar' : 'Guardar'}
                  </Button>
                  <Button
                    radius="sm"
                    type="reset"
                    onPress={handleCancel}
                  >
                    Cancelar
                  </Button>
                </div>
              </footer>
            </form>
          </section>
          <article className="w-full">
            <PreviewDoc />
          </article>
        </main>
      </FormProvider>
      <LoadingPages isOpen={loading || loadingFile} />
    </>
  )
}
