import { getSubmissionById } from '../actions'
import { ReviewSubmissionClient } from './components/ReviewSubmissionClient'
import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { IconDatabaseOff } from '@tabler/icons-react'

export const metadata = {
    title: 'Revisión de Trabajo - Panel',
}

export default async function ReviewSubmissionPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = await params
    const submission = await getSubmissionById(id)

    if (!submission) {
        return (
            <LayoutWrapper sectionTitle="Revisión de Trabajo">
                <div className="flex flex-col items-center justify-center p-20 gap-4 border border-dashed rounded-2xl bg-slate-50/50 mt-6">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <IconDatabaseOff size={24} />
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                        <h3 className="font-bold text-base text-slate-800">Trabajo no encontrado</h3>
                        <p className="text-xs text-muted-foreground max-w-xs">La postulación que intentas revisar no existe, fue eliminada o no tienes permisos de acceso.</p>
                    </div>
                    <Link href="/admin/submissions">
                        <Button variant="outline" className="rounded-xl h-9 text-xs border-slate-200 mt-2">
                            Volver al listado
                        </Button>
                    </Link>
                </div>
            </LayoutWrapper>
        )
    }

    return (
        <LayoutWrapper sectionTitle="Revisión de Trabajo">
            <ReviewSubmissionClient submission={submission as any} />
        </LayoutWrapper>
    )
}
