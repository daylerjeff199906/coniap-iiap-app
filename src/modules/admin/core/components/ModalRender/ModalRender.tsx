'use client'

import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'

interface IProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}
export const ModalRender = (props: IProps) => {
  const { children, footer, header } = props
  return (
    <Modal isOpen>
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <Divider />
        <ModalBody>
          <main className="w-full p-4s">{children}</main>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end">{footer}</div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
