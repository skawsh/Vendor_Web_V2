import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  DollarSign, 
  CheckCircle,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mock data for ongoing orders
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
  // State for ongoing orders
  const [ongoingOrders, setOngoingOrders] = useState(initialOngoingOrders);

  // Handle accepting an order
  const handleAcceptOrder = (orderId: string) => {
    setOngoingOrders(prevOrders => 
      prevOrders.map(order => 
        order.orderId === orderId 
          ? { ...order, status: "Accepted" } 
          : order
      )
    );
    
    // Show toast notification
    toast.success(`Order ${orderId} has been accepted`, {
      description: "The order has been moved to processing."
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Skawsh Laundry Studio Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your laundry management system</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

      {/* Ongoing Orders Table */}
      <div className="bg-white dark:bg-card rounded-xl border shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Ongoing Orders</h2>
          <p className="text-sm text-muted-foreground">Manage your current laundry orders</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Weight / Quantity</TableHead>
              <TableHead>Price (₹)</TableHead>
              <TableHead>Order Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ongoingOrders.map((order) => (
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
                  {order.status === "Pending" ? (
                    <Button 
                      size="sm" 
                      onClick={() => handleAcceptOrder(order.orderId)}
                      className="bg-mint-600 hover:bg-mint-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled>
                      Accepted
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Schedule Section */}
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
