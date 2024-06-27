/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react'

import { TableGeneral } from '@/components'
import { IActions, IColumns } from '@/types'

import { useSponsors, useFiles } from '@/hooks/admin'
import { convertDate } from '@/utils/functions'

const columns: Array<IColumns> = [
  {
    key: 'key',
    label: 'ID',
    align: 'center',
  },
  {
    key: 'createdAt',
    label: 'Fecha de creación',
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

const listActions: Array<IActions> = [
  {
    label: 'Cambiar estado',
    key: 'status',
    href: 'status',
  },
]

export const ListSponsors = () => {
  const { getSponsors, sponsors, loading } = useSponsors()
  const { editField, loading: loadingFile } = useFiles()

  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    getSponsors(query)
  }, [query])

  const rows =
    sponsors?.map((sponsor) => {
      return {
        key: sponsor.id,
        image: RenderImage(sponsor.image),
        createdAt: convertDate(sponsor?.created_at),
        name: sponsor.name,
        status: sponsor.isActived,
        actions: 'actions',
      }
    }) || []

  return (
    <>
      <TableGeneral
        loading={loading || loadingFile}
        columns={columns}
        rows={rows}
        actionsList={listActions}
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
