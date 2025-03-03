
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Search, Filter } from "lucide-react";

// Sample order data
const ordersData = [
  { id: "101", customer: "John Doe", details: "5kg laundry", status: "Order Received" },
  { id: "102", customer: "Jane Smith", details: "3kg laundry", status: "New Orders" },
  { id: "103", customer: "Alice Brown", details: "2kg laundry", status: "Orders In Progress" },
  { id: "104", customer: "Bob Johnson", details: "4kg laundry", status: "Ready for Collect" },
  { id: "105", customer: "Sara Davis", details: "6kg laundry", status: "Order Collected" },
  { id: "106", customer: "Michael Wilson", details: "7kg laundry", status: "Order Received" },
  { id: "107", customer: "Emily Taylor", details: "4kg laundry", status: "New Orders" },
  { id: "108", customer: "David Moore", details: "3kg laundry", status: "Orders In Progress" },
  { id: "109", customer: "Sophia Lee", details: "5kg laundry", status: "Ready for Collect" },
  { id: "110", customer: "James Anderson", details: "2kg laundry", status: "Order Collected" },
  { id: "111", customer: "Olivia White", details: "6kg laundry", status: "Order Received" },
  { id: "112", customer: "William Clark", details: "4kg laundry", status: "New Orders" },
  { id: "113", customer: "Ava Lewis", details: "3kg laundry", status: "Orders In Progress" },
  { id: "114", customer: "Joseph Hall", details: "5kg laundry", status: "Ready for Collect" },
  { id: "115", customer: "Isabella Young", details: "7kg laundry", status: "Order Collected" },
];

// Define the order status options - Swapped "Order Received" and "New Orders"
const orderStatuses = [
  "New Orders",
  "Order Received",
  "Orders In Progress",
  "Ready for Collect",
  "Order Collected",
];

const Orders = () => {
  // State to track the selected status tab (default to "New Orders")
  const [selectedStatus, setSelectedStatus] = useState(orderStatuses[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter orders based on the selected status and search query
  const filteredOrders = ordersData.filter((order) => {
    // First filter by status
    const matchesStatus = order.status === selectedStatus;
    
    // Then filter by search query if one exists
    const matchesSearch = searchQuery === "" || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Handle viewing order details (placeholder for now)
  const handleViewDetails = (orderId: string) => {
    console.log(`Viewing details for order ${orderId}`);
    // You could add functionality to show a modal with order details here
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Orders Management</CardTitle>
        </CardHeader>
        <CardContent>
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
            <Button variant="outline" size="sm" className="w-full md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          {/* Status filter tabs */}
          <Tabs defaultValue={selectedStatus} onValueChange={setSelectedStatus} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              {orderStatuses.map((status) => (
                <TabsTrigger key={status} value={status} className="text-sm">
                  {status}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Create content for each status tab */}
            {orderStatuses.map((status) => (
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
                                <TableCell>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewDetails(order.id)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Order Details
                                  </Button>
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
