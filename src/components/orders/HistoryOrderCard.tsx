
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HistoryOrderCardProps {
  order: any;
  viewOrderDetails: (orderId: string) => void;
}

const HistoryOrderCard: React.FC<HistoryOrderCardProps> = ({ order, viewOrderDetails }) => {
  return (
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
};

export default HistoryOrderCard;
