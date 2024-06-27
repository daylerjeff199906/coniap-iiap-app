/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { TableGeneral } from '@/components'
import { useUsers } from '@/hooks/admin'
import { IColumns } from '@/types'
import { useEffect } from 'react'

const columns: IColumns[] = [
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
    key: 'role',
    label: 'Role',
    align: 'start',
  },
]

export const ListUsers = () => {
  const { getListUsers, users, loading } = useUsers()

  useEffect(() => {
    getListUsers()
  }, [])

  const rows =
    users?.map((user) => {
      return {
        key: user.id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      }
    }) || []

  return (
    <>
      <TableGeneral
        columns={columns}
        rows={rows}
      />
    </>
  )
}
