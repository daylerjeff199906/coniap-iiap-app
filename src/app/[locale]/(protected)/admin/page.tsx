import { LayoutWrapper } from "@/components/panel-admin/layout-wrapper"

export default function AdminDashboardPage() {
    return (
        <LayoutWrapper sectionTitle="Inicio - Panel de Administración">
            <div className="flex flex-1 flex-col gap-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-muted/50 p-4 flex flex-col items-center justify-center text-muted-foreground border border-dashed">
                        Card 1
                    </div>
                    <div className="aspect-video rounded-xl bg-muted/50 p-4 flex flex-col items-center justify-center text-muted-foreground border border-dashed">
                        Card 2
                    </div>
                    <div className="aspect-video rounded-xl bg-muted/50 p-4 flex flex-col items-center justify-center text-muted-foreground border border-dashed">
                        Card 3
                    </div>
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4 border border-dashed text-muted-foreground md:min-h-min">
                    Contenido principal del Dashboard de Bizventory
                </div>
            </div>
        </LayoutWrapper>
    )
}
