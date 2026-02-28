/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useCallback } from 'react'
import { IconDatabaseOff, IconSearch, IconDots } from '@tabler/icons-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { IColumns, IRows, IActions } from '@/types'
import { LoadingPages } from '../..'
import { usePathname } from 'next/navigation'

const optionsActions: Array<IActions> = [
  {
    label: 'Editar',
    key: 'edit',
    href: 'editar',
  },
  {
    label: 'Detalles',
    key: 'details',
    href: '',
  },
]

interface IProps {
  columns: Array<IColumns>
  actionsList?: Array<IActions>
  rows: Array<IRows>
  loading?: boolean
  selectionMode?: 'single' | 'multiple' | 'none'
  onSelectionChange?: (row: IRows) => void
  placeholderSearch?: string
  onSearch?: (value: string) => void
  searchValue?: string
  disableInputSearch?: boolean
  headerChildren?: React.ReactNode
  endInputSection?: React.ReactNode
  onPageChange?: (page: number) => void
  page?: number
  count?: number
  disablePagination?: boolean
  disableWrapper?: boolean
}

export const TableGeneral = (props: IProps) => {
  const {
    columns,
    rows,
    onSelectionChange,
    onSearch,
    searchValue,
    actionsList,
    headerChildren,
    endInputSection,
    disableInputSearch,
    onPageChange,
    page,
    count,
    disablePagination,
    disableWrapper,
    loading,
    placeholderSearch,
  } = props

  const pathname = usePathname()
  const options = [...(actionsList || []), ...optionsActions]

  const renderCell = (item: IRows, columnKey: string) => {
    const value = item[columnKey]
    switch (columnKey) {
      case 'actions':
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
  <IconDots size={16} />
  
</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {options?.map((action, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link
                    href={
                      action?.key === 'external'
                        ? `${pathname}/?id?${item?.id}${action.href}`
                        : `${pathname}/${item?.key}/${action.href}`
                    }
                  >
                    {action.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      case 'status':
        return (
          <Badge variant={value ? 'default' : 'destructive'}>
            {value ? 'Activo' : 'Inactivo'}
          </Badge>
        )
      default:
        return value
    }
  }

  const totalPages = count ? Math.ceil(count / 29) : 1

  return (
    <main className={`flex flex-col gap-4 ${!disableWrapper && 'section-admin p-4 bg-card text-card-foreground rounded-lg border shadow-sm'}`}>
      <header className="flex flex-col sm:flex-row gap-2 items-start justify-between">
        {!disableInputSearch && (
          <div className="flex gap-2 w-full sm:max-w-[400px] items-center">
            <div className="relative w-full">
              <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={placeholderSearch || 'Buscar...'}
                value={searchValue}
                onChange={(e) => onSearch && onSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            {endInputSection}
          </div>
        )}
        {headerChildren}
      </header>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.align === 'center' ? 'text-center' : ''}>
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <IconDatabaseOff size={40} />
                    <p>No se encontraron resultados</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.key} onClick={() => onSelectionChange?.(row)} className="cursor-pointer">
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {renderCell(row, column.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <footer className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Total de registros: {rows?.length} {count && `de ${count}`}
        </p>

        {!disablePagination && totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              {page && page > 1 && (
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={() => onPageChange?.(page - 1)} />
                </PaginationItem>
              )}
              {/* Simplificado para brevedad */}
              <PaginationItem>
                <span className="text-sm mx-2">Página {page} de {totalPages}</span>
              </PaginationItem>
              {page && page < totalPages && (
                <PaginationItem>
                  <PaginationNext href="#" onClick={() => onPageChange?.(page + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </footer>
      <LoadingPages isOpen={loading ?? false} />
    </main>
  )
}
