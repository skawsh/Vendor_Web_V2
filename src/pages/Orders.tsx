
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import OrderFilterDropdown from "@/components/OrderFilterDropdown";
import { dateFilterOptions, statusOptions } from '@/data/orders';
import OrderSearch from '@/components/orders/OrderSearch';
import DateFilterPopover from '@/components/orders/DateFilterPopover';
import StatusFilter from '@/components/orders/StatusFilter';
import OrderCard from '@/components/orders/OrderCard';
import HistoryOrderCard from '@/components/orders/HistoryOrderCard';
import OrdersTable from '@/components/orders/OrdersTable';
import OrderHistoryTable from '@/components/orders/OrderHistoryTable';
import OrderTabs from '@/components/orders/OrderTabs';
import { useOrderActions } from '@/hooks/useOrderActions';
import { useOrderFilters } from '@/hooks/useOrderFilters';

const Orders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("current");
  
  // Custom hooks
  const { orders, getActionButton } = useOrderActions();
  const { 
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
    filterOrders,
    filterOrderHistory,
    resetDateFilters,
    applyDateFilters
  } = useOrderFilters();

  // Apply filters to orders
  const filteredOrders = filterOrders(orders);
  const filteredOrderHistory = filterOrderHistory();

  // Navigate to order details
  const viewOrderDetails = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };

  // Render action button with tooltip
  const renderActionButton = (order) => {
    const actionConfig = getActionButton(order);
    if (!actionConfig) return null;
    
    return (
      <Button 
        variant="success"
        className="bg-[#D1FFCE] text-black font-medium text-xs sm:text-sm py-1 px-2 sm:px-3 h-auto"
        onClick={actionConfig.action}
      >
        {actionConfig.label}
      </Button>
    );
  };

  return (
    <div className="container mx-auto p-3 md:p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Order management</h1>
          <p className="text-gray-600">Manage all your studio order in one place</p>
        </div>
        <div>
          <OrderFilterDropdown onFilterChange={(filterType, value) => {
            console.log("Filter selected:", filterType, value);
            if (filterType === 'appliedDateRange' || filterType === 'appliedDateTimeRange') {
              setDateRange(value);
              toast.success(`Date filter applied`, {
                description: "Orders filtered by selected date range"
              });
            } else {
              toast.success(`Filter applied: ${filterType}`, {
                description: "Orders filtered successfully"
              });
            }
          }} />
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 mb-6">
        <OrderSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="flex items-center justify-between">
          <span className="font-medium">Filter</span>
          <DateFilterPopover 
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            dateRange={dateRange}
            setDateRange={setDateRange}
            dateFilterOptions={dateFilterOptions}
            datePopoverOpen={datePopoverOpen}
            setDatePopoverOpen={setDatePopoverOpen}
            resetDateFilters={resetDateFilters}
            applyDateFilters={applyDateFilters}
          />
        </div>
      </div>
      
      <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab}>
        <TabsContent value="current">
          <div className="rounded-lg overflow-hidden border-2 border-[#0F7EA3] bg-[#0F7EA3]">
            <StatusFilter 
              statusOptions={statusOptions}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              isFilterSectionOpen={isFilterSectionOpen}
              setIsFilterSectionOpen={setIsFilterSectionOpen}
            />
            
            <div className="md:hidden bg-white p-3">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    index={index} 
                    getActionButton={renderActionButton}
                    viewOrderDetails={viewOrderDetails}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No orders found</p>
                </div>
              )}
            </div>
            
            <OrdersTable 
              orders={filteredOrders} 
              getActionButton={renderActionButton} 
              viewOrderDetails={viewOrderDetails} 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="rounded-lg overflow-hidden border-2 border-[#0F7EA3] bg-[#0F7EA3]">
            <div className="flex flex-wrap p-2 bg-[#0F7EA3] rounded-t-lg overflow-x-auto">
              <h3 className="text-white font-semibold px-4 py-2">Order History - Completed Orders</h3>
            </div>
            
            <div className="md:hidden bg-white p-3">
              {filteredOrderHistory.length > 0 ? (
                filteredOrderHistory.map((order) => (
                  <HistoryOrderCard 
                    key={order.orderId} 
                    order={order} 
                    viewOrderDetails={viewOrderDetails} 
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No orders in history</p>
                </div>
              )}
            </div>
            
            <OrderHistoryTable 
              orders={filteredOrderHistory} 
              viewOrderDetails={viewOrderDetails} 
            />
          </div>
        </TabsContent>
      </OrderTabs>
    </div>
  );
};

export default Orders;
