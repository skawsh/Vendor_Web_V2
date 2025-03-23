
import { useState } from 'react';
import { DateRange } from "react-day-picker";
import { orderHistoryData } from '@/data/orders';

export const useOrderFilters = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("New Orders");
  const [dateFilter, setDateFilter] = useState("all");
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [isFilterSectionOpen, setIsFilterSectionOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("All Orders");

  const applyDateFilter = (historyData) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());
    
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    
    switch (dateFilter) {
      case 'today':
        return historyData.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate.toDateString() === today.toDateString();
        });
      case 'yesterday':
        return historyData.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate.toDateString() === yesterday.toDateString();
        });
      case 'thisWeek':
        return historyData.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= thisWeekStart && orderDate <= today;
        });
      case 'thisMonth':
        return historyData.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= thisMonthStart && orderDate <= today;
        });
      case 'customRange':
        if (!dateRange?.from || !dateRange?.to) return historyData;
        return historyData.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= dateRange.from && orderDate <= dateRange.to;
        });
      default:
        return historyData;
    }
  };

  const resetDateFilters = () => {
    setDateFilter('all');
    setDateRange(undefined);
    setDatePopoverOpen(false);
  };

  const applyDateFilters = () => {
    setDatePopoverOpen(false);
  };

  // Apply filters to current orders
  const filterOrders = (orders) => {
    return orders.filter(order => 
      order.status === statusFilter && 
      (searchQuery === "" || 
       order.orderId.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // Apply filters to order history
  const filterOrderHistory = () => {
    const filteredByDate = applyDateFilter(orderHistoryData);
    
    return filteredByDate.filter(order => 
      searchQuery === "" || 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return {
    dateRange,
    setDateRange,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    datePopoverOpen,
    setDatePopoverOpen,
    isFilterSectionOpen,
    setIsFilterSectionOpen,
    filterValue,
    setFilterValue,
    filterOrders,
    filterOrderHistory,
    resetDateFilters,
    applyDateFilters
  };
};
