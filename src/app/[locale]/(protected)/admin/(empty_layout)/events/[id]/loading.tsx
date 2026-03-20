import { DetailSkeleton } from "@/components/ui/detail-skeleton"

export default function Loading() {
    return (
        <div className="p-4 md:p-6 w-full max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
            <DetailSkeleton />
        </div>
    )
}
