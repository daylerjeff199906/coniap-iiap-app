'use client'

import {  } from '@nextui-org/react'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'

interface IProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | '2xl' | '3xl'
}
export const ModalRender = (props: IProps) => {
  const { children, footer, header, size } = props
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <Modal
      isOpen
      radius="sm"
      size={size || 'md'}
      onClose={handleBack}
    >
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <Separator />
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
