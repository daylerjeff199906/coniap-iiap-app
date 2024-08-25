'use client'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'

interface IProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const ModalAviso = (props: IProps) => {
  const { isOpen, setIsOpen } = props

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      radius="sm"
      size="2xl"
    >
      <ModalContent>
        <ModalBody>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '0',
              paddingTop: '100%',
              paddingBottom: '0',
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              marginTop: '1.6em',
              marginBottom: '0.9em',
              overflow: 'hidden',
              borderRadius: '8px',
              willChange: 'transform',
            }}
          >
            <iframe
              loading="lazy"
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGO4X-Wvxg&#x2F;G3Z2j3L8qy0mgbPAqNGoKg&#x2F;view?embed"
              allow="fullscreen"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                border: 'none',
                padding: '0',
                margin: '0',
              }}
            ></iframe>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
