
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const OrderTabs: React.FC<OrderTabsProps> = ({ activeTab, setActiveTab, children }) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
      <TabsList className="flex w-full max-w-md mb-4">
        <TabsTrigger 
          value="current" 
          className={`flex-1 py-3 rounded-md ${activeTab === 'current' ? 'bg-[#0F7EA3] text-white shadow-md' : 'bg-white border-2'}`}
          style={{ boxShadow: activeTab === 'current' ? '0 4px 6px rgba(0, 0, 0, 0.2)' : 'none' }}
        >
          Current orders
        </TabsTrigger>
        <TabsTrigger 
          value="history"
          className={`flex-1 py-3 rounded-md ${activeTab === 'history' ? 'bg-[#0F7EA3] text-white shadow-md' : 'bg-white border-2'}`}
          style={{ boxShadow: activeTab === 'history' ? '0 4px 6px rgba(0, 0, 0, 0.2)' : 'none' }}
        >
          Orders history
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default OrderTabs;
