"use client"

import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavAdmin } from "./nav-admin"
import { getAdminRoutes } from "@/config/admin-routes"
import { NavUser } from "@/components/nav-user"

export function AdminSidebar({ user, locale, ...props }: React.ComponentProps<typeof Sidebar> & {
    user: {
        name: string
        email: string
        avatar: string
        role: string
    }
    locale: string
}) {
    const routes = getAdminRoutes(locale)


    return (
        <Sidebar collapsible="icon" className="dark" {...props}>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-4">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-primary-foreground">
                        <img src="/brand/logo-iiap.webp" alt="IIAP" className="size-6 object-contain" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="truncate font-bold text-white uppercase tracking-tighter">
                            IIAP PLATFORM
                        </span>
                        <span className="truncate text-[10px] text-[#718e9a] font-medium uppercase">
                            ADMIN CONSOLE
                        </span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavAdmin items={routes} label="MÓDULOS DE DATOS" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
