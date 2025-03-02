
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shirt, 
  Package, 
  Truck, 
  Sparkles, 
  BarChart3, 
  Calendar, 
  DollarSign,
  Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Laundry Lounge Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your laundry management system</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="card-stats card-stats-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-primary">
              <Package size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-stats card-stats-pink">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,543</div>
            <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-pink-500">
              <DollarSign size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-stats card-stats-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-mint-600">
              <Truck size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-stats card-stats-yellow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">+3 new services</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-cream-600">
              <Sparkles size={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link to="/orders" className="flex flex-col items-center p-6 bg-white dark:bg-card rounded-xl border shadow-sm hover:shadow-md transition-all text-center">
          <Package className="h-8 w-8 mb-2 text-primary" />
          <span className="font-medium">Orders</span>
        </Link>
        
        <Link to="/services" className="flex flex-col items-center p-6 bg-white dark:bg-card rounded-xl border shadow-sm hover:shadow-md transition-all text-center">
          <Sparkles className="h-8 w-8 mb-2 text-pink-500" />
          <span className="font-medium">Services</span>
        </Link>
        
        <Link to="/drivers" className="flex flex-col items-center p-6 bg-white dark:bg-card rounded-xl border shadow-sm hover:shadow-md transition-all text-center">
          <Truck className="h-8 w-8 mb-2 text-mint-600" />
          <span className="font-medium">Drivers</span>
        </Link>
        
        <Link to="/customers" className="flex flex-col items-center p-6 bg-white dark:bg-card rounded-xl border shadow-sm hover:shadow-md transition-all text-center">
          <Users className="h-8 w-8 mb-2 text-cream-600" />
          <span className="font-medium">Customers</span>
        </Link>
      </div>

      {/* Additional Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest laundry orders received</CardDescription>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-2">Order ID</th>
                  <th className="text-left pb-2">Customer</th>
                  <th className="text-left pb-2">Status</th>
                  <th className="text-right pb-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-row-hover border-b">
                  <td className="py-3">#ORD-7452</td>
                  <td className="py-3">John Smith</td>
                  <td className="py-3"><span className="px-2 py-1 bg-mint-100 text-mint-700 rounded-full text-xs">Completed</span></td>
                  <td className="py-3 text-right">$48.25</td>
                </tr>
                <tr className="table-row-hover border-b">
                  <td className="py-3">#ORD-7451</td>
                  <td className="py-3">Sarah Johnson</td>
                  <td className="py-3"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Processing</span></td>
                  <td className="py-3 text-right">$32.99</td>
                </tr>
                <tr className="table-row-hover border-b">
                  <td className="py-3">#ORD-7450</td>
                  <td className="py-3">Michael Brown</td>
                  <td className="py-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Pickup</span></td>
                  <td className="py-3 text-right">$75.50</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 text-center">
              <Link to="/orders" className="text-primary hover:underline text-sm">View all orders →</Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
            <CardDescription>Today's pickup and delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="p-2 bg-laundry-100 rounded-md">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Pickup - Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">10:30 AM - 123 Main St</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="p-2 bg-pink-100 rounded-md">
                  <Calendar className="h-4 w-4 text-pink-500" />
                </div>
                <div>
                  <p className="font-medium">Delivery - John Smith</p>
                  <p className="text-sm text-muted-foreground">11:45 AM - 456 Oak Ave</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="p-2 bg-mint-100 rounded-md">
                  <Calendar className="h-4 w-4 text-mint-600" />
                </div>
                <div>
                  <p className="font-medium">Pickup - Robert Williams</p>
                  <p className="text-sm text-muted-foreground">2:15 PM - 789 Pine St</p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link to="/schedule" className="text-primary hover:underline text-sm">View full schedule →</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
