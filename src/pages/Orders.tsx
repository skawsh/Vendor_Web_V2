
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Truck, 
  Check, 
  X, 
  Clock, 
  ChevronDown, 
  Calendar,
  FileDown,
  Plus
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const orders = [
  { 
    id: "ORD-001", 
    customer: "John Smith", 
    service: "Wash & Fold", 
    items: 5, 
    total: "$35.00", 
    status: "Pending", 
    date: "2023-12-18" 
  },
  { 
    id: "ORD-002", 
    customer: "Sarah Johnson", 
    service: "Dry Cleaning", 
    items: 3, 
    total: "$48.50", 
    status: "Processing", 
    date: "2023-12-17" 
  },
  { 
    id: "ORD-003", 
    customer: "Michael Brown", 
    service: "Ironing", 
    items: 10, 
    total: "$25.00", 
    status: "Ready for delivery", 
    date: "2023-12-17" 
  },
  { 
    id: "ORD-004", 
    customer: "Emily Davis", 
    service: "Wash & Fold", 
    items: 4, 
    total: "$28.00", 
    status: "Completed", 
    date: "2023-12-16" 
  },
  { 
    id: "ORD-005", 
    customer: "Robert Wilson", 
    service: "Stain Removal", 
    items: 2, 
    total: "$40.00", 
    status: "Cancelled", 
    date: "2023-12-16" 
  },
  { 
    id: "ORD-006", 
    customer: "Lisa Martinez", 
    service: "Dry Cleaning", 
    items: 6, 
    total: "$62.75", 
    status: "Pending", 
    date: "2023-12-15" 
  },
  { 
    id: "ORD-007", 
    customer: "David Thompson", 
    service: "Wash & Fold", 
    items: 8, 
    total: "$56.00", 
    status: "Processing", 
    date: "2023-12-15" 
  },
  { 
    id: "ORD-008", 
    customer: "Jennifer Garcia", 
    service: "Ironing", 
    items: 12, 
    total: "$30.00", 
    status: "Ready for delivery", 
    date: "2023-12-14" 
  },
];

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const results = orders.filter(order => 
        order.id.toLowerCase().includes(term.toLowerCase()) ||
        order.customer.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredOrders(results);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Ready for delivery':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>
                  Enter the details for the new laundry order
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer" className="text-right">
                    Customer
                  </Label>
                  <Input
                    id="customer"
                    placeholder="Customer name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="service" className="text-right">
                    Service
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wash">Wash & Fold</SelectItem>
                      <SelectItem value="dry">Dry Cleaning</SelectItem>
                      <SelectItem value="iron">Ironing</SelectItem>
                      <SelectItem value="stain">Stain Removal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="items" className="text-right">
                    Items
                  </Label>
                  <Input
                    id="items"
                    type="number"
                    placeholder="Number of items"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price ($)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Price in USD"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Order</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <FileDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Print Orders
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto mb-4">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="delivery">Ready for Delivery</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders by ID or customer..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Filter Date</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Filter by Service
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Filter by Status
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Filter by Price
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Order ID</th>
                      <th className="text-left p-4 font-medium">Customer</th>
                      <th className="text-left p-4 font-medium">Service</th>
                      <th className="text-left p-4 font-medium">Items</th>
                      <th className="text-left p-4 font-medium">Total</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr key={order.id} className="border-b table-row-hover animate-table-row" style={{ animationDelay: `${index * 0.05}s` }}>
                        <td className="p-4 font-medium">{order.id}</td>
                        <td className="p-4">{order.customer}</td>
                        <td className="p-4">{order.service}</td>
                        <td className="p-4">{order.items}</td>
                        <td className="p-4">{order.total}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4">{order.date}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {order.status === 'Pending' && (
                              <Button variant="outline" size="sm" className="h-8 px-2 text-blue-600">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                Process
                              </Button>
                            )}
                            {order.status === 'Ready for delivery' && (
                              <Button variant="outline" size="sm" className="h-8 px-2 text-purple-600">
                                <Truck className="h-3.5 w-3.5 mr-1" />
                                Deliver
                              </Button>
                            )}
                            {order.status === 'Processing' && (
                              <Button variant="outline" size="sm" className="h-8 px-2 text-green-600">
                                <Check className="h-3.5 w-3.5 mr-1" />
                                Complete
                              </Button>
                            )}
                            {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                              <Button variant="outline" size="sm" className="h-8 px-2 text-red-600">
                                <X className="h-3.5 w-3.5 mr-1" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="mt-0">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Pending orders will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="processing" className="mt-0">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Processing orders will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="delivery" className="mt-0">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Orders ready for delivery will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="mt-0">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Completed orders will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
