import { PageHeader } from '@/components/general/PageHeader'
import { Button } from '@/components/ui/button'
import { IconArrowLeft } from '@tabler/icons-react'
import { Link } from '@/i18n/routing'
import { BulkImportView } from './components/BulkImportView'

export const metadata = {
    title: 'Carga Masiva - Actividades',
}

export default async function BulkUploadPage({
    params
}: {
    params: Promise<{ id: string, locale: string }>
}) {
    const { id: eventId, locale } = await params

    return (
        <div className="flex flex-col gap-6 pt-4 max-w-6xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 -mt-2">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild className="rounded-xl">
                        <Link href={`/admin/events/${eventId}/activities`}>
                            <IconArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <PageHeader
                        title="Carga Masiva"
                        description="Importa múltiples actividades a la vez desde Excel, CSV o JSON."
                    />
                </div>
            </div>

            <BulkImportView eventId={eventId} />
        </div>
    )
}
