/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { useSponsors } from '@/hooks/admin'
import { useEffect } from 'react'

const columns: Array<IColumns> = [
  {
    key: 'name',
    label: 'Ponente',
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
  const { getSponsors, sponsors, loading } = useSponsors()

  // const searchParams = useSearchParams()

  // const isEdit = searchParams.get('edit') !== null

  useEffect(() => {
    getSponsors()
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

  // const handleStatusChange = async (key: string, value: boolean) => {
  //   await editSpeakerField(key, 'isActive', value)
  //   getSpekers()
  // }

  return (
    <>
      <TableGeneral
        loading={loading}
        columns={columns}
        // onValueStatusChange={(key: string | number, value: boolean) => {
        //   handleStatusChange(String(key), value)
        // }}
        rows={
          sponsors
            ? sponsors?.map((sponsor) => {
                return {
                  key: sponsor.id,
                  name: sponsor.name,
                  status: sponsor.isActive,
                  actions: 'actions',
                }
              })
            : []
        }
      />
    </>
  )
}

// const RenderColumnName = (fullname: string, surname: string) => {
//   return (
//     <div className="flex flex-col">
//       <p className="text-base font-bold">{fullname}</p>
//       <p className="text-xs font-medium text-slate-500">{surname}</p>
//     </div>
//   )
// }
