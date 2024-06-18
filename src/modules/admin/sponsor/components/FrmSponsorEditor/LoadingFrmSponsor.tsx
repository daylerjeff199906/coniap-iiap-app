/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Skeleton,
} from '@nextui-org/react'

export const LoadingFrmSponsor = () => {
  return (
    <>
      <Modal
        isOpen
        size="3xl"
      >
        <ModalContent>
          <ModalHeader>
            <Skeleton className="w-1/4 h-4 rounded-md" />
            <Skeleton className="w-full h-6 rounded-md" />
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4 w-full">
              <div className="w-full space-y-3">
                <Skeleton className="w-1/4 h-4 rounded-md" />
                <Skeleton className="w-full h-6 rounded-md" />
              </div>
              <div className="w-full space-y-3">
                <Skeleton className="w-1/4 h-4 rounded-md" />
                <Skeleton className="w-full h-12 rounded-md" />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
