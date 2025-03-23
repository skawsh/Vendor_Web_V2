
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Calendar, Box, CheckCircle, Info, Search, Truck, UserCheck, X, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import OrderFilterDropdown from "@/components/OrderFilterDropdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ordersData = [
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

const orderHistoryData = ordersData.filter(order => order.status === "Order collected").map((order, index) => ({
  slNo: index + 1,
  orderId: order.orderId,
  customerName: `Customer ${index + 1}`,
  serviceType: order.washType,
  washType: order.serviceType,
  weightQuantity: order.weightQuantity,
  price: order.price,
  orderType: ["Regular", "Express", "Premium", "Standard"][Math.floor(Math.random() * 4)],
  orderDate: order.orderDate,
  completionDate: order.orderDate,
  status: "Order collected"
}));

const dateFilterOptions = [
  { id: "all", label: "All Dates" },
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "thisWeek", label: "This Week" },
  { id: "thisMonth", label: "This Month" },
  { id: "customRange", label: "Custom Range" },
];

const Orders = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("current");
  const [statusFilter, setStatusFilter] = useState<string>("New Orders");
  const [orders, setOrders] = useState(ordersData);
  const [dateFilter, setDateFilter] = useState("all");
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [isFilterSectionOpen, setIsFilterSectionOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("All Orders");
  const navigate = useNavigate();
  
  const statusOptions = ["New Orders", "Order Received", "Orders In Progress", "Ready for collect", "Order collected"];

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

  const getActionButton = (order: any) => {
    switch(order.status) {
      case "New Orders":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="success"
                  className="bg-[#D1FFCE] text-black font-medium text-xs sm:text-sm py-1 px-2 sm:px-3 h-auto"
                  onClick={() => updateOrderStatus(order.orderId, "Order Received")}
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
                  variant="success"
                  className="bg-[#D1FFCE] text-black font-medium text-xs sm:text-sm py-1 px-2 sm:px-3 h-auto"
                  onClick={() => updateOrderStatus(order.orderId, "Orders In Progress")}
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
                  variant="success"
                  className="bg-[#D1FFCE] text-black font-medium text-xs sm:text-sm py-1 px-2 sm:px-3 h-auto"
                  onClick={() => updateOrderStatus(order.orderId, "Ready for collect")}
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
                  variant="success"
                  className="bg-[#D1FFCE] text-black font-medium text-xs sm:text-sm py-1 px-2 sm:px-3 h-auto"
                  onClick={() => updateOrderStatus(order.orderId, "Order collected")}
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

  const filteredOrders = orders.filter(order => 
    order.status === statusFilter && 
    (searchQuery === "" || 
     order.orderId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const applyDateFilter = (historyData) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());
    
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    
    switch (dateFilter) {
      case 'today':
        return historyData.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate.toDateString() === today.toDateString();
        });
      case 'yesterday':
        return historyData.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate.toDateString() === yesterday.toDateString();
        });
      case 'thisWeek':
        return historyData.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= thisWeekStart && orderDate <= today;
        });
      case 'thisMonth':
        return historyData.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= thisMonthStart && orderDate <= today;
        });
      case 'customRange':
        if (!dateRange?.from || !dateRange?.to) return historyData;
        return historyData.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= dateRange.from && orderDate <= dateRange.to;
        });
      default:
        return historyData;
    }
  };

  const filteredOrderHistory = applyDateFilter(orderHistoryData).filter(order => 
    searchQuery === "" || 
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetDateFilters = () => {
    setDateFilter('all');
    setDateRange(undefined);
    setDatePopoverOpen(false);
  };

  const applyDateFilters = () => {
    setDatePopoverOpen(false);
  };

  const viewOrderDetails = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };

  const OrderCard = ({ order, index }) => (
    <Card className="mb-3">
      <CardHeader className="pb-2 pt-3 px-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold">{order.orderId}</div>
            <div className="text-sm text-gray-500">{order.orderDate}</div>
          </div>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            {order.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-3 px-3">
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <div className="text-gray-500">Weight/Qty</div>
            <div>{order.weightQuantity}</div>
          </div>
          <div>
            <div className="text-gray-500">Wash Type</div>
            <div>{order.washType}</div>
          </div>
          <div>
            <div className="text-gray-500">Service Type</div>
            <div>{order.serviceType}</div>
          </div>
          <div>
            <div className="text-gray-500">Price</div>
            <div>₹{order.price}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          {getActionButton(order)}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="rounded-full bg-black text-white w-8 h-8 p-0"
                  onClick={() => viewOrderDetails(order.orderId)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View order details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );

  const HistoryOrderCard = ({ order }) => (
    <Card className="mb-3">
      <CardHeader className="pb-2 pt-3 px-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold">#{order.orderId}</div>
            <div className="text-sm text-gray-500">{order.customerName}</div>
          </div>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            {order.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-3 px-3">
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <div className="text-gray-500">Wash Type</div>
            <div>{order.serviceType}</div>
          </div>
          <div>
            <div className="text-gray-500">Service Type</div>
            <div>{order.washType}</div>
          </div>
          <div>
            <div className="text-gray-500">Weight/Qty</div>
            <div>{order.weightQuantity}</div>
          </div>
          <div>
            <div className="text-gray-500">Price</div>
            <div>₹{order.price}</div>
          </div>
          <div>
            <div className="text-gray-500">Order Date</div>
            <div>{order.orderDate}</div>
          </div>
          <div>
            <div className="text-gray-500">Completion Date</div>
            <div>{order.completionDate}</div>
          </div>
        </div>
        <div className="flex justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="rounded-full bg-black text-white w-8 h-8 p-0"
                  onClick={() => viewOrderDetails(order.orderId)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View order details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-3 md:p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Order management</h1>
          <p className="text-gray-600">Manage all your studio order in one place</p>
        </div>
        <div>
          <OrderFilterDropdown onFilterChange={(filterType, value) => {
            console.log("Filter selected:", filterType, value);
            if (filterType === 'appliedDateRange' || filterType === 'appliedDateTimeRange') {
              setDateRange(value);
              toast.success(`Date filter applied`, {
                description: "Orders filtered by selected date range"
              });
            } else {
              toast.success(`Filter applied: ${filterType}`, {
                description: "Orders filtered successfully"
              });
            }
          }} />
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 mb-6">
        <div className="relative flex-1 max-w-full">
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

        <div className="flex items-center justify-between">
          <span className="font-medium">Filter</span>
          <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 h-12 px-4 py-2 border-2">
                <span>{dateFilterOptions.find(option => option.id === dateFilter)?.label || "All dates"}</span>
                <Calendar className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] sm:w-80">
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Filter by Date</h4>
                <RadioGroup value={dateFilter} onValueChange={setDateFilter}>
                  {dateFilterOptions.map((option) => (
                    <div className="flex items-center space-x-2" key={option.id}>
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                
                {dateFilter === 'customRange' && (
                  <div className="pt-2">
                    <DateRangePicker
                      date={dateRange}
                      onDateChange={setDateRange}
                      className="w-full"
                    />
                  </div>
                )}
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={resetDateFilters}>
                    Reset
                  </Button>
                  <Button 
                    className="bg-[#0F3E92] text-white"
                    onClick={applyDateFilters}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
            <Collapsible 
              open={isFilterSectionOpen} 
              onOpenChange={setIsFilterSectionOpen}
              className="md:hidden mb-4 rounded-t-lg overflow-hidden"
            >
              <CollapsibleTrigger className="flex w-full justify-between items-center p-3 bg-[#0F7EA3] text-white">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter by Status</span>
                </div>
                {isFilterSectionOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-[#0F7EA3] p-2">
                <div className="space-y-2">
                  {statusOptions.map((status) => (
                    <Button 
                      key={status}
                      className={`
                        w-full ${statusFilter === status 
                          ? 'bg-[#0F7EA3] text-white border-2 border-white' 
                          : 'bg-white text-black border-2 border-white'} 
                        rounded-md px-4 py-2
                      `}
                      onClick={() => setStatusFilter(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <div className="hidden md:flex flex-wrap p-2 bg-[#0F7EA3] rounded-t-lg overflow-x-auto">
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
            
            <div className="md:hidden bg-white p-3">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <OrderCard key={order.id} order={order} index={index} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No orders found</p>
                </div>
              )}
            </div>
            
            <div className="hidden md:block">
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
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    className="rounded-full bg-black text-white w-8 h-8 p-0"
                                    onClick={() => viewOrderDetails(order.orderId)}
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
                        <TableCell colSpan={9} className="text-center py-8">
                          <p className="text-gray-500">No orders found</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="rounded-lg overflow-hidden border-2 border-[#0F7EA3] bg-[#0F7EA3]">
            <div className="flex flex-wrap p-2 bg-[#0F7EA3] rounded-t-lg overflow-x-auto">
              <h3 className="text-white font-semibold px-4 py-2">Order History - Completed Orders</h3>
            </div>
            
            <div className="md:hidden bg-white p-3">
              {filteredOrderHistory.length > 0 ? (
                filteredOrderHistory.map((order) => (
                  <HistoryOrderCard key={order.orderId} order={order} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No orders in history</p>
                </div>
              )}
            </div>
            
            <div className="hidden md:block">
              <div className="overflow-x-auto bg-white">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#0F7EA3] border-none">
                      <TableHead className="text-white font-bold">S.No</TableHead>
                      <TableHead className="text-white font-bold">Order ID</TableHead>
                      <TableHead className="text-white font-bold">Customer Name</TableHead>
                      <TableHead className="text-white font-bold">Wash Type</TableHead>
                      <TableHead className="text-white font-bold">Service Type</TableHead>
                      <TableHead className="text-white font-bold">Weight / Quantity</TableHead>
                      <TableHead className="text-white font-bold">Price (₹)</TableHead>
                      <TableHead className="text-white font-bold">Order Date</TableHead>
                      <TableHead className="text-white font-bold">Completion Date</TableHead>
                      <TableHead className="text-white font-bold">Status</TableHead>
                      <TableHead className="text-white font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrderHistory.length > 0 ? (
                      filteredOrderHistory.map((order, index) => (
                        <TableRow key={order.orderId} className={index % 2 === 0 ? 'bg-[#E6EFF2]' : 'bg-[#F8FBFC]'}>
                          <TableCell>{order.slNo}</TableCell>
                          <TableCell className="font-medium">#{order.orderId}</TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell>{order.serviceType}</TableCell>
                          <TableCell>{order.washType}</TableCell>
                          <TableCell>{order.weightQuantity}</TableCell>
                          <TableCell>₹{order.price}</TableCell>
                          <TableCell>{order.orderDate}</TableCell>
                          <TableCell>{order.completionDate}</TableCell>
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
                                    onClick={() => viewOrderDetails(order.orderId)}
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
                        <TableCell colSpan={11} className="text-center py-8">
                          <p className="text-gray-500">No orders in history</p>
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
  );
};

export default Orders;
