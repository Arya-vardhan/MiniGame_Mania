"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { Gamepad2, Menu } from 'lucide-react';
import { navLinks } from '@/lib/constants';
import UserProfile from './user-profile';
import { cn } from '@/lib/utils';
import { useSidebar } from './ui/sidebar';

const AppHeader = () => {
  const { open: sidebarOpen } = useSidebar();
  const pathname = usePathname();
  const currentLink = navLinks.find(link => link.href === pathname);
  
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:h-16 md:px-6">
      <SidebarTrigger className={cn('md:hidden', sidebarOpen && 'hidden')} />
      <h1 className="text-lg font-semibold md:text-xl">{currentLink?.label || 'MiniGame Mania'}</h1>
      {/* You could add breadcrumbs or other actions here */}
    </header>
  );
};


export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Button variant="ghost" className="h-auto justify-center p-2 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:p-0">
            <Gamepad2 className="size-8 text-primary" />
            <div className="ml-2 flex flex-col items-start overflow-hidden transition-all duration-300 group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:w-0">
              <span className="font-bold tracking-tighter text-lg">MiniGame Mania</span>
            </div>
          </Button>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {navLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href}>
                  <SidebarMenuButton
                    isActive={pathname === link.href}
                    tooltip={{ children: link.label }}
                  >
                    <link.icon />
                    <span>{link.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <SidebarSeparator />
          <UserProfile />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
