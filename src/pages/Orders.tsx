
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Search, Filter, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample order data
const ordersData = [
  { id: "101", customer: "John Doe", details: "5kg laundry", status: "Order Received", date: "2023-06-15" },
  { id: "102", customer: "Jane Smith", details: "3kg laundry", status: "New Orders", date: "2023-06-16" },
  { id: "103", customer: "Alice Brown", details: "2kg laundry", status: "Orders In Progress", date: "2023-06-14" },
  { id: "104", customer: "Bob Johnson", details: "4kg laundry", status: "Ready for Collect", date: "2023-06-13" },
  { id: "105", customer: "Sara Davis", details: "6kg laundry", status: "Order Collected", date: "2023-06-10" },
  { id: "106", customer: "Michael Wilson", details: "7kg laundry", status: "Order Received", date: "2023-06-12" },
  { id: "107", customer: "Emily Taylor", details: "4kg laundry", status: "New Orders", date: "2023-06-11" },
  { id: "108", customer: "David Moore", details: "3kg laundry", status: "Orders In Progress", date: "2023-06-09" },
  { id: "109", customer: "Sophia Lee", details: "5kg laundry", status: "Ready for Collect", date: "2023-06-08" },
  { id: "110", customer: "James Anderson", details: "2kg laundry", status: "Order Collected", date: "2023-06-05" },
  { id: "111", customer: "Olivia White", details: "6kg laundry", status: "Order Received", date: "2023-06-07" },
  { id: "112", customer: "William Clark", details: "4kg laundry", status: "New Orders", date: "2023-06-06" },
  { id: "113", customer: "Ava Lewis", details: "3kg laundry", status: "Orders In Progress", date: "2023-06-04" },
  { id: "114", customer: "Joseph Hall", details: "5kg laundry", status: "Ready for Collect", date: "2023-06-03" },
  { id: "115", customer: "Isabella Young", details: "7kg laundry", status: "Order Collected", date: "2023-06-01" },
];

// Define the order status options - Swapped "Order Received" and "New Orders"
const orderStatuses = [
  "New Orders",
  "Order Received",
  "Orders In Progress",
  "Ready for Collect",
  "Order Collected",
];

// Define which statuses are current orders vs history
const currentOrderStatuses = ["New Orders", "Order Received", "Orders In Progress", "Ready for Collect"];
const historyOrderStatuses = ["Order Collected"];

const Orders = () => {
  // State for tabs, segment and filters
  const [selectedStatus, setSelectedStatus] = useState(orderStatuses[0]);
  const [segment, setSegment] = useState("current"); // "current" or "history"
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const { toast } = useToast();

  // Get the available statuses based on current segment
  const availableStatuses = segment === "current" 
    ? currentOrderStatuses 
    : historyOrderStatuses;

  // Set default status when switching segments
  React.useEffect(() => {
    if (segment === "current" && !currentOrderStatuses.includes(selectedStatus)) {
      setSelectedStatus(currentOrderStatuses[0]);
    } else if (segment === "history" && !historyOrderStatuses.includes(selectedStatus)) {
      setSelectedStatus(historyOrderStatuses[0]);
    }
  }, [segment, selectedStatus]);

  // Filter orders based on the selected status, search query, and date
  const filteredOrders = ordersData.filter((order) => {
    // First filter by status
    const matchesStatus = order.status === selectedStatus;
    
    // Then filter by search query if one exists
    const matchesSearch = searchQuery === "" || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by date if provided
    const matchesDate = filterDate === "" || order.date.includes(filterDate);
    
    return matchesStatus && matchesSearch && matchesDate;
  });

  // Handle viewing order details
  const handleViewDetails = (orderId: string) => {
    console.log(`Viewing details for order ${orderId}`);
    // You could add functionality to show a modal with order details here
  };

  // Handle status update
  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    
    // In a real app, this would update the database
    // For now, we'll just show a toast notification
    toast({
      title: "Order Updated",
      description: `Order #${orderId} has been moved to ${newStatus}`,
    });
  };

  // Get next status based on current status
  const getNextStatus = (currentStatus: string) => {
    if (currentStatus === "Order Received") return "Orders In Progress";
    if (currentStatus === "Orders In Progress") return "Ready for Collect";
    if (currentStatus === "Ready for Collect") return "Order Collected";
    return "";
  };

  // Determine which status update button to show based on the current status
  const renderStatusUpdateButton = (order: typeof ordersData[0]) => {
    const nextStatus = getNextStatus(order.status);
    if (!nextStatus) return null;

    return (
      <Button
        variant="outline"
        size="sm"
        className="ml-2"
        onClick={() => handleStatusUpdate(order.id, nextStatus)}
      >
        <ArrowRight className="h-4 w-4 mr-2" />
        {nextStatus}
      </Button>
    );
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Orders Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Segment selector */}
          <div className="flex mb-6">
            <Button
              variant={segment === "current" ? "default" : "outline"}
              className="rounded-r-none"
              onClick={() => setSegment("current")}
            >
              Current Orders
            </Button>
            <Button
              variant={segment === "history" ? "default" : "outline"}
              className="rounded-l-none"
              onClick={() => setSegment("history")}
            >
              Order History
            </Button>
          </div>

          {/* Search and filter section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="date"
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
              <Button variant="outline" size="sm" onClick={() => setFilterDate("")}>
                <Filter className="h-4 w-4 mr-2" />
                {filterDate ? "Clear Filter" : "Advanced Filters"}
              </Button>
            </div>
          </div>

          {/* Status filter tabs */}
          <Tabs defaultValue={selectedStatus} onValueChange={setSelectedStatus} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              {availableStatuses.map((status) => (
                <TabsTrigger key={status} value={status} className="text-sm">
                  {status}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Create content for each status tab */}
            {availableStatuses.map((status) => (
              <TabsContent key={status} value={status}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{status}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {filteredOrders.length > 0 ? (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Order ID</TableHead>
                              <TableHead>Customer</TableHead>
                              <TableHead>Weight/Pieces</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredOrders.map((order) => (
                              <TableRow key={order.id} className="table-row-hover">
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.details}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell className="flex">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewDetails(order.id)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Order Details
                                  </Button>
                                  {renderStatusUpdateButton(order)}
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
