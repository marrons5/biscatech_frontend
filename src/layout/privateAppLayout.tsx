import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar, AppHeader } from '@/components/custom/';
import { Outlet } from 'react-router-dom';

function PrivateAppLayout() {
  return (
    <React.Fragment>
        <section className='bg-black w-full'>
            <SidebarProvider>
                <AppSidebar/>
                <main className='flex w-full'>
                    {/* <AppHeader /> */}
                    <Outlet />
                </main>
            </SidebarProvider>
        </section>
    </React.Fragment>
  )
}

export {PrivateAppLayout};
