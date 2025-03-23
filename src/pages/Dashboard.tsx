import React, { useState } from 'react';
import { ShoppingBag, DollarSign, TrendingUp, Users, BarChart, Box, Clock, CheckCircle, Truck, AlertTriangle, UserCheck, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// Mock data for charts
const revenueData = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 18000 },
  { name: 'Mar', value: 15000 },
  { name: 'Apr', value: 21000 },
  { name: 'May', value: 19000 },
  { name: 'Jun', value: 25000 },
  { name: 'Jul', value: 28000 },
];

const ordersData = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 30 },
  { name: 'Wed', value: 45 },
  { name: 'Thu', value: 50 },
  { name: 'Fri', value: 60 },
  { name: 'Sat', value: 75 },
  { name: 'Sun', value: 35 },
];

const recentOrders = [
  { id: '12345', customer: 'Emma Thompson', service: 'Dry Cleaning', items: 3, total: '$45.00', status: 'Completed' },
  { id: '12346', customer: 'Michael Johnson', service: 'Wash & Fold', items: 5, total: '$35.00', status: 'Processing' },
  { id: '12347', customer: 'Sophia Williams', service: 'Ironing', items: 8, total: '$40.00', status: 'Pending' },
  { id: '12348', customer: 'James Brown', service: 'Stain Removal', items: 2, total: '$25.00', status: 'Delivering' },
  { id: '12349', customer: 'Olivia Davis', service: 'Wash & Fold', items: 4, total: '$30.00', status: 'Completed' },
];

const Dashboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("All Orders");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your laundry business performance</p>
      </div>

      {/* Orders Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[180px] justify-between">
              {selectedFilter}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0">
            <div className="flex flex-col">
              <Button 
                variant="ghost" 
                className="justify-start h-10 px-4 py-2 text-left border-b"
                onClick={() => setSelectedFilter("All Orders")}
              >
                All Orders
              </Button>
              <div className="border-b">
                <Button 
                  variant="ghost" 
                  className="justify-between w-full h-10 px-4 py-2 text-left"
                  onClick={() => setSelectedFilter("Relative Time")}
                >
                  Relative Time
                  <ChevronDown className="h-4 w-4 rotate-270" />
                </Button>
              </div>
              <div className="border-b">
                <Button 
                  variant="ghost" 
                  className="justify-between w-full h-10 px-4 py-2 text-left"
                  onClick={() => setSelectedFilter("Relative Date")}
                >
                  Relative Date
                  <ChevronDown className="h-4 w-4 rotate-270" />
                </Button>
              </div>
              <div className="border-b">
                <Button 
                  variant="ghost" 
                  className="justify-between w-full h-10 px-4 py-2 text-left"
                  onClick={() => setSelectedFilter("Date Range")}
                >
                  Date Range
                  <ChevronDown className="h-4 w-4 rotate-270" />
                </Button>
              </div>
              <Button 
                variant="ghost" 
                className="justify-between w-full h-10 px-4 py-2 text-left"
                onClick={() => setSelectedFilter("Date & Time Range")}
              >
                Date & Time Range
                <ChevronDown className="h-4 w-4 rotate-270" />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-2">Total Orders</p>
              <p className="text-4xl font-bold text-gray-900">26</p>
            </div>
            <div className="bg-blue-500 rounded-full p-3">
              <Box className="h-6 w-6 text-white" />
            </div>
          </CardContent>
        </Card>

        {/* New Orders */}
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-2">New Orders</p>
              <p className="text-4xl font-bold text-gray-900">10</p>
            </div>
            <div className="bg-blue-500 rounded-full p-3">
              <Box className="h-6 w-6 text-white" />
            </div>
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-2">In Progress</p>
              <p className="text-4xl font-bold text-gray-900">2</p>
            </div>
            <div className="bg-amber-500 rounded-full p-3">
              <Box className="h-6 w-6 text-white" />
            </div>
          </CardContent>
        </Card>

        {/* Ready for Collection */}
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-2">Ready for Collection</p>
              <p className="text-4xl font-bold text-gray-900">7</p>
            </div>
            <div className="bg-amber-500 rounded-full p-3">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </CardContent>
        </Card>

        {/* Delivered */}
        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-2">Delivered</p>
              <p className="text-4xl font-bold text-gray-900">5</p>
            </div>
            <div className="bg-green-500 rounded-full p-3">
              <Truck className="h-6 w-6 text-white" />
            </div>
          </CardContent>
        </Card>

        {/* Cancelled */}
        <Card className="bg-red-50 border-red-100">
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-2">Cancelled</p>
              <p className="text-4xl font-bold text-gray-900">1</p>
            </div>
            <div className="bg-red-500 rounded-full p-3">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </CardContent>
        </Card>

        {/* Assigned */}
        <Card className="bg-cyan-50 border-cyan-100">
          <CardContent className="p-6 flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-2">Assigned</p>
              <p className="text-4xl font-bold text-gray-900">10</p>
            </div>
            <div className="bg-cyan-500 rounded-full p-3">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name="Revenue"
                      stroke="#0A96EA" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders Overview</CardTitle>
              <CardDescription>Daily orders for the current week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={ordersData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="value" name="Orders" fill="#0A96EA" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div>
        <h2 className="text-xl font-semibold mb-4">Ongoing Orders</h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">S.NO</th>
                    <th className="text-left p-4 font-medium">ORDER ID</th>
                    <th className="text-left p-4 font-medium">WEIGHT / QUANTITY</th>
                    <th className="text-left p-4 font-medium">PRICE</th>
                    <th className="text-left p-4 font-medium">ORDER TYPE</th>
                    <th className="text-right p-4 font-medium">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b table-row-hover animate-table-row animate-delay-100">
                    <td className="p-4">1</td>
                    <td className="p-4">12121</td>
                    <td className="p-4">5kgs</td>
                    <td className="p-4">$500</td>
                    <td className="p-4">Quick Order</td>
                    <td className="p-4 text-right">
                      <button className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
                        Accept
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b table-row-hover animate-table-row animate-delay-200">
                    <td className="p-4">2</td>
                    <td className="p-4">45325</td>
                    <td className="p-4">5units</td>
                    <td className="p-4">$500</td>
                    <td className="p-4">Stand Order</td>
                    <td className="p-4 text-right">
                      <button className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
                        Accept
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest 5 orders received</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="text-left py-3 px-2 font-medium">ID</th>
                    <th className="text-left py-3 px-2 font-medium">Customer</th>
                    <th className="text-left py-3 px-2 font-medium">Service</th>
                    <th className="text-left py-3 px-2 font-medium">Items</th>
                    <th className="text-left py-3 px-2 font-medium">Total</th>
                    <th className="text-left py-3 px-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={order.id} className="border-b text-sm table-row-hover">
                      <td className="py-3 px-2">{order.id}</td>
                      <td className="py-3 px-2">{order.customer}</td>
                      <td className="py-3 px-2">{order.service}</td>
                      <td className="py-3 px-2">{order.items}</td>
                      <td className="py-3 px-2">{order.total}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Services Performance</CardTitle>
            <CardDescription>Most popular services this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Wash & Fold</span>
                <span className="text-sm text-muted-foreground">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Dry Cleaning</span>
                <span className="text-sm text-muted-foreground">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Ironing</span>
                <span className="text-sm text-muted-foreground">30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Stain Removal</span>
                <span className="text-sm text-muted-foreground">20%</span>
              </div>
              <Progress value={20} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Leather/Suede</span>
                <span className="text-sm text-muted-foreground">10%</span>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

