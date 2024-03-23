/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react'

import { usePrograms, useEvents, useFiles } from '@/hooks/admin'
import { IEvent, IProgram } from '@/types'

export const EventToProgramContext = createContext<{
  program: IProgram | null
  getProgramById: (id: string) => void
  createEventInProgram: (data: IEvent, program: IProgram) => void
}>({
  program: null,
  getProgramById: () => {},
  createEventInProgram: () => {},
})

export const EventToProgramProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { getProgramById, program } = usePrograms()
  const { createEvent } = useEvents()
  const { editField } = useFiles()

  const createEventInProgram = async (
    data: IEvent,
    programSelected: IProgram
  ) => {
    const newData = {
      ...data,
      place: '',
      banner: '',
      images: [],
      shortDescription: data.shortDescription || '',
      customContent: data.customContent || '',
      linkZoom: data.linkZoom || '',
      linkYoutube: data.linkYoutube || '',
      linkFacebook: data.linkFacebook || '',
      idProgram: programSelected?.id || '',
      date: programSelected.date || '',
      inProgram: true,
      isActived: false,
      idTypeEvent: '',
    }
    console.log(newData)
    // const idEvent = await createEvent(newData)
    // await editField('programs', programSelected.id, 'events', [
    //   ...(programSelected.events || []),
    //   idEvent,
    // ])
  }

  return (
    <EventToProgramContext.Provider
      value={{
        program,
        getProgramById,
        createEventInProgram,
      }}
    >
      {children}
    </EventToProgramContext.Provider>
  )
}

export const useLogicEventToProgram = () => useContext(EventToProgramContext)
