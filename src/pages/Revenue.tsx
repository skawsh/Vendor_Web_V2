import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Calendar, 
  Download, 
  FileText, 
  Search, 
  X, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Receipt, 
  ShoppingBag,
  IndianRupee,
  FileArrowDown,
  Printer 
} from "lucide-react";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
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

// Sample data for different time periods
const todayPendingPayments = [
  {
    id: 1,
    orderId: "ORD-2001",
    customerName: "Rajesh Kumar",
    deliveredDate: "12/06/25",
    service: "Wash & Fold",
    washType: "Quick Wash",
    totalAmount: 450,
    orderStatus: "In Process"
  },
  {
    id: 2,
    orderId: "ORD-2002",
    customerName: "Priya Sharma",
    deliveredDate: "12/06/25",
    service: "Dry Clean",
    washType: "Premium Wash",
    totalAmount: 780,
    orderStatus: "Ready for Pickup"
  }
];

const yesterdayPendingPayments = [
  {
    id: 1,
    orderId: "ORD-1901",
    customerName: "Ankit Patel",
    deliveredDate: "11/06/25",
    service: "Wash & Iron",
    washType: "Standard Wash",
    totalAmount: 520,
    orderStatus: "Delivered"
  },
  {
    id: 2,
    orderId: "ORD-1902",
    customerName: "Sneha Reddy",
    deliveredDate: "11/06/25",
    service: "Wash & Fold",
    washType: "Quick Wash",
    totalAmount: 350,
    orderStatus: "In Process"
  },
  {
    id: 3,
    orderId: "ORD-1903",
    customerName: "Vikram Singh",
    deliveredDate: "11/06/25",
    service: "Dry Clean",
    washType: "Standard Wash",
    totalAmount: 620,
    orderStatus: "Ready for Pickup"
  }
];

const thisWeekPendingPayments = [
  {
    id: 1,
    orderId: "ORD-1001",
    customerName: "John Smith",
    deliveredDate: "01/02/25",
    service: "Wash & Fold",
    washType: "Quick Wash",
    totalAmount: 395,
    orderStatus: "In Process"
  },
  {
    id: 2,
    orderId: "ORD-1002",
    customerName: "Emily Johnson",
    deliveredDate: "02/02/25",
    service: "Dry clean",
    washType: "Standard Wash",
    totalAmount: 300,
    orderStatus: "Delivered"
  },
  {
    id: 3,
    orderId: "ORD-1003",
    customerName: "Michael Brown",
    deliveredDate: "03/02/25",
    service: "Wash & Iron",
    washType: "Quick Wash",
    totalAmount: 182,
    orderStatus: "Ready for Pickup"
  },
  {
    id: 4,
    orderId: "ORD-1004",
    customerName: "Sarah Davis",
    deliveredDate: "04/02/25",
    service: "Wash & Fold",
    washType: "Premium Wash",
    totalAmount: 450,
    orderStatus: "In Process"
  },
  {
    id: 5,
    orderId: "ORD-1005",
    customerName: "David Wilson",
    deliveredDate: "05/02/25",
    service: "Wash & Iron",
    washType: "Standard & Quick Wash",
    totalAmount: 320,
    orderStatus: "Delivered"
  }
];

const thisMonthPendingPayments = [
  {
    id: 1,
    orderId: "ORD-1501",
    customerName: "Arjun Kapoor",
    deliveredDate: "03/06/25",
    service: "Wash & Fold",
    washType: "Standard & Quick Wash",
    totalAmount: 895,
    orderStatus: "Delivered"
  },
  {
    id: 2,
    orderId: "ORD-1611",
    customerName: "Neha Gupta",
    deliveredDate: "08/06/25",
    service: "Dry Clean",
    washType: "Premium Wash",
    totalAmount: 1250,
    orderStatus: "In Process"
  },
  {
    id: 3,
    orderId: "ORD-1705",
    customerName: "Rahul Verma",
    deliveredDate: "09/06/25",
    service: "Wash & Iron",
    washType: "Quick Wash",
    totalAmount: 480,
    orderStatus: "Ready for Pickup"
  },
  {
    id: 4,
    orderId: "ORD-1820",
    customerName: "Kavita Joshi",
    deliveredDate: "10/06/25",
    service: "Wash & Fold",
    washType: "Standard Wash",
    totalAmount: 560,
    orderStatus: "In Process"
  }
];

// Sample payment history data for different periods
const todayPaymentHistory = [
  {
    id: 1,
    orderId: "ORD-2010",
    customerName: "Sanjay Mehta",
    paymentDate: "12/06/25",
    service: "Wash & Iron",
    washType: "Quick Wash",
    amount: 580
  },
  {
    id: 2,
    orderId: "ORD-2015",
    customerName: "Aarti Shah",
    paymentDate: "12/06/25",
    service: "Dry Clean",
    washType: "Premium Wash",
    amount: 920
  }
];

const yesterdayPaymentHistory = [
  {
    id: 1,
    orderId: "ORD-1920",
    customerName: "Rohit Verma",
    paymentDate: "11/06/25",
    service: "Wash & Fold",
    washType: "Standard Wash",
    amount: 450
  },
  {
    id: 2,
    orderId: "ORD-1925",
    customerName: "Pooja Patel",
    paymentDate: "11/06/25",
    service: "Wash & Iron",
    washType: "Quick Wash",
    amount: 380
  },
  {
    id: 3,
    orderId: "ORD-1930",
    customerName: "Karan Singh",
    paymentDate: "11/06/25",
    service: "Dry Clean",
    washType: "Premium Wash",
    amount: 780
  }
];

const thisWeekPaymentHistory = [
  {
    id: 1,
    orderId: "ORD-1010",
    customerName: "Robert Taylor",
    paymentDate: "05/02/25",
    service: "Wash & Fold",
    washType: "Quick Wash",
    amount: 480
  },
  {
    id: 2,
    orderId: "ORD-1009",
    customerName: "Jennifer Miller",
    paymentDate: "04/02/25",
    service: "Dry clean",
    washType: "Standard Wash",
    amount: 410
  },
  {
    id: 3,
    orderId: "ORD-1008",
    customerName: "William Anderson",
    paymentDate: "03/02/25",
    service: "Wash & Iron",
    washType: "Premium Wash",
    amount: 215
  },
  {
    id: 4,
    orderId: "ORD-1007",
    customerName: "Elizabeth Thomas",
    paymentDate: "02/02/25",
    service: "Wash & Fold",
    washType: "Standard & Quick Wash",
    amount: 520
  },
  {
    id: 5,
    orderId: "ORD-1006",
    customerName: "James Jackson",
    paymentDate: "01/02/25",
    service: "Dry clean",
    washType: "Quick Wash",
    amount: 275
  }
];

const thisMonthPaymentHistory = [
  {
    id: 1,
    orderId: "ORD-1510",
    customerName: "Meera Kapoor",
    paymentDate: "03/06/25",
    service: "Wash & Fold",
    washType: "Standard Wash",
    amount: 480
  },
  {
    id: 2,
    orderId: "ORD-1615",
    customerName: "Vishal Gupta",
    paymentDate: "08/06/25",
    service: "Dry Clean",
    washType: "Premium Wash",
    amount: 1150
  },
  {
    id: 3,
    orderId: "ORD-1715",
    customerName: "Anjali Verma",
    paymentDate: "09/06/25",
    service: "Wash & Iron",
    washType: "Quick Wash",
    amount: 420
  },
  {
    id: 4,
    orderId: "ORD-1825",
    customerName: "Ravi Joshi",
    paymentDate: "10/06/25",
    service: "Wash & Fold",
    washType: "Standard & Quick Wash",
    amount: 650
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

// Wash type filter options
const washTypeOptions = [
  { id: "all", label: "All Wash Types" },
  { id: "express", label: "Express Wash" },
  { id: "standard", label: "Standard Wash" },
  { id: "both", label: "Both" },
];

const Revenue = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [dateFilter, setDateFilter] = useState("all");
  const [washTypeFilter, setWashTypeFilter] = useState("all");
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportType, setReportType] = useState("summary");
  const [pendingPaymentsData, setPendingPaymentsData] = useState([
    {
      id: 1,
      orderId: "ORD-1001",
      customerName: "John Smith",
      deliveredDate: "01/02/25",
      service: "Wash & Fold",
      washType: "Quick Wash",
      totalAmount: 395,
      orderStatus: "In Process"
    },
    {
      id: 2,
      orderId: "ORD-1002",
      customerName: "Emily Johnson",
      deliveredDate: "02/02/25",
      service: "Dry clean",
      washType: "Standard Wash",
      totalAmount: 300,
      orderStatus: "Delivered"
    },
    {
      id: 3,
      orderId: "ORD-1003",
      customerName: "Michael Brown",
      deliveredDate: "03/02/25",
      service: "Wash & Iron",
      washType: "Quick Wash",
      totalAmount: 182,
      orderStatus: "Ready for Pickup"
    },
    {
      id: 4,
      orderId: "ORD-1004",
      customerName: "Sarah Davis",
      deliveredDate: "04/02/25",
      service: "Wash & Fold",
      washType: "Premium Wash",
      totalAmount: 450,
      orderStatus: "In Process"
    },
    {
      id: 5,
      orderId: "ORD-1005",
      customerName: "David Wilson",
      deliveredDate: "05/02/25",
      service: "Wash & Iron",
      washType: "Standard & Quick Wash",
      totalAmount: 320,
      orderStatus: "Delivered"
    }
  ]);
  
  const [paymentHistoryData, setPaymentHistoryData] = useState([
    {
      id: 1,
      orderId: "ORD-1010",
      customerName: "Robert Taylor",
      paymentDate: "05/02/25",
      service: "Wash & Fold",
      washType: "Quick Wash",
      amount: 480
    },
    {
      id: 2,
      orderId: "ORD-1009",
      customerName: "Jennifer Miller",
      paymentDate: "04/02/25",
      service: "Dry clean",
      washType: "Standard Wash",
      amount: 410
    },
    {
      id: 3,
      orderId: "ORD-1008",
      customerName: "William Anderson",
      paymentDate: "03/02/25",
      service: "Wash & Iron",
      washType: "Premium Wash",
      amount: 215
    },
    {
      id: 4,
      orderId: "ORD-1007",
      customerName: "Elizabeth Thomas",
      paymentDate: "02/02/25",
      service: "Wash & Fold",
      washType: "Standard & Quick Wash",
      amount: 520
    },
    {
      id: 5,
      orderId: "ORD-1006",
      customerName: "James Jackson",
      paymentDate: "01/02/25",
      service: "Dry clean",
      washType: "Quick Wash",
      amount: 275
    }
  ]);

  // Revenue summary states for different periods
  const [revenueSummary, setRevenueSummary] = useState({
    todayEarnings: 1250,
    quickWashEarnings: 2850,
    standardWashEarnings: 3200,
    combinedWashEarnings: 4150,
    pendingPayments: 2700,
    lastMonthRevenue: 28500,
    totalRevenue: 142500
  });

  // Function to handle export
  const handleExport = (format: string) => {
    // In a real app, this would generate and download a file
    // For this demo, we'll just show a toast notification
    toast.success(`Payment history exported as ${format.toUpperCase()}`);
  };

  // Function to generate a report
  const handleGenerateReport = () => {
    // Close the dialog
    setReportDialogOpen(false);
    
    // In a real app, this would generate a report based on selected options
    // For this demo, we'll just show a toast notification
    toast.success(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated successfully!`);
  };

  // Filter data based on wash type
  const filterDataByWashType = (data) => {
    if (washTypeFilter === "all") return data;
    
    return data.filter(item => {
      const washType = item.washType.toLowerCase();
      if (washTypeFilter === "express") return washType.includes("quick");
      if (washTypeFilter === "standard") return washType.includes("standard");
      if (washTypeFilter === "both") return washType.includes("standard") && washType.includes("quick");
      return true;
    });
  };

  // Get filtered data for display
  const getFilteredPendingPayments = () => {
    // First filter by wash type
    const washTypeFiltered = filterDataByWashType(pendingPaymentsData);
    
    // Then filter by search query
    return washTypeFiltered.filter(payment => 
      searchQuery === "" || 
      payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getFilteredPaymentHistory = () => {
    // First filter by wash type
    const washTypeFiltered = filterDataByWashType(paymentHistoryData);
    
    // Then filter by search query
    return washTypeFiltered.filter(payment => 
      searchQuery === "" || 
      payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Update data based on date filter
  useEffect(() => {
    // Update pending payments data based on filter
    switch(dateFilter) {
      case "today":
        setPendingPaymentsData(todayPendingPayments);
        setPaymentHistoryData(todayPaymentHistory);
        setRevenueSummary({
          todayEarnings: 1500,
          quickWashEarnings: 1030,
          standardWashEarnings: 780,
          combinedWashEarnings: 0,
          pendingPayments: 1230,
          lastMonthRevenue: 28500,
          totalRevenue: 142500
        });
        toast.info("Showing today's data");
        break;
      case "yesterday":
        setPendingPaymentsData(yesterdayPendingPayments);
        setPaymentHistoryData(yesterdayPaymentHistory);
        setRevenueSummary({
          todayEarnings: 0,
          quickWashEarnings: 730,
          standardWashEarnings: 1140,
          combinedWashEarnings: 0,
          pendingPayments: 1490,
          lastMonthRevenue: 28500,
          totalRevenue: 142500
        });
        toast.info("Showing yesterday's data");
        break;
      case "thisWeek":
        setPendingPaymentsData(thisWeekPendingPayments);
        setPaymentHistoryData(thisWeekPaymentHistory);
        setRevenueSummary({
          todayEarnings: 1500,
          quickWashEarnings: 2750,
          standardWashEarnings: 2950,
          combinedWashEarnings: 1320,
          pendingPayments: 2847,
          lastMonthRevenue: 28500,
          totalRevenue: 142500
        });
        toast.info("Showing this week's data");
        break;
      case "thisMonth":
        setPendingPaymentsData(thisMonthPendingPayments);
        setPaymentHistoryData(thisMonthPaymentHistory);
        setRevenueSummary({
          todayEarnings: 1500,
          quickWashEarnings: 7820,
          standardWashEarnings: 9250,
          combinedWashEarnings: 4150,
          pendingPayments: 3185,
          lastMonthRevenue: 28500,
          totalRevenue: 142500
        });
        toast.info("Showing this month's data");
        break;
      case "customRange":
        if (dateRange?.from && dateRange?.to) {
          // For demo purposes, just show this month's data for any custom range
          setPendingPaymentsData(thisMonthPendingPayments);
          setPaymentHistoryData(thisMonthPaymentHistory);
          setRevenueSummary({
            todayEarnings: 0,
            quickWashEarnings: 4580,
            standardWashEarnings: 6320,
            combinedWashEarnings: 2845,
            pendingPayments: 3185,
            lastMonthRevenue: 28500,
            totalRevenue: 142500
          });
          toast.info(`Showing data from ${dateRange.from.toLocaleDateString()} to ${dateRange.to.toLocaleDateString()}`);
        }
        break;
      default:
        // Reset to default data
        setPendingPaymentsData([
          {
            id: 1,
            orderId: "ORD-1001",
            customerName: "John Smith",
            deliveredDate: "01/02/25",
            service: "Wash & Fold",
            washType: "Quick Wash",
            totalAmount: 395,
            orderStatus: "In Process"
          },
          {
            id: 2,
            orderId: "ORD-1002",
            customerName: "Emily Johnson",
            deliveredDate: "02/02/25",
            service: "Dry clean",
            washType: "Standard Wash",
            totalAmount: 300,
            orderStatus: "Delivered"
          },
          {
            id: 3,
            orderId: "ORD-1003",
            customerName: "Michael Brown",
            deliveredDate: "03/02/25",
            service: "Wash & Iron",
            washType: "Quick Wash",
            totalAmount: 182,
            orderStatus: "Ready for Pickup"
          },
          {
            id: 4,
            orderId: "ORD-1004",
            customerName: "Sarah Davis",
            deliveredDate: "04/02/25",
            service: "Wash & Fold",
            washType: "Premium Wash",
            totalAmount: 450,
            orderStatus: "In Process"
          },
          {
            id: 5,
            orderId: "ORD-1005",
            customerName: "David Wilson",
            deliveredDate: "05/02/25",
            service: "Wash & Iron",
            washType: "Standard & Quick Wash",
            totalAmount: 320,
            orderStatus: "Delivered"
          }
        ]);
        setPaymentHistoryData([
          {
            id: 1,
            orderId: "ORD-1010",
            customerName: "Robert Taylor",
            paymentDate: "05/02/25",
            service: "Wash & Fold",
            washType: "Quick Wash",
            amount: 480
          },
          {
            id: 2,
            orderId: "ORD-1009",
            customerName: "Jennifer Miller",
            paymentDate: "04/02/25",
            service: "Dry clean",
            washType: "Standard Wash",
            amount: 410
          },
          {
            id: 3,
            orderId: "ORD-1008",
            customerName: "William Anderson",
            paymentDate: "03/02/25",
            service: "Wash & Iron",
            washType: "Premium Wash",
            amount: 215
          },
          {
            id: 4,
            orderId: "ORD-1007",
            customerName: "Elizabeth Thomas",
            paymentDate: "02/02/25",
            service: "Wash & Fold",
            washType: "Standard & Quick Wash",
            amount: 520
          },
          {
            id: 5,
            orderId: "ORD-1006",
            customerName: "James Jackson",
            paymentDate: "01/02/25",
            service: "Dry clean",
            washType: "Quick Wash",
            amount: 275
          }
        ]);
        setRevenueSummary({
          todayEarnings: 1250,
          quickWashEarnings: 2850,
          standardWashEarnings: 3200,
          combinedWashEarnings: 4150,
          pendingPayments: 2700,
          lastMonthRevenue: 28500,
          totalRevenue: 142500
        });
        if (dateFilter !== "") {
          toast.info("Showing data for all dates");
        }
    }
  }, [dateFilter, dateRange]);

  // Revenue summary tiles component
  const revenueSummaryTiles = (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-[#E5DEFF] border-none shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Earnings</p>
              <h3 className="text-2xl font-bold mt-1">₹{revenueSummary.todayEarnings}</h3>
            </div>
            <div className="bg-[#9b87f5] p-2 rounded-full">
              <Clock className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#D3E4FD] border-none shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Quick Wash Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹{revenueSummary.quickWashEarnings}</h3>
            </div>
            <div className="bg-[#0EA5E9] p-2 rounded-full">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#FDE1D3] border-none shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Standard Wash Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹{revenueSummary.standardWashEarnings}</h3>
            </div>
            <div className="bg-[#F97316] p-2 rounded-full">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#FFDEE2] border-none shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Combined Wash Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹{revenueSummary.combinedWashEarnings}</h3>
            </div>
            <div className="bg-[#D946EF] p-2 rounded-full">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#FEF7CD] border-none shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <h3 className="text-2xl font-bold mt-1">₹{revenueSummary.pendingPayments}</h3>
            </div>
            <div className="bg-[#e6a31c] p-2 rounded-full">
              <Receipt className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#F2FCE2] border-none shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Month Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹{revenueSummary.lastMonthRevenue}</h3>
            </div>
            <div className="bg-[#4ade80] p-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#F1F0FB] border-none shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹{revenueSummary.totalRevenue}</h3>
            </div>
            <div className="bg-[#8B5CF6] p-2 rounded-full">
              <IndianRupee className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Main rendering
  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Revenue Management</h1>
            <p className="text-gray-500">Track and manage all revenue data</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {dateFilter === "all" && "All Dates"}
                  {dateFilter === "today" && "Today"}
                  {dateFilter === "yesterday" && "Yesterday"}
                  {dateFilter === "thisWeek" && "This Week"}
                  {dateFilter === "thisMonth" && "This Month"}
                  {dateFilter === "customRange" && "Custom Range"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter by date</h4>
                  <RadioGroup
                    defaultValue={dateFilter}
                    onValueChange={(value) => {
                      setDateFilter(value);
                      if (value !== "customRange") {
                        setDatePopoverOpen(false);
                      }
                    }}
                  >
                    {dateFilterOptions.map((option) => (
                      <div className="flex items-center space-x-2" key={option.id}>
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {dateFilter === "customRange" && (
                    <div className="pt-4">
                      <DateRangePicker
                        date={dateRange}
                        onDateChange={(range) => {
                          setDateRange(range);
                          if (range?.from && range?.to) {
                            setDatePopoverOpen(false);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Report Dialog */}
            <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Generate Revenue Report</DialogTitle>
                  <DialogDescription>
                    Select the type of report you want to generate.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <RadioGroup 
                    value={reportType} 
                    onValueChange={setReportType}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="summary" id="summary" />
                      <Label htmlFor="summary">Summary Report</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="detailed" id="detailed" />
                      <Label htmlFor="detailed">Detailed Report</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Monthly Report</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yearly" id="yearly" />
                      <Label htmlFor="yearly">Yearly Report</Label>
                    </div>
                  </RadioGroup>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleGenerateReport}>
                    Generate Report
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Revenue Summary Tiles */}
        {revenueSummaryTiles}
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by order ID or customer name"
                className="pl-10 w-full max-w-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Tabs for Unpaid Payments and Payment History */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="w-full sm:w-[400px]">
              <TabsTrigger value="pending" className="flex-1">Unpaid Payments</TabsTrigger>
              <TabsTrigger value="history" className="flex-1">Payment History</TabsTrigger>
            </TabsList>
          
            {/* Wash Type Filter */}
            <div className="mt-4 mb-4">
              <ToggleGroup type="single" value={washTypeFilter} onValueChange={(value) => value && setWashTypeFilter(value)}>
                {washTypeOptions.map((option) => (
                  <ToggleGroupItem key={option.id} value={option.id}>
                    {option.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <TabsContent value="pending">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Delivered Date</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Wash Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredPendingPayments().map(payment => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.orderId}</TableCell>
                        <TableCell>{payment.customerName}</TableCell>
                        <TableCell>{payment.deliveredDate}</TableCell>
                        <TableCell>{payment.service}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.washType.includes("Quick") ? "bg-amber-50 text-amber-600" : 
                            payment.washType.includes("Standard") ? "bg-blue-50 text-blue-600" : 
                            "bg-purple-50 text-purple-600"
                          }`}>
                            {payment.washType}
                          </span>
                        </TableCell>
                        <TableCell>₹{payment.totalAmount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.orderStatus === "In Process" ? "bg-yellow-50 text-yellow-600" : 
                            payment.orderStatus === "Delivered" ? "bg-green-50 text-green-600" : 
                            "bg-blue-50 text-blue-600"
                          }`}>
                            {payment.orderStatus}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              toast.success(`Payment received for order ${payment.orderId}`);
                              const updatedPendingPayments = pendingPaymentsData.filter(p => p.id !== payment.id);
                              setPendingPaymentsData(updatedPendingPayments);
                              setPaymentHistoryData([
                                ...paymentHistoryData, 
                                {
                                  id: paymentHistoryData.length + 1,
                                  orderId: payment.orderId,
                                  customerName: payment.customerName,
                                  paymentDate: new Date().toLocaleDateString(),
                                  service: payment.service,
                                  washType: payment.washType,
                                  amount: payment.totalAmount
                                }
                              ]);
                            }}
                          >
                            Mark Paid
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="flex justify-end mb-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <FileArrowDown className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleExport('pdf')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('excel')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('csv')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      toast.success('Print layout prepared');
                      setTimeout(() => {
                        window.print();
                      }, 500);
                    }}>
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Wash Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredPaymentHistory().map(payment => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.orderId}</TableCell>
                        <TableCell>{payment.customerName}</TableCell>
                        <TableCell>{payment.paymentDate}</TableCell>
                        <TableCell>{payment.service}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.washType.includes("Quick") ? "bg-amber-50 text-amber-600" : 
                            payment.washType.includes("Standard") ? "bg-blue-50 text-blue-600" : 
                            "bg-purple-50 text-purple-600"
                          }`}>
                            {payment.washType}
                          </span>
                        </TableCell>
                        <TableCell>₹{payment.amount}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              toast.info(`Viewing invoice for order ${payment.orderId}`);
                            }}
                          >
                            View Invoice
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
