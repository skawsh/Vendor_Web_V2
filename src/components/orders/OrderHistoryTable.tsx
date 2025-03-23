
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OrderHistoryTableProps {
  orders: any[];
  viewOrderDetails: (orderId: string) => void;
}

const OrderHistoryTable: React.FC<OrderHistoryTableProps> = ({ orders, viewOrderDetails }) => {
  return (
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
            {orders.length > 0 ? (
              orders.map((order, index) => (
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
  );
};

export default OrderHistoryTable;
