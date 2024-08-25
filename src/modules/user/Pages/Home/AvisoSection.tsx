'use client'

import { ModalAviso } from '@/modules/core'
import { useState } from 'react'

export const AvisoSection = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <ModalAviso
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  )
}
