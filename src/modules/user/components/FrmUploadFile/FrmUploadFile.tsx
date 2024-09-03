'use client'
import { AlertCustom, HeaderSection } from '@/modules/core'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'

import { MultimediaSection } from './multimediaSection'
import { ISummary } from '@/types'
import { TopicSection } from './TopicSection'
import { InfoSection } from './InfoSection'
import { useFiles, useSummaries } from '@/hooks/admin'

import infoData from '@/utils/json/infoConiap.json'
import { AuthorsSection } from './AuthorsSection'
import { ActionsSummary } from './ActionsSummary'
import { LayoutFrmHorizontal } from '@/modules/admin'
import { getConferenceStatus, formatDate } from '@/utils/functions'

interface IProps {
  summary?: ISummary
}

export const FrmUploadFile = (props: IProps) => {
  const { summary } = props

  const methods = useForm<ISummary>({
    defaultValues: summary,
  })

  const { updateDataSummary, createDataSummary, loading } = useSummaries()
  const { uploadImage, loading: loadingFile, deleteImage } = useFiles()
  const router = useRouter()

  const dateFormatted = formatDate(
    infoData.data.dates.summary.end,
    'DD/MM/YYYY'
  )
  const { isBeforeSummary } = getConferenceStatus(infoData.data.dates)

  const handleFormSubmit: SubmitHandler<ISummary> = async (data: ISummary) => {
    const { file, person, topic, ...rest } = data
    const fileIsArray = Array.isArray(file)

    let newData: ISummary
    if (summary?.id) {
      if (file?.length > 0 && fileIsArray) {
        const fileUp = file as unknown as File[]

        if (summary.file) {
          await deleteImage(summary.file)
        }
        const url = await uploadImage('files', fileUp[0])
        newData = {
          ...rest,
          person_id: person?.id || '',
          file: url,
          topic_id: topic?.id || '',
        }
      } else {
        newData = {
          ...rest,
          person_id: person?.id || '',
          file: summary.file,
          topic_id: topic?.id || '',
        }
      }

      const resData = await updateDataSummary(summary.id, newData)
      if (!resData.message) {
        handleExit()
      }
    } else {
      if (file?.length > 0) {
        const fileUp = file as unknown as File[]
        const url = await uploadImage('files', fileUp[0])
        newData = {
          ...rest,
          person_id: person?.id || '',
          topic_id: topic?.id || '',
          file: url,
          isActived: false,
          isApproved: false,
          isExternal: true,
        }
      } else {
        newData = {
          ...rest,
          person_id: person?.id || '',
          topic_id: topic?.id || '',
          file: '',
          isActived: false,
          isApproved: false,
          isExternal: true,
        }
      }

      const resData = await createDataSummary(newData)

      if (!resData.message) {
        handleExit()
      }
    }
  }

  const handleExit = () => {
    router.push('/dashboard/files')
  }

  return (
    <main className="w-full flex flex-col gap-5">
      <HeaderSection
        showBackButton
        title={summary?.id ? 'Editar resumen' : 'Nuevo resumen'}
        subtitle={
          summary?.id
            ? 'Edita la información de tu resumen y envía el archivo de tu resumen'
            : 'Crea tu tema y envía el archivo de tu resumen de tu tema'
        }
        hrefBack="/dashboard/files"
      />
      <FormProvider {...methods}>
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <AlertCustom
            type={isBeforeSummary ? 'warning' : 'error'}
            showIcon
            title="Atención"
            message={`La fecha límite para enviar resúmenes es ${dateFormatted}. ${
              isBeforeSummary
                ? '¡Aún puedes enviar tu resumen!'
                : 'La fecha límite ha pasado, no puedes enviar tu resumen.'
            }`}
          />
          <LayoutFrmHorizontal
            title="Información del resumen"
            subtitle="Selecciona la temática e ingresa el título de tu resumen"
          >
            <TopicSection />
            <InfoSection />
          </LayoutFrmHorizontal>
          <LayoutFrmHorizontal
            title="Autores"
            subtitle="Ingresa los datos de los autores del resumen"
          >
            <AuthorsSection />
            <ActionsSummary />
          </LayoutFrmHorizontal>
          <LayoutFrmHorizontal
            title="Multimedia"
            subtitle="Sube el archivo de tu resumen"
          >
            <MultimediaSection />
          </LayoutFrmHorizontal>
          <footer className="flex gap-3 items-center justify-end">
            <Button
              radius="sm"
              type="submit"
              isLoading={loading || loadingFile}
              isDisabled={loading || loadingFile || !isBeforeSummary}
              className="button-dark"
            >
              Guardar
            </Button>
            <Button
              radius="sm"
              onPress={handleExit}
            >
              Cancelar
            </Button>
          </footer>
        </form>
      </FormProvider>
    </main>
  )
}
