import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'

interface IProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const FrmAddSponsor = (props: IProps) => {
  const { isOpen, onOpenChange } = props
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Añadir colaborador</ModalHeader>
          <ModalBody>Frm</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
