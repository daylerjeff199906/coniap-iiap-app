/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { TableGeneral } from '@/components'
import { IColumns, IPerson } from '@/types'

import { useFiles } from '@/hooks/admin'
import { useFilterFromUrl } from '@/modules/core'

const columns: Array<IColumns> = [
  {
    key: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    key: 'level',
    label: 'Tipo de participante',
    align: 'start',
  },
  {
    key: 'name',
    label: 'Nombres',
    align: 'start',
  },
  {
    key: 'surnames',
    label: 'Apellidos',
    align: 'start',
  },
  {
    key: 'email',
    label: 'Email',
    align: 'start',
  },
  {
    key: 'phone',
    label: 'Teléfono',
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

interface IProps {
  dataList: IPerson[]
}

export const ListParticipants = (prop: IProps) => {
  const { dataList } = prop
  const { getParams, updateFilter } = useFilterFromUrl()
  const { editField, loading: editLoading } = useFiles()

  const query = getParams('query', '')

  const handleStatusChange = async (key: string, value: boolean) => {
    await editField(key, 'persons', 'isActived', value)
    // getPersons('')
  }

  const handleQuery = (value: string) => {
    updateFilter('query', value)
  }

  const persons =
    dataList?.map((speaker) => {
      return {
        key: String(speaker?.id),
        id: speaker?.id,
        name: speaker?.name,
        surname: speaker?.surName,
        email: speaker?.email,
        phone: speaker?.phone || 'No registrado',
        institution: speaker?.institution,
        level: speaker?.typePerson,
        status: speaker?.isActived,
        actions: 'actions',
      }
    }) || []

  return (
    <>
      <TableGeneral
        loading={editLoading}
        columns={columns}
        onValueStatusChange={(key: string | number, value: boolean) => {
          handleStatusChange(String(key), value)
        }}
        onSearch={handleQuery}
        searchValue={query}
        rows={persons}
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
