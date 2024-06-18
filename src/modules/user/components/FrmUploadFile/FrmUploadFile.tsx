'use client'
import { useState } from 'react'
import { HeaderSection } from '@/modules/core'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'

import { MultimediaSection } from './multimediaSection'
import { ISummary } from '@/types'
import { TopicSection } from './TopicSection'
import { InfoSection } from './InfoSection'
import { useFiles, useSummaries } from '@/hooks/admin'

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

  const handleFormSubmit: SubmitHandler<ISummary> = async (data: ISummary) => {
    const { file, person, topic, ...rest } = data
    let newData: ISummary

    if (summary?.id) {
      if (file?.length > 0) {
        const fileUp = file as unknown as File[]

        if (summary.file) {
          await deleteImage(summary.file)
        }
        const url = await uploadImage('files', fileUp[0])
        newData = { ...rest, file: url }
      } else {
        newData = { ...rest, file: summary.file }
      }

      await updateDataSummary(summary.id, newData)
    } else {
      if (file?.length > 0) {
        const fileUp = file as unknown as File[]
        const url = await uploadImage('files', fileUp[0])

        newData = { ...rest, file: url, isActived: false, isApproved: false }
      } else {
        newData = { ...rest, file: '', isActived: false, isApproved: false }
      }

      const resData = await createDataSummary(newData)

      if (!resData.message) {
        router.push('/dashboard/files', {
          scroll: true,
        })
      }
    }
  }

  return (
    <>
      <Modal
        isOpen
        onClose={() => {}}
        size="2xl"
        radius="sm"
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
                <InfoSection />
                <MultimediaSection />
                <TopicSection />
              </form>
            </FormProvider>
          </ModalBody>
          <ModalFooter>
            <footer className="flex gap-3 items-center">
              <Button
                radius="sm"
                onPress={() => methods.handleSubmit(handleFormSubmit)}
                isLoading={loading || loadingFile}
                isDisabled={loading || loadingFile}
              >
                Guardar
              </Button>
              <Button radius="sm">Cancelar</Button>
            </footer>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
