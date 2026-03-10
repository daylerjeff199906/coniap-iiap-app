'use client'

import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { IconLoader2 } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

export interface Column<T> {
    header: string
    accessorKey?: keyof T | string
    className?: string
    headerClassName?: string
    cellClassName?: string
    render?: (item: T) => React.ReactNode
}

interface DynamicTableProps<T> {
    data: T[]
    columns: Column<T>[]
    isLoading?: boolean
    onRowClick?: (item: T) => void
    emptyMessage?: string
    rowClassName?: string
    loadingMessage?: string
}

export function DynamicTable<T extends { id: string | number }>({
    data,
    columns,
    isLoading,
    onRowClick,
    emptyMessage = 'No se encontraron resultados',
    rowClassName,
    loadingMessage = 'Cargando datos...'
}: DynamicTableProps<T>) {
    if (isLoading) {
        return (
            <div className="rounded-2xl border border-slate-100 bg-white flex flex-col items-center justify-center p-20 gap-4 shadow-sm">
                <IconLoader2 size={32} className="animate-spin text-slate-300" />
                <p className="text-slate-400 font-medium text-sm">{loadingMessage}</p>
            </div>
        )
    }

    return (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-slate-100">
                        {columns.map((column, index) => (
                            <TableHead
                                key={index}
                                className={cn(
                                    "h-12 px-6 text-xs font-medium text-slate-500 align-middle",
                                    column.headerClassName
                                )}
                            >
                                {column.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((item) => (
                            <TableRow
                                key={item.id}
                                onClick={() => onRowClick && onRowClick(item)}
                                className={cn(
                                    "group transition-colors border-b border-slate-50 last:border-none",
                                    onRowClick && "cursor-pointer hover:bg-slate-50/50",
                                    rowClassName
                                )}
                            >
                                {columns.map((column, colIndex) => {
                                    const content = column.render
                                        ? column.render(item)
                                        : (column.accessorKey ? (item as any)[column.accessorKey] : null)

                                    return (
                                        <TableCell
                                            key={colIndex}
                                            className={cn(
                                                "px-6 py-4",
                                                column.cellClassName
                                            )}
                                        >
                                            <div className="relative z-10">
                                                {content}
                                            </div>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow className="hover:bg-transparent border-none">
                            <TableCell colSpan={columns.length} className="h-[300px] text-center">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <p className="text-sm font-medium text-slate-500">{emptyMessage}</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

