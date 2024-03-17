import {
  Table,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/react'
import { useCallback } from 'react'

interface IRows {
  key: string | number
  [key: string]: string | React.ReactNode
}

interface IProps {
  columns: Array<{
    key: string
    label: string
    align?: 'center' | 'start' | 'end'
    // sortable?: boolean
  }>
  rows: Array<IRows>
  loading?: boolean
}

export const TableGeneral = (props: IProps) => {
  const { columns, rows } = props

  const renderCell = useCallback((item: IRows, columnKey: React.Key) => {
    const value = getKeyValue(item, columnKey)
    return value
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
    </>
  )
}
