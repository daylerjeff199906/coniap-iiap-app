import { Modal, ModalBody, ModalContent } from '@nextui-org/react'

interface IProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const FrmUpdateSummary = (props: IProps) => {
  const { isOpen, setIsOpen } = props
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalContent>
          <ModalBody>
            <h1>Formulario de actualización de resumen</h1>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
