import { Link } from '@/i18n/routing'
import { X, ChevronLeft } from 'lucide-react'

interface PageHeaderProps {
    title: React.ReactNode
    description?: React.ReactNode
    backHref?: string
    className?: string
    variant?: 'chevron' | 'close'
}

export function PageHeader({
    title,
    description,
    backHref,
    className = "",
    variant = 'close'
}: PageHeaderProps) {
    const isChevron = variant === 'chevron'

    return (
        <div className={`flex items-center justify-between gap-4 w-full ${className}`}>
            <div className={`flex ${isChevron ? 'items-center gap-3' : 'flex-col'} overflow-hidden`}>
                {isChevron && backHref && (
                    <Link href={backHref as any} className="p-2 hover:bg-muted rounded-full transition-colors flex-shrink-0 border">
                        <ChevronLeft className="w-6 h-6 text-foreground" />
                    </Link>
                )}
                <div className="flex flex-col min-w-0">
                    <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">{title}</h1>
                    {description && (
                        <div className="text-muted-foreground text-sm mt-0.5">{description}</div>
                    )}
                </div>
            </div>
            {!isChevron && backHref && (
                <Link href={backHref as any} className="p-2 bg-background shadow-sm border hover:bg-muted/80 rounded-full transition-colors flex-shrink-0">
                    <X className="w-5 h-5 text-muted-foreground" />
                </Link>
            )}
        </div>
    )
}
