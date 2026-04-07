"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import { type AdminRouteItem } from "@/config/admin-routes"

export function NavAdmin({
    items,
    label = "Menu",
}: {
    items: AdminRouteItem[]
    label?: string
}) {
    const pathname = usePathname()

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-[#718e9a] font-bold text-[10px] uppercase tracking-widest px-2 mb-2">
                {label}
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    // Si el item es el Dashboard (Inicio), usamos coincidencia exacta
                    // para evitar que se ilumine cuando estamos en otros módulos.
                    // Para los demás, usamos coincidencia por prefijo.
                    const isDashboard = item.url.endsWith('/admin')
                    const isActive = isDashboard
                        ? pathname === item.url
                        : (pathname === item.url || pathname.startsWith(item.url + "/"))

                    // Si el item tiene un arreglo "items" renderiza un Collapsible (desplegable)
                    if (item.items && item.items.length > 0) {
                        return (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={isActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={isActive}
                                        className={cn(
                                            "transition-all duration-200 py-2 px-3",
                                            isActive
                                                ? "!bg-[#00274D] !text-[#A3E635] rounded-lg shadow-sm"
                                                : "text-[#8199a3] hover:text-white hover:!bg-[#00274D]/50"
                                        )}
                                    >
                                        {item.icon && <item.icon className={cn("size-5", isActive ? "!text-[#A3E635]" : "text-[#8199a3]")} />}
                                        <span className={cn("text-sm", isActive ? "font-bold" : "font-medium")}>{item.title}</span>
                                        <ChevronRight className={cn("ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90", isActive ? "!text-[#A3E635]" : "text-[#718e9a]")} />
                                    </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => {
                                                const isSubActive = pathname === subItem.url
                                                return (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild isActive={isSubActive} className={cn(
                                                            "transition-colors duration-200",
                                                            isSubActive ? "text-sidebar-accent-foreground font-bold" : "text-[#8199a3] hover:text-white"
                                                        )}>
                                                            <Link href={subItem.url}>
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                )
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        )
                    }

                    // Si el item no tiene "items", renderizamos un link directo
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                tooltip={item.title}
                                isActive={isActive}
                                className={cn(
                                    "transition-all duration-200 py-2 px-3",
                                    isActive
                                        ? "!bg-[#00274D] !text-[#A3E635] rounded-lg shadow-sm"
                                        : "text-[#8199a3] hover:text-white hover:!bg-[#00274D]/50"
                                )}
                            >
                                <Link href={item.url}>
                                    {item.icon && <item.icon className={cn("size-5", isActive ? "!text-[#A3E635]" : "text-[#8199a3]")} />}
                                    <span className={cn("text-sm", isActive ? "font-bold" : "font-medium")}>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
