
import React from 'react';
import { ShoppingBag, DollarSign, TrendingUp, Users, BarChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar } from 'recharts';

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
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your laundry business performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-stats card-stats-pink animate-scale-in">
          <CardHeader className="pb-2">
            <div className="absolute top-4 right-4 p-2.5 bg-pink-200/80 rounded-full text-pink-700">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today Orders
            </CardTitle>
            <CardDescription className="text-3xl font-bold text-foreground">
              2,450
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-2">
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +5% from yesterday
            </p>
          </CardFooter>
        </Card>

        <Card className="card-stats card-stats-blue animate-scale-in">
          <CardHeader className="pb-2">
            <div className="absolute top-4 right-4 p-2.5 bg-laundry-200/80 rounded-full text-laundry-700">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <CardDescription className="text-3xl font-bold text-foreground">
              18,465
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-2">
            <p className="text-xs text-muted-foreground">
              Payment Date: 18 Dec
            </p>
          </CardFooter>
        </Card>

        <Card className="card-stats card-stats-green animate-scale-in">
          <CardHeader className="pb-2">
            <div className="absolute top-4 right-4 p-2.5 bg-mint-200/80 rounded-full text-mint-700">
              <DollarSign className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today Revenue
            </CardTitle>
            <CardDescription className="text-3xl font-bold text-foreground">
              $20,340
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-2">
            <p className="text-xs text-muted-foreground">
              Payment Date: 11 Dec
            </p>
          </CardFooter>
        </Card>

        <Card className="card-stats card-stats-yellow animate-scale-in">
          <CardHeader className="pb-2">
            <div className="absolute top-4 right-4 p-2.5 bg-cream-200/80 rounded-full text-amber-700">
              <DollarSign className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <CardDescription className="text-3xl font-bold text-foreground">
              $45,565
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-2">
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +5% from yesterday
            </p>
          </CardFooter>
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
