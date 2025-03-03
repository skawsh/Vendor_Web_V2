
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

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

// Define the order status options - Interchanged "Order Received" and "New Orders"
const orderStatuses = [
  "Order Received",
  "New Orders",
  "Orders In Progress",
  "Ready for Collect",
  "Order Collected",
];

const Orders = () => {
  // State to track the selected status tab (default to "Order Received")
  const [selectedStatus, setSelectedStatus] = useState(orderStatuses[0]);

  // Filter orders based on the selected status
  const filteredOrders = ordersData.filter((order) => order.status === selectedStatus);

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
                              <TableHead>Details</TableHead>
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
