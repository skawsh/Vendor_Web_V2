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

// Sample orders data based on the mockup
const ordersData = [
  {
    id: 1,
    orderId: "ORD-1001",
    weightQuantity: "5Kg",
    washType: "Wash & Fold",
    serviceType: "Standard",
    price: 395,
    status: "Received"
  },
  {
    id: 2,
    orderId: "ORD-1002",
    weightQuantity: "2 pcs",
    washType: "Dry clean",
    serviceType: "Quick",
    price: 300,
    status: "Received"
  },
  {
    id: 3,
    orderId: "ORD-1003",
    weightQuantity: "2.3Kg",
    washType: "Wash & Iron",
    serviceType: "Quick",
    price: 182,
    status: "Received"
  }
];

const Orders = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("current");
  const [statusFilter, setStatusFilter] = useState<string>("Order Received");
  
  const statusOptions = ["New Orders", "Order Received", "Orders In Progress", "Ready for collect", "Order collected"];

  const markInProgress = (orderId: string) => {
    toast.success(`Order ${orderId} marked as In Progress`, {
      description: "The order status has been updated."
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
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Order management</h1>
        <p className="text-gray-600">Manage all your studio order in one place</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Order ID, Cust..."
            className="pl-10 pr-10 py-2 h-12 rounded-md w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Filter</span>
          <Button variant="outline" className="flex items-center gap-2 h-12 px-4 py-2">
            <span>All dates</span>
            <Calendar className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 max-w-[380px]">
            <TabsTrigger 
              value="current" 
              className={`rounded-md ${activeTab === 'current' ? 'bg-[#0F7EA3] text-white' : 'bg-white'}`}
            >
              Current orders
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className={`rounded-md ${activeTab === 'history' ? 'bg-[#0F7EA3] text-white' : 'bg-white'}`}
            >
              Orders history
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="mt-6">
            {/* Status Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {statusOptions.map((status) => (
                <Button 
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  className={`
                    ${statusFilter === status ? 'bg-[#0F7EA3] text-white' : 'bg-white text-black'} 
                    rounded-md px-4 py-2 hover:bg-[#0F7EA3] hover:text-white transition-colors
                  `}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
            
            {/* Orders Table */}
            <div className="rounded-lg overflow-hidden border bg-[#0F7EA3]">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-0">
                    <TableHead className="font-semibold text-white">Sl No</TableHead>
                    <TableHead className="font-semibold text-white">Order ID</TableHead>
                    <TableHead className="font-semibold text-white">Weight/ Quantity</TableHead>
                    <TableHead className="font-semibold text-white">Wash Type</TableHead>
                    <TableHead className="font-semibold text-white">Service Type</TableHead>
                    <TableHead className="font-semibold text-white">Price</TableHead>
                    <TableHead className="font-semibold text-white">Status</TableHead>
                    <TableHead className="font-semibold text-white">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersData.map((order) => (
                    <TableRow key={order.id} className={order.id % 2 === 0 ? 'bg-[#E5EDF0]' : 'bg-[#F8FBFC]'}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell>{order.weightQuantity}</TableCell>
                      <TableCell>{order.washType}</TableCell>
                      <TableCell>{order.serviceType}</TableCell>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-medium">{order.status}</span>
                          <span className="ml-2">&#9660;</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          className="bg-[#D1FFCE] hover:bg-[#B9EAB6] text-[#007E12] font-medium"
                          onClick={() => markInProgress(order.orderId)}
                        >
                          Mark InProgress
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <DateRangePicker 
                    date={dateRange}
                    onDateChange={setDateRange}
                  />
                  <Button 
                    variant="outline" 
                    onClick={exportOrderHistory}
                  >
                    Export
                  </Button>
                </div>
                
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
                                className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                                onClick={() => viewOrderDetails(order.orderId)}
                              >
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
    </div>
  );
};

export default Orders;
