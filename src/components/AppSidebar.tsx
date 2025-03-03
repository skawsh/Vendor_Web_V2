
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  DollarSign, 
  HelpCircle, 
  User, 
  Settings
} from 'lucide-react';

const AppSidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const sidebarLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Orders', icon: ShoppingBag, path: '/orders' },
    { name: 'Revenue', icon: DollarSign, path: '/revenue' },
    { name: 'Support', icon: HelpCircle, path: '/support' },
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="h-screen w-64 bg-sidebar border-r border-sidebar-border flex-shrink-0 fixed left-0 top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-primary mb-6">Skawsh Laundry</h2>
      </div>
      <nav className="px-3">
        <ul className="space-y-1">
          {sidebarLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`sidebar-link ${isActive(link.path) ? 'active' : ''}`}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AppSidebar;
