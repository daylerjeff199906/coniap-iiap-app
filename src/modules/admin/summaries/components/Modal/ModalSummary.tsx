'use client'
import { useRouter } from 'next/navigation'
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
import { ISummary } from '@/types'

interface IProps {
  isEdit: boolean
  summary: ISummary
  children?: React.ReactNode
}

export const ModalSummary = (props: IProps) => {
  const { summary, children, isEdit } = props
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  return (
    <>
      <Modal
        isOpen
        onClose={handleClose}
        size={isEdit ? '3xl' : '2xl'}
      >
        <ModalContent>
          <ModalHeader>
            {isEdit ? (
              <h1 className="text-lg font-semibold">{summary.title}</h1>
            ) : (
              <h1 className="text-lg font-semibold">Detalles del resumen</h1>
            )}
          </ModalHeader>
          <Divider />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
