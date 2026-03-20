import { TableSkeleton } from "@/components/ui/table-skeleton"

export default function Loading() {
    return (
        <div className="w-full flex flex-col gap-4 animate-in fade-in duration-300">
            <TableSkeleton rowsCount={5} colsCount={5} withHeader={false} withPagination={true} />
        </div>
    )
}

