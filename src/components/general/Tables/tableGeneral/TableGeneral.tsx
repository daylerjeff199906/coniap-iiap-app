/* eslint-disable react-hooks/exhaustive-deps */
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
} from '@nextui-org/react'
import { useCallback } from 'react'
import { IColumns } from '@/types'
import { IconEdit, IconEye } from '@tabler/icons-react'
import Link from 'next/link'
import { LoadingPages } from '../..'
interface IRows {
  key: string | number
  [key: string]: string | React.ReactNode
}

interface IProps {
  columns: Array<IColumns>
  rows: Array<IRows>
  loading?: boolean
  onValueStatusChange?: (key: string | number, value: boolean) => void
}

export const TableGeneral = (props: IProps) => {
  const { columns, rows, onValueStatusChange } = props

  const renderCell = useCallback((item: IRows, columnKey: React.Key) => {
    const value = getKeyValue(item, columnKey)
    switch (columnKey) {
      case 'actions':
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="light"
              isIconOnly
              as={Link}
              href={`?edit=${item.key}`}
            >
              <IconEdit stroke={1.5} />
            </Button>
            <Button
              size="sm"
              variant="light"
              isIconOnly
              as={Link}
              href={`?view=${item.key}`}
            >
              <IconEye stroke={1.5} />
            </Button>
          </div>
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

  return (
    <>
      <Table
        aria-label="TableGeneral"
        aria-labelledby="TableGeneral"
        removeWrapper
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
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <LoadingPages isOpen={props.loading ?? false} />
    </>
  )
}
