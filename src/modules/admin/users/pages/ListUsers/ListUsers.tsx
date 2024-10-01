/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { useUsers } from '@/hooks/admin'
import { formatDate } from '@/utils/functions'
import { TypesSearch } from './TypesSearch'
import { Selection } from '@nextui-org/react'
import { columns } from './columns'

export const ListUsers = () => {
  const { getListUsers, loading, users } = useUsers()
  const [query, setQuery] = useState<string>('')
  const [qtype, setQtype] = useState<string>('userName')
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    getListUsers({
      column: qtype as 'userName' | 'email',
      query,
      page,
      limit: 15,
    })
  }, [query, page, qtype])

  const rows =
    users?.data?.map((user) => {
      return {
        key: String(user.id),
        num: user.id,
        created_at: user?.created_at
          ? formatDate(user.created_at, 'DD/MM/YYYY Hora: HH:mm')
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
  console.log(page)
  const handleSearch = (val: string) => {
    setPage(1)
    setQuery(val)
  }

  return (
    <>
      <TableGeneral
        columns={columns}
        rows={rows}
        loading={loading}
        onSearch={handleSearch}
        searchValue={query}
        selectionMode="single"
        endInputSection={
          <TypesSearch
            selectedKey={qtype === 'userName' ? ['userName'] : ['email']}
            onSelectionChange={handleTypeSearch}
          />
        }
        count={users?.count || 0}
        page={page}
        onPageChange={setPage}
      />
    </>
  )
}
