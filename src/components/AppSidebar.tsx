
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  DollarSign, 
  HelpCircle, 
  User, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const AppSidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);

  // Handle window resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Orders', icon: ShoppingBag, path: '/orders' },
    { name: 'Revenue', icon: DollarSign, path: '/revenue' },
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Support', icon: HelpCircle, path: '/support' }, // Moved to last
  ];

  const SidebarContent = () => (
    <nav className="px-3">
      <ul className="space-y-1">
        {sidebarLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-accent ${
                isActive(link.path) ? 'bg-accent text-primary font-medium' : 'text-foreground/80'
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  // Mobile sidebar (using Sheet component)
  if (isMobileView) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-sidebar-border z-30 flex items-center px-4">
          <div className="flex-1 flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary">Skawsh Laundry</h2>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-sidebar border-r border-sidebar-border w-64 p-0">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-primary">Skawsh Laundry</h2>
                  </div>
                </div>
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="h-16"></div> {/* Spacer for fixed header */}
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside className="h-screen w-64 bg-sidebar border-r border-sidebar-border flex-shrink-0 fixed left-0 top-0 hidden lg:block">
      <div className="p-6">
        <h2 className="text-xl font-bold text-primary mb-6">Skawsh Laundry</h2>
      </div>
      <SidebarContent />
    </aside>
  );
};

export default AppSidebar;
