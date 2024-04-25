'use client'
import { useRouter } from 'next/navigation'
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
import { FrmUpdateSummary } from '@/modules/admin'
import { ISummary } from '@/types'

export default function Page() {
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
        <ModalContent>
          <ModalHeader>
            <h1 className="text-lg font-semibold">Nuevo resumen</h1>
          </ModalHeader>
          <Divider />
          <ModalBody>
            <FrmUpdateSummary summary={{} as ISummary} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
