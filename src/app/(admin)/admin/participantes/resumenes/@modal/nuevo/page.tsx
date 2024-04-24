'use client'
import { useRouter } from 'next/navigation'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'

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
      >
        <ModalContent>
          <ModalBody>
            <div>Hola</div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
