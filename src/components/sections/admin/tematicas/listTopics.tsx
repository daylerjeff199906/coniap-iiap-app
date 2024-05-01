/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react'

import { TableGeneral } from '@/components'
import { IActions, IColumns } from '@/types'

import { useTopics } from '@/hooks/admin'
import { useFiles } from '@/hooks/admin'

const columns: Array<IColumns> = [
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

const actions: IActions[] = [
  {
    label: 'Editar',
    href: '/admin/tematicas/',
  },
]

export const ListTopicsSections = () => {
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

  return (
    <>
      <TableGeneral
        loading={loading || loadingFile}
        columns={columns}
        actionsList={actions}
        onValueStatusChange={(key: string | number, value: boolean) => {
          handleStatusChange(String(key), value)
        }}
        rows={
          topics
            ? topics?.map((topic) => {
                return {
                  key: topic.id,
                  image: RenderImage(topic.image),
                  name: topic.name,
                  description: topic.description,
                  status: topic.isActived,
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
