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
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
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
                                                "transition-colors duration-200 justify-start",
                                                "data-[active=true]:bg-[#0c364e]! data-[active=true]:text-white! font-medium",
                                                "text-white hover:bg-white/10 hover:text-white",
                                                "[&>svg]:transition-colors [&>svg]:duration-200",
                                                isActive ? "[&>svg]:text-[#84cc16]!" : "[&>svg]:text-[#06b6d4]!"
                                            )}
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className={cn(
                                                "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90",
                                                isActive ? "text-[#84cc16]!" : "text-white/50"
                                            )} />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => {
                                                const isSubActive = pathname === subItem.url
                                                return (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton 
                                                            asChild 
                                                            isActive={isSubActive}
                                                            className={cn(
                                                                "transition-colors duration-200",
                                                                "data-[active=true]:bg-[#0c364e]! data-[active=true]:text-white! font-medium",
                                                                "text-white hover:bg-white/10 hover:text-white"
                                                            )}
                                                        >
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
                                    "transition-colors duration-200 justify-start",
                                    "data-[active=true]:bg-[#0c364e]! data-[active=true]:text-white! font-medium",
                                    "text-white hover:bg-white/10 hover:text-white",
                                    "[&>svg]:transition-colors [&>svg]:duration-200",
                                    isActive ? "[&>svg]:text-[#84cc16]!" : "[&>svg]:text-[#06b6d4]!"
                                )}
                            >
                                <Link href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
