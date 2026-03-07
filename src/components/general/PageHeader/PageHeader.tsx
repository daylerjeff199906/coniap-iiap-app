import { Link } from '@/i18n/routing'
import { ChevronLeft } from 'lucide-react'

interface PageHeaderProps {
    title: React.ReactNode
    description?: React.ReactNode
    backHref?: string
    className?: string
}

export function PageHeader({ title, description, backHref, className = "" }: PageHeaderProps) {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {backHref && (
                <Link href={backHref as any} className="p-2 bg-background shadow-sm border hover:bg-muted/80 rounded-full transition-colors flex-shrink-0">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
            )}
            <div className="flex flex-col overflow-hidden">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">{title}</h1>
                {description && (
                    <div className="text-muted-foreground text-sm mt-0.5">{description}</div>
                )}
            </div>
        </div>
    )
}
