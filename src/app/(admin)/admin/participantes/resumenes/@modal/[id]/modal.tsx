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
import { FrmUpdateSummary } from '@/modules/admin'

interface IProps {
  summary: ISummary
}

export const ModalDetails = (props: IProps) => {
  const { summary } = props
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
        <ModalHeader>
          <h1 className="text-lg font-semibold">{summary.title}</h1>
        </ModalHeader>
        <Divider />
        <ModalContent>
          <ModalBody>
            <FrmUpdateSummary summary={summary} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
