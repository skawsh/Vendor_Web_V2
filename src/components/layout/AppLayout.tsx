
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from './AppSidebar';
import TopBar from './TopBar';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background relative">
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-mint-100 to-transparent rounded-tr-full"></div>
          <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-laundry-100 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-cream-100 rounded-full blur-3xl"></div>
        </div>
        
        <AppSidebar />
        <div className="flex flex-col flex-1 w-full overflow-hidden relative z-10">
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
