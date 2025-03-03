
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  DollarSign, 
  CheckCircle,
  Calendar,
  FileText,
  Search,
  Power,
  Users,
  TrendingUp,
  RotateCw,
  PackageCheck
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

// Sample data for current orders from the Orders page structure
const initialCurrentOrders = [
  {
    id: 1,
    orderId: "ORD-1001",
    orderDate: "01/02/25",
    weightQuantity: "5Kg",
    washType: "Wash & Fold",
    serviceType: "Standard",
    price: 395,
    status: "New Orders"
  },
  {
    id: 2,
    orderId: "ORD-1002",
    orderDate: "01/02/25",
    weightQuantity: "2 pcs",
    washType: "Dry clean",
    serviceType: "Quick",
    price: 300,
    status: "New Orders"
  },
  {
    id: 3,
    orderId: "ORD-1003",
    orderDate: "01/02/25",
    weightQuantity: "2.3Kg",
    washType: "Wash & Iron",
    serviceType: "Both",
    price: 182,
    status: "New Orders"
  },
  {
    id: 4,
    orderId: "ORD-1004",
    orderDate: "02/02/25",
    weightQuantity: "3.5Kg",
    washType: "Wash & Fold",
    serviceType: "Express",
    price: 450,
    status: "Order Received"
  },
  {
    id: 5,
    orderId: "ORD-1005",
    orderDate: "02/02/25",
    weightQuantity: "4Kg",
    washType: "Wash & Iron",
    serviceType: "Standard",
    price: 320,
    status: "Order Received"
  }
];

const Index = () => {
  const [currentOrders, setCurrentOrders] = useState(initialCurrentOrders);
  const [isStudioActive, setIsStudioActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewOrderDetails = (orderId: string) => {
    toast.info(`Viewing details for order ${orderId}`, {
      description: "Opening order details view."
    });
  };

  const handleStudioStatusChange = (newStatus: boolean) => {
    setIsStudioActive(newStatus);
    toast.success(`Studio ${newStatus ? 'activated' : 'deactivated'} successfully`, {
      description: `Your laundry studio is now ${newStatus ? 'active' : 'inactive'}.`
    });
  };

  const filteredOrders = currentOrders.filter(order => 
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.washType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.price.toString().includes(searchQuery)
  );

  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Skawsh Laundry Studio Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your laundry management system</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${isStudioActive ? 'text-green-600' : 'text-red-600'}`}>
            Studio {isStudioActive ? 'Active' : 'Inactive'}
          </span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{isStudioActive ? "On" : "Off"}</span>
                <Switch 
                  checked={isStudioActive} 
                  className={isStudioActive ? "bg-green-500" : "bg-red-500"}
                />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isStudioActive ? "Deactivate Studio?" : "Activate Studio?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to {isStudioActive ? "deactivate" : "activate"} studio? 
                  {isStudioActive ? " This will temporarily stop accepting new orders." : " This will allow new orders to come in."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => handleStudioStatusChange(!isStudioActive)}
                  className={isStudioActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      {/* Enhanced metrics section with 6 important KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="card-stats bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from yesterday</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-blue-500">
              <ShoppingBag size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-stats bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-1">+8% from yesterday</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-green-500">
              <CheckCircle size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-stats bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-1">+2 since morning</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-purple-500">
              <RotateCw size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-stats bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹20,340</div>
            <p className="text-xs text-muted-foreground mt-1">+15% from yesterday</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-amber-500">
              <DollarSign size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-stats bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground mt-1">+3 new today</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-rose-500">
              <Users size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-stats bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+24%</div>
            <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-cyan-500">
              <TrendingUp size={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative mb-6">
        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
          <div className="pl-4">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search for orders, services, status..."
            className="border-0 py-3 px-4 w-full focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-card rounded-xl border shadow-sm overflow-hidden lg:col-span-2">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Current Orders</h2>
            <p className="text-sm text-muted-foreground">Manage your active laundry orders</p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-800 text-white">
                <TableRow className="border-slate-700 hover:bg-slate-800">
                  <TableHead className="text-slate-100 font-medium">Order ID</TableHead>
                  <TableHead className="text-slate-100 font-medium">Service Type</TableHead>
                  <TableHead className="text-slate-100 font-medium">Wash Type</TableHead>
                  <TableHead className="text-slate-100 font-medium">Weight / Qty</TableHead>
                  <TableHead className="text-slate-100 font-medium">Price (₹)</TableHead>
                  <TableHead className="text-slate-100 font-medium">Status</TableHead>
                  <TableHead className="text-slate-100 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.slice(0, 5).map((order) => (
                  <TableRow key={order.id} className="table-row-hover">
                    <TableCell className="font-medium">#{order.orderId}</TableCell>
                    <TableCell>{order.serviceType}</TableCell>
                    <TableCell>{order.washType}</TableCell>
                    <TableCell>{order.weightQuantity}</TableCell>
                    <TableCell>₹{order.price}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        order.status === "New Orders"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Order Received"
                            ? "bg-purple-100 text-purple-700"
                            : order.status === "Orders In Progress"
                              ? "bg-amber-100 text-amber-700" 
                              : "bg-green-100 text-green-700"
                      )}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        onClick={() => handleViewOrderDetails(order.orderId)}
                        variant="outline"
                        className="flex items-center gap-1 bg-laundry-50 text-laundry-700 border-laundry-200 hover:bg-laundry-100"
                      >
                        <FileText className="h-4 w-4" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 text-center">
              <Link to="/orders">
                <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                  View All Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Upcoming pickups and deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="p-2 bg-blue-100 rounded-md">
                  <Calendar className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Pickup - Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">10:30 AM - 123 Main St</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="p-2 bg-green-100 rounded-md">
                  <PackageCheck className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Delivery - John Smith</p>
                  <p className="text-sm text-muted-foreground">11:45 AM - 456 Oak Ave</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="p-2 bg-purple-100 rounded-md">
                  <Calendar className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Pickup - Robert Williams</p>
                  <p className="text-sm text-muted-foreground">2:15 PM - 789 Pine St</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="p-2 bg-amber-100 rounded-md">
                  <PackageCheck className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium">Delivery - Emma Davis</p>
                  <p className="text-sm text-muted-foreground">3:30 PM - 567 Elm St</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
