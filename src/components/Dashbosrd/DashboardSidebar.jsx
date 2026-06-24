"use client" 

import { Bars, LayoutHeaderCursor, PencilToSquare, FolderHouse, Gear, Frame, LayoutSideContent, PersonPencil, GraduationCap } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link"; 
import { usePathname } from "next/navigation"; 

export function DashboardSidebar() {
    const pathname = usePathname(); 

    const navItems = [
        { id: "overview", icon: Frame, href: "/dashboard/founder", label: "Overview" },
        { id: "mystartup", icon: PersonPencil, href: "/dashboard/mystartup", label: "My Startup" },
        { id: "add-opportunity", icon: LayoutHeaderCursor, href: "/dashboard/add-opportunity", label: "Add Opportunity" },
        { id: "manage-opportunities", icon: PencilToSquare, href: "/dashboard/manage-opportunities", label: "Manage Opportunities" },
        { id: "applications", icon: GraduationCap, href: "/dashboard/applications", label: "Applications" },
        { id: "settings", icon: Gear, href: "/dashboard/settings", label: "Settings" },
    ];

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
                const isActive = pathname === item.href; 
                
                return (
                    <Link
                        key={item.id} 
                        href={item.href} 
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
                            ${isActive 
                                ? "bg-[#b06a44] text-white dark:bg-white dark:text-black font-semibold" // অ্যাক্টিভ হলে এই স্টাইল পাবে
                                : "text-foreground hover:bg-default"
                            }`}
                    >
                        <item.icon className={`size-5 ${isActive ? "text-current" : "text-muted"}`} />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
                {navContent}
            </aside>

            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContent />
                    Dashboard
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                              {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}