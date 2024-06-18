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
  message?: string
  onPress: () => void
  bodyMessage?: React.ReactNode
}

export const ModalAction = ({
  isOpen,
  setOpen,
  title,
  message,
  bodyMessage,
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
          {message ? (
            <div>
              <p>{message}</p>
            </div>
          ) : (
            bodyMessage
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onPress={onPress}
            radius="sm"
          >
            Aceptar
          </Button>
          <Button
            onPress={() => {
              setOpen(false)
            }}
            color="danger"
            radius="sm"
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
