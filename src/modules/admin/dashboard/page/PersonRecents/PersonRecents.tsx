'use client'
import { TableGeneral } from '@/components'
import { IColumns, IPerson, IRows } from '@/types'
import { convertDate } from '@/utils/functions'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

const columns: IColumns[] = [
  {
    key: 'created_at',
    label: 'Fecha',
    align: 'start',
  },
  {
    key: 'name',
    label: 'Name',
    align: 'start',
  },
  {
    key: 'email',
    label: 'Email',
    align: 'start',
  },
  {
    key: 'typePerson',
    label: 'Type',
    align: 'start',
  },
  {
    key: 'isActived',
    label: 'Status',
    align: 'start',
  },
]

interface IProps {
  data: IPerson[]
}

export const PersonRecents = (props: IProps) => {
  const { data } = props

  const dataList: IRows[] = data?.map((item) => {
    return {
      key: Number(item.id),
      created_at: convertDate(item.created_at),
      name: item.name + ' ' + item.surName,
      email: item.email,
      typePerson:
        item.typePerson === 'speaker'
          ? 'Ponente'
          : item.typePerson === 'speaker_mg'
          ? 'Ponente Magistral'
          : 'Asistente',
      isActived: item.isActived ? 'Activo' : 'Inactivo',
    }
  })
  return (
    <div>
      <TableGeneral
        columns={columns}
        rows={dataList}
        disableInputSearch
        headerChildren={<Header />}
        selectionMode="single"
      />
    </div>
  )
}

export const Header = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col w-full">
        <h1 className="text-sm font-bold">Personas añadidas recientemente</h1>
        <p className="text-xs text-gray-500">
          Regisro de personas añadidas recientemente al sistema
        </p>
      </div>
      <div>
        <Button
          size="sm"
          variant="light"
          radius="sm"
          as={Link}
          href="/admin/participantes"
        >
          Ver todos
        </Button>
      </div>
    </div>
  )
}
