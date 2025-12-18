import AppSidebar from '@/components/app-sidebar'
import DateProvider from '@/components/DateProvider';
import SidebarStateBridge from '@/components/SidebarStateBridge';
import { SidebarTrigger } from '@/components/ui/sidebar'
import { FilterProvider } from '@/context/FilterContext';
import { cookies } from 'next/headers';
import React from 'react'

const DashboardLayout = async ({ children }) => {
  let defaultOpen = true;
  try {
    const CookieStore = await cookies()
    defaultOpen = CookieStore.get("sidebar_state")?.value === "true";
  }
  catch (err) {
    console.error("Cookie Failed:", err)
  }
  return (
    <FilterProvider>
      <DateProvider>
        <SidebarStateBridge defaultOpen={defaultOpen}>
          <AppSidebar />
          <main className='min-h-screen w-full bg-background'>
            <div className='z-12 fixed top-1/2 '><SidebarTrigger /></div>
            <div className='h-full flex justify-center items-center  p-2 xl:px-24 '>{children}</div>
          </main>
        </SidebarStateBridge>
      </DateProvider>
    </FilterProvider>
  )
}

export default DashboardLayout