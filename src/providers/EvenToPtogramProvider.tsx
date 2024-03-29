/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react'

import { usePrograms, useEvents, useFiles } from '@/hooks/admin'
import { IEvent, IProgram } from '@/types'

export const EventToProgramContext = createContext<{
  program: IProgram | null
  getProgramById: (id: string) => void
  createEventInProgram: (data: IEvent, program: IProgram) => void
  getEvents: (query: string) => void
  events: IEvent[] | null
  loading: boolean
}>({
  program: null,
  events: null,
  getProgramById: () => {},
  createEventInProgram: () => {},
  getEvents: () => {},
  loading: false,
})

export const EventToProgramProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { getProgramById, program } = usePrograms()
  const { createDataEvent, getEvents, events } = useEvents()
  const { editField } = useFiles()

  const [loading, setLoading] = useState(false)

  const createEventInProgram = async (
    data: IEvent,
    programSelected: IProgram
  ) => {
    setLoading(true)
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
    const idEvent = await createDataEvent(newData)
    // Obtén los eventos actuales del programa seleccionado
    const currentEvents = programSelected.events || []
    // Agrega el nuevo evento a la lista existente de eventos del programa
    const updatedEvents = [...currentEvents, { ...newData, id: idEvent }]
    await editField(programSelected.id, 'programs', 'events', updatedEvents)
    await getProgramById(programSelected.id)
    setLoading(false)
  }

  return (
    <EventToProgramContext.Provider
      value={{
        program,
        getProgramById,
        createEventInProgram,
        getEvents,
        events,
        loading,
      }}
    >
      {children}
    </EventToProgramContext.Provider>
  )
}

export const useLogicEventToProgram = () => useContext(EventToProgramContext)
