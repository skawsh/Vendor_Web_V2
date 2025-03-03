
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Download, FileText, Info, Search, Truck, X } from "lucide-react";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
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

// Sample pending payments data
const pendingPaymentsData = [
  {
    id: 1,
    orderId: "ORD-1001",
    customerName: "John Smith",
    orderDate: "01/02/25",
    service: "Wash & Fold",
    totalAmount: 395,
    paidAmount: 0,
    dueAmount: 395,
    status: "Unpaid"
  },
  {
    id: 2,
    orderId: "ORD-1002",
    customerName: "Emily Johnson",
    orderDate: "02/02/25",
    service: "Dry clean",
    totalAmount: 300,
    paidAmount: 150,
    dueAmount: 150,
    status: "Partially Paid"
  },
  {
    id: 3,
    orderId: "ORD-1003",
    customerName: "Michael Brown",
    orderDate: "03/02/25",
    service: "Wash & Iron",
    totalAmount: 182,
    paidAmount: 0,
    dueAmount: 182,
    status: "Unpaid"
  },
  {
    id: 4,
    orderId: "ORD-1004",
    customerName: "Sarah Davis",
    orderDate: "04/02/25",
    service: "Wash & Fold",
    totalAmount: 450,
    paidAmount: 200,
    dueAmount: 250,
    status: "Partially Paid"
  },
  {
    id: 5,
    orderId: "ORD-1005",
    customerName: "David Wilson",
    orderDate: "05/02/25",
    service: "Wash & Iron",
    totalAmount: 320,
    paidAmount: 100,
    dueAmount: 220,
    status: "Partially Paid"
  }
];

// Sample payment history data
const paymentHistoryData = [
  {
    id: 1,
    paymentId: "PAY-1001",
    orderId: "ORD-1010",
    customerName: "Robert Taylor",
    paymentDate: "05/02/25",
    service: "Wash & Fold",
    amount: 480,
    paymentMethod: "Credit Card",
    status: "Completed"
  },
  {
    id: 2,
    paymentId: "PAY-1002",
    orderId: "ORD-1009",
    customerName: "Jennifer Miller",
    paymentDate: "04/02/25",
    service: "Dry clean",
    amount: 410,
    paymentMethod: "Cash",
    status: "Completed"
  },
  {
    id: 3,
    paymentId: "PAY-1003",
    orderId: "ORD-1008",
    customerName: "William Anderson",
    paymentDate: "03/02/25",
    service: "Wash & Iron",
    amount: 215,
    paymentMethod: "UPI",
    status: "Completed"
  },
  {
    id: 4,
    paymentId: "PAY-1004",
    orderId: "ORD-1007",
    customerName: "Elizabeth Thomas",
    paymentDate: "02/02/25",
    service: "Wash & Fold",
    amount: 520,
    paymentMethod: "Debit Card",
    status: "Completed"
  },
  {
    id: 5,
    paymentId: "PAY-1005",
    orderId: "ORD-1006",
    customerName: "James Jackson",
    paymentDate: "01/02/25",
    service: "Dry clean",
    amount: 275,
    paymentMethod: "Online Banking",
    status: "Completed"
  }
];

// Date filter options
const dateFilterOptions = [
  { id: "all", label: "All Dates" },
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "thisWeek", label: "This Week" },
  { id: "thisMonth", label: "This Month" },
  { id: "customRange", label: "Custom Range" },
];

const Revenue = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [dateFilter, setDateFilter] = useState("all");
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);

  // Apply date filters to payment data
  const applyDateFilter = (data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());
    
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    
    switch (dateFilter) {
      case 'today':
        return data.filter(item => {
          const itemDate = new Date(item.orderDate || item.paymentDate);
          return itemDate.toDateString() === today.toDateString();
        });
      case 'yesterday':
        return data.filter(item => {
          const itemDate = new Date(item.orderDate || item.paymentDate);
          return itemDate.toDateString() === yesterday.toDateString();
        });
      case 'thisWeek':
        return data.filter(item => {
          const itemDate = new Date(item.orderDate || item.paymentDate);
          return itemDate >= thisWeekStart && itemDate <= today;
        });
      case 'thisMonth':
        return data.filter(item => {
          const itemDate = new Date(item.orderDate || item.paymentDate);
          return itemDate >= thisMonthStart && itemDate <= today;
        });
      case 'customRange':
        if (!dateRange?.from || !dateRange?.to) return data;
        return data.filter(item => {
          const itemDate = new Date(item.orderDate || item.paymentDate);
          return itemDate >= dateRange.from && itemDate <= dateRange.to;
        });
      default:
        return data;
    }
  };

  // Filter pending payments based on search and date
  const filteredPendingPayments = applyDateFilter(pendingPaymentsData).filter(payment => 
    searchQuery === "" || 
    payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter payment history based on search and date
  const filteredPaymentHistory = applyDateFilter(paymentHistoryData).filter(payment => 
    searchQuery === "" || 
    payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.paymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset date filters
  const resetDateFilters = () => {
    setDateFilter('all');
    setDateRange(undefined);
    setDatePopoverOpen(false);
  };

  // Apply custom date range
  const applyDateFilters = () => {
    setDatePopoverOpen(false);
  };

  // Handle order details view
  const viewOrderDetails = (orderId: string) => {
    toast.info(`Viewing details for order ${orderId}`, {
      description: "Opening order details view."
    });
  };

  // Handle delivery details view
  const viewDeliveryDetails = (orderId: string) => {
    toast.info(`Viewing delivery details for order ${orderId}`, {
      description: "Opening delivery details view."
    });
  };

  // Handle payment action (for pending payments)
  const handlePayment = (orderId: string) => {
    toast.success(`Processing payment for order ${orderId}`, {
      description: "Opening payment processing interface."
    });
  };

  // Handle export of payment history
  const exportPaymentHistory = () => {
    toast.success("Exporting payment history", {
      description: "Your file will be downloaded shortly."
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Revenue Management</h1>
        <p className="text-muted-foreground">Manage your revenue and financial analytics</p>
      </header>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Order ID, Customer..."
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
          <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 h-12 px-4 py-2 border-2">
                <span>{dateFilterOptions.find(option => option.id === dateFilter)?.label || "All dates"}</span>
                <Calendar className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
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
            value="pending" 
            className={`flex-1 py-3 rounded-md ${activeTab === 'pending' ? 'bg-[#0F7EA3] text-white shadow-md' : 'bg-white border-2'}`}
            style={{ boxShadow: activeTab === 'pending' ? '0 4px 6px rgba(0, 0, 0, 0.2)' : 'none' }}
          >
            Pending Payments
          </TabsTrigger>
          <TabsTrigger 
            value="history"
            className={`flex-1 py-3 rounded-md ${activeTab === 'history' ? 'bg-[#0F7EA3] text-white shadow-md' : 'bg-white border-2'}`}
            style={{ boxShadow: activeTab === 'history' ? '0 4px 6px rgba(0, 0, 0, 0.2)' : 'none' }}
          >
            Payment History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <div className="rounded-lg overflow-hidden border-2 border-[#0F7EA3] bg-[#0F7EA3]">
            <div className="flex flex-wrap p-2 bg-[#0F7EA3] rounded-t-lg overflow-x-auto">
              <h3 className="text-white font-semibold px-4 py-2">Pending Payments</h3>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow className="bg-[#0F7EA3] border-none">
                  <TableHead className="text-white font-bold">S.No</TableHead>
                  <TableHead className="text-white font-bold">Order ID</TableHead>
                  <TableHead className="text-white font-bold">Customer Name</TableHead>
                  <TableHead className="text-white font-bold">Order Date</TableHead>
                  <TableHead className="text-white font-bold">Service</TableHead>
                  <TableHead className="text-white font-bold">Total Amount (₹)</TableHead>
                  <TableHead className="text-white font-bold">Paid Amount (₹)</TableHead>
                  <TableHead className="text-white font-bold">Due Amount (₹)</TableHead>
                  <TableHead className="text-white font-bold">Status</TableHead>
                  <TableHead className="text-white font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPendingPayments.map((payment, index) => (
                  <TableRow key={payment.id} className={index % 2 === 0 ? 'bg-[#E6EFF2]' : 'bg-[#F8FBFC]'}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell className="font-medium">#{payment.orderId}</TableCell>
                    <TableCell>{payment.customerName}</TableCell>
                    <TableCell>{payment.orderDate}</TableCell>
                    <TableCell>{payment.service}</TableCell>
                    <TableCell>₹{payment.totalAmount}</TableCell>
                    <TableCell>₹{payment.paidAmount}</TableCell>
                    <TableCell>₹{payment.dueAmount}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'Unpaid' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex items-center space-x-2">
                      <Button 
                        variant="success"
                        className="bg-[#D1FFCE] text-black font-medium"
                        onClick={() => handlePayment(payment.orderId)}
                      >
                        Process Payment
                      </Button>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="rounded-full bg-black text-white w-8 h-8 p-0"
                              onClick={() => viewOrderDetails(payment.orderId)}
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View order details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="rounded-full bg-black text-white w-8 h-8 p-0"
                              onClick={() => viewDeliveryDetails(payment.orderId)}
                            >
                              <Truck className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View delivery details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="rounded-lg overflow-hidden border-2 border-[#0F7EA3] bg-[#0F7EA3]">
            <div className="flex justify-between p-2 bg-[#0F7EA3] rounded-t-lg">
              <h3 className="text-white font-semibold px-4 py-2">Payment History</h3>
              <Button 
                variant="outline" 
                className="bg-white text-black border-none flex items-center gap-2"
                onClick={exportPaymentHistory}
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow className="bg-[#0F7EA3] border-none">
                  <TableHead className="text-white font-bold">S.No</TableHead>
                  <TableHead className="text-white font-bold">Payment ID</TableHead>
                  <TableHead className="text-white font-bold">Order ID</TableHead>
                  <TableHead className="text-white font-bold">Customer Name</TableHead>
                  <TableHead className="text-white font-bold">Payment Date</TableHead>
                  <TableHead className="text-white font-bold">Service</TableHead>
                  <TableHead className="text-white font-bold">Amount (₹)</TableHead>
                  <TableHead className="text-white font-bold">Payment Method</TableHead>
                  <TableHead className="text-white font-bold">Status</TableHead>
                  <TableHead className="text-white font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPaymentHistory.map((payment, index) => (
                  <TableRow key={payment.id} className={index % 2 === 0 ? 'bg-[#E6EFF2]' : 'bg-[#F8FBFC]'}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.paymentId}</TableCell>
                    <TableCell className="font-medium">#{payment.orderId}</TableCell>
                    <TableCell>{payment.customerName}</TableCell>
                    <TableCell>{payment.paymentDate}</TableCell>
                    <TableCell>{payment.service}</TableCell>
                    <TableCell>₹{payment.amount}</TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {payment.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="rounded-full bg-black text-white w-8 h-8 p-0"
                              onClick={() => viewOrderDetails(payment.orderId)}
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View order details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="rounded-full bg-black text-white w-8 h-8 p-0"
                              onClick={() => viewDeliveryDetails(payment.orderId)}
                            >
                              <Truck className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View delivery details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="rounded-full bg-black text-white w-8 h-8 p-0"
                              onClick={() => toast.info(`Viewing invoice for payment ${payment.paymentId}`)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View invoice</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Revenue;

