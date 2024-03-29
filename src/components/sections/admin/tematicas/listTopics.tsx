/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { Image } from '@nextui-org/react'

import { TableGeneral } from '@/components'
import { IColumns } from '@/types'

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
    label: 'Colaborador',
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
export const ListTopicsSections = ({ loadData }: { loadData: boolean }) => {
  const { getTopics, topics, loading } = useTopics()
  const { editField, loading: loadingFile } = useFiles()

  // const searchParams = useSearchParams()

  // const isEdit = searchParams.get('edit') !== null

  useEffect(() => {
    getTopics()
  }, [])

  useEffect(() => {
    if (loadData) {
      getTopics()
    }
  }, [loadData])

  const handleStatusChange = async (key: string, value: boolean) => {
    await editField(key, 'topics', 'isActived', value)
    getTopics()
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
