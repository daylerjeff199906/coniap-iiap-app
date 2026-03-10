'use client'

import React from 'react'
import { IconLoader2 } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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
    // Pagination props
    totalItems?: number
    currentPage?: number
    pageSize?: number
    onPageChange?: (page: number) => void
}

export function DynamicTable<T extends { id: string | number }>({
    data,
    columns,
    isLoading,
    onRowClick,
    emptyMessage = 'No se encontraron resultados',
    rowClassName,
    loadingMessage = 'Cargando datos...',
    totalItems,
    currentPage = 1,
    pageSize = 20, // Changed default pageSize to 20 as per instruction
    onPageChange
}: DynamicTableProps<T>) {
    if (isLoading) {
        return (
            <div className="rounded-2xl border border-slate-100 bg-white flex flex-col items-center justify-center p-20 gap-4 shadow-sm">
                <IconLoader2 size={32} className="animate-spin text-slate-300" />
                <p className="text-slate-400 font-medium text-sm">{loadingMessage}</p>
            </div>
        )
    }

    const totalPages = totalItems ? Math.ceil(totalItems / pageSize) : 0
    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems || 0)

    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden relative">
                <div className="overflow-x-auto max-h-[600px] overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    <table className="relative border-separate border-spacing-0 w-full text-left">
                        <thead className="relative z-20">
                            <tr className="border-none bg-transparent">
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className={cn(
                                            "sticky top-0 z-20 h-12 px-6 text-[10px] uppercase tracking-widest font-medium text-slate-400 align-middle bg-slate-50/90 backdrop-blur-md border-b border-slate-100 first:rounded-tl-2xl last:rounded-tr-2xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)]",
                                            column.headerClassName
                                        )}
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {data && data.length > 0 ? (
                                data.map((item) => (
                                    <tr
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
                                                <td
                                                    key={colIndex}
                                                    className={cn(
                                                        "px-6 py-4 border-b border-slate-50 group-last:border-none",
                                                        column.cellClassName
                                                    )}
                                                >
                                                    <div className="relative z-10">
                                                        {content}
                                                    </div>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))
                            ) : (
                                <tr className="hover:bg-transparent border-none">
                                    <td colSpan={columns.length} className="h-[300px] text-center">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <p className="text-sm font-medium text-slate-500">{emptyMessage}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalItems !== undefined && totalItems > 0 && (
                <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 gap-6 bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/20">
                    {/* Left side: Results Count */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 items-center px-4 rounded-lg bg-slate-50 border border-slate-100">
                            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-tight mr-2 whitespace-nowrap text-nowrap">Resultados</span>
                            <span className="text-[13px] font-medium text-slate-900 tabular-nums">{totalItems}</span>
                        </div>
                        <div className="hidden sm:block text-[12px] font-medium text-slate-400">
                            Mostrando <span className="text-slate-900">{startItem}-{endItem}</span>
                        </div>
                    </div>

                    {/* Right side: Navigation Controls */}
                    {totalPages > 1 && onPageChange && (
                        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="h-9 px-5 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs transition-all disabled:opacity-30 group"
                            >
                                <span className="group-hover:-translate-x-0.5 transition-transform mr-1">←</span>
                                Anterior
                            </Button>

                            <div className="flex items-center bg-slate-50 h-9 px-4 rounded-xl border border-slate-100 gap-1.5 shadow-inner">
                                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest hidden lg:inline mr-1">Pág.</span>
                                <span className="text-[13px] font-medium text-slate-900 tabular-nums">{currentPage}</span>
                                <span className="text-[11px] font-medium text-slate-300">/</span>
                                <span className="text-[13px] font-medium text-slate-500 tabular-nums">{totalPages}</span>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="h-9 px-5 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs transition-all disabled:opacity-30 group"
                            >
                                Siguiente
                                <span className="group-hover:translate-x-0.5 transition-transform ml-1">→</span>
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

