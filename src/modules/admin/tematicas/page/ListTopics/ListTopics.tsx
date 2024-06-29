/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react'

import { TableGeneral } from '@/components'
import { IActions, IColumns } from '@/types'

import { useTopics } from '@/hooks/admin'
import { useFiles } from '@/hooks/admin'
import { convertDate } from '@/utils/functions'

const columns: Array<IColumns> = [
  {
    key: 'key',
    label: 'Id',
    align: 'start',
  },
  {
    key: 'createdAt',
    label: 'Creado',
    align: 'start',
  },
  {
    key: 'image',
    label: 'Imagen',
    align: 'center',
  },
  {
    key: 'name',
    label: 'Temas',
    align: 'start',
  },
  {
    key: 'description',
    label: 'Descripción',
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

export const ListTopics = () => {
  const { getTopics, topics, loading } = useTopics()
  const { editField, loading: loadingFile } = useFiles()
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    getTopics(query)
  }, [query])

  const handleStatusChange = async (key: string, value: boolean) => {
    await editField(key, 'topics', 'isActived', value)
    getTopics('')
  }

  const rows = topics
    ? topics?.map((topic) => {
        return {
          key: topic?.id,
          createdAt: convertDate(topic?.created_at),
          image: RenderImage(topic?.image),
          name: topic?.name,
          description: topic?.description,
          status: topic?.isActived,
          actions: 'actions',
        }
      })
    : []

  return (
    <>
      <TableGeneral
        loading={loading || loadingFile}
        columns={columns}
        rows={rows}
      />
    </>
  )
}

const RenderImage = (image: string) => {
  return (
    <div className="flex flex-col justify-center items-center bg-black/70 rounded-full">
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
