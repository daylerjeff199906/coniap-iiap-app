'use client'
import { useState } from 'react'
import infoData from '@/utils/json/infoConiap.json'
import { getConferenceStatus } from '@/utils/functions'
export const AvisoSection = () => {
  const [isOpen, setIsOpen] = useState(infoData.data.showAviso)

  const { isBeforeSummary } = getConferenceStatus(infoData.data.dates)

  return (
    <>

    </>
  )
}
