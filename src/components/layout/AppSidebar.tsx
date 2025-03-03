
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  DollarSign, 
  HelpCircle, 
  UserCircle, 
  Settings, 
  ChevronLeft, 
  Menu
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import LaundryLogo from '../LaundryLogo';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, children }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => cn("sidebar-link", isActive && "active")}
  >
    {icon}
    <span>{children}</span>
  </NavLink>
);

const AppSidebar: React.FC = () => {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <LaundryLogo />
          <SidebarTrigger className="lg:flex">
            <ChevronLeft className="h-4 w-4" />
          </SidebarTrigger>
          <SidebarTrigger className="lg:hidden">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        <div className="space-y-1">
          <SidebarLink to="/" icon={<LayoutDashboard className="h-4 w-4" />}>
            Dashboard
          </SidebarLink>
          <SidebarLink to="/orders" icon={<ShoppingBag className="h-4 w-4" />}>
            Orders
          </SidebarLink>
          <SidebarLink to="/revenue" icon={<DollarSign className="h-4 w-4" />}>
            Revenue
          </SidebarLink>
          <SidebarLink to="/support" icon={<HelpCircle className="h-4 w-4" />}>
            Support
          </SidebarLink>
          <SidebarLink to="/profile" icon={<UserCircle className="h-4 w-4" />}>
            Profile
          </SidebarLink>
          <SidebarLink to="/settings" icon={<Settings className="h-4 w-4" />}>
            Settings
          </SidebarLink>
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-muted-foreground">
        <div className="flex flex-col space-y-1">
          <span>© {new Date().getFullYear()} Skawsh Laundry Studio</span>
          <span>v1.0.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
