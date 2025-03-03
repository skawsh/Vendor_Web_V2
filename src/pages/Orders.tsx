import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Info, Search, X } from "lucide-react";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";

// Sample orders data based on the mockup design
const ordersData = [
  {
    id: 1,
    orderId: "ORD-1001",
    orderDate: "01/02/25",
    weightQuantity: "5Kg",
    washType: "Wash & Fold",
    serviceType: "Standard",
    price: 395,
    status: "New Orders" // Initial status
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
    weightQuantity: "1.8Kg",
    washType: "Dry clean",
    serviceType: "Premium",
    price: 275,
    status: "Orders In Progress"
  },
  {
    id: 7,
    orderId: "ORD-1007",
    orderDate: "03/02/25",
    weightQuantity: "6Kg",
    washType: "Wash & Fold",
    serviceType: "Express",
    price: 520,
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
    status: "Ready for collect"
  },
  {
    id: 9,
    orderId: "ORD-1009",
    orderDate: "04/02/25",
    weightQuantity: "3 pcs",
    washType: "Dry clean",
    serviceType: "Premium",
    price: 410,
    status: "Ready for collect"
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

// Order history data
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
  const [activeTab, setActiveTab] = useState("current");
  const [statusFilter, setStatusFilter] = useState<string>("New Orders");
  const [orders, setOrders] = useState(ordersData);
  
  // All possible order statuses
  const statusOptions = ["New Orders", "Order Received", "Orders In Progress", "Ready for collect", "Order collected"];

  // Function to update order status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.orderId === orderId 
          ? { ...order, status: newStatus } 
          : order
      )
    );
    
    toast.success(`Order ${orderId} marked as ${newStatus}`, {
      description: "The order status has been updated."
    });
  };

  // Get appropriate action button based on current status
  const getActionButton = (order: any) => {
    switch(order.status) {
      case "New Orders":
        return (
          <Button 
            variant="success"
            className="bg-[#D1FFCE] text-black font-medium"
            onClick={() => updateOrderStatus(order.orderId, "Order Received")}
          >
            Mark Received
          </Button>
        );
      case "Order Received":
        return (
          <Button 
            variant="success"
            className="bg-[#D1FFCE] text-black font-medium"
            onClick={() => updateOrderStatus(order.orderId, "Orders In Progress")}
          >
            Mark InProgress
          </Button>
        );
      case "Orders In Progress":
        return (
          <Button 
            variant="success"
            className="bg-[#D1FFCE] text-black font-medium"
            onClick={() => updateOrderStatus(order.orderId, "Ready for collect")}
          >
            Ready For Collect
          </Button>
        );
      case "Ready for collect":
        return (
          <Button 
            variant="success"
            className="bg-[#D1FFCE] text-black font-medium"
            onClick={() => updateOrderStatus(order.orderId, "Order collected")}
          >
            Order collected
          </Button>
        );
      case "Order collected":
        return null;
      default:
        return null;
    }
  };

  // Filter orders based on the selected status
  const filteredOrders = orders.filter(order => 
    order.status === statusFilter && 
    (searchQuery === "" || 
     order.orderId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter order history based on date range
  const filteredOrderHistory = orderHistoryData.filter(order => {
    if (!dateRange?.from || !dateRange?.to) return true;
    const orderDate = new Date(order.orderDate);
    return orderDate >= dateRange.from && orderDate <= dateRange.to;
  });

  // View order details
  const viewOrderDetails = (orderId: string) => {
    toast.info(`Viewing details for order ${orderId}`, {
      description: "Opening order details view."
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
            className="pl-10 pr-10 py-2 h-12 rounded-md w-full border-2"
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
          <Button variant="outline" className="flex items-center gap-2 h-12 px-4 py-2 border-2">
            <span>All dates</span>
            <Calendar className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
        <TabsList className="flex w-full max-w-md mb-4">
          <TabsTrigger 
            value="current" 
            className={`flex-1 py-3 rounded-md ${activeTab === 'current' ? 'bg-[#0F7EA3] text-white shadow-md' : 'bg-white border-2'}`}
            style={{ boxShadow: activeTab === 'current' ? '0 4px 6px rgba(0, 0, 0, 0.2)' : 'none' }}
          >
            Current orders
          </TabsTrigger>
          <TabsTrigger 
            value="history"
            className={`flex-1 py-3 rounded-md ${activeTab === 'history' ? 'bg-[#0F7EA3] text-white shadow-md' : 'bg-white border-2'}`}
            style={{ boxShadow: activeTab === 'history' ? '0 4px 6px rgba(0, 0, 0, 0.2)' : 'none' }}
          >
            Orders history
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <div className="rounded-lg overflow-hidden border-2 border-[#0F7EA3] bg-[#0F7EA3]">
            {/* Status Filter Buttons at the top of the table */}
            <div className="flex flex-wrap p-2 bg-[#0F7EA3] rounded-t-lg overflow-x-auto">
              {statusOptions.map((status) => (
                <Button 
                  key={status}
                  className={`
                    ${statusFilter === status 
                      ? 'bg-[#0F7EA3] text-white border-2 border-white' 
                      : 'bg-white text-black border-2 border-white'} 
                    rounded-md px-4 py-2 m-1
                  `}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
            
            {/* Orders Table */}
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
                {filteredOrders.map((order, index) => (
                  <TableRow key={order.id} className={index % 2 === 0 ? 'bg-[#E6EFF2]' : 'bg-[#F8FBFC]'}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.weightQuantity}</TableCell>
                    <TableCell>{order.washType}</TableCell>
                    <TableCell>{order.serviceType}</TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell className="flex items-center space-x-2">
                      {getActionButton(order)}
                      <Button 
                        variant="outline" 
                        className="rounded-full bg-black text-white w-8 h-8 p-0"
                        onClick={() => viewOrderDetails(order.orderId)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="p-6 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <DateRangePicker 
                date={dateRange}
                onDateChange={setDateRange}
                className="border-2"
              />
              <Button variant="outline" className="border-2">
                Export
              </Button>
            </div>
            
            <div className="rounded-md border-2 overflow-x-auto">
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
                  {filteredOrderHistory.map((order) => (
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
