'use client'
import { ModalAviso } from '@/modules/core'
import { useState } from 'react'
import infoData from '@/utils/json/infoConiap.json'

function parseDate(date: string) {
  return new Date(date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const AvisoSection = () => {
  const [isOpen, setIsOpen] = useState(true)

  // const dateSpeaker = infoData.data.dates.summary.end
  // const isBeforeSpeaker = new Date(dateSpeaker) > new Date()
  const isBeforeSpeaker = true

  return (
    <>
      {isBeforeSpeaker && (
        <ModalAviso
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  )
}
