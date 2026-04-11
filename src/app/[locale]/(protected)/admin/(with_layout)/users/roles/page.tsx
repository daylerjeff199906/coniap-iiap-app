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
        <div className="w-full px-6 lg:px-10 space-y-10 animate-in fade-in duration-700">
            <header className="space-y-2">
                <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Estructura de Seguridad y Acceso</h1>
                <p className="text-slate-500 text-sm italic max-w-2xl">Arquitectura central del sistema: gestiona la segmentación por módulos, la jerarquía de roles y la asignación granular a usuarios.</p>
            </header>

            <Tabs defaultValue="modules" className="w-full space-y-10">
                <div className="flex justify-center md:justify-start">
                    <TabsList className="bg-transparent p-0 h-auto border-b border-slate-200 w-full justify-start rounded-none space-x-8">
                        <TabsTrigger
                            value="modules"
                            className="rounded-none px-0 py-3 bg-transparent h-full data-[state=active]:bg-transparent data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none transition-all flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border-b-2 border-transparent"
                        >
                            Módulos
                        </TabsTrigger>
                        <TabsTrigger
                            value="roles"
                            className="rounded-none px-0 py-3 bg-transparent h-full data-[state=active]:bg-transparent data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none transition-all flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border-b-2 border-transparent"
                        >
                            Roles y Matriz
                        </TabsTrigger>
                        <TabsTrigger
                            value="users"
                            className="rounded-none px-0 py-3 bg-transparent h-full data-[state=active]:bg-transparent data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none transition-all flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border-b-2 border-transparent"
                        >
                            Asignación Usuarios
                        </TabsTrigger>
                    </TabsList>
                </div>

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

                <TabsContent value="users" className="focus-visible:outline-none focus-visible:ring-0 w-full">
                    <GlobalUserRoleAssigner
                        allRoles={allRoles}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}
