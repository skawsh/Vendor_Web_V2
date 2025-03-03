
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Search, Filter, Check, ArrowRight, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const ordersData = [
  { id: "101", customer: "John Doe", details: "5kg laundry", status: "Order Received", date: "2023-06-15", serviceType: "Wash & Fold", washType: "Standard Wash" },
  { id: "102", customer: "Jane Smith", details: "3kg laundry", status: "New Orders", date: "2023-06-16", serviceType: "Dry Cleaning", washType: "Quick Wash" },
  { id: "103", customer: "Alice Brown", details: "2kg laundry", status: "Orders In Progress", date: "2023-06-14", serviceType: "Wash & Iron", washType: "Standard Wash" },
  { id: "104", customer: "Bob Johnson", details: "4kg laundry", status: "Ready for Collect", date: "2023-06-13", serviceType: "Shoe Cleaning", washType: "Premium Wash" },
  { id: "105", customer: "Sara Davis", details: "6kg laundry", status: "Order Collected", date: "2023-06-10", serviceType: "Wash & Fold", washType: "Standard Wash" },
  { id: "106", customer: "Michael Wilson", details: "7kg laundry", status: "Order Received", date: "2023-06-12", serviceType: "Wash & Iron", washType: "Quick Wash" },
  { id: "107", customer: "Emily Taylor", details: "4kg laundry", status: "New Orders", date: "2023-06-11", serviceType: "Dry Cleaning", washType: "Standard Wash" },
  { id: "108", customer: "David Moore", details: "3kg laundry", status: "Orders In Progress", date: "2023-06-09", serviceType: "Wash & Fold", washType: "Quick Wash" },
  { id: "109", customer: "Sophia Lee", details: "5kg laundry", status: "Ready for Collect", date: "2023-06-08", serviceType: "Wash & Fold", washType: "Standard Wash" },
  { id: "110", customer: "James Anderson", details: "2kg laundry", status: "Order Collected", date: "2023-06-05", serviceType: "Dry Cleaning", washType: "Premium Wash" },
  { id: "111", customer: "Olivia White", details: "6kg laundry", status: "Order Received", date: "2023-06-07", serviceType: "Shoe Cleaning", washType: "Standard Wash" },
  { id: "112", customer: "William Clark", details: "4kg laundry", status: "New Orders", date: "2023-06-06", serviceType: "Wash & Iron", washType: "Quick Wash" },
  { id: "113", customer: "Ava Lewis", details: "3kg laundry", status: "Orders In Progress", date: "2023-06-04", serviceType: "Wash & Fold", washType: "Standard Wash" },
  { id: "114", customer: "Joseph Hall", details: "5kg laundry", status: "Ready for Collect", date: "2023-06-03", serviceType: "Dry Cleaning", washType: "Quick Wash" },
  { id: "115", customer: "Isabella Young", details: "7kg laundry", status: "Order Collected", date: "2023-06-01", serviceType: "Wash & Fold", washType: "Standard Wash" },
];

// History orders
const historyOrdersData = [
  { id: "H101", customer: "Robert Johnson", details: "4kg laundry", status: "Order Collected", date: "2023-05-28", serviceType: "Wash & Fold", washType: "Standard Wash" },
  { id: "H102", customer: "Maria Garcia", details: "2kg laundry", status: "Order Collected", date: "2023-05-25", serviceType: "Dry Cleaning", washType: "Premium Wash" },
  { id: "H103", customer: "Thomas Wilson", details: "6kg laundry", status: "Order Collected", date: "2023-05-22", serviceType: "Wash & Iron", washType: "Quick Wash" },
  { id: "H104", customer: "Jessica Lee", details: "3kg laundry", status: "Order Collected", date: "2023-05-20", serviceType: "Shoe Cleaning", washType: "Standard Wash" },
  { id: "H105", customer: "Daniel Brown", details: "5kg laundry", status: "Order Collected", date: "2023-05-18", serviceType: "Wash & Fold", washType: "Quick Wash" },
  { id: "H106", customer: "Emma Davis", details: "4kg laundry", status: "Order Collected", date: "2023-05-15", serviceType: "Dry Cleaning", washType: "Standard Wash" },
  { id: "H107", customer: "Matthew Smith", details: "3kg laundry", status: "Order Collected", date: "2023-05-12", serviceType: "Wash & Iron", washType: "Premium Wash" }
];

const orderStatuses = [
  "New Orders",
  "Order Received",
  "Orders In Progress",
  "Ready for Collect",
  "Order Collected",
];

const currentOrderStatuses = ["New Orders", "Order Received", "Orders In Progress", "Ready for Collect", "Order Collected"];
const historyOrderStatuses = ["Order Collected"];

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState(orderStatuses[0]);
  const [segment, setSegment] = useState("current");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const { toast } = useToast();

  const availableStatuses = segment === "current" 
    ? currentOrderStatuses 
    : historyOrderStatuses;

  React.useEffect(() => {
    if (segment === "current" && !currentOrderStatuses.includes(selectedStatus)) {
      setSelectedStatus(currentOrderStatuses[0]);
    } else if (segment === "history" && !historyOrderStatuses.includes(selectedStatus)) {
      setSelectedStatus(historyOrderStatuses[0]);
    }
  }, [segment, selectedStatus]);

  const filteredOrders = (segment === "current" ? ordersData : historyOrdersData).filter((order) => {
    const matchesStatus = order.status === selectedStatus;
    const matchesSearch = searchQuery === "" || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.washType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = filterDate === "" || order.date.includes(filterDate);
    return matchesStatus && matchesSearch && matchesDate;
  });

  const handleViewDetails = (orderId: string) => {
    console.log(`Viewing details for order ${orderId}`);
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    toast({
      title: "Order Updated",
      description: `Order #${orderId} has been moved to ${newStatus}`,
    });
  };

  const handleExportOrders = () => {
    console.log("Exporting orders history");
    toast({
      title: "Export Started",
      description: "Orders history export has started. File will be downloaded shortly.",
    });
    
    // In a real application, this would trigger a file download
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Orders history has been exported successfully.",
      });
    }, 1500);
  };

  const getNextStatus = (currentStatus: string) => {
    if (currentStatus === "Order Received") return "Orders In Progress";
    if (currentStatus === "Orders In Progress") return "Ready for Collect";
    if (currentStatus === "Ready for Collect") return "Order Collected";
    return "";
  };

  const renderStatusUpdateButton = (order: typeof ordersData[0]) => {
    const nextStatus = getNextStatus(order.status);
    if (!nextStatus) return null;

    let buttonVariant: "outline" | "default" | "secondary" | "destructive" = "outline";
    let buttonClass = "ml-2";
    
    if (nextStatus === "Orders In Progress") {
      buttonVariant = "secondary";
      buttonClass = "ml-2 bg-laundry-400 hover:bg-laundry-500 text-white";
    } else if (nextStatus === "Ready for Collect") {
      buttonVariant = "default";
      buttonClass = "ml-2 bg-mint-500 hover:bg-mint-600 text-white";
    } else if (nextStatus === "Order Collected") {
      buttonVariant = "default";
      buttonClass = "ml-2 bg-cream-500 hover:bg-cream-600 text-black";
    }

    return (
      <Button
        variant={buttonVariant}
        size="sm"
        className={buttonClass}
        onClick={() => handleStatusUpdate(order.id, nextStatus)}
      >
        <ArrowRight className="h-4 w-4 mr-2" />
        {nextStatus}
      </Button>
    );
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
          <CardTitle className="text-2xl font-bold text-slate-800">Orders Management</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex mb-6">
            <Button
              variant={segment === "current" ? "default" : "outline"}
              className={`rounded-r-none ${segment === "current" ? "bg-primary shadow-md" : ""}`}
              onClick={() => setSegment("current")}
            >
              Current Orders
            </Button>
            <Button
              variant={segment === "history" ? "default" : "outline"}
              className={`rounded-l-none ${segment === "history" ? "bg-primary shadow-md" : ""}`}
              onClick={() => setSegment("history")}
            >
              Order History
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="date"
                className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setFilterDate("")}
                className="border-slate-300 hover:bg-slate-100"
              >
                <Filter className="h-4 w-4 mr-2" />
                {filterDate ? "Clear Filter" : "Advanced Filters"}
              </Button>
              {segment === "history" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleExportOrders}
                  className="border-slate-300 hover:bg-slate-100 bg-blue-50 text-blue-700"
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  Export Orders
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue={selectedStatus} onValueChange={setSelectedStatus} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6 bg-slate-100">
              {availableStatuses.map((status) => (
                <TabsTrigger 
                  key={status} 
                  value={status} 
                  className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-md"
                >
                  {status}
                </TabsTrigger>
              ))}
            </TabsList>

            {availableStatuses.map((status) => (
              <TabsContent key={status} value={status}>
                <Card>
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 py-4 px-6 border-b">
                    <CardTitle className="text-lg text-slate-800">{status}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {filteredOrders.length > 0 ? (
                      <div className="rounded-md">
                        <Table>
                          <TableHeader className="bg-slate-800 text-white">
                            <TableRow className="border-slate-700 hover:bg-slate-800">
                              <TableHead className="text-slate-100 font-medium">S.No</TableHead>
                              <TableHead className="text-slate-100 font-medium">Order ID</TableHead>
                              <TableHead className="text-slate-100 font-medium">Customer</TableHead>
                              <TableHead className="text-slate-100 font-medium">Weight/Pieces</TableHead>
                              <TableHead className="text-slate-100 font-medium">Service Type</TableHead>
                              <TableHead className="text-slate-100 font-medium">Wash Type</TableHead>
                              <TableHead className="text-slate-100 font-medium">Status</TableHead>
                              <TableHead className="text-slate-100 font-medium">Date</TableHead>
                              <TableHead className="text-slate-100 font-medium">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredOrders.map((order, index) => (
                              <TableRow key={order.id} className="table-row-hover">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.details}</TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                                    {order.serviceType}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    {order.washType}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {order.status}
                                  </span>
                                </TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell className="flex">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-laundry-50 text-laundry-700 border-laundry-200 hover:bg-laundry-100"
                                    onClick={() => handleViewDetails(order.id)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Order Details
                                  </Button>
                                  {segment === "current" && renderStatusUpdateButton(order)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No orders found for this status.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
