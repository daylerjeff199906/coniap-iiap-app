import {
    Home,
    CalendarDays,
    Megaphone,
    Users,
    User,
    Settings,
    type LucideIcon,
    LayoutDashboard
} from "lucide-react"

export type AdminRouteItem = {
    title: string
    url: string
    icon: LucideIcon
    items?: { title: string; url: string }[]
}

export const getAdminRoutes = (locale: string): AdminRouteItem[] => [
    {
        title: "Inicio",
        url: `/${locale}/admin`,
        icon: LayoutDashboard,
    },
    {
        title: "Eventos",
        url: `/${locale}/admin/events`,
        icon: CalendarDays,
    },
    {
        title: "Convocatorias",
        url: `/${locale}/admin/calls`,
        icon: Megaphone,
    },
    {
        title: "Participantes",
        url: `/${locale}/admin/participants`,
        icon: Users,
    },
    {
        title: "Usuarios",
        url: `/${locale}/admin/users`,
        icon: User,
    },
    {
        title: "Configuración",
        url: `/${locale}/admin/settings`,
        icon: Settings,
    },
]
