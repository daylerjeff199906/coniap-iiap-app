/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import { IconDatabaseOff } from '@tabler/icons-react'

import {
  Table,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  Chip,
  Pagination,
} from '@nextui-org/react'
import Link from 'next/link'
import { IColumns, IRows, IActions } from '@/types'
import { IconSearch, IconDots } from '@tabler/icons-react'
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
  //For the search input
  onSearch?: (value: string) => void
  searchValue?: string
  disableInputSearch?: boolean
  headerChildren?: React.ReactNode
  endInputSection?: React.ReactNode
  //For the pagination
  onPageChange?: (page: number) => void
  page?: number
  count?: number
  disablePagination?: boolean
}

export const TableGeneral = (props: IProps) => {
  const {
    columns,
    rows,
    onSelectionChange,
    selectionMode,
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
  } = props

  const pathname = usePathname()

  const options = [...(actionsList || []), ...optionsActions]

  const renderCell = useCallback((item: IRows, columnKey: React.Key) => {
    const value = getKeyValue(item, columnKey as string)
    switch (columnKey) {
      case 'actions':
        return (
          <>
            <Dropdown
              size="sm"
              radius="sm"
              showArrow
              classNames={{
                content: 'bg-white border border-gray-200 shadow-lg w-[200px]',
                base: 'text-tiny w-[200px] ',
              }}
            >
              <DropdownTrigger>
                <Button
                  size="sm"
                  variant="light"
                  isIconOnly
                >
                  <IconDots
                    stroke={1.5}
                    className="text-gray-500"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="DropdownMenu">
                {options?.map((action, index) => (
                  <DropdownItem
                    key={index}
                    as={Link}
                    href={
                      action?.key === 'external'
                        ? `${pathname}/?id?${item?.id}${action.href}`
                        : `${pathname}/${item?.key}/${action.href}`
                    }
                  >
                    {action.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </>
        )
      case 'status':
        return (
          <Chip
            color={value ? 'success' : 'danger'}
            variant="flat"
            radius="sm"
            size="sm"
          >
            {value ? 'Activo' : 'Inactivo'}
          </Chip>
        )
      default:
        return value
    }
  }, [])

  const onRowAction = (key: string | number | bigint) => {
    const item = rows.filter((row) => Number(row.key) === Number(key))
    onSelectionChange && onSelectionChange(item[0])
  }

  return (
    <main className="flex flex-col gap-3 section-admin">
      <section className="flex gap-2 items-start">
        {!disableInputSearch && (
          <div className="flex gap-2 w-full max-w-[300px]">
            <Input
              aria-label="Buscar"
              variant="bordered"
              placeholder="Buscar ..."
              radius="sm"
              value={searchValue}
              onValueChange={(value) => onSearch && onSearch(value)}
              startContent={
                <div>
                  <IconSearch size={16} />
                </div>
              }
              endContent={endInputSection}
            />
          </div>
        )}
        {headerChildren}
      </section>
      <Table
        aria-label="TableGeneral"
        aria-labelledby="TableGeneral"
        removeWrapper
        isHeaderSticky
        className=" rounded-xl"
        classNames={{
          base: 'max-h-[calc(100vh-20rem)] overflow-y-auto bg-white',
          th: [
            'bg-white',
            'text-default-500',
            'font-bold',
            'rounded-none',
            'shadow-none',
          ],
          table: ['border-divider', 'bg-white'],
          td: [
            'text-xs',
            'font-medium',
            'group-data-[first=true]:first:before:rounded-none',
            'group-data-[first=true]:last:before:rounded-none',
            // middle
            'group-data-[middle=true]:before:rounded-none',
            // last
            'group-data-[last=true]:first:before:rounded-none',
            'group-data-[last=true]:last:before:rounded-none',
            'rounded-lg',
          ],
        }}
        selectionMode={selectionMode}
        onRowAction={onRowAction}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.align}
              //   allowsSorting={column.sortable}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={
            <main>
              <div className="flex flex-col items-center justify-center gap-2">
                <IconDatabaseOff
                  size={40}
                  className="text-gray-400"
                />
                <p className="text-sm font-medium text-gray-600">
                  No se encontraron resultados
                </p>
              </div>
            </main>
          }
          items={rows}
          isLoading={props.loading}
        >
          {(item) => (
            <TableRow key={item?.key}>
              {(columnKey) => (
                <TableCell width={columnKey === 'actions' ? '100px' : 'auto'}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <footer className="flex gap-3 items-center">
        {!disablePagination && (
          <div className="flex justify-end gap-2">
            {count && (
              <Pagination
                total={Math.ceil(count / 29)}
                initialPage={page}
                onChange={onPageChange}
                showControls
                size="sm"
                variant="bordered"
                color="default"
                classNames={{
                  item: 'text-xs w-8 h-8 radius-sm',
                  cursor: 'text-xs',
                }}
              />
            )}
          </div>
        )}
        <div>
          <p className="text-xs text-gray-500 text-center">
            Total de registros: {rows.length} {count && `de ${count}`}
          </p>
        </div>
      </footer>
      <LoadingPages isOpen={props.loading ?? false} />
    </main>
  )
}
