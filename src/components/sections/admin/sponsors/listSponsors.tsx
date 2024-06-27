/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react'

import { TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { useSponsors } from '@/hooks/admin'
import { useFiles } from '@/hooks/admin'

const columns: Array<IColumns> = [
  {
    key: 'key',
    label: 'ID',
    align: 'center',
  },
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

  const [query, setQuery] = useState<string>('')

  // const searchParams = useSearchParams()

  // const isEdit = searchParams.get('edit') !== null

  useEffect(() => {
    getSponsors(query)
  }, [query])

  const handleStatusChange = async (key: string, value: boolean) => {
    await editField(key, 'sponsors', 'isActived', value)
    getSponsors('')
  }

  return (
    <>
      <TableGeneral
        loading={loading || loadingFile}
        columns={columns}
        rows={
          sponsors
            ? sponsors?.map((sponsor) => {
                return {
                  key: sponsor.id,
                  id: sponsor.id,
                  image: RenderImage(sponsor.image),
                  name: sponsor.name,
                  status: sponsor.isActived,
                  actions: 'actions',
                }
              })
            : []
        }
      />
    </>
  )
}

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
