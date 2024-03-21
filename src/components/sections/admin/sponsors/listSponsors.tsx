/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { useSpeakers } from '@/hooks/admin'
import { useEffect } from 'react'

const columns: Array<IColumns> = [
  {
    key: 'level',
    label: 'Nivel de estudio',
    align: 'start',
  },
  {
    key: 'name',
    label: 'Ponente',
    align: 'start',
  },
  {
    key: 'job',
    label: 'Puesto de trabajo',
    align: 'start',
  },
  {
    key: 'institution',
    label: 'Institución',
    align: 'start',
  },
  {
    key: 'status',
    label: 'Estado',
    align: 'center',
  },
  {
    key: 'actions',
    label: 'Acciones',
    align: 'center',
  },
]
export const ListSponsorsSections = () => {
  const { getSpekers, speakers, editSpeakerField, loading } = useSpeakers()

  // const searchParams = useSearchParams()

  // const isEdit = searchParams.get('edit') !== null

  useEffect(() => {
    getSpekers()
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (isEdit) {
  //       // Agregar verificación para event !== null
  //       const id = await searchParams.get('edit')
  //       if (id) {
  //         await getEventById(id)
  //       }
  //     } else {
  //       getEvents()
  //     }
  //   }

  //   fetchData()
  // }, [event, isEdit])

  const handleStatusChange = async (key: string, value: boolean) => {
    await editSpeakerField(key, 'isActive', value)
    getSpekers()
  }

  return (
    <>
      <TableGeneral
        loading={loading}
        columns={columns}
        onValueStatusChange={(key: string | number, value: boolean) => {
          handleStatusChange(String(key), value)
        }}
        rows={
          speakers
            ? speakers?.map((speaker) => {
                return {
                  key: speaker.id,
                  name: RenderColumnName(speaker.fullName, speaker.surName),
                  job: speaker.job,
                  institution: speaker.institution,
                  level: speaker.levelStudy,
                  status: speaker.isActive,
                  actions: 'actions',
                }
              })
            : []
        }
      />
    </>
  )
}

const RenderColumnName = (fullname: string, surname: string) => {
  return (
    <div className="flex flex-col">
      <p className="text-base font-bold">{fullname}</p>
      <p className="text-xs font-medium text-slate-500">{surname}</p>
    </div>
  )
}
