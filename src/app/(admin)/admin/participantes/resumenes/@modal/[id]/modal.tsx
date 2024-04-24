'use client'
import { useRouter } from 'next/navigation'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import { ISummary } from '@/types'

interface IProps {
  summary: ISummary
}

export const ModalDetails = (props: IProps) => {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  return (
    <>
      <Modal
        isOpen
        onClose={handleClose}
        size="3xl"
      >
        <ModalHeader>
          <h1 className="text-lg font-semibold">Nuevo resumen</h1>
        </ModalHeader>
        <ModalContent>
          <ModalBody>
            {/* <FrmUpdateSummary summary={{} as ISummary} /> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
