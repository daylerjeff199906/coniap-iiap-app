import { SidebarInset } from '@/components/ui/sidebar'
import { SiteHeader } from '../panel-admin/site-header'

interface LayoutWrapperProps {
    children: React.ReactNode
    sectionTitle?: string
}

export const LayoutWrapper = ({
    children,
    sectionTitle
}: LayoutWrapperProps) => {
    return (
        <SidebarInset>
            <SiteHeader sectionTitle={sectionTitle} />
            <div className="p-4 md:p-6 flex flex-col gap-4 min-h-[calc(100vh-8rem)]">{children}</div>
            <footer className="p-4 md:p-6 text-xs text-muted-foreground text-center">
                &copy; {new Date().getFullYear()} Eventos - IIAP. Todos los derechos reservados.
            </footer>
        </SidebarInset>
    )
}
