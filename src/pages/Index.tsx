import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search,
  Power,
  RotateCw,
  PackageCheck,
  Info,
  Filter,
  Inbox,
  Calendar,
  Database,
  User,
  Package
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NotificationsDropdown } from '@/components/NotificationsDropdown';
import OrderFilterDropdown from '@/components/OrderFilterDropdown';

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
    orderDate: "04/02/25",
    weightQuantity: "2.7Kg",
    washType: "Wash & Iron",
    serviceType: "Standard",
    price: 215,
    status: "Order collected"
  },
  {
    id: 9,
    orderId: "ORD-1009",
    orderDate: "04/02/25",
    weightQuantity: "3 pcs",
    washType: "Dry clean",
    serviceType: "Premium",
    price: 410,
    status: "Order collected"
  },
  {
    id: 10,
    orderId: "ORD-1010",
    orderDate: "05/02/25",
    weightQuantity: "4.2Kg",
    washType: "Wash & Fold",
    serviceType: "Express",
    price: 480,
    status: "Order collected"
  }
];

const Index = () => {
  const [currentOrders, setCurrentOrders] = useState(initialCurrentOrders);
  const [isStudioActive, setIsStudioActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("new");
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [driverAssignments, setDriverAssignments] = useState([
    {
      id: 1,
      driverName: "Deepak",
      orderId: "ORD-001",
      action: "drop",
      location: "your studio",
      time: "10:30 AM",
      address: "123 Main St"
    },
    {
      id: 2,
      driverName: "Saiteja",
      orderId: "ORD-005",
      action: "collect",
      location: "your studio",
      time: "11:45 AM",
      address: "456 Oak Ave"
    }
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    setActiveFilter("new");
    
    const handleNewOrder = (event: CustomEvent) => {
      if (event.detail?.orderData) {
        const newOrder = event.detail.orderData;
        setCurrentOrders(prevOrders => [
          {
            id: prevOrders.length + 1,
            ...newOrder
          },
          ...prevOrders
        ]);
        
        toast.success(`New Order ${newOrder.orderId} Received`, {
          description: `${newOrder.washType} - ${newOrder.serviceType} service`
        });
      }
    };
    
    window.addEventListener('newOrder', handleNewOrder as EventListener);
    
    return () => {
      window.removeEventListener('newOrder', handleNewOrder as EventListener);
    };
  }, []);

  const handleViewOrderDetails = (orderId: string) => {
    navigate(`/order/${orderId}`);
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

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    toast.success(`Order ${orderId} status updated to ${newStatus}`, {
      description: "Order status updated successfully."
    });
    
    setCurrentOrders(prevOrders =>
      prevOrders.map(order =>
        order.orderId === orderId
          ? { ...order, status: newStatus }
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

  const handleFilterChange = (filterType: string, value?: any) => {
    setSelectedDateFilter(filterType);
    
    toast.success(`Filter applied: ${filterType}`, {
      description: "Orders filtered by selected criteria."
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery === "08081997") {
      setDriverAssignments(prev => prev.filter(assignment => assignment.action !== "drop"));
    } else if (searchQuery === "08081998") {
      setDriverAssignments(prev => prev.filter(assignment => 
        !(assignment.driverName === "Saiteja" && assignment.action === "collect")
      ));
    } else if (searchQuery === "08081999") {
      const kavyaExists = driverAssignments.some(
        assignment => assignment.driverName === "Kavya" && assignment.orderId === "ORD-008"
      );
      
      if (!kavyaExists) {
        setDriverAssignments(prev => [...prev, {
          id: prev.length + 1,
          driverName: "Kavya",
          orderId: "ORD-008",
          action: "collect",
          location: "your studio",
          time: "1:30 PM",
          address: "789 Pine St"
        }]);
      }
    } else if (searchQuery === "08082000") {
      const eswariExists = driverAssignments.some(
        assignment => assignment.driverName === "Eswari" && assignment.orderId === "OED-012"
      );
      
      if (!eswariExists) {
        setDriverAssignments(prev => [...prev, {
          id: prev.length + 1,
          driverName: "Eswari",
          orderId: "OED-012",
          action: "drop",
          location: "your studio",
          time: "2:15 PM",
          address: "321 Elm St"
        }]);
      }
    }
    
    setSearchQuery("");
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
        if (activeFilter === "ready") return order.status === "Ready for collect";
        if (activeFilter === "collected") return order.status === "Order collected";
        return true;
      });

  const getActionButton = (order: any) => {
    switch(order.status) {
      case "New Orders":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline"
                  className="bg-[#D1FFCE] text-black font-medium text-xs sm:text-sm py-1 px-2 sm:px-3 h-auto mr-2"
                  onClick={() => handleUpdateStatus(order.orderId, "Order Received")}
                >
                  Mark Received
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark order as received</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case "Order Received":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline"
                  className="bg-[#D1FFCE] text-black font-medium text-xs sm:text-sm py-1 px-2 sm:px-3 h-auto mr-2"
                  onClick={() => handleUpdateStatus(order.orderId, "Orders In Progress")}
                >
                  Mark InProgress
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark order as in progress</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case "Orders In Progress":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline"
                  className="bg-[#D1FFCE] text-black font-medium text-xs sm:text-sm py-1 px-2 sm:px-3 h-auto mr-2"
                  onClick={() => handleUpdateStatus(order.orderId, "Ready for collect")}
                >
                  Ready For Collect
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark order as ready for collection</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case "Ready for collect":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline"
                  className="bg-[#D1FFCE] text-black font-medium text-xs sm:text-sm py-1 px-2 sm:px-3 h-auto mr-2"
                  onClick={() => handleUpdateStatus(order.orderId, "Order collected")}
                >
                  Order collected
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark order as collected</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case "Order collected":
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-3 md:p-6">
      <header className="mb-6 flex flex-col md:flex-row justify-between md:items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">Skawsh Laundry Studio Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your laundry management system</p>
        </div>
        <div className="flex items-center gap-3">
          <NotificationsDropdown />
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
            <AlertDialogContent className="max-w-[90vw] w-[450px]">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isStudioActive ? "Deactivate Studio?" : "Activate Studio?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to {isStudioActive ? "deactivate" : "activate"} studio? 
                  {isStudioActive ? " This will temporarily stop accepting new orders." : " This will allow new orders to come in."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
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

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 p-2 bg-gray-50 dark:bg-card rounded-lg">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">Orders</h2>
            <OrderFilterDropdown onFilterChange={handleFilterChange} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="card-stats bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">All Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">54</div>
              <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-gray-500">
                <Database size={20} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-stats bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">New Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-blue-500">
                <ShoppingBag size={20} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-stats bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Received Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-teal-500">
                <Inbox size={20} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-stats bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-purple-500">
                <RotateCw size={20} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-stats bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ready for Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-green-500">
                <PackageCheck size={20} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="relative mb-6">
        <form onSubmit={handleSearchSubmit}>
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
            <Button type="submit" variant="ghost" className="px-4">
              Search
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-card rounded-xl border shadow-sm overflow-hidden mb-6">
        <Tabs defaultValue="current-orders" className="w-full">
          <div className="flex border-b overflow-x-auto">
            <TabsList className="h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="current-orders" 
                className="data-[state=active]:bg-[#0F7EA3] data-[state=active]:text-white rounded-none px-4 sm:px-8 py-4 font-medium text-sm sm:text-base whitespace-nowrap"
              >
                Current orders
              </TabsTrigger>
              <TabsTrigger 
                value="orders-history" 
                className="data-[state=active]:bg-[#0F7EA3] data-[state=active]:text-white rounded-none px-4 sm:px-8 py-4 font-medium text-sm sm:text-base whitespace-nowrap"
              >
                Orders history
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="current-orders" className="m-0">
            <div className="p-2 sm:p-4 bg-white dark:bg-card">
              <div className="rounded-lg overflow-hidden border-2 border-[#0F7EA3] bg-[#0F7EA3] mb-4">
                <div className="flex flex-wrap p-2 bg-[#0F7EA3] rounded-t-lg overflow-x-auto">
                  <Button 
                    onClick={() => setActiveFilter("all")}
                    className={`
                      ${activeFilter === "all" 
                        ? 'bg-[#0F7EA3] text-white border-2 border-white' 
                        : 'bg-white text-black border-2 border-white'} 
                      rounded-md px-4 py-2 m-1
                    `}
                  >
                    All
                  </Button>
                  <Button 
                    onClick={() => setActiveFilter("new")}
                    className={`
                      ${activeFilter === "new" 
                        ? 'bg-[#0F7EA3] text-white border-2 border-white' 
                        : 'bg-white text-black border-2 border-white'} 
                      rounded-md px-4 py-2 m-1
                    `}
                  >
                    New Orders
                  </Button>
                  <Button 
                    onClick={() => setActiveFilter("received")}
                    className={`
                      ${activeFilter === "received" 
                        ? 'bg-[#0F7EA3] text-white border-2 border-white' 
                        : 'bg-white text-black border-2 border-white'} 
                      rounded-md px-4 py-2 m-1
                    `}
                  >
                    Order Received
                  </Button>
                  <Button 
                    onClick={() => setActiveFilter("progress")}
                    className={`
                      ${activeFilter === "progress" 
                        ? 'bg-[#0F7EA3] text-white border-2 border-white' 
                        : 'bg-white text-black border-2 border-white'} 
                      rounded-md px-4 py-2 m-1
                    `}
                  >
                    Orders In Progress
                  </Button>
                  <Button 
                    onClick={() => setActiveFilter("ready")}
                    className={`
                      ${activeFilter === "ready" 
                        ? 'bg-[#0F7EA3] text-white border-2 border-white' 
                        : 'bg-white text-black border-2 border-white'} 
                      rounded-md px-4 py-2 m-1
                    `}
                  >
                    Ready for collect
                  </Button>
                  <Button 
                    onClick={() => setActiveFilter("collected")}
                    className={`
                      ${activeFilter === "collected" 
                        ? 'bg-[#0F7EA3] text-white border-2 border-white' 
                        : 'bg-white text-black border-2 border-white'} 
                      rounded-md px-4 py-2 m-1
                    `}
                  >
                    Order collected
                  </Button>
                </div>
              
                <div className="overflow-x-auto bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#0F7EA3] border-none">
                        <TableHead className="text-white font-bold">Sl No</TableHead>
                        <TableHead className="text-white font-bold">Order ID</TableHead>
                        <TableHead className="text-white font-bold">Order date</TableHead>
                        <TableHead className="text-white font-bold">Weight/ Quantity</TableHead>
                        <TableHead className="text-white font-bold">Wash Type</TableHead>
                        <TableHead className="text-white font-bold">Service Type</TableHead>
                        <TableHead className="text-white font-bold">Price</TableHead>
                        <TableHead className="text-white font-bold">Status</TableHead>
                        <TableHead className="text-white font-bold">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order, index) => (
                          <TableRow key={order.id} className={index % 2 === 0 ? 'bg-[#E6EFF2]' : 'bg-[#F8FBFC]'}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">
                              {order.orderId}
                            </TableCell>
                            <TableCell>{order.orderDate}</TableCell>
                            <TableCell>{order.weightQuantity}</TableCell>
                            <TableCell>{order.washType}</TableCell>
                            <TableCell
                              quickWash={order.serviceType === "Quick"}
                              standardWash={order.serviceType === "Standard"}
                            >
                              {order.serviceType}
                            </TableCell>
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
                                      : order.status === "Ready for collect"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : order.status === "Order collected"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-gray-100 text-gray-700"
                              )}>
                                {order.status}
                              </span>
                            </TableCell>
                            <TableCell className="flex items-center gap-2">
                              {getActionButton(order)}
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      className="rounded-full bg-black text-white w-8 h-8 p-0"
                                      onClick={() => handleViewOrderDetails(order.orderId)}
                                    >
                                      <Info className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View order details</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-4">
                            No orders found matching your criteria
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
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
            <div className="p-2 sm:p-4 bg-white dark:bg-card">
              <div className="rounded-lg overflow-hidden border-2 border-[#0F7EA3] bg-[#0F7EA3]">
                <div className="flex flex-wrap p-2 bg-[#0F7EA3] rounded-t-lg overflow-x-auto">
                  <h3 className="text-white font-semibold px-4 py-2">Order History - Completed Orders</h3>
                </div>
                
                <div className="overflow-x-auto bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#0F7EA3] border-none">
                        <TableHead className="text-white font-bold">S.No</TableHead>
                        <TableHead className="text-white font-bold">Order ID</TableHead>
                        <TableHead className="text-white font-bold">Order date</TableHead>
                        <TableHead className="text-white font-bold">Weight/ Quantity</TableHead>
                        <TableHead className="text-white font-bold">Wash Type</TableHead>
                        <TableHead className="text-white font-bold">Service Type</TableHead>
                        <TableHead className="text-white font-bold">Price (₹)</TableHead>
                        <TableHead className="text-white font-bold">Status</TableHead>
                        <TableHead className="text-white font-bold">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOrders.filter(order => order.status === "Order collected").length > 0 ? (
                        currentOrders
                          .filter(order => order.status === "Order collected")
                          .map((order, index) => (
                            <TableRow key={order.id} className={index % 2 === 0 ? 'bg-[#E6EFF2]' : 'bg-[#F8FBFC]'}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell className="font-medium">
                                {order.orderId}
                              </TableCell>
                              <TableCell>{order.orderDate}</TableCell>
                              <TableCell>{order.weightQuantity}</TableCell>
                              <TableCell>{order.washType}</TableCell>
                              <TableCell
                                quickWash={order.serviceType === "Quick"}
                                standardWash={order.serviceType === "Standard"}
                              >
                                {order.serviceType}
                              </TableCell>
                              <TableCell>₹{order.price}</TableCell>
                              <TableCell>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                  {order.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        variant="outline" 
                                        className="rounded-full bg-black text-white w-8 h-8 p-0"
                                        onClick={() => handleViewOrderDetails(order.orderId)}
                                      >
                                        <Info className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>View order details</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-4">
                            No orders found in history
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 p-2 bg-gray-50 dark:bg-card rounded-lg">
          <h2 className="text-lg font-medium">Today's orders assignment status</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Today's orders assignment status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {driverAssignments.length > 0 ? (
                driverAssignments.map(assignment => (
                  <div key={assignment.id} className="flex items-start gap-3 pb-3 border-b">
                    <div className={`p-2 ${assignment.action === "drop" ? "bg-blue-100" : "bg-green-100"} rounded-md`}>
                      {assignment.action === "drop" ? (
                        <User className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Package className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {assignment.driverName} has assigned to {assignment.action} the {assignment.orderId} {assignment.action === "collect" ? "from" : "at"} {assignment.location}
                      </p>
                      <p className="text-sm text-muted-foreground">{assignment.time} - {assignment.address}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No active assignments</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
