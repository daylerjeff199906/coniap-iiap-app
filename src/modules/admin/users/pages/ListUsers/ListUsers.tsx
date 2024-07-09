/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { useUsers } from '@/hooks/admin'
import { IColumns } from '@/types'
import { convertDate } from '@/utils/functions'

const columns: IColumns[] = [
  {
    key: 'num',
    label: '#',
    align: 'start',
  },
  {
    key: 'created_at',
    label: 'F. Creación',
    align: 'start',
  },
  {
    key: 'userName',
    label: 'User Name',
    align: 'start',
  },
  {
    key: 'email',
    label: 'Email',
    align: 'start',
  },
  {
    key: 'person',
    label: 'Persona',
    align: 'start',
  },
  {
    key: 'emailVerified',
    label: 'Email Verificado',
    align: 'center',
  },
  {
    key: 'role',
    label: 'Roles',
    align: 'start',
  },
  {
    key: 'actions',
    label: 'Acciones',
    align: 'center',
  },
]

export const ListUsers = () => {
  const { getListUsers, loading, users } = useUsers()
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    getListUsers()
  }, [query])

  const rows =
    users?.map((user) => {
      return {
        key: String(user.id),
        num: user.id,
        created_at: user?.created_at
          ? convertDate(user.created_at)
          : 'No asignado',
        userName: user.userName,
        email: user.email,
        role: user.role ? user.role.join(', ') : 'No asignados',
        emailVerified: user.emailVerified ? 'Si' : 'No',
        person: user?.person ? user.person.name : 'No asignado',
      }
    }) || []

  return (
    <>
      <TableGeneral
        columns={columns}
        rows={rows}
        loading={loading}
        onSearch={setQuery}
        searchValue={query}
      />
    </>
  )
}
