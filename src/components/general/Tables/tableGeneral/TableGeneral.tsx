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
  Switch,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  Chip,
} from '@nextui-org/react'
import { IColumns, IRows, IActions } from '@/types'
import { IconSearch, IconDots } from '@tabler/icons-react'
import Link from 'next/link'
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
  headerChildren?: React.ReactNode
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
    <main className="flex flex-col gap-3">
      <section className="flex gap-2 items-start">
        <div className="flex gap-2 w-full max-w-[300px]">
          <Input
            aria-label="Buscar"
            variant="bordered"
            placeholder="Type to search..."
            radius="sm"
            value={searchValue}
            onValueChange={(value) => onSearch && onSearch(value)}
            startContent={<IconSearch size={16} />}
          />
        </div>
        {headerChildren}
      </section>
      <Table
        aria-label="TableGeneral"
        aria-labelledby="TableGeneral"
        removeWrapper
        isHeaderSticky
        classNames={{
          th: ['font-semibold', 'bg-white', 'text-gray-800', 'border-b'],
          base: 'max-h-[calc(100vh-20rem)] overflow-y-auto bg-white',
          td: ['text-xs', 'font-medium'],
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
      <LoadingPages isOpen={props.loading ?? false} />
    </main>
  )
}
