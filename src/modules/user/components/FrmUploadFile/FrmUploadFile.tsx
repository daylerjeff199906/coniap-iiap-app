'use client'
import { HeaderSection } from '@/modules/core'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
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

  const date = infoData.data.dates.summary.end
  const dateFormatted = new Date(date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const isBefore = new Date(date) > new Date()

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
        newData = { ...rest, person_id: person?.id || '', file: url }
      } else {
        newData = { ...rest, person_id: person?.id || '', file: summary.file }
      }

      const resData = await updateDataSummary(summary.id, newData)
      if (!resData.message) {
        handleExit()
      }
    } else {
      if (file?.length > 0) {
        const fileUp = file as unknown as File[]
        const url = await uploadImage('files', fileUp[0])
        console.log('url', url)
        newData = {
          ...rest,
          person_id: person?.id || '',
          file: url,
          isActived: false,
          isApproved: false,
          isExternal: true,
        }
      } else {
        newData = {
          ...rest,
          person_id: person?.id || '',
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
    <>
      <Modal
        isOpen
        onClose={handleExit}
        size="2xl"
        radius="sm"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>
            <main className="w-full">
              <HeaderSection
                title="Subir archivo"
                subtitle="Sube er arcchivo de tu resúmen"
              />
            </main>
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form
                className="w-full flex flex-col gap-3"
                onSubmit={methods.handleSubmit(handleFormSubmit)}
              >
                <section
                  className={`p-4 border rounded-lg ${
                    isBefore
                      ? 'border-warning-500 bg-warning-100 text-warning-700'
                      : 'bg-danger-100 border-danger-500 text-danger-700'
                  }`}
                >
                  <p className="text-sm ">
                    <strong>Nota:</strong> La fecha límite para enviar resúmenes
                    es {dateFormatted}.{' '}
                    {isBefore
                      ? '¡Aún tienes tiempo!'
                      : '¡Ya pasó la fecha límite!'}
                  </p>
                </section>
                <TopicSection />
                <InfoSection />
                <AuthorsSection />
                <ActionsSummary />
                <MultimediaSection />
                <footer className="flex gap-3 items-center justify-end">
                  <Button
                    radius="sm"
                    type="submit"
                    isLoading={loading || loadingFile}
                    isDisabled={loading || loadingFile || !isBefore}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
