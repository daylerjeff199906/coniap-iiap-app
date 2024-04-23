'use client'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'

export default function Page() {
  return (
    <>
      <Modal isOpen={true}>
        <ModalContent>
          <ModalBody>
            <h1>Añadir resumen</h1>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
