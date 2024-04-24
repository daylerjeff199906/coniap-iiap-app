/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'

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
} from '@nextui-org/react'
import { IColumns, IRows, IActions } from '@/types'
import { IconSearch, IconDots } from '@tabler/icons-react'
import Link from 'next/link'
import { LoadingPages } from '../..'
import { usePathname } from 'next/navigation'

interface IProps {
  columns: Array<IColumns>
  actionsList?: Array<IActions>
  rows: Array<IRows>
  loading?: boolean
  selectionMode?: 'single' | 'multiple' | 'none'
  onValueStatusChange?: (key: string | number, value: boolean) => void
  onSelectionChange?: (row: IRows) => void
  //For the search input
  onSearch?: (value: string) => void
  searchValue?: string
}

export const TableGeneral = (props: IProps) => {
  const {
    columns,
    rows,
    onValueStatusChange,
    onSelectionChange,
    selectionMode,
    onSearch,
    searchValue,
    actionsList,
  } = props

  const pathname = usePathname()

  const renderCell = useCallback((item: IRows, columnKey: React.Key) => {
    const value = getKeyValue(item, columnKey)
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
                {actionsList ? (
                  actionsList.map((action, index) => (
                    <DropdownItem
                      key={index}
                      as={Link}
                      href={`${pathname}/${action.href}${item.key}`}
                    >
                      {action.label}
                    </DropdownItem>
                  ))
                ) : (
                  <>
                    <DropdownItem
                      as={Link}
                      href={`?edit=${item.key}`}
                    >
                      Editar
                    </DropdownItem>
                    <DropdownItem
                      as={Link}
                      href={`${pathname}/${item.key}`}
                    >
                      Detalles
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </Dropdown>
          </>
        )
      case 'status':
        return (
          <>
            <Switch
              isSelected={value as boolean}
              onValueChange={
                onValueStatusChange &&
                (() => onValueStatusChange(item.key, !value))
              }
              size="sm"
            >
              {value ? 'Activo' : 'Inactivo'}
            </Switch>
          </>
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
    <>
      <section className="pb-4">
        <Input
          aria-label="Buscar"
          variant="bordered"
          placeholder="Type to search..."
          radius="sm"
          classNames={{
            input: ['max-w-[300px]'],
            inputWrapper: ['w-full max-w-[300px]'],
          }}
          value={searchValue}
          onValueChange={(value) => onSearch && onSearch(value)}
          startContent={<IconSearch size={16} />}
        />
      </section>
      <Table
        aria-label="TableGeneral"
        aria-labelledby="TableGeneral"
        removeWrapper
        isHeaderSticky
        classNames={{
          th: ['font-bold', 'bg-black', 'text-white'],
          base: 'max-h-[calc(100vh-16rem)] overflow-y-auto bg-white',
          td: ['text-xs'],
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
          emptyContent={'No users found'}
          items={rows}
          isLoading={true}
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
    </>
  )
}
