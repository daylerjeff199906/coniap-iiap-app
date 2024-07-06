/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { TableGeneral } from '@/components'
import { useUsers } from '@/hooks/admin'
import { IColumns } from '@/types'
import { useEffect } from 'react'

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
    key: 'role',
    label: 'Roles',
    align: 'start',
  },
]

export const ListUsers = () => {
  const { getListUsers, loading, users } = useUsers()

  useEffect(() => {
    getListUsers()
  }, [])

  const rows =
    users?.map((user) => {
      return {
        key: String(user.id),
        num: user.id,
        created_at: user.created_at,
        userName: user.userName,
        email: user.email,
        role: user.role,
        person: user?.person ? user.person.name : 'No asignado',
      }
    }) || []

  return (
    <>
      <TableGeneral
        columns={columns}
        rows={rows}
        loading={loading}
      />
    </>
  )
}
