import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

interface SiteHeaderProps {
    sectionTitle?: string
}

export const SiteHeader = ({ sectionTitle }: SiteHeaderProps) => {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex-1">
                {sectionTitle && (
                    <h1 className="text-sm font-medium">{sectionTitle}</h1>
                )}
            </div>
        </header>
    )
}
