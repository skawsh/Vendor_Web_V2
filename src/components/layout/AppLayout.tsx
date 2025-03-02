
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from './AppSidebar';
import TopBar from './TopBar';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider defaultIsOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <AppSidebar />
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          <TopBar />
          <main className={cn(
            "flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 transition-all duration-300 ease-in-out",
            sidebarOpen ? "lg:ml-64" : "lg:ml-20"
          )}>
            <div className="mx-auto w-full max-w-7xl animate-fade-in">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
