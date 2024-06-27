/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useRouter } from 'next/navigation'
import { ISummary } from '@/types'
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
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

interface IProps {
  summary: ISummary
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

    if (summary.id) {
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
      <Modal
        isOpen={true}
        onClose={handleCancel}
        size="3xl"
      >
        <ModalContent>
          <ModalHeader>
            <h2 className="text-xl font-bold">
              {summary.id ? 'Actualizar resumen' : 'Agrega resumen'}
            </h2>
          </ModalHeader>
          <Divider />
          <ModalBody>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(handleFormSubmit)}
                className="p-4 flex flex-col gap-3"
              >
                {loadingFile && (
                  <div className="py-1">
                    <h2 className="text-sm text-gray-500 animate-pulse">
                      {summary.id
                        ? 'Actualizando resumen'
                        : 'Guardando resumen'}
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
                <MultimediaSection loading={loading || loadingFile} />

                <footer>
                  <div className="flex items-center justify-end gap-3">
                    <Button
                      type="submit"
                      size="sm"
                      radius="sm"
                      color="primary"
                      isLoading={loading || loadingFile}
                      isDisabled={loading || loadingFile}
                    >
                      {summary.id ? 'Actualizar' : 'Guardar'}
                    </Button>
                    <Button
                      size="sm"
                      radius="sm"
                      type="reset"
                      onPress={handleCancel}
                    >
                      Cancelar
                    </Button>
                  </div>
                </footer>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
      <LoadingPages isOpen={loading || loadingFile} />
    </>
  )
}
