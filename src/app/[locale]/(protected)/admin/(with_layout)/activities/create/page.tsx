import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { ActivityForm } from '../components/ActivityForm'

export const metadata = {
    title: 'Nueva Actividad - Panel',
}

export default async function CreateActivityPage() {
    return (
        <LayoutWrapper sectionTitle="Nueva Actividad">
            <ActivityForm />
        </LayoutWrapper>
    )
}
