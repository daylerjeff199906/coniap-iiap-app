import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TableSkeletonProps {
    rowsCount?: number
    colsCount?: number
    withHeader?: boolean
    withPagination?: boolean
}

export function TableSkeleton({ 
    rowsCount = 5, 
    colsCount = 5, 
    withHeader = true, 
    withPagination = true 
}: TableSkeletonProps) {
    return (
        <div className="w-full space-y-4 animate-pulse">
            {withHeader && (
                <div className="flex items-center justify-between gap-4">
                    <Skeleton className="h-9 w-64 rounded-md bg-muted" /> {/* Search Placeholder */}
                    <Skeleton className="h-9 w-32 rounded-md bg-muted" /> {/* Button Placeholder */}
                </div>
            )}

            <div className="rounded-md border overflow-hidden mt-2">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow>
                            {Array.from({ length: colsCount }).map((_, i) => (
                                <TableHead key={i}>
                                    <Skeleton className="h-4 w-24 rounded-sm bg-muted" />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: rowsCount }).map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {Array.from({ length: colsCount }).map((_, colIndex) => (
                                    <TableCell key={colIndex}>
                                        <div className="py-1">
                                            <Skeleton className="h-5 w-full max-w-[150px] rounded-sm bg-muted/60" />
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            {withPagination && (
                <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-4 w-32 rounded-sm bg-muted" />
                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded-md bg-muted" />
                        <Skeleton className="h-8 w-8 rounded-md bg-muted" />
                        <Skeleton className="h-8 w-8 rounded-md bg-muted" />
                    </div>
                </div>
            )}
        </div>
    )
}
