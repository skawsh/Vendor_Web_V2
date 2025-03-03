
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCircle, Download, FileText, RefreshCcw, Filter, Search, X } from "lucide-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";

const currentOrders = [
  {
    sNo: 1,
    orderId: "12321",
    customerName: "John Doe",
    serviceType: "Wash & Fold",
    status: "New order"
  },
  {
    sNo: 2,
    orderId: "SUN15",
    customerName: "Jane Smith",
    serviceType: "Dry Cleaning",
    status: "Order received"
  },
  {
    sNo: 3,
    orderId: "MAX22",
    customerName: "David Lee",
    serviceType: "Wash & Iron",
    status: "Order in progress"
  },
  {
    sNo: 4,
    orderId: "LON77",
    customerName: "Emily White",
    serviceType: "Shoe Cleaning",
    status: "Ready for collect"
  },
  {
    sNo: 5,
    orderId: "CLE45",
    customerName: "Kevin Brown",
    serviceType: "Bedding & Linen",
    status: "Order collected"
  }
];

const currentOrderStatuses = [
  "New order",
  "Order received",
  "Order in progress",
  "Ready for collect",
  "Order collected",
  "Cancelled"
];

// Order history demo data
const orderHistoryData = [
  {
    slNo: 1,
    orderId: "ORD7821",
    customerName: "Emma Wilson",
    serviceType: "Wash & Fold",
    washType: "Standard Wash",
    weightQuantity: "3kgs",
    price: "450",
    orderType: "Regular",
    orderDate: "2023-12-15",
    completionDate: "2023-12-17",
    status: "Completed"
  },
  {
    slNo: 2,
    orderId: "ORD9432",
    customerName: "Michael Brown",
    serviceType: "Dry Cleaning",
    washType: "Premium",
    weightQuantity: "2kgs",
    price: "650",
    orderType: "Express",
    orderDate: "2023-12-18",
    completionDate: "2023-12-19",
    status: "Completed"
  },
  {
    slNo: 3,
    orderId: "ORD6518",
    customerName: "Sophia Garcia",
    serviceType: "Wash & Iron",
    washType: "Quick Wash",
    weightQuantity: "4kgs",
    price: "580",
    orderType: "Standard",
    orderDate: "2023-12-20",
    completionDate: "2023-12-22",
    status: "Completed"
  },
  {
    slNo: 4,
    orderId: "ORD3275",
    customerName: "James Johnson",
    serviceType: "Shoe Cleaning",
    washType: "Deep Clean",
    weightQuantity: "1kg",
    price: "350",
    orderType: "Premium",
    orderDate: "2023-12-22",
    completionDate: "2023-12-24",
    status: "Completed"
  },
  {
    slNo: 5,
    orderId: "ORD8943",
    customerName: "Olivia Martinez",
    serviceType: "Bedding & Linen",
    washType: "Standard Wash",
    weightQuantity: "5kgs",
    price: "750",
    orderType: "Regular",
    orderDate: "2023-12-25",
    completionDate: "2023-12-28",
    status: "Completed"
  },
  {
    slNo: 6,
    orderId: "ORD4127",
    customerName: "William Thompson",
    serviceType: "Wash & Fold",
    washType: "Quick Wash",
    weightQuantity: "3.5kgs",
    price: "520",
    orderType: "Express",
    orderDate: "2024-01-02",
    completionDate: "2024-01-03",
    status: "Completed"
  },
  {
    slNo: 7,
    orderId: "ORD5689",
    customerName: "Ava Rodriguez",
    serviceType: "Dry Cleaning",
    washType: "Premium",
    weightQuantity: "2.5kgs",
    price: "700",
    orderType: "Premium",
    orderDate: "2024-01-05",
    completionDate: "2024-01-08",
    status: "Completed"
  },
  {
    slNo: 8,
    orderId: "ORD2347",
    customerName: "Lucas Harris",
    serviceType: "Curtains & Drapes",
    washType: "Standard Wash",
    weightQuantity: "6kgs",
    price: "950",
    orderType: "Regular",
    orderDate: "2024-01-10",
    completionDate: "2024-01-14",
    status: "Completed"
  },
  {
    slNo: 9,
    orderId: "ORD9016",
    customerName: "Isabella Clark",
    serviceType: "Wash & Iron",
    washType: "Quick Wash",
    weightQuantity: "4.5kgs",
    price: "620",
    orderType: "Express",
    orderDate: "2024-01-15",
    completionDate: "2024-01-16",
    status: "Completed"
  },
  {
    slNo: 10,
    orderId: "ORD7403",
    customerName: "Noah Lewis",
    serviceType: "Shoe Cleaning",
    washType: "Deep Clean",
    weightQuantity: "1.5kgs",
    price: "380",
    orderType: "Standard",
    orderDate: "2024-01-20",
    completionDate: "2024-01-22",
    status: "Completed"
  }
];

const Orders = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string | null>(null);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    toast.success(`Order ${orderId} status updated to ${newStatus}`, {
      description: "The order status has been successfully updated."
    });
  };

  const viewOrderDetails = (orderId: string) => {
    toast.info(`Viewing details for order ${orderId}`, {
      description: "Opening order details view."
    });
  };

  const exportOrderHistory = () => {
    toast.success("Exporting order history", {
      description: "Your order history is being exported to CSV."
    });
    // In a real application, this would trigger a CSV download
  };

  // Get unique service types for filter dropdown
  const uniqueServiceTypes = Array.from(new Set(currentOrders.map(order => order.serviceType)));

  // Filter current orders based on search and filters
  const filteredCurrentOrders = currentOrders.filter(order => {
    const matchesSearch = searchQuery === "" || 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === null || order.status === statusFilter;
    const matchesServiceType = serviceTypeFilter === null || order.serviceType === serviceTypeFilter;
    
    return matchesSearch && matchesStatus && matchesServiceType;
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter(null);
    setServiceTypeFilter(null);
  };

  // Function to get status color based on the order status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "New order":
        return "bg-blue-100 text-blue-800";
      case "Order received":
        return "bg-purple-100 text-purple-800";
      case "Order in progress":
        return "bg-yellow-100 text-yellow-800";
      case "Ready for collect":
        return "bg-green-100 text-green-800";
      case "Order collected":
        return "bg-gray-100 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>
      
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Current Orders</TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Current Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by order ID, customer name..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <select 
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={statusFilter || ""}
                    onChange={(e) => setStatusFilter(e.target.value || null)}
                  >
                    <option value="">All Statuses</option>
                    {currentOrderStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  
                  <select 
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={serviceTypeFilter || ""}
                    onChange={(e) => setServiceTypeFilter(e.target.value || null)}
                  >
                    <option value="">All Service Types</option>
                    {uniqueServiceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  
                  {(searchQuery || statusFilter || serviceTypeFilter) && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearFilters}
                      className="flex items-center gap-1"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Clear
                    </Button>
                  )}
                </div>
              </div>
              
              <Table>
                <TableHeader className="bg-slate-800 text-white">
                  <TableRow className="border-slate-700 hover:bg-slate-800">
                    <TableHead className="text-slate-100 font-medium">S.No</TableHead>
                    <TableHead className="text-slate-100 font-medium">Order ID</TableHead>
                    <TableHead className="text-slate-100 font-medium">Customer Name</TableHead>
                    <TableHead className="text-slate-100 font-medium">Service Type</TableHead>
                    <TableHead className="text-slate-100 font-medium">Status</TableHead>
                    <TableHead className="text-slate-100 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCurrentOrders.length > 0 ? (
                    filteredCurrentOrders.map((order) => (
                      <TableRow key={order.orderId} className="hover:bg-slate-50">
                        <TableCell>{order.sNo}</TableCell>
                        <TableCell className="font-medium">#{order.orderId}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.serviceType}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                            <select 
                              className="px-4 py-2 rounded-md border bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                              defaultValue={order.status}
                              onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                            >
                              {currentOrderStatuses.map((status) => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex items-center gap-1 bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                            onClick={() => viewOrderDetails(order.orderId)}
                          >
                            <FileText className="h-4 w-4" />
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No orders found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
              <CardTitle>Order History</CardTitle>
              <div className="flex flex-col md:flex-row gap-2 md:items-center">
                <DateRangePicker 
                  date={dateRange}
                  onDateChange={setDateRange}
                />
                <Button 
                  variant="outline" 
                  className="ml-auto bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  onClick={exportOrderHistory}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-800 text-white">
                    <TableRow className="border-slate-700 hover:bg-slate-800">
                      <TableHead className="text-slate-100 font-medium">S.No</TableHead>
                      <TableHead className="text-slate-100 font-medium">Order ID</TableHead>
                      <TableHead className="text-slate-100 font-medium">Customer Name</TableHead>
                      <TableHead className="text-slate-100 font-medium">Service Type</TableHead>
                      <TableHead className="text-slate-100 font-medium">Wash Type</TableHead>
                      <TableHead className="text-slate-100 font-medium">Weight / Quantity</TableHead>
                      <TableHead className="text-slate-100 font-medium">Price (₹)</TableHead>
                      <TableHead className="text-slate-100 font-medium">Order Date</TableHead>
                      <TableHead className="text-slate-100 font-medium">Completion Date</TableHead>
                      <TableHead className="text-slate-100 font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderHistoryData
                      .filter(order => {
                        if (!dateRange?.from || !dateRange?.to) return true;
                        const orderDate = new Date(order.orderDate);
                        return orderDate >= dateRange.from && orderDate <= dateRange.to;
                      })
                      .map((order) => (
                        <TableRow key={order.orderId} className="hover:bg-slate-50">
                          <TableCell>{order.slNo}</TableCell>
                          <TableCell className="font-medium">#{order.orderId}</TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell>{order.serviceType}</TableCell>
                          <TableCell>{order.washType}</TableCell>
                          <TableCell>{order.weightQuantity}</TableCell>
                          <TableCell>₹{order.price}</TableCell>
                          <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(order.completionDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="flex items-center gap-1 bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                              onClick={() => viewOrderDetails(order.orderId)}
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
