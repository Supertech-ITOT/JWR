import React from 'react'
import { SidebarProvider } from './ui/sidebar'

const SidebarStateBridge = ({ defaultOpen, children }) => {
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            {children}
        </SidebarProvider>
    )
}

export default SidebarStateBridge