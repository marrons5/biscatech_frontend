import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar, AppHeader } from '@/components/custom/';
import { Outlet } from 'react-router-dom';

function PrivateAppLayout() {
  return (
    <React.Fragment>
        <section className='bg-background w-full'>
            <SidebarProvider>
                <AppSidebar/>
                <main className='flex flex-col gap-5 w-full'>
                    <AppHeader />
                    <Outlet />
                </main>
            </SidebarProvider>
        </section>
    </React.Fragment>
  )
}

export {PrivateAppLayout};
