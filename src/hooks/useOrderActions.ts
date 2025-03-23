
import { useState } from 'react';
import { toast } from "sonner";
import { ordersData as initialOrdersData } from '@/data/orders';

export const useOrderActions = () => {
  const [orders, setOrders] = useState(initialOrdersData);

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
        return {
          label: "Mark Received",
          action: () => updateOrderStatus(order.orderId, "Order Received"),
          tooltip: "Mark order as received"
        };
      case "Order Received":
        return {
          label: "Mark InProgress",
          action: () => updateOrderStatus(order.orderId, "Orders In Progress"),
          tooltip: "Mark order as in progress"
        };
      case "Orders In Progress":
        return {
          label: "Ready For Collect",
          action: () => updateOrderStatus(order.orderId, "Ready for collect"),
          tooltip: "Mark order as ready for collection"
        };
      case "Ready for collect":
        return {
          label: "Order collected",
          action: () => updateOrderStatus(order.orderId, "Order collected"),
          tooltip: "Mark order as collected"
        };
      case "Order collected":
      default:
        return null;
    }
  };

  return {
    orders,
    updateOrderStatus,
    getActionButton
  };
};
