import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  DollarSign, 
  CheckCircle,
  Calendar,
  FileText,
  Search,
  Power
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

const initialOngoingOrders = [
  {
    sNo: 1,
    orderId: "12321",
    weightQuantity: "5kgs",
    price: "500",
    orderType: "Quick Order",
    status: "Pending"
  },
  {
    sNo: 2,
    orderId: "SUN15",
    weightQuantity: "3kgs",
    price: "300",
    orderType: "Standard Order",
    status: "Pending"
  },
  {
    sNo: 3,
    orderId: "MAX22",
    weightQuantity: "7kgs",
    price: "700",
    orderType: "Express Order",
    status: "Pending"
  },
  {
    sNo: 4,
    orderId: "LON77",
    weightQuantity: "2kgs",
    price: "200",
    orderType: "Basic Order",
    status: "Pending"
  },
  {
    sNo: 5,
    orderId: "CLE45",
    weightQuantity: "4kgs",
    price: "400",
    orderType: "Premium Order",
    status: "Pending"
  }
];

const Index = () => {
  const [ongoingOrders, setOngoingOrders] = useState(initialOngoingOrders);
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

  const filteredOrders = ongoingOrders.filter(order => 
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.price.includes(searchQuery) ||
    order.weightQuantity.toLowerCase().includes(searchQuery.toLowerCase())
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="card-stats card-stats-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from yesterday</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-primary">
              <ShoppingBag size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-stats card-stats-pink">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18,465</div>
            <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-pink-500">
              <ShoppingBag size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-stats card-stats-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹20,340</div>
            <p className="text-xs text-muted-foreground mt-1">+15% from yesterday</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-mint-600">
              <DollarSign size={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-stats card-stats-yellow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,565</div>
            <p className="text-xs text-muted-foreground mt-1">+10% from last month</p>
            <div className="absolute right-4 top-4 p-2 bg-white/80 rounded-full text-cream-600">
              <DollarSign size={20} />
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
            placeholder="Search for orders, customers, services..."
            className="border-0 py-3 px-4 w-full focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-card rounded-xl border shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Ongoing Orders</h2>
          <p className="text-sm text-muted-foreground">Manage your current laundry orders</p>
        </div>
        <Table>
          <TableHeader className="bg-slate-800 text-white">
            <TableRow className="border-slate-700 hover:bg-slate-800">
              <TableHead className="text-slate-100 font-medium">S.No</TableHead>
              <TableHead className="text-slate-100 font-medium">Order ID</TableHead>
              <TableHead className="text-slate-100 font-medium">Weight / Quantity</TableHead>
              <TableHead className="text-slate-100 font-medium">Price (₹)</TableHead>
              <TableHead className="text-slate-100 font-medium">Order Type</TableHead>
              <TableHead className="text-slate-100 font-medium">Status</TableHead>
              <TableHead className="text-slate-100 font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.sNo} className="table-row-hover">
                <TableCell>{order.sNo}</TableCell>
                <TableCell className="font-medium">#{order.orderId}</TableCell>
                <TableCell>{order.weightQuantity}</TableCell>
                <TableCell>₹{order.price}</TableCell>
                <TableCell>{order.orderType}</TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs",
                    order.status === "Accepted" 
                      ? "bg-mint-100 text-mint-700" 
                      : "bg-blue-100 text-blue-700"
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
      </div>

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
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
