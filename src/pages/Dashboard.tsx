
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import NotificationArea from '@/components/NotificationArea';

// Sample data for charts
const orderData = [
  { name: 'Mon', orders: 4 },
  { name: 'Tue', orders: 7 },
  { name: 'Wed', orders: 5 },
  { name: 'Thu', orders: 6 },
  { name: 'Fri', orders: 9 },
  { name: 'Sat', orders: 11 },
  { name: 'Sun', orders: 8 },
];

const revenueData = [
  { name: 'Mon', revenue: 2400 },
  { name: 'Tue', revenue: 4500 },
  { name: 'Wed', revenue: 3200 },
  { name: 'Thu', revenue: 3800 },
  { name: 'Fri', revenue: 5200 },
  { name: 'Sat', revenue: 6800 },
  { name: 'Sun', revenue: 4900 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your laundry studio's performance
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Orders</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">52</div>
              <p className="text-sm text-green-600 flex items-center mt-1">
                +12% from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Revenue</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹28,590</div>
              <p className="text-sm text-green-600 flex items-center mt-1">
                +8% from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Order</CardTitle>
              <CardDescription>Value per order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹550</div>
              <p className="text-sm text-green-600 flex items-center mt-1">
                +4% from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Orders</CardTitle>
              <CardDescription>Require attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-sm text-amber-600 flex items-center mt-1">
                2 delayed orders
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Notification Area */}
        <div>
          <NotificationArea />
        </div>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
          <CardDescription>
            View your laundry service performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="orders">
            <TabsList className="mb-4">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="revenue" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
