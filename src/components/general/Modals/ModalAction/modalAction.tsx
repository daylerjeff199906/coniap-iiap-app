'use client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react'

interface IProps {
  isOpen: boolean
  setOpen: (value: boolean) => void
  title: string
  message: string
  onPress: () => void
}

export const ModalAction = ({
  isOpen,
  setOpen,
  title,
  message,
  onPress,
}: IProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setOpen(false)
      }}
    >
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div>
            <p>{message}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onPress={onPress}
          >
            Aceptar
          </Button>
          <Button
            onPress={() => {
              setOpen(false)
            }}
            color="danger"
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
