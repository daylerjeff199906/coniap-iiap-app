'use client'
import { useRouter } from 'next/navigation'
import {  } from '@nextui-org/react'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogBody, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { ISummary } from '@/types'

interface IProps {
  isEdit: boolean
  summary: ISummary
  children?: React.ReactNode
}

export const ModalSummary = (props: IProps) => {
  const { summary, children, isEdit } = props
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  return (
    <>
      <Modal
        isOpen
        onClose={handleClose}
        size={isEdit ? '3xl' : '2xl'}
      >
        <ModalContent>
          <ModalHeader>
            {isEdit ? (
              <h1 className="text-lg font-semibold">{summary.title}</h1>
            ) : (
              <h1 className="text-lg font-semibold">Detalles del resumen</h1>
            )}
          </ModalHeader>
          <Separator />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
