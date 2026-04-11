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
import Link from "next/link"
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
        <Sidebar collapsible="icon" className="[&_[data-sidebar=sidebar]]:bg-[#001f31] border-none" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg"
                            className="bg-transparent hover:bg-transparent"
                            asChild>
                            <Link href={`/${locale}/admin`}>
                                <div className="flex size-12 items-center justify-center rounded-sm bg-gray-900 dark:bg-gray-800 ">
                                    <img src="/brand/logo-iiap-bn.webp" alt="logo-iiap" className="w-full h-full object-contain p-1" />
                                </div>
                                {
                                    props.collapsible !== 'icon' && (
                                        <div className="flex flex-col gap-0.5 leading-none">
                                            <span className="font-semibold text-white">Panel Admin</span>
                                            <span className="text-xs text-[#7fa2b6]">
                                                Eventos IIAP
                                            </span>
                                        </div>
                                    )
                                }
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
