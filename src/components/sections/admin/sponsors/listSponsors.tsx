/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { Image } from '@nextui-org/react'

import { TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { useSponsors } from '@/hooks/admin'
import { useFiles } from '@/hooks/admin'

const columns: Array<IColumns> = [
  {
    key: 'image',
    label: 'Imagen',
    align: 'center',
  },
  {
    key: 'name',
    label: 'Colaborador',
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
  const { editField, loading: loadingFile } = useFiles()

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

  const handleStatusChange = async (key: string, value: boolean) => {
    await editField(key, 'sponsors', 'isActive', value)
    getSponsors()
  }

  return (
    <>
      <TableGeneral
        loading={loading || loadingFile}
        columns={columns}
        onValueStatusChange={(key: string | number, value: boolean) => {
          handleStatusChange(String(key), value)
        }}
        rows={
          sponsors
            ? sponsors?.map((sponsor) => {
                return {
                  key: sponsor.id,
                  image: RenderImage(sponsor.image),
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

const RenderImage = (image: string) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={image}
        alt="sponsor"
        width={50}
        height={50}
        radius="none"
      />
    </div>
  )
}
