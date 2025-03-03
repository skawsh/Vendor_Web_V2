
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  },
  {
    id: 6,
    orderId: "ORD-1006",
    orderDate: "03/02/25",
    weightQuantity: "3Kg",
    washType: "Wash & Fold",
    serviceType: "Express",
    price: 380,
    status: "Orders In Progress"
  },
  {
    id: 7,
    orderId: "ORD-1007",
    orderDate: "03/02/25",
    weightQuantity: "2Kg",
    washType: "Wash & Iron",
    serviceType: "Standard",
    price: 150,
    status: "Orders In Progress"
  },
  {
    id: 8,
    orderId: "ORD-1008",
    orderDate: "01/02/25",
    weightQuantity: "3.5Kg",
    washType: "Dry Clean",
    serviceType: "Express",
    price: 550,
    status: "Orders Ready"
  },
  {
    id: 9,
    orderId: "ORD-1009",
    orderDate: "02/02/25",
    weightQuantity: "2.8Kg",
    washType: "Wash & Iron",
    serviceType: "Quick",
    price: 220,
    status: "Orders Ready"
  },
  {
    id: 10,
    orderId: "ORD-1010",
    orderDate: "01/02/25",
    weightQuantity: "4.2Kg",
    washType: "Wash & Fold",
    serviceType: "Standard",
    price: 420,
    status: "Delivered"
  }
];

const Index = () => {
  const [currentOrders, setCurrentOrders] = useState(initialCurrentOrders);
  const [isStudioActive, setIsStudioActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const handleViewOrderDetails = (orderId: string) => {
    toast.info(`Viewing details for order ${orderId}`, {
      description: "Opening order details view."
    });
  };

  const handleMarkReceived = (orderId: string) => {
    toast.success(`Order ${orderId} marked as received`, {
      description: "Order status updated successfully."
    });
    
    setCurrentOrders(prevOrders =>
      prevOrders.map(order =>
        order.orderId === orderId
          ? { ...order, status: "Order Received" }
          : order
      )
    );
  };

  const handleStudioStatusChange = (newStatus: boolean) => {
    setIsStudioActive(newStatus);
    toast.success(`Studio ${newStatus ? 'activated' : 'deactivated'} successfully`, {
      description: `Your laundry studio is now ${newStatus ? 'active' : 'inactive'}.`
    });
  };

  const filteredBySearch = currentOrders.filter(order => 
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.washType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.price.toString().includes(searchQuery)
  );

  const filteredOrders = activeFilter === "all" 
    ? filteredBySearch 
    : filteredBySearch.filter(order => {
        if (activeFilter === "new") return order.status === "New Orders";
        if (activeFilter === "received") return order.status === "Order Received";
        if (activeFilter === "progress") return order.status === "Orders In Progress";
        if (activeFilter === "ready") return order.status === "Orders Ready";
        if (activeFilter === "collected") return order.status === "Delivered";
        return true;
      });

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

      {/* Current Orders Section with Tabs and Status Filters */}
      <div className="bg-white dark:bg-card rounded-xl border shadow-sm overflow-hidden mb-6">
        <Tabs defaultValue="current-orders" className="w-full">
          <div className="flex border-b">
            <TabsList className="h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="current-orders" 
                className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white rounded-none px-8 py-4 font-medium text-base"
              >
                Current orders
              </TabsTrigger>
              <TabsTrigger 
                value="orders-history" 
                className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white rounded-none px-8 py-4 font-medium text-base"
              >
                Orders history
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="current-orders" className="m-0">
            <div className="p-4 bg-white dark:bg-card">
              <div className="flex flex-wrap gap-3 mb-4">
                <Button 
                  onClick={() => setActiveFilter("all")}
                  variant={activeFilter === "all" ? "default" : "outline"}
                  className={activeFilter === "all" ? "bg-cyan-600 hover:bg-cyan-700" : ""}
                >
                  All Orders
                </Button>
                <Button 
                  onClick={() => setActiveFilter("new")}
                  variant={activeFilter === "new" ? "default" : "outline"}
                  className={activeFilter === "new" ? "bg-cyan-600 hover:bg-cyan-700" : ""}
                >
                  New Orders
                </Button>
                <Button 
                  onClick={() => setActiveFilter("received")}
                  variant={activeFilter === "received" ? "default" : "outline"}
                  className={activeFilter === "received" ? "bg-cyan-600 hover:bg-cyan-700" : ""}
                >
                  Order Received
                </Button>
                <Button 
                  onClick={() => setActiveFilter("progress")}
                  variant={activeFilter === "progress" ? "default" : "outline"}
                  className={activeFilter === "progress" ? "bg-cyan-600 hover:bg-cyan-700" : ""}
                >
                  Orders In Progress
                </Button>
                <Button 
                  onClick={() => setActiveFilter("ready")}
                  variant={activeFilter === "ready" ? "default" : "outline"}
                  className={activeFilter === "ready" ? "bg-cyan-600 hover:bg-cyan-700" : ""}
                >
                  Ready for collect
                </Button>
                <Button 
                  onClick={() => setActiveFilter("collected")}
                  variant={activeFilter === "collected" ? "default" : "outline"}
                  className={activeFilter === "collected" ? "bg-cyan-600 hover:bg-cyan-700" : ""}
                >
                  Order collected
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-cyan-600 text-white">
                    <TableRow className="border-none hover:bg-cyan-600">
                      <TableHead className="text-white font-medium">Sl No</TableHead>
                      <TableHead className="text-white font-medium">Order ID</TableHead>
                      <TableHead className="text-white font-medium">Order date</TableHead>
                      <TableHead className="text-white font-medium">Weight/ Quantity</TableHead>
                      <TableHead className="text-white font-medium">Wash Type</TableHead>
                      <TableHead className="text-white font-medium">Service Type</TableHead>
                      <TableHead className="text-white font-medium">Price</TableHead>
                      <TableHead className="text-white font-medium">Status</TableHead>
                      <TableHead className="text-white font-medium">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order, index) => (
                      <TableRow key={order.id} className="hover:bg-gray-50 even:bg-gray-50/50">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">
                          {order.orderId}
                        </TableCell>
                        <TableCell>{order.orderDate}</TableCell>
                        <TableCell>{order.weightQuantity}</TableCell>
                        <TableCell>{order.washType}</TableCell>
                        <TableCell>{order.serviceType}</TableCell>
                        <TableCell>₹{order.price}</TableCell>
                        <TableCell>
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            order.status === "New Orders"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "Order Received"
                                ? "bg-purple-100 text-purple-700"
                                : order.status === "Orders In Progress"
                                  ? "bg-amber-100 text-amber-700" 
                                  : order.status === "Orders Ready"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : order.status === "Delivered"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-gray-100 text-gray-700"
                          )}>
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          {order.status === "New Orders" && (
                            <Button 
                              size="sm" 
                              onClick={() => handleMarkReceived(order.orderId)}
                              className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
                            >
                              Mark Received
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="rounded-full p-2 w-9 h-9"
                            onClick={() => handleViewOrderDetails(order.orderId)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="p-4 text-center">
                <Link to="/orders">
                  <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                    View All Orders
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="orders-history" className="m-0">
            <div className="p-12 text-center">
              <h3 className="text-lg font-medium mb-2">Orders History</h3>
              <p className="text-muted-foreground">View your past orders and their details here</p>
              <Button className="mt-4 bg-cyan-600 hover:bg-cyan-700">
                View Complete History
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Today's Schedule Section - Moved to the end */}
      <Card className="mb-6">
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
  );
};

export default Index;
