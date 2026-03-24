import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DetailSkeleton() {
    return (
        <div className="w-full space-y-6 animate-pulse">
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-muted/40 rounded-xl flex items-center justify-center">
                    <Skeleton className="h-8 w-8 rounded-full bg-muted/50" />
                </div>
                <div className="space-y-2 w-full">
                    <Skeleton className="h-6 w-1/3 rounded-lg bg-muted" /> {/* Main title placeholder */}
                    <Skeleton className="h-4 w-1/5 rounded-md bg-muted/60" /> {/* Subtitle placeholder */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    <Card className="shadow-none">
                        <CardHeader className="p-4 flex flex-col gap-2">
                            <Skeleton className="h-5 w-48 rounded-md bg-muted" />
                            <Skeleton className="h-4 w-32 rounded-md bg-muted/60" />
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="space-y-2 border rounded-md p-3 bg-muted/[0.15]">
                                <Skeleton className="h-4 w-full rounded-md bg-muted/60" />
                                <Skeleton className="h-4 w-full rounded-md bg-muted/60" />
                                <Skeleton className="h-4 w-3/4 rounded-md bg-muted/60" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <Skeleton className="h-3.5 w-24 rounded-md bg-muted/80 mb-2" />
                                    <Skeleton className="h-5 w-full rounded-md bg-muted/40" />
                                </div>
                                <div>
                                    <Skeleton className="h-3.5 w-24 rounded-md bg-muted/80 mb-2" />
                                    <Skeleton className="h-5 w-full rounded-md bg-muted/40" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-none">
                        <CardHeader className="p-4">
                            <Skeleton className="h-5 w-48 rounded-md bg-muted" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between py-2.5 border-b last:border-0 border-muted/50">
                                    <Skeleton className="h-4 w-32 rounded-md bg-muted/70" />
                                    <Skeleton className="h-4 w-24 rounded-md bg-muted/50" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <Card className="shadow-none">
                        <CardHeader className="p-4">
                            <Skeleton className="h-5 w-32 rounded-md bg-muted" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-3">
                            <Skeleton className="h-4 w-full rounded-md bg-muted/60" />
                            <Skeleton className="h-9 w-full rounded-lg bg-muted/80 mt-2" /> {/* Primary Action Button */}
                        </CardContent>
                    </Card>
                    
                    <Card className="shadow-none">
                        <CardContent className="p-4 space-y-3">
                            <Skeleton className="h-4 w-28 rounded-md bg-muted" />
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                <Skeleton className="h-5 w-14 rounded-full bg-muted/50" />
                                <Skeleton className="h-5 w-20 rounded-full bg-muted/50" />
                                <Skeleton className="h-5 w-16 rounded-full bg-muted/50" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
