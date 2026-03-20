import { TableSkeleton } from "@/components/ui/table-skeleton"

export default function Loading() {
    return (
        <div className="p-4 md:p-6 w-full flex flex-col gap-4 animate-in fade-in duration-300">
            <TableSkeleton rowsCount={5} colsCount={5} withHeader={true} withPagination={true} />
        </div>
    )
}
