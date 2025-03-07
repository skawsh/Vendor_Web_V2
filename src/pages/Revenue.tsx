<lov-code>
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
  FileDown,
  Printer,
  ExternalLink
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

const dateFilterOptions = [
  { id: "all", label: "All Dates" },
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "thisWeek", label: "This Week" },
  { id: "thisMonth", label: "This Month" },
  { id: "customRange", label: "Custom Range" },
];

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
  
  const [pendingPaymentsData, setPendingPaymentsData] = useState([
    {
      id: 1,
      orderId: "ORD-1001",
      customerName: "John Smith",
      deliveredDate: "01/02/25",
      service: "Wash & Fold",
      washType: "Quick Wash",
      totalAmount: 395,
      orderStatus: "Delivered" // Changed from "In Process" to "Delivered"
    },
    {
      id: 2,
      orderId: "ORD-1002",
      customerName: "Emily Johnson",
      deliveredDate: "02/02/25",
      service: "Dry clean",
      washType: "Standard Wash",
      totalAmount: 300,
      orderStatus: "Delivered" // Already was "Delivered"
    },
    {
      id: 3,
      orderId: "ORD-1003",
      customerName: "Michael Brown",
      deliveredDate: "03/02/25",
      service: "Wash & Iron",
      washType: "Quick Wash",
      totalAmount: 182,
      orderStatus: "Delivered" // Changed from "Ready for Pickup" to "Delivered"
    },
    {
      id: 4,
      orderId: "ORD-1004",
      customerName: "Sarah Davis",
      deliveredDate: "04/02/25",
      service: "Wash & Fold",
      washType: "Premium Wash",
      totalAmount: 450,
      orderStatus: "Delivered" // Changed from "In Process" to "Delivered"
    },
    {
      id: 5,
      orderId: "ORD-1005",
      customerName: "David Wilson",
      deliveredDate: "05/02/25",
      service: "Wash & Iron",
      washType: "Standard & Quick Wash",
      totalAmount: 320,
      orderStatus: "Delivered" // Already was "Delivered"
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

  const [revenueSummary, setRevenueSummary] = useState({
    todayEarnings: 1250,
    quickWashEarnings: 2850,
    standardWashEarnings: 3200,
    combinedWashEarnings: 4150,
    pendingPayments: 2700,
    lastMonthRevenue: 28500,
    totalRevenue: 142500
  });

  const handleExport = (format: string) => {
    toast.success(`Payment history exported as ${format.toUpperCase()}`);
  };

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

  const getFilteredPendingPayments = () => {
    const washTypeFiltered = filterDataByWashType(pendingPaymentsData);
    return washTypeFiltered.filter(payment => 
      searchQuery === "" || 
      payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getFilteredPaymentHistory = () => {
    const washTypeFiltered = filterDataByWashType(paymentHistoryData);
    return washTypeFiltered.filter(payment => 
      searchQuery === "" || 
      payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleViewOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`);
    toast.info(`Viewing details for order ${orderId}`);
  };

  useEffect(() => {
    switch(dateFilter) {
      case "today":
        setPendingPaymentsData(todayPendingPayments.map(item => ({
          ...item,
          orderStatus: "Delivered" // Set all to Delivered
        })));
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
        setPendingPaymentsData(yesterdayPendingPayments.map(item => ({
          ...item,
          orderStatus: "Delivered" // Set all to Delivered
        })));
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
        setPendingPaymentsData(thisWeekPendingPayments.map(item => ({
          ...item,
          orderStatus: "Delivered" // Set all to Delivered
        })));
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
        setPendingPaymentsData(thisMonthPendingPayments.map(item => ({
          ...item,
          orderStatus: "Delivered" // Set all to Delivered
        })));
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
          setPendingPaymentsData(thisMonthPendingPayments.map(item => ({
            ...item,
            orderStatus: "Delivered" // Set all to Delivered
          })));
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
        setPendingPaymentsData([
          {
            id: 1,
            orderId: "ORD-1001",
            customerName: "John Smith",
            deliveredDate: "01/02/25",
            service: "Wash & Fold",
            washType: "Quick Wash",
            totalAmount: 395,
            orderStatus: "Delivered" // Changed from "In Process" to "Delivered"
          },
          {
            id: 2,
            orderId: "ORD-1002",
            customerName: "Emily Johnson",
            deliveredDate: "02/02/25",
            service: "Dry clean",
            washType: "Standard Wash",
            totalAmount: 300,
            orderStatus: "Delivered" // Already was "Delivered"
          },
          {
            id: 3,
            orderId: "ORD-1003",
            customerName: "Michael Brown",
            deliveredDate: "03/02/25",
            service: "Wash & Iron",
            washType: "Quick Wash",
            totalAmount: 182,
            orderStatus: "Delivered" // Changed from "Ready for Pickup" to "Delivered"
          },
          {
            id: 4,
            orderId: "ORD-1004",
            customerName: "Sarah Davis",
            deliveredDate: "04/02/25",
            service: "Wash & Fold",
            washType: "Premium Wash",
            totalAmount: 450,
            orderStatus: "Delivered" // Changed from "In Process" to "Delivered"
          },
          {
            id: 5,
            orderId: "ORD-1005",
            customerName: "David Wilson",
            deliveredDate: "05/02/25",
            service: "Wash & Iron",
            washType: "Standard & Quick Wash",
            totalAmount: 320,
            orderStatus: "Delivered" // Already was "Delivered"
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

  const revenueSummaryTiles = (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-[#E5DEFF] border-none shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Earnings</p>
              <h3 className="text-2xl font-bold mt-1">₹{revenueSummary.todayEarnings}</h3>
            </div>
            <div className="bg-[#8B5CF6] p-2 rounded-full">
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
                <Button variant="outline" className="flex items-center bg-[#D3E4FD] border-[#A3C4FD] text-[#0F7EA3]">
                  <Calendar className="h-4 w-4 mr-2" />
                  {dateFilter === "all" && "All Dates"}
                  {dateFilter === "today" && "Today"}
                  {dateFilter === "yesterday" && "Yesterday"}
                  {dateFilter === "thisWeek" && "This Week"}
                  {dateFilter === "thisMonth" && "This Month"}
                  {dateFilter === "customRange" && "Custom Range"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4 bg-[#F1F0FB]" align="end">
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
                        <RadioGroupItem value={option.id} id={option.id} className="border-[#8B5CF6] text-[#8B5CF6]" />
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
              </PopoverContent
