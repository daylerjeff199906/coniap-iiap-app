'use client'
import { useRouter } from 'next/navigation'
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
import { ISummary } from '@/types'

interface IProps {
  summary: ISummary
  children?: React.ReactNode
}

export const ModalSummary = (props: IProps) => {
  const { summary, children } = props
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
            <h1 className="text-lg font-semibold">{summary.title}</h1>
          </ModalHeader>
          <Divider />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
