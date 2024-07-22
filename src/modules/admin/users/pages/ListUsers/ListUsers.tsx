/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { useUsers } from '@/hooks/admin'
import { convertDate } from '@/utils/functions'
import { TypesSearch } from './TypesSearch'
import { Selection } from '@nextui-org/react'
import { columns } from './columns'

export const ListUsers = () => {
  const { getListUsers, loading, users } = useUsers()
  const [query, setQuery] = useState<string>('')
  const [qtype, setQtype] = useState<string>('userName')

  useEffect(() => {
    getListUsers({
      column: qtype as 'userName' | 'email',
      query,
    })
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

  //To type search
  const handleTypeSearch = (val: Selection) => {
    const value = Object.values(val)[0]
    if (value === 'userName') {
      // updateFilter('qtype', '')
      setQtype('')
    } else {
      // updateFilter('qtype', value)
      setQtype(value)
    }
  }

  return (
    <>
      <TableGeneral
        columns={columns}
        rows={rows}
        loading={loading}
        onSearch={setQuery}
        searchValue={query}
        selectionMode="single"
        endInputSection={
          <TypesSearch
            selectedKey={qtype === 'userName' ? ['userName'] : ['email']}
            onSelectionChange={handleTypeSearch}
          />
        }
      />
    </>
  )
}
