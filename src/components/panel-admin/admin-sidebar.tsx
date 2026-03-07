"use client"

import * as React from "react"
import { ShieldAlert } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavAdmin } from "./nav-admin"
import { getAdminRoutes } from "@/config/admin-routes"
import { useLocale } from "next-intl"
import Link from "next/link"
import { NavUser } from "@/components/nav-user"

export function AdminSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & {
    user: {
        name: string
        email: string
        avatar: string
        role: string
    }
}) {
    const locale = useLocale()
    const routes = getAdminRoutes(locale)

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={`/${locale}/admin`}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <ShieldAlert className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Panel Admin</span>
                                    <span className="text-xs text-muted-foreground">Bizventory</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavAdmin items={routes} label="Módulos Principales" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
