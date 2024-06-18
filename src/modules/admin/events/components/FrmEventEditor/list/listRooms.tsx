/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components/general'
import { IColumns, IEvent, IRows } from '@/types'

import { useSalas } from '@/hooks/admin'
import { useFormContext } from 'react-hook-form'

const columns: IColumns[] = [
  {
    label: '#',
    key: 'key',
  },
  {
    label: 'Sala',
    key: 'name',
  },
  {
    label: 'Url',
    key: 'url',
  },
  {
    label: 'Plataforma',
    key: 'platform',
  },
]

interface IProps {
  onSetOpen: (value: boolean) => void
}

export const ListRooms = (props: IProps) => {
  const { getRooms, listRooms, loading } = useSalas()
  const { setValue } = useFormContext<IEvent>()
  const { onSetOpen } = props

  const [query, setQuery] = useState('')

  useEffect(() => {
    getRooms(query)
  }, [query])

  const onSelectionChange = (row: any) => {
    const full_name = row.key + ' - ' + row.name + ' - ' + row.platform
    setValue('sala.id', row.key)
    setValue('sala_name', full_name)
    onSetOpen(false)
  }

  const rows =
    listRooms?.map((room) => {
      return {
        key: room.id,
        name: room.name,
        url: room.url,
        platform: room.platform,
      }
    }) || []

  return (
    <>
      <section className="">
        <TableGeneral
          columns={columns}
          selectionMode="single"
          onSelectionChange={(row) => {
            onSelectionChange(row)
          }}
          loading={loading}
          onSearch={(value) => setQuery(value)}
          searchValue={query}
          rows={rows}
        />
      </section>
    </>
  )
}
