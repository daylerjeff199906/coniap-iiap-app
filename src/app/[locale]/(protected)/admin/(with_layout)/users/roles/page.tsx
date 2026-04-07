import { getRolesWithPermissions, getPermissions } from '../roles-permissions-actions'
import { RolesPermissionsManager } from '../components/RolesPermissionsManager'

export default async function GlobalRolesPage() {
    const rolesWithPerms = await getRolesWithPermissions()
    const allPermissions = await getPermissions()

    return (
        <div className="animate-in fade-in duration-500">
            <RolesPermissionsManager
                roles={rolesWithPerms}
                allPermissions={allPermissions}
            />
        </div>
    )
}
