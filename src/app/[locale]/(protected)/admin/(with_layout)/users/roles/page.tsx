import { getRolesWithPermissions, getPermissions, getModules } from '../roles-permissions-actions'
import { getRoles } from '../roles-actions'
import { RolesPermissionsManager } from '../components/RolesPermissionsManager'
import { ModulesManager } from '../components/ModulesManager'
import { GlobalUserRoleAssigner } from '../components/GlobalUserRoleAssigner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function GlobalRolesPage() {
    const rolesWithPerms = await getRolesWithPermissions()
    const allPermissions = await getPermissions()
    const allModules = await getModules()
    const allRoles = await getRoles()

    return (
        <div className="w-full space-y-10 animate-in fade-in duration-700">
            {/* Header style from image 2 */}
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Estructura de Seguridad</h1>
                <p className="text-slate-500 text-sm">Configuración de accesos, ecosistema de módulos y gestión de equipo.</p>
            </header>

            <Tabs defaultValue="users" className="w-full space-y-8">
                <div className="flex justify-center md:justify-start">
                    <TabsList className="bg-transparent p-0 h-auto border-b border-slate-200 w-full justify-start rounded-none space-x-10">
                        <TabsTrigger
                            value="users"
                            className="rounded-none px-0 py-4 bg-transparent h-full data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:border-b-2 data-[state=active]:border-slate-900 data-[state=active]:shadow-none transition-all text-[11px] font-semibold uppercase tracking-[0.2em] border-b-2 border-transparent text-slate-400"
                        >
                            Usuarios
                        </TabsTrigger>
                        <TabsTrigger
                            value="modules"
                            className="rounded-none px-0 py-4 bg-transparent h-full data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:border-b-2 data-[state=active]:border-slate-900 data-[state=active]:shadow-none transition-all text-[11px] font-semibold uppercase tracking-[0.2em] border-b-2 border-transparent text-slate-400"
                        >
                            Módulos
                        </TabsTrigger>
                        <TabsTrigger
                            value="roles"
                            className="rounded-none px-0 py-4 bg-transparent h-full data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:border-b-2 data-[state=active]:border-slate-900 data-[state=active]:shadow-none transition-all text-[11px] font-semibold uppercase tracking-[0.2em] border-b-2 border-transparent text-slate-400"
                        >
                            Roles y Matriz
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="users" className="focus-visible:outline-none focus-visible:ring-0 w-full">
                    <GlobalUserRoleAssigner allRoles={allRoles} />
                </TabsContent>

                <TabsContent value="modules" className="focus-visible:outline-none focus-visible:ring-0 w-full">
                    <ModulesManager modules={allModules} />
                </TabsContent>

                <TabsContent value="roles" className="focus-visible:outline-none focus-visible:ring-0 w-full">
                    <RolesPermissionsManager
                        roles={rolesWithPerms}
                        allPermissions={allPermissions}
                        modules={allModules}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}
