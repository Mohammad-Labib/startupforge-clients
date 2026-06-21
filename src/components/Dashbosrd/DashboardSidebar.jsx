


import { Bars, LayoutHeaderCursor, PencilToSquare, FolderHouse, Gear, Frame, LayoutSideContent, PersonPencil, GraduationCap } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { div } from "motion/react-client";

export function DashboardSidebar() {
    const navItems = [
        { icon: Frame, label: "Overview" },
        { icon: PersonPencil, label: "My Startup" },
        { icon: LayoutHeaderCursor, label: "Add Opportunity" },
        { icon: PencilToSquare, label: "Manage Opportunities" },
        { icon: GraduationCap, label: "Applications" },
        { icon: Gear, label: "Settings" },
    ];

    const navContent =   <nav className="flex flex-col gap-1">
                                    {navItems.map((item) => (
                                        <button
                                            key={item.label}
                                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                                            type="button"
                                        >
                                            <item.icon className="size-5 text-muted" />
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>

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

