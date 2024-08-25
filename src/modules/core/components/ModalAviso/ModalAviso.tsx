'use client'
import { Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react'

interface IProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const ModalAviso = (props: IProps) => {
  const { isOpen, setIsOpen } = props

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      radius="sm"
      size="4xl"
    >
      <ModalContent>
        <ModalBody></ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
