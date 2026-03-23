import { LayoutWrapper } from "@/components/panel-admin/layout-wrapper"

export default function SubmissionsLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>
        <LayoutWrapper sectionTitle="Gestión de Trabajos">
            {children}
        </LayoutWrapper>
    </>
}
